'use strict';

const Controller = require('egg').Controller;
const room = 'default_room';

class ChatController extends Controller {
    async index(){
         const {app, socket, logger, helper} = this.ctx;
         const id = socket.id;
         // 根据id给指定连接发送消息
         nsp.sockets[id].emit('res', "hello ....");
         // 指定房间连接信息列表
         nsp.adapter.clients([room], (err, clients) => {
             console.log(JSON.stringify(clients));
         });
         //  给指定房间的每个人发送消息
         this.ctx.app.io.of('/').to(room).emit('online', this.ctx.socket.id+ "上线了");
         // 断开连接
         this.ctx.socket.disconnect();
    }
}
module.exports = ChatController;