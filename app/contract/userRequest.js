module.exports = {
    //注册请求 / 注销请求
    createUserRequest: {
        username: { type: 'string', required: true, description: '用户名',example:'Tom'},
        password: { type: 'string', required: true, description: '密码',example: '111111', }
    },
    //登录请求
    loginRequset:{
        username:{
            type:'string',
            required:true,
            description:'用户姓名',
            example:"陈康"
        },
        password: { 
            type: 'string', 
            required: true, 
            description: '密码',
            example: '192470'
        },
    },
    loginoutRequset:{
        userId:{type: 'string',example: '1E2FJ23JDSH3435679373' },
    }
}