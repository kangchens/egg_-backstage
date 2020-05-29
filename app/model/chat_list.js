module.exports = app =>{
    const {INTEGER,STRING} = app.Sequelize
    const ChatList = app.model.define('chatList',{
        id:{
            type: INTEGER(10),
            allowNull: false,
            primaryKey: true,
            field: 'id' 
        }
    },{
        tableName:'chat_list'
    })
    return ChatList
}