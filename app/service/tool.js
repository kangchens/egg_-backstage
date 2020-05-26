const {Service} = require('egg');
const svgCaptcha = require('svg-captcha');
const uuid = require('uuid/v1');
module.exports = class ToolService extends Service{
    async svgCaptchas(){
        let captcha = svgCaptcha.create({
            size:4,
            fontSize: 36, 
            width: 100, 
            height:32,
            background:"#cc9966" 
        })
        this.ctx.session.captcha = captcha.text;
        return captcha;
    }
    async getTime(){
        let d = new Date();
        return d.getTime()
    }
    // uuid 生成id
    async uuid(){
        return uuid()
    }
    async downloader(object){
        let {name,id,mobile,roleId,offset,limit} = object
        let conditions = {}
        name ? conditions.username = name : '';
        id ? conditions.id = id : '';
        mobile ? conditions.mobile = mobile : '';
        let childrenConditions = {}
        roleId ? childrenConditions.role_id = roleId : null;
        let result = await this.app.model.User.findAll({
            include:{
                model:this.app.model.UserRole,
                attributes:['roleId'],
                required: true,
                where:childrenConditions
            },
            where:conditions
        })
        return result
    }
}