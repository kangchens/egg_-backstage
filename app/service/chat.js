const {Service} = require('egg');
class ChatService extends Service{
    async selectChat(obj){
        let {id,userId,chatId} = obj;
        // const uuid = await this.service.tool.uuid();
        const [user, created] = await this.app.model.Chat.findOrCreate({
            where:{
                id
            },
            defaults:{
                id,
                userId,
            }
        })
        if(user){
            return user
        }else if(created){
            return created
        }
    }
}
module.exports = ChatService