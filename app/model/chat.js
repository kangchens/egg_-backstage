module.exports = app =>{
    const {INTEGER,STRING} = app.Sequelize;
    const Chat = app.model.define('chat',{
        id:{
            type:INTEGER(10),
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

    },{
        tableName:'chat'
    })
    Chat.associate = function(){

    }
    return Chat;
}