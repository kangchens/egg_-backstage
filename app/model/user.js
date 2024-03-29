module.exports = app =>{
    const {STRING,INTEGER,DATE,BIGINT} = app.Sequelize;
    const User = app.model.define('user',{
        id:{
            type:STRING(255),
            allowNull:false,
            primaryKey:true,
            field:'id'
        },
        username:{
            type:STRING(255),
            allowNull:false,
            field:'username'
        },
        password:{
            type:STRING(255),
            allowNull:true,
            field:"password"
        },
        mobile:{
            type:STRING(255),
            allowNull:true,
            field:"mobile"
        },
        email: {
            type: STRING(255),
            allowNull: false,
            field: 'email'
        },
        role:{
            type:INTEGER,
            allowNull:false,
            field:'role',
            defaultValue:0
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
        app.model.User.belongsTo(app.model.UserRole,{foreignKey:'id',targetKey:'userId',constraints: false})
    }
    return User;
}