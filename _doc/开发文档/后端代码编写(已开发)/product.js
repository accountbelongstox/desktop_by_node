'use strict';

const { Service } = require('ee-core');
/*已经存在的可用函数调用清单 
const Utils = require('ee-core/utils');
Utils.getMAC(iface) - 如果提供iface [String]，则将MAC地址提取限制到此接口，用于获取一个正确的MAC地址。

const UtilsHelper = require('ee-core/utils/helper');
UtilsHelper.fnDebounce(fn, delayTime, isImediate, args) - 去除抖动器。fn [Function]为回调函数, delayTime [Time]为延迟时间(ms), isImediate [Boolean]决定是否需要立即调用, args [type]为回调函数传入参数。
UtilsHelper.getRandomString() - 生成随机10位字符串。
UtilsHelper.mkdir(filepath) - filepath [String]为文件路径，用于创建文件夹。
UtilsHelper.chmodPath(path, mode) - path [String]为文件路径, mode [String]为权限如755、777，用于修改文件权限。
UtilsHelper.compareVersion(v1, v2) - v1 [String]和v2 [String]为版本号，用于版本号比较。
UtilsHelper.stringify(obj, ignore) - obj [String]为对象, ignore [Array]决定忽略对象中的属性，用于序列化对象为JSON字符串。
UtilsHelper.validValue(value) - value [String]，判断给定的参数是否为有效值，即非 undefined / null / ''。

const UtilsJson = require('ee-core/utils/json');
UtilsJson.strictParse(str) - 字符串转对象。
UtilsJson.readSync(filepath) - 同步读取一个json文件。
UtilsJson.writeSync(filepath, str, options) - 同步写入一个对象或对象字符串到文件。
UtilsJson.read(filepath) - 异步读取一个json文件。返还promise。
UtilsJson.write(filepath, str, options) - 异步写入一个对象或对象字符串到文件。

const UtilsTime = require('ee-core/utils/time');
UtilsTime.humanizeToMs(value) - 将各种时间格式转换为毫秒。如果参数为number类型，直接返回；如果为undefined，将抛出一个错误。
UtilsTime.ms(value) - 将各种时间格式转换为毫秒。
UtilsTime.ms(value, { long: true }) - 将毫秒转换为完整的时间格式字符串。

const shortid = require('shortid')
shortid.generate() 生成一个唯一ID值

const Storage = require('ee-core/storage');
Storage.connection(database, options = {}) - 连接数据库，如果没有则创建。
jdb.setItem(key, value) - 创建一个存储的 key/value 对。
jdb.getItem(key) - 获取存储的key值。
jdb.db - 实例化后的jsondb对象。
jdb.db.defaults(data).write() - 设置默认对象和数据。
jdb.db.get(key).push(data).write() - 添加对象和数据。
jdb.db.set(key, value).write() - 设置指定key的值。
jdb.db.update(key, function).write() - 更新指定key的值。
jdb.db.has(key).value() - 检查指定的key是否存在。
jdb.db.set(key, []).write() - 设置指定key的数组值。
jdb.db.get(key).filter(criteria).sortBy(key).take(number).value() - 排序、选择特定条件的数据。
jdb.db.get(key).map(key).value() - 获取特定字段。
jdb.db.get(key).size().value() - 获取指定key的数据数量。
jdb.db.get(key).value() - 获取指定key的值。
jdb.db.get(key).find(criteria).assign(data).write() - 更新指定条件的数据。
jdb.db.unset(key).write() - 移除指定key的属性。
jdb.db.get(key).cloneDeep().value() - 深拷贝指定key的数据。
*/

class ProductService extends Service {

  constructor(ctx) {
    super(ctx);
  }

  方法（1）：创建一个数据库（1），并传递给this，以使其他类可以使用
  方法（2）：校验商铺入库参数，校验一个参数，要求是一个对象，并含有，商铺名、账号、密码、已上货商品【默认空数组】、已上货数量【默认0】，待上货数量、上货分类[数组]、创建人
  方法（3）：商铺入库，将参数作为值（并生成一个唯一ID值），存入一个方法（1）所建立的表中，并对应的建立一个数据表，以更新的方法插入，插入前调用方法（2）进行校验，如果不通过则返回错误内容
  方法（4）：添加商品类别（商品类别名）
  方法（5）：删除商品类别（ID）
  方法（6）：添加商品列表（参数要求，有商品类名，列表字符串数组）
  方法（7）：删除商铺（根据ID值删除）
  方法（8）：更新商铺的商品上架（商品列表的ID数组，商铺ID），将方法（3）所创建的商铺中的 已上货数量 进行更新++为商品列表的ID数组，并将 已上货商品 追加为参数所传的 商品列表的ID数组
  方法（9）：更新商铺意属性（更新对象，ID）
  方法（10）：权限认证（根据账号ID）判断是否是管理员、操作员、观察者
  方法（11）：管理员添加（账号，密码，权限），使用方法（）进行当前用户验证，只有管理员才允许添加账号
  方法（12）：登陆认证（账号，密码），从用户表中查询昵称、权限，并返回包含登陆日期、上次登陆时间、头像的对象
  方法（13）：账号更新密码（账号，旧密码，新密码），如果旧密码相同，则更新新密码，并返回是否成功
  方法（14）：设置更新（参数对象包含：最大线程数、抓取模式、）
  方法（15）：获取商品类别，获取所有
  方法（16）：根据商品类别查找对应的所有商品列表（参数：商品类别ID或名字）
  方法（17）：获取可上架商品列表ID数组，根据传入的商铺ID、上货类型【数组ID】，先查询自身的 已上货商品，根据 已上货商品 作为排除条件， 向 商品列表 数组库中同时以 上货类型 作为追加条件查询可供上货的商品ID数组，并返回
  方法：启动数据抓取（启动/停止）
  方法：启动全部用户自动上货（启动/停止）
  方法：启动单个商铺自动上货（商铺ID，商品分类，上货数量）商品分类，上货数量如不指定，则根据数据库查找自身的对应属性
}

ProductService.toString = () => '[class ProductService]';
module.exports = ProductService;  

根据 已经存在的可用函数调用清单 完成类里的函数，如果有已存在可调用的函数则调用，不存在的则创建，所有方法均需要返回值（如无指定，则返回是否成功等），并给每个方法把注释写上

//注意，让ChatGPT生成代码的时候，如果一次不能生成完，可以先生成一部份，再继续生成下一部份