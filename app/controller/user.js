const {Controller} = require('egg');
const md5 = require('md5')
/**
 * @Controller ⽤户管理
 */
class UserController extends Controller{
    /**
     * @summary 查询所有用户
     * @description 查询，记录⽤户账户/密码/类型
     * @router post /api/user
     * @request body loginRequset *body
     * @response 200 loginResponse 创建成功
     */
    index(){

    }
     /**
     * @summary 用户登录
     * @description 用户登录 用户名 / 用户密码
     * @router post /user/login
     * @request body loginRequset *body
     * @response 200 loginResponse 登录成功
     */
    async loginUser(){
        let {username,password,captcha} = this.ctx.request.body;
        password = md5(password);
        console.log("password==>",password)
        let result = await this.ctx.service.user.login(username,password);
        console.log("captcha==>",captcha,this.ctx.session.captcha)
        if(captcha.toLocaleLowerCase() === this.ctx.session.captcha.toLocaleLowerCase()){
            this.ctx.body = {
                code:1,
                data:result,
                message:true
            }
        }else{
            this.ctx.body={
                code:0,
                message:'用户名或密码错误',
                data:null
     
            }
        }
    }
    /**
     * @summary 用户注册
     * @description 用户注册 用户名 / 用户密码
     * @router post /user/register
     * @request body createUserRequest *body
     * @response 200 registerResponse 注册成功
     */
    async addUser(){
        let {username,password,mobile,email,roleId} = this.ctx.request.body;
        
        console.log("=================>",username,password,mobile,email,roleId)
        password = md5(password);
        email = decodeURIComponent(email);
        let result = await this.ctx.service.user.addOneUser(username,password,mobile,email,roleId);
        console.log("result==>",result)
        if(result){
            this.ctx.body = {
              code:1,
              message:'添加用户成功',
              data:null
            }
          }else{
            this.ctx.body = {
              code:0,
              message:'添加用户失败',
              data:null
            }
          }
    }
    /**
     * @summary 用户注销
     * @description 注销用户 用户名 / 用户密码
     * @router post /user/delete
     * @request body createUserRequest *body
     * @response 200 registerResponse 注销成功
     */
    deleteUser(){
        this.ctx.body={
            code:0,
            message:'用户名或密码错误',
            data:null
    
        }
    }
    /**
     * @summary 用户登出
     * @description 用户登出 用户id
     * @router get /user/loginout
     * @response 200 loginoutResponse 登出成功
     */
    loginoutUser(){

    }
}
module.exports = UserController;