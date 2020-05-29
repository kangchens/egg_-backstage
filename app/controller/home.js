'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx ,query } = this;
    // 给谁发, socket连接的id
    const id = query.id;
    const nsp = app.io.of('/');
    if(nsp.sockets[id]){
     // 通过id给指定socket连接发送消息
      nsp.sockets[id].emit('res', "what's happend");
    }
    this.ctx.body = "发送成功";
  }
}

module.exports = HomeController;
