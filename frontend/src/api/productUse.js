// Import required modules
const { Storage } = require('ee-core');
const { UtilsHelper } = require('ee-core/utils');

class ProductService extends Service {
    // ... (constructor and other methods)

    createDatabase() {
        try {
            const jdb = Storage.connection('product_service_db');
            this.database = jdb.db;
            return 'Database created successfully';
        } catch (error) {
            console.error('Error creating database:', error);
            return 'Failed to create database';
        }
    }
    //   方法（2）：校验商铺入库参数，校验一个参数，要求是一个对象，并含有商铺名、账号、密码、已上货商品&#8203;``【oaicite:1】``&#8203;、
    //   * 已上货数量&#8203;``【oaicite:0】``&#8203;、待上货数量、上货分类[数组]、创建人
    validateShopParams(shopParams) {
        if (typeof shopParams !== 'object' || shopParams === null) {
            return { success: false, error: 'Invalid parameter type. Expected an object.' };
        }
        const requiredProperties = ['shopName', 'account', 'password', 'createdBy'];
        for (const prop of requiredProperties) {
            if (!(prop in shopParams)) {
                return { success: false, error: `${prop} is a required property.` };
            }
        }
        if (!('goodsList' in shopParams)) {
            shopParams.goodsList = [];
        }
        if (!('goodsCount' in shopParams)) {
            shopParams.goodsCount = 0;
        }
        const additionalProperties = ['pendingCount', 'categories'];
        for (const prop of additionalProperties) {
            if (prop in shopParams && !Array.isArray(shopParams[prop])) {
                return { success: false, error: `${prop} must be an array.` };
            }
        }
        return { success: true, error: null };
    }

    /**
       * 方法（3）：商铺入库，将参数作为值（并生成一个唯一ID值），存入一个方法（1）所建立的表中，
       * 并对应的建立一个数据表，以更新的方法插入，插入前调用方法（2）进行校验，如果不通过则返回错误内容
       * 
       * @param {Object} shopParams - 商铺参数对象
       * @returns {Object} - 返回对象，包含存储结果和可能的错误信息
       */
    storeShop(shopParams) {
        // Validate shop parameters using method (2)
        const validation = this.validateShopParams(shopParams);
        if (!validation.success) {
            return { success: false, error: validation.error };
        }

        try {
            const jdb = Storage.connection('product_service_db');
            const shopId = shortid.generate();
            jdb.db.get('shops').push({ id: shopId, ...shopParams }).write();
            return { success: true, shopId, error: null };
        } catch (error) {
            console.error('Error storing shop:', error);
            return { success: false, error: 'Failed to store shop' };
        }
    }

