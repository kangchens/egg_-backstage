module.exports = {
    // 登陆返回
    registerResponse: {
        code: { type: 'integer', required: true, example: 0 },
        data:{type: 'string',example: '登陆成功' },
        errorMessage: { type: 'string', example: '' },
    },
    //登录返回
    loginResponse:{
        code:{ type: 'integer', required: true, example: 0 },
        username:{type: 'string',example: '陈康' },
        number:{type: 'integer',example: 13023417587 },
        image:{type: 'string',example: 'http://www.img.com' },
        userId:{type: 'string',example: '1E2FJ23JDSH3435679373' },
        roleId:{type: 'integer',example: 0 },
        errorMessage: { type: 'string', example: '' },
    },
    //注销返回
    deleteResponse: {
        code: { type: 'integer', required: true, example: 0 },
        data:{type: 'string',example: '用户已注销' },
        errorMessage: { type: 'string', example: '' },
    },
    //登出返回
    loginoutResponse:{
        code: { type: 'integer', required: true, example: 0 },
        data:{type: 'string',example: '登出成功' },
        errorMessage: { type: 'string', example: '' },
    }
}