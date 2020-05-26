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
        let headers = [[
            { t: '用户名', f: 'xj_bdrs', totalRow: true },
            { t: '密码', f: 'xj_ydrs', totalRow: true },
            { t: '手机号', f: 'xj_je', totalRow: true },
            { t: '角色信息', f: 'lsCount', totalRow: true },
            { t: '更新时间', f: 'lsJe', totalRow: true },
            { t: '创建时间', f: 'hj_bdrs', totalRow: true },
            { t: '更新时间', f: 'hj_ydrs', totalRow: true },
            { t: '角色信息', f: 'hj_je', totalRow: true }
        ]];
        
        let result = await this.ctx.service.tool.downloader(this.ctx.request.body,this);
        await this.ctx.helper.excelNew(this,result,this.ctx.request.body,headers,'角色信息表',function(res){
            for (let i = 0, len = res.length; i < len; i++) {
                let r = res[i];
                r.xj_bdrs = r.username;
                r.xj_ydrs = r.password;
                r.xj_je = r.mobile;
                r.hj_bdrs = r.createdAt;
                r.hj_ydrs = r.updatedAt;
                r.hj_je = r.createdAt;
            }
            return res;
        })
        // this.ctx.body = result
    }
}
module.exports = ToolController;