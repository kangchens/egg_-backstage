const {Controller} = require('egg')
/**
 * @Controller 工具方法
 */
class ToolController extends Controller{
/**
     * @summary 查询所有用户
     * @description 查询，记录⽤户账户/密码/类型
     * @router post /tool/downLoader
     * @request body loginRequset *body
     * @response 200 loginResponse 创建成功
     */
    async downLoader(){
        let {id} = this.ctx.request.body
        let result = await this.ctx.service.tool.downloader(this.ctx.request.body);
        this.ctx.body = result
    }
}
module.exports = ToolController;