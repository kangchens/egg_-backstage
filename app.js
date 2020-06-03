// app.js
class AppBootHook {
    constructor(app) {
      this.app = app;
    }
    
    configWillLoad() {
      
    }
  
    async didLoad() {
        await this.app.model.sync({force: false,alter:true});
    }
  
    async willReady() {
    }
  
    async didReady() {
      // 应用已经启动完毕
  
    //   await this.app.model.sync({force: false,alter:true});
      const ctx = await this.app.createAnonymousContext();
      console.log('ctx=============================>',ctx)
      await ctx.service.Biz.request();
    }
    async serverDidReady() {
      // http / https server 已启动，开始接受外部请求
      // 此时可以从 app.server 拿到 server 的实例
  
      this.app.server.on('timeout', socket => {
        // handle socket timeout
      });
    }
  }
  
  module.exports = AppBootHook;