    /**
   * 方法（4）：添加商品类别（商品类别名）
   * 
   * @param {String} categoryName - 新的商品类别名
   * @returns {Object} - 返回对象，包含添加结果和可能的错误信息
   */
    addProductCategory(categoryName) {
        try {
            const jdb = Storage.connection('product_service_db');
            const existingCategory = jdb.db.get('productCategories').find({ name: categoryName }).value();
            if (existingCategory) {
                return { success: false, error: 'Category already exists' };
            }
            const categoryId = shortid.generate();

            // Create a new record in the database for the category
            jdb.db.get('productCategories').push({ id: categoryId, name: categoryName }).write();

            // Return success message or the category ID for further use
            return { success: true, categoryId, error: null };
        } catch (error) {
            // Handle any errors that may occur during category addition
            console.error('Error adding product category:', error);
            return { success: false, error: 'Failed to add product category' };
        }
    }
    /**
      * 方法（5）：删除商品类别（ID）
      * 
      * @param {String} categoryId - 要删除的商品类别的ID
      * @returns {Object} - 返回对象，包含删除结果和可能的错误信息
      */
    deleteProductCategory(categoryId) {
        try {
            // Connect to the database or create if not exists
            const jdb = Storage.connection('product_service_db');

            // Check if the category exists
            const existingCategory = jdb.db.get('productCategories').find({ id: categoryId }).value();
            if (!existingCategory) {
                return { success: false, error: 'Category not found' };
            }

            // Check if there are any products associated with this category
            const associatedProducts = jdb.db.get('products').filter({ categoryId }).value();
            if (associatedProducts.length > 0) {
                return { success: false, error: 'Cannot delete category with associated products' };
            }

            // Delete the category from the database
            jdb.db.get('productCategories').remove({ id: categoryId }).write();

            // Return success message or additional information
            return { success: true, message: 'Category deleted successfully', error: null };
        } catch (error) {
            // Handle any errors that may occur during category deletion
            console.error('Error deleting product category:', error);
            return { success: false, error: 'Failed to delete product category' };
        }
    }
    /**
  * 方法（6）：添加商品列表（参数要求，有商品类名，列表字符串数组）
  * 
  * @param {Object} params - 包含商品类名和商品列表的参数对象
  * @param {String} params.categoryName - 商品类名
  * @param {Array} params.productList - 商品列表，字符串数组
  * @returns {Object} - 返回对象，包含添加结果和可能的错误信息
  */
    addProductList(params) {
        try {
            // Validate parameters
            if (!UtilsHelper.validValue(params.categoryName) || !Array.isArray(params.productList)) {
                return { success: false, error: 'Invalid parameters' };
            }

            // Connect to the database or create if not exists
            const jdb = Storage.connection('product_service_db');

            // Check if the category exists
            const category = jdb.db.get('productCategories').find({ name: params.categoryName }).value();
            if (!category) {
                return { success: false, error: 'Category not found' };
            }

            // Create a new product list
            const productList = {
                id: shortid.generate(),
                categoryName: params.categoryName,
                list: params.productList
            };

            // Add the product list to the database
            jdb.db.get('productLists').push(productList).write();

            // Return success message or additional information
            return { success: true, message: 'Product list added successfully', error: null };
        } catch (error) {
            // Handle any errors that may occur during product list addition
            console.error('Error adding product list:', error);
            return { success: false, error: 'Failed to add product list' };
        }
    }
    /**
       * 方法（7）：删除商铺（根据ID值删除）
       * 
       * @param {String} shopId - 商铺的唯一ID
       * @returns {Object} - 返回对象，包含删除结果和可能的错误信息
       */
    deleteShopById(shopId) {
        try {
            // Validate shopId
            if (!UtilsHelper.validValue(shopId)) {
                return { success: false, error: 'Invalid shop ID' };
            }

            // Connect to the database or create if not exists
            const jdb = Storage.connection('product_service_db');

            // Check if the shop exists
            const shop = jdb.db.get('shops').find({ id: shopId }).value();
            if (!shop) {
                return { success: false, error: 'Shop not found' };
            }

            // Delete the shop
            jdb.db.get('shops').remove({ id: shopId }).write();

            // Return success message or additional information
            return { success: true, message: 'Shop deleted successfully', error: null };
        } catch (error) {
            // Handle any errors that may occur during shop deletion
            console.error('Error deleting shop:', error);
            return { success: false, error: 'Failed to delete shop' };
        }
    }
    /**
       * 方法（8）：更新商铺的商品上架
       * 
       * @param {Array} productListIds - 商品列表的ID数组
       * @param {String} shopId - 商铺的唯一ID
       * @returns {Object} - 返回对象，包含更新结果和可能的错误信息
       */
    updateProductShelf(productListIds, shopId) {
        try {
            // Validate input parameters
            if (!UtilsHelper.validValue(shopId) || !Array.isArray(productListIds)) {
                return { success: false, error: 'Invalid input parameters' };
            }

            // Connect to the database or create if not exists
            const jdb = Storage.connection('product_service_db');+

            // Check if the shop exists
            const shop = jdb.db.get('shops').find({ id: shopId }).value();
            if (!shop) {
                return { success: false, error: 'Shop not found' };
            }

            // Update the product shelf
            jdb.db.get('shops')
                .find({ id: shopId })
                .update('productShelf', (productShelf) => {
                    // Increment the product count for each product in the productListIds array
                    productListIds.forEach((productId) => {
                        if (!productShelf.includes(productId)) {
                            productShelf.push(productId);
                        }
                    });
                    return productShelf;
                })
                .write();

            // Return success message or additional information
            return { success: true, message: 'Product shelf updated successfully', error: null };
        } catch (error) {
            // Handle any errors that may occur during product shelf update
            console.error('Error updating product shelf:', error);
            return { success: false, error: 'Failed to update product shelf' };
        }
    }
    /**
       * 方法（9）：更新商铺意属性
       * 
       * @param {Object} updates - 更新对象，包含要更新的商铺属性
       * @param {String} shopId - 商铺的唯一ID
       * @returns {Object} - 返回对象，包含更新结果和可能的错误信息
       */
    updateShopAttributes(updates, shopId) {
        try {
            // Validate input parameters
            if (!UtilsHelper.validValue(shopId) || typeof updates !== 'object') {
                return { success: false, error: 'Invalid input parameters' };
            }

            // Connect to the database or create if not exists
            const jdb = Storage.connection('product_service_db');

            // Check if the shop exists
            const shop = jdb.db.get('shops').find({ id: shopId }).value();
            if (!shop) {
                return { success: false, error: 'Shop not found' };
            }

            // Update the shop attributes
            jdb.db.get('shops')
                .find({ id: shopId })
                .assign(updates)
                .write();

            // Return success message or additional information
            return { success: true, message: 'Shop attributes updated successfully', error: null };
        } catch (error) {
            // Handle any errors that may occur during shop attribute update
            console.error('Error updating shop attributes:', error);
            return { success: false, error: 'Failed to update shop attributes' };
        }
    }
    /**
  * 方法（10）：权限认证
  * 
  * @param {String} accountId - 账号的唯一ID
  * @returns {Object} - 返回对象，包含权限认证结果和可能的错误信息
  */
    authenticatePermission(accountId) {
        try {
            // Validate input parameter
            if (!UtilsHelper.validValue(accountId)) {
                return { success: false, error: 'Invalid account ID' };
            }

            // Connect to the database or create if not exists
            const jdb = Storage.connection('product_service_db');

            // Check if the account exists
            const account = jdb.db.get('users').find({ id: accountId }).value();
            if (!account) {
                return { success: false, error: 'Account not found' };
            }

            // Check the account's permissions
            const permissions = account.permissions || [];

            // Example: Assuming 'admin', 'operator', and 'observer' are valid permissions
            const isAdmin = permissions.includes('admin');
            const isOperator = permissions.includes('operator');
            const isObserver = permissions.includes('observer');

            // Return permission authentication result
            return {
                success: true,
                isAdmin: isAdmin,
                isOperator: isOperator,
                isObserver: isObserver,
                error: null
            };
        } catch (error) {
            // Handle any errors that may occur during permission authentication
            console.error('Error authenticating permissions:', error);
            return { success: false, error: 'Failed to authenticate permissions' };
        }
    }
    /**
     * 方法（11）：管理员添加
     * 
     * @param {String} account - 要添加的管理员账号
     * @param {String} password - 要添加的管理员密码
     * @param {Array} permissions - 要添加的管理员权限
     * @returns {Object} - 返回对象，包含添加结果和可能的错误信息
     */
    addAdministrator(account, password, permissions) {
        try {
            // Validate input parameters
            if (!UtilsHelper.validValue(account) || !UtilsHelper.validValue(password)) {
                return { success: false, error: 'Invalid account or password' };
            }

            // Connect to the database or create if not exists
            const jdb = Storage.connection('product_service_db');

            // Check if the current user is an administrator (permission check)
            const currentUser = this.getCurrentUser(); // Assuming there's a method to get the current user
            if (!currentUser || !currentUser.isAdmin) {
                return { success: false, error: 'Permission denied. Only administrators can add accounts.' };
            }

            // Check if the account already exists
            const existingAccount = jdb.db.get('users').find({ account: account }).value();
            if (existingAccount) {
                return { success: false, error: 'Account already exists' };
            }

            // Generate a unique ID for the new administrator
            const adminId = shortid.generate();

            // Add the new administrator to the user database
            jdb.db.get('users').push({
                id: adminId,
                account: account,
                password: password, // Note: In a real application, passwords should be securely hashed
                permissions: permissions || ['admin'], // Default to admin permission if not provided
            }).write();

            return { success: true, error: null };
        } catch (error) {
            // Handle any errors that may occur during the administrator addition
            console.error('Error adding administrator:', error);
            return { success: false, error: 'Failed to add administrator' };
        }
    }
    /**
     * 方法（12）：登陆认证
     * 
     * @param {String} account - 登陆账号
     * @param {String} password - 登陆密码
     * @returns {Object} - 包含登陆结果和用户信息的对象
     */
    loginAuthentication(account, password) {
        try {
            // Validate input parameters
            if (!UtilsHelper.validValue(account) || !UtilsHelper.validValue(password)) {
                return { success: false, error: 'Invalid account or password' };
            }

            // Connect to the user database
            const jdb = Storage.connection('product_service_db');

            // Find the user with the provided account and password
            const user = jdb.db.get('users').find({ account: account, password: password }).value();

            if (!user) {
                return { success: false, error: 'Invalid account or password' };
            }

            // Update login information (e.g., login date, last login time)
            const loginDate = new Date();
            jdb.db.get('users').find({ account: account }).assign({
                lastLogin: user.loginDate || null, // Assuming loginDate is stored in the user object
                loginDate: loginDate,
            }).write();

            // Return a response with user information
            return {
                success: true,
                error: null,
                user: {
                    account: user.account,
                    permissions: user.permissions,
                    loginDate: loginDate,
                    lastLogin: user.lastLogin || null,
                    avatar: user.avatar || null,
                },
            };
        } catch (error) {
            // Handle any errors that may occur during the login authentication
            console.error('Error during login authentication:', error);
            return { success: false, error: 'Login failed' };
        }
    }

