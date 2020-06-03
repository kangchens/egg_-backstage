const {Controller} = require('egg');
/**
 * @Controller 聊天管理
 */
class ChatController extends Controller{
    /**
     * @summary 聊天选择
     * @description 有该聊天就用改聊天，没有就创建
     * @router post /chat/chatList
     * @request body loginRequset *body
     * @response 200 loginResponse 创建成功
     */
    async selectChat(){
        console.log('this.ctx.request.body============>')
        let {id} = this.ctx.request.body;
        console.log('this.ctx.request.body============>',this.ctx.request.body)
        let result = await this.ctx.service.chat.selectChat(this.ctx.request.body);
    }
}
module.exports = ChatController