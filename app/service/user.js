const {Service} = require('egg');
module.exports = class User extends Service{
    //用户登录
    async login(username,password){
        let model = this.app.model;
        let result = await model.User.findOne({
            include:[{
                model:model.UserRole,
                attributes:[],
            }],
            where:{
                username,password
            },
            attributes:{
                include:[[Sequelize.col('userRole.role_id'),'roleId']]
            }
        })
        if(result){
            return result
        }else{
            return false
        }
    }
    //用户注册
    async addOneUser(username,password,mobile,email,roleId){
        let addTime = await this.ctx.service.tool.getTime();
        let result = await this.app.model.User.findOne({
            where:{
                username
            }
        })
        const t = await this.app.model.transaction({autocommit:true});
        const uuid = await this.service.tool.uuid();
        console.log('result=================>',result)
        if(result === null ){
            try {
                await this.app.model.User.create({
                    id:uuid,username,password,mobile,email,roleId,addTime
                },{transaction:t})
                await this.app.model.UserRole.create({
                    userId:uuid,
                    roleId
                },{transaction:t})
                await t.commit();
                return true
            } catch (error) {
                console.log('errrrrr=============>',error)
                //数据回滚
                await t.rollback()
                return false
            }
        }else{
            return false
        }
    }
}