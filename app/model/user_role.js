module.exports = app =>{
    const {INTEGER,STRING} = app.Sequelize;
    const UserRole = app.model.define("userRole",{
        id:{
            type:INTEGER(10),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            field:'id'
        },
        userId:{
            type:STRING(255),
            allowNull:false,
            refernces:{
                model:'user',
                key:'id'
            },
            field:'user_id'
        },
        roleId:{
            type:INTEGER(10),
            allowNull:false,
            refernces:{
                model:'role',
                key:'id'
            },
            field:'role_id'
        }
    },{
        tableName:'user_role'
    })
    UserRole.associate = function(){
        app.model.UserRole.belongsTo(app.model.Role,{foreignKey:'roleId',targetKey:'id',constraints: false});
        app.model.UserRole.hasOne(app.model.User,{foreignKey:'userId',targetKey:'id'})
    }
    
    return UserRole;
}