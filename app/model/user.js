module.exports = app =>{
    const {STRING,INTEGER,DATE,BIGINT} = app.Sequelize;
    const User = app.model.define('user',{
        id:{
            type:STRING(255),
            allowNull:false,
            primaryKey:true,
            field:'userid'
        },
        username:{
            type:STRING(255),
            allowNull:false,
            field:'username'
        },
        mobile:{
            type:STRING(255),
            allowNull:true,
            field:"mobile"
        },
        state:{
            type:STRING(255),
            allowNull:true,
            field:"password"
        },
        isSuper:{
            type:STRING(255),
            allowNull:true,
            field:"is_super"
        },
        addtime:{
            type:BIGINT,
            allowNull:true,
            field:"add_time"
        },
    },{
        tableName:"user"
    });
    User.associate = function(){
        app.model.User.belongsTo(app.model.UserRole,{foreignKey:'userid',targetKey:'userId'})
    }
    return User;
}