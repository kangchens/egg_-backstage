const {Service} = require('egg');
const Sequelize = require('sequelize');
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
                //数据回滚
                await t.rollback()
                return false
            }
        }else{
            return false
        }
    }
    //获取用户列表
    async userList(obj){
        let {name,id,mobile,roleId,offset,limit} = obj
        let conditions = {}
        name ? conditions.username = name : '';
        id ? conditions.id = id : '';
        mobile ? conditions.mobile = mobile : '';
        let childrenConditions = {}
        roleId ? childrenConditions.role_id = roleId : null;
        let result = await this.app.model.User.findAndCountAll({
            include:{
                model:this.app.model.UserRole,
                attributes:['roleId'],
                required: true,
                where:childrenConditions
            },
            where:conditions,
            offset:parseInt(offset),
            limit:parseInt(limit)
        })
        if(result){
            return result
        }else{
            return false
        }
    }
    //修改用户信息
    async changeDetail(object){
        let {id,username,mobile,email,userRole} = object
        console.log('userRole===========>',userRole)
        let result = await this.app.model.User.update({
            id,
            username,
            mobile,
            email
        },{
            where:{
                id
            }
        })
        let results = await this.app.model.UserRole.update({
            roleId:parseInt(userRole.roleId)
        },{
            where:{
                userId:id
            }
        })
        
        console.log('results=============>',results)
        if(result && results){
            return result
        }else{
            return false
        }
        // console.log('object========>',object)
    }
    /**查看详情 */
    async getDetail(object){
        let {id} = object
        let result = await this.app.model.User.findOne({
            where: { id: id },
            include:{
                model: this.app.model.UserRole,
                where:{
                    userId:id
                }
              }
        })
        if(result){
            return result
        }else{
            return false
        }
    }
}