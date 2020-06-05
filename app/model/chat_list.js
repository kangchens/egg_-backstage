module.exports = app =>{
    const {INTEGER,STRING} = app.Sequelize
    const ChatList = app.model.define('chatList',{
        id:{
            type:INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id' 
        },
        message:{
            type:STRING(1000),
            allowNull:false,
            field:'message'
        }
    },{
        tableName:'chat_list',
        // 不要忘记启用时间戳！
        timestamps: true,
        // 不想要 createdAt
        createdAt: true,
        // 想要 updatedAt 但是希望名称叫做 updateTimestamp
        updatedAt: 'updateTimestamp'
    })
    ChatList.associate = function(){
        app.model.ChatList.belongsTo
    }
    return ChatList
}