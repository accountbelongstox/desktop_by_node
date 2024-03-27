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

this.app.config.env? - 环境变量，local-本地，prod-生产环境
this.app.config.name? - 应用名称
this.app.config.baseDir? - 框架中electron目录路径
this.app.config.HOME? - APP根目录路径
this.app.config.homeDir? - APP根目录路径
this.app.config.root? - 获取root目录
this.app.config.appUserDataDir? - APP在操作系统中的数据目录
this.app.config.userHome? - 操作系统用户的home目录
this.app.config.execDir? - APP的可执行程序根目录

*/

class SoftlistService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  初始化一个配置对象config，包含：default_install_dir、API地址、软件备份路径、用户登陆地址，并返回给this属性
  根据API拼接一个后缀地址“config/soft_group.json”，获取 软件分组URL（返回一个JSON|请进行转换）
  根据API拼接一个后缀地址“config / soft_icons.json”，获取 软件图标URL（返回一个JSON | 请进行转换）
  根据API拼接一个后缀地址“config / soft_all.json”，获取 软件大全URL（返回一个JSON | 请进行转换）
  对两个JSON进行递归对比，如果完全相同则返回TRUE
  合并两个JSON，如果完全相同则不用合并，并返回合并后的JSON
  从本地数据目录中读取本地的软件分组JSON，如果没有则返回空
  从本地数据目录中读取本地的软件图标JSON，如果没有则向远程请求，并更新到本地，同时返回该JSON，如果有，则异步读取远程合并更新（返回前不等待）
    将 远程 软件分组URL 读取，并与本地 软件分组JSON进行对比合并，并更新为本地软件分组（不存在则创建）
  根据远程和本地合并后的软件分组进行解析，格式为{ 分组名: { 软件对象名称: { basename, target } } }，递归迭代后将basename向 软件图标JSON中查询对应的iconBase64并添加到软件对象上，同时判断target（是一个绝对路径的文件）在本地是否存在并给软件对象添加对应标志，然后将这个添加了iconBase64的对象返回了，（软件图标JSON格式为: { 软件对象名称: { iconBase64 } }）
  下载一个文件方法（URL），根据URL获取 / xxx.xxx的文件名，下载到本地userHome目录的临时路径，如果已经存在该文件，则读取远程URL的大小对比，大小不符则下载
  执行一个软件（软件对象参数：包含path, target, iconPath, id, basename, winget_id, source_internet, source_local, source_winget, installation_method, default_icon, default_install_dir, install_type  ）如以上参数不全，则报错，判断target在本地是否存在，如果存在则调用explorer在线程中执行，如果不存在则调用安装方法
  安装一个软件（软件对象参数：包含path, target, iconPath, id, basename, winget_id, source_internet, source_local, source_winget, installation_method, default_icon, default_install_dir, install_type  ）如以上参数不全，添加到队列依次安装，则报错，如果有winget_id，则调用winget安装方法，否则，调用解压安装方法
  winget安装方法（软件对象参数：包含path, target, iconPath, id, basename, winget_id, source_internet, source_local, source_winget, installation_method, default_icon, default_install_dir, install_type ）如以上参数不全，添加到队列依次安装，则报错，根据winget_id，使用SHELL调用winget_id安装该软件，并根据default_install_dir（不存在则从config中取）指定安装路径
  解压安装方法（软件对象参数：包含path, target, iconPath, id, basename, winget_id, source_internet, source_local, source_winget, installation_method, default_icon, default_install_dir, install_type ）如以上参数不全，添加到队列依次安装，根据basename拼接出一个 “API地址 / applications / basename.zip”的地址，并调用下载文件方法进行下载，并解压到default_install_dir（不存在则从config中取）目录以完成安装
  备份软件方法（软件对象参数：包含path, target, iconPath, id, basename, winget_id, source_internet, source_local, source_winget, installation_method, default_icon, default_install_dir, install_type）获取target的上一级路径，并压缩指定文件夹
}

SoftlistService.toString = () => '[class SoftlistService]';
module.exports = SoftlistService;  

根据 已经存在的可用函数调用清单 完成类里的函数，如果有已存在可调用的函数则调用，不存在的则创建，所有方法均需要返回值（如无指定，则返回是否成功等），并给每个方法把注释写上

//注意，让ChatGPT生成代码的时候，如果一次不能生成完，可以先生成一部份，再继续生成下一部份