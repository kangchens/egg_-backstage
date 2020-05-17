module.exports = app =>{
    const {INTEGER,STRING} = app.Sequelize;
    const RoleAccess = app.model.define('roleAccess',{
        id:{
            type: INTEGER(10),
            allowNull: true,
            primaryKey: true,
            field: 'id' 
        },
        accessId: {
            type: STRING(255),
            allowNull: false,
            references: {
                model: 'access',
                key: 'id'
            },
            field: 'access_id'
        },
        roleId: {
            type: INTEGER(10),
            allowNull: false,
            references: {
              model: 'role',
              key: 'id'
            },
            field: 'role_id'
        }
    },{
        tableName:'role_access'
    })
    RoleAccess.associate = function(){
        app.model.RoleAccess.hasOne(app.model.Role,{foreignKey:'id',targetKey:'roleId',constraints: false})
    }
    return RoleAccess;
}