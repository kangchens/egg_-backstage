module.exports = app =>{
    const {BIGINT,STRING,INTEGER} = app.Sequelize;
    const Role = app.model.define("role",{
        id:{
            type:INTEGER(10),
            allowNull:true,
            primaryKey:true,
            autoIncrement:true,
            field:'id'
        },
        title:{
            type:STRING(255),
            allowNull:true,
            field:"title"
        },
        description:{
            type:STRING(255),
            allowNull:true,
            field:"description"
        },
        status:{
            type:STRING(255),
            allowNull:true,
            field:"status"
        },
        addTime:{
            type:BIGINT,
            allowNull: true,
            field: 'add_time'
        }
    },{
        tableName:'role'
    })
    Role.associate = function(){
        app.model.Role.hasOne(app.model.UserRole,{foreignKey:'id',targetKey:'roleId'})
        app.model.Role.belongsTo(app.model.RoleAccess,{foreignKey:'id',targetKey:'roleId',constraints: false})
    }
    
    return Role;
}