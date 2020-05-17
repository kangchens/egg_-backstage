const {Controller} = require('egg')
/**
 * @Controller 公共方法
 */
module.exports = class BaseController extends Controller{
    /**
     * @summary 获取验证信息
     * @description 公共方法 获取验证码
     * @router get /base/captcha
     * @response 200 registerResponse 获取成功
     */
    async getgetcaptcha(){
        let result = await this.ctx.service.tool.svgCaptchas();
        this.ctx.response.type='image/svg+xml';
        this.ctx.body = result.data
    }
}