    /**
   * 方法（13）：账号更新密码
   * 
   * @param {String} account - 账号
   * @param {String} oldPassword - 旧密码
   * @param {String} newPassword - 新密码
   * @returns {Object} - 包含密码更新结果的对象
   */
    updatePassword(account, oldPassword, newPassword) {
        try {
            // Validate input parameters
            if (!UtilsHelper.validValue(account) || !UtilsHelper.validValue(oldPassword) || !UtilsHelper.validValue(newPassword)) {
                return { success: false, error: 'Invalid account, old password, or new password' };
            }

            // Connect to the user database
            const jdb = Storage.connection('product_service_db');

            // Find the user with the provided account and old password
            const user = jdb.db.get('users').find({ account: account, password: oldPassword }).value();

            if (!user) {
                return { success: false, error: 'Invalid account or old password' };
            }

            // Update the password if the old password matches
            if (user.password === oldPassword) {
                jdb.db.get('users').find({ account: account }).assign({ password: newPassword }).write();
                return { success: true, error: null };
            } else {
                return { success: false, error: 'Invalid old password' };
            }
        } catch (error) {
            // Handle any errors that may occur during password update
            console.error('Error during password update:', error);
            return { success: false, error: 'Password update failed' };
        }
    }
    /**
    * 方法（14）：设置更新
    * 
    * @param {Object} settings - 包含更新参数的对象
    * @param {Number} settings.maxThreads - 最大线程数
    * @param {String} settings.fetchMode - 抓取模式
    * @returns {Object} - 包含更新结果的对象
    */
    updateSettings(settings) {
        try {
            // Validate input parameters
            if (!settings || !UtilsHelper.validValue(settings.maxThreads) || !UtilsHelper.validValue(settings.fetchMode)) {
                return { success: false, error: 'Invalid settings' };
            }

            // Connect to the settings database
            const jdb = Storage.connection('product_service_settings');

            // Update the settings with the provided values
            jdb.db.set('maxThreads', settings.maxThreads).write();
            jdb.db.set('fetchMode', settings.fetchMode).write();

            return { success: true, error: null };
        } catch (error) {
            // Handle any errors that may occur during settings update
            console.error('Error during settings update:', error);
            return { success: false, error: 'Settings update failed' };
        }
    }

