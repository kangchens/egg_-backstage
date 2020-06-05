module.exports = app =>{
    const {INTEGER,STRING} = app.Sequelize;
    const Chat = app.model.define('chat',{
        id:{
            type:STRING(225),
            allowNull:false,
            primaryKey:true,
            field:'id'
        },
        userId:{
            type:STRING(225),
            allowNull:false,
            references:{
                model:'user',
                key:'id'
            },
            field:'user_id'
        },
        chatId:{
            type:INTEGER(10),
            allowNull:false,
            autoIncrement: true,
            references:{
                model:'chat_list',
                key:'id'
            }
        }

    },{
        tableName:'chat',
        // 不要忘记启用时间戳！
        timestamps: true,
        // 不想要 createdAt
        createdAt: true,
        // 想要 updatedAt 但是希望名称叫做 updateTimestamp
        updatedAt: 'updateTimestamp'
    })
    Chat.associate = function(){
        app.model.Chat.hasMany(app.model.ChatList,{foreignKey:'id',targetKey:'chatId',constraints: false})
    }
    return Chat;
}