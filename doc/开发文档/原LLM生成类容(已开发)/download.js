'use strict';
const { Service } = require('ee-core');
/*已经存在的可用函数调用清单 
const UtilsHelper = require('ee-core/utils/helper');
UtilsHelper.getRandomString() - 生成随机10位字符串。
UtilsHelper.mkdir(filepath) - filepath [String]为文件路径，用于创建文件夹。
UtilsHelper.chmodPath(path, mode) - path [String]为文件路径, mode [String]为权限如755、777，用于修改文件权限。

const UtilsTime = require('ee-core/utils/time');
UtilsTime.humanizeToMs(value) - 将各种时间格式转换为毫秒。如果参数为number类型，直接返回；如果为undefined，将抛出一个错误。
UtilsTime.ms(value) - 将各种时间格式转换为毫秒。
UtilsTime.ms(value, { long: true }) - 将毫秒转换为完整的时间格式字符串。

const HttpClient = require('ee-core/httpclient');
const hc = new HttpClient();
hc.curl(url, args, callback)                       // 发送http请求
hc.request(url, args, callback)                    // 发送http请求
hc.curl(url, { method: String })                   // 设置请求方法
hc.curl(url, { data: Object })                     // 发送请求数据
hc.curl(url, { content: String|Buffer })           // 发送请求正文
hc.curl(url, { stream: ReadStream })               // 发送请求正文的可读数据流
hc.curl(url, { writeStream: WriteStream })         // 设置接受响应数据的可写数据流
hc.curl(url, { consumeWriteStream: Boolean })      // 是否等待 writeStream 完全写完
hc.curl(url, { method: String })                   // 设置请求方法
hc.curl(url, { contentType: String })              // 设置请求数据格式
hc.curl(url, { dataType: String })                 // 设置响应数据格式
hc.curl(url, { fixJSONCtlChars: Boolean })         // 是否自动过滤响应数据中的特殊控制字符
hc.curl(url, { auth: String })                     // 简单登录授权（Basic Authentication）
hc.curl(url, { gzip: Boolean })                    // 是否支持 gzip 响应格式
hc.curl(url, { timing: Boolean })                  // 是否开启请求各阶段的时间测量

const shortid = require('shortid')
shortid.generate() 生成一个唯一ID值

this.app.config.HOME? - APP根目录路径
this.app.config.homeDir? - APP根目录路径
this.app.config.appUserDataDir? - APP在操作系统中的数据目录
this.app.config.userHome? - 操作系统用户的home目录

引入：const Socket = require('ee-core/socket');
Socket.getSocketServer() - 获取socketServer实例对象。
SocketServer.io.emit("event name", "data"); - 发送消息到客户端或其他语言的socket监听的事件。

引入：const Socket = require('ee-core/socket');
SocketServer.io - 实例化后的server对象。
SocketServer.io.engine
SocketServer.io.sockets
引入：const Socket = require('ee-core/socket');
Socket.getHttpServer() - 获取httpServer实例对象。
引入：const Socket = require('ee-core/socket');
Socket.getIpcServer() - 获取ipcServer实例对象。
引入：const { IoServer } = Socket;
IoServer - 原始socket.io对象，等同于require('socket.io')。
引入：const { IoClient } = Socket;
IoClient - 原始socket.io-client对象，等同于require('socket.io-client')。

const Jobs = require('ee-core/jobs');
Jobs.ChildJob()                     // 获取一个子进程任务类，基于node.js的child_process模块实现
Jobs.ChildPoolJob()                 // 创建一批进程常驻内存并直接执行任务，基于node.js的child_process模块实现
Jobs.RendererJob()                  // 获取一个任务类，基于electron的渲染进程实现（开发中，待验证）

// 引入包
const { ChildJob } = require('ee-core/jobs');
ChildJob()                                // 实例化ChildJob对象
ChildJob.job.jobs                         // 获取通过exec创建的实例对象集合
ChildJob.job.exec(filepath, params, opt)  // 启动一个新进程，执行一个job文件
ChildJob.job.execPromise(filepath, params, opt)  // exec()的异步语法，启动一个新进程，异步执行一个job文件
ChildJob.job.getPids()                    // 获取当前pids数组
ChildJob.job.on(eventName, callback)      // 监听一个事件对象，执行回调

// ForkProcess 对象
ForkProcess.emitter                       // 实例化后的EventEmitter对象
ForkProcess.child                         // 通过child_process模块的fork方法出来的进程对象
ForkProcess.pid                           // 子进程pid
ForkProcess.dispatch(cmd, jobPath, params) // 分发任务
ForkProcess.kill()                        // kill子进程
ForkProcess.sleep()                       // sleep (仅Unix平台)
ForkProcess.wakeup()                      // wakeup (仅Unix平台)

// EventEmitter 方法列表
EventEmitter.addListener(eventName, listener)
EventEmitter.emit(eventName, ...args)
EventEmitter.eventNames()
EventEmitter.getMaxListeners()
EventEmitter.listenerCount(eventName)
EventEmitter.listeners(eventName)
EventEmitter.off(eventName, listener)
EventEmitter.on(eventName, listener)
EventEmitter.once(eventName, listener)
EventEmitter.prependListener(eventName, listener)
EventEmitter.prependOnceListener(eventName, listener)
EventEmitter.removeAllListeners(eventName)
EventEmitter.removeListener(eventName, listener)
EventEmitter.setMaxListeners(n)
EventEmitter.rawListeners(eventName)
EventEmitter[Symbol.for('nodejs.rejection')](err, eventName, ...args)

// 引入包
const { ChildPoolJob } = require('ee-core/jobs');
// API调用清单
ChildPoolJob()                                     // 实例化ChildPoolJob对象
ChildPoolJob.pool.children                         // 返回通过run() / runPromise() 创建的实例对象集合
ChildPoolJob.pool.max                              // 最大进程数
ChildPoolJob.pool.strategy                         // 进程选举算法，默认为'polling'轮询
ChildPoolJob.pool.weights                          // 权重
ChildPoolJob.pool.LB                               // 负载均衡器
ChildPoolJob.pool.create(number)                   // 创建一个池子，返回 pids
ChildPoolJob.pool.run(filepath, params)            // 从进程池中选举一个进程，然后执行一个job文件
ChildPoolJob.pool.runPromise(filepath, params)     // run()的异步语法
ChildPoolJob.pool.getPids()                        // 获取当前pids数组
ChildPoolJob.pool.getChildByPid(pid)               // 通过pid获取一个子进程对象
ChildPoolJob.pool.killAll()                        // 关闭所有进程

// EventEmitter 方法列表
EventEmitter.addListener(eventName, listener)
EventEmitter.emit(eventName, ...args)
EventEmitter.eventNames()
EventEmitter.getMaxListeners()
EventEmitter.listenerCount(eventName)
EventEmitter.listeners(eventName)
EventEmitter.off(eventName, listener)
EventEmitter.on(eventName, listener)
EventEmitter.once(eventName, listener)
EventEmitter.prependListener(eventName, listener)
EventEmitter.prependOnceListener(eventName, listener)
EventEmitter.removeAllListeners(eventName)
EventEmitter.removeListener(eventName, listener)
EventEmitter.setMaxListeners(n)
EventEmitter.rawListeners(eventName)
EventEmitter[Symbol.for('nodejs.rejection')](err, eventName, ...args)

// ForkProcess 对象
ForkProcess.emitter                                 // 实例化后的EventEmitter对象
ForkProcess.child                                  // 通过child_process模块的fork方法出来的进程对象
ForkProcess.pid                                    // 子进程pid
ForkProcess.dispatch(cmd, jobPath, params)          // 分发任务
ForkProcess.kill()                                 // kill子进程
ForkProcess.sleep()                                // sleep (仅Unix平台)
ForkProcess.wakeup()                               // wakeup (仅Unix平台)
*/

