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
}