    /**
  * 方法（15）：获取商品类别，获取所有
  * 
  * @returns {Object} - 包含商品类别信息的对象
  */
    getProductCategories() {
        try {
            // Connect to the product categories database
            const jdb = Storage.connection('product_categories');

            // Get all product categories
            const categories = jdb.db.get('categories').value();

            return { success: true, error: null, categories };
        } catch (error) {
            // Handle any errors that may occur during product categories retrieval
            console.error('Error during product categories retrieval:', error);
            return { success: false, error: 'Product categories retrieval failed', categories: null };
        }
    }

    /**
     * 方法（16）：根据商品类别查找对应的所有商品列表
     * 
     * @param {string} categoryIdOrName - 商品类别的ID或名字
     * @returns {Object} - 包含商品列表信息的对象
     */
    getProductListsByCategory(categoryIdOrName) {
        try {
            // Connect to the product lists database
            const jdb = Storage.connection('product_lists');

            // Fetch product category details
            const categoryDetails = jdb.db.get('categories').find({ id: categoryIdOrName }).value();

            if (!categoryDetails) {
                return { success: false, error: 'Product category not found', productLists: null };
            }

            // Fetch product lists based on category ID
            const productLists = jdb.db.get('lists').filter({ categoryId: categoryDetails.id }).value();

            return { success: true, error: null, productLists };
        } catch (error) {
            // Handle any errors that may occur during product lists retrieval
            console.error('Error during product lists retrieval:', error);
            return { success: false, error: 'Product lists retrieval failed', productLists: null };
        }
    }

    /**
  * 方法（17）：获取可上架商品列表ID数组
  * 根据传入的商铺ID、上货类型&#8203;``【oaicite:0】``&#8203;，
  * 先查询自身的已上货商品，根据已上货商品作为排除条件，
  * 向商品列表数组库中同时以上货类型作为追加条件查询可供上货的商品ID数组，并返回
  * 
  * @param {string} storeId - 商铺ID
  * @param {string[]} categoryIds - 上货类型的数组ID
  * @returns {Object} - 包含商品列表ID数组的对象
  */
    getAvailableProductLists(storeId, categoryIds) {
        try {
            // Connect to the product lists database
            const jdb = Storage.connection('product_lists');

            // Fetch the store details
            const storeDetails = jdb.db.get('stores').find({ id: storeId }).value();

            if (!storeDetails) {
                return { success: false, error: 'Store not found', availableProductLists: null };
            }

            // Fetch the IDs of products already added to the store
            const addedProductIds = storeDetails.addedProductIds || [];

            // Fetch the available product lists based on category IDs
            const availableProductLists = jdb.db.get('lists')
                .filter(list => categoryIds.includes(list.categoryId) && !addedProductIds.includes(list.id))
                .value();

            return { success: true, error: null, availableProductLists: availableProductLists.map(list => list.id) };
        } catch (error) {
            // Handle any errors that may occur during product lists retrieval
            console.error('Error during available product lists retrieval:', error);
            return { success: false, error: 'Available product lists retrieval failed', availableProductLists: null };
        }
    }
    /**
  * 方法（18）：启动数据抓取（启动/停止）
  * 
  * @param {boolean} start - 指定是否启动数据抓取
  * @returns {Object} - 包含启动状态的对象
  */
    controlDataFetching(start) {
        try {
            // Connect to the data fetching configuration database
            const jdb = Storage.connection('data_fetching_config');

            // Update the data fetching status based on the provided start parameter
            jdb.db.set('isFetchingData', start).write();

            return { success: true, error: null, isFetchingData: start };
        } catch (error) {
            // Handle any errors that may occur during data fetching control
            console.error('Error during data fetching control:', error);
            return { success: false, error: 'Data fetching control failed', isFetchingData: null };
        }
    }

    /**
  * 方法（19）：启动全部用户自动上货（启动/停止）
  * 
  * @param {boolean} start - 指定是否启动全部用户自动上货
  * @returns {Object} - 包含启动状态的对象
  */
    controlAllUsersAutoStocking(start) {
        try {
            // Connect to the automatic stocking configuration database
            const jdb = Storage.connection('auto_stocking_config');

            // Update the automatic stocking status based on the provided start parameter
            jdb.db.set('isAutoStockingEnabled', start).write();

            return { success: true, error: null, isAutoStockingEnabled: start };
        } catch (error) {
            // Handle any errors that may occur during automatic stocking control
            console.error('Error during automatic stocking control:', error);
            return { success: false, error: 'Automatic stocking control failed', isAutoStockingEnabled: null };
        }
    }
    /**
     * 方法（20）：启动单个商铺自动上货（商铺ID，商品分类，上货数量）
     * 商品分类，上货数量如不指定，则根据数据库查找自身的对应属性
     * 
     * @param {string} storeId - 商铺ID
     * @param {string} productCategory - 商品分类
     * @param {number} quantity - 上
     * 货数量
     * @returns {Object} - 包含操作结果的对象
     */
    startAutoProductListing(storeId, productCategory, quantity) {
        try {
            // Connect to the store database
            const storeDb = Storage.connection('store');

            // Find the store based on the provided store ID
            const store = storeDb.db.get('stores').find({ id: storeId }).value();

            if (!store) {
                // If store not found, return an error
                return { success: false, error: 'Store not found' };
            }

            // Determine the quantity if not specified
            if (quantity === undefined || quantity === null) {
                quantity = store.autoListingQuantity || 0;
            }

            // Start or stop automatic product listing based on the quantity
            if (quantity > 0) {
                // Start automatic product listing
                storeDb.db.get('stores').find({ id: storeId }).assign({ autoListing: true }).write();
                return { success: true, message: 'Automatic product listing started' };
            } else {
                // Stop automatic product listing
                storeDb.db.get('stores').find({ id: storeId }).assign({ autoListing: false }).write();
                return { success: true, message: 'Automatic product listing stopped' };
            }
        } catch (error) {
            // Handle any errors that may occur during automatic product listing
            console.error('Error during automatic product listing:', error);
            return { success: false, error: 'Failed to start/stop automatic product listing' };
        }
    }

}




ProductService.toString = () => '[class ProductService]';
module.exports = ProductService;                                                                                                                                     ;