class SoftlistService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  
  初始化一个配置对象config，包含：最大下载线程、下载对列
  初始化一个任务更新进度二维数组，标记a，包含[{任务ID,下载速率，总长度，当前长度，百分比，预计时长，已用时}]
  将一个URL的/xxx.文件名 转换为一个文件名，如果URL是 /xxx/xxx/的形式，则将整个URL转换一个合法的文件名，如果URL为 /xxx?xxx带有?号，则将?号后面的内容（有才转）query转为一个合法的文件名
  将一个URL的/xxx.文件名 转换为一个路径+文件名（www.xxx.com/后面的是路径），如果URL是 /xxx/xxx/的形式，则将整个URL转换一个合法的路径+文件名（包含主域名），如果URL为 /xxx?xxx带有?号，则将?号后面的内容（有才转）query转为一个合法的路径+文件名
  添加一个URL到下载队列（可指定文件名，如果是相对路径则与临时目录拼接），如无文件根据URL转为合法的文件名，并保存到userHome的临时下载目录（没有则创建）并根据URL生成唯一的ID值,回调（回调是一个队列）根据ID值保存，同时可设置任务组并根据组名生成组ID（不设置添加到默认组），组回调与组ID绑定，进度更新函数与组ID绑定（默认设置一个更新回调），并启动下载队列执行（如果已经启动则不启动）
  添加一个URL到下载队列（可指定路径+文件名，如果是相对路径则与临时目录拼接），如无文件根据URL转为合法的路径+文件名，并保存到userHome的临时下载目录（没有则创建）并根据URL生成唯一的ID值,回调根据ID值保存，同时可设置任务组并根据组名生成组ID（不设置添加到默认组），进度更新函数与组ID绑定（默认设置一个更新回调），组回调与组ID绑定并启动下载队列执行（如果已经启动则不启动）
  添加组回调（根据组名添加回调函数到组回调队列），默认添加到默认回调
  更新进度，根据任务ID，将下载进度更新，并触发更新回调函数组（默认更新到 进度二维数组中），当进度二维数组有更新时，触发Socket向所有连接的客户端发送进度信息
  下载队列执行：如果下载队列有内容，则根据最大线程并行下载（并设置启动标志），每下载完成一个根据任务ID值执行回调（一般只有一个根据队列依次执行并清空），直到全部下载完毕，完成监听（并设置停止标志）同时执行全部完成的 组回调函数（根据队列依次执行并清空），下载进度每秒更新到 更新进度


}

SoftlistService.toString = () => '[class SoftlistService]';
module.exports = SoftlistService;  

根据 已经存在的可用函数调用清单 完成类里的函数，如果有已存在可调用的函数则调用，不存在的则创建，所有方法均需要返回值（如无指定，则返回是否成功等），并给每个方法把注释写上

//注意，让ChatGPT生成代码的时候，如果一次不能生成完，可以先生成一部份，再继续生成下一部份