module.exports = app =>{
    const {BIGINT,STRING,INTEGER} = app.Sequelize;
    const Access = app.model.define('access',{
        id: {
            type: STRING(255),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        moduleName: {
            type: STRING(255),
            allowNull: false,
            field: 'module_name'
        },
        actionName: {
            type: STRING(255),
            allowNull: true,
            field: 'action_name'
        },
        type: {
            type: STRING(255),
            allowNull: false,
            field: 'type'
        },
        status: {
            type: INTEGER(10),
            allowNull: true,
            field: 'status'
        },
        moduleId: {
            type: STRING(255),
            allowNull: false,
            field: 'module_id'
        },
        sort: {
            type: STRING(255),
            allowNull: true,
            field: 'sort'
        },
        description: {
            type: STRING(255),
            allowNull: false,
            field: 'description'
        },
        url: {
            type: STRING(255),
            allowNull: true,
            field: 'url'
        },
        addTime: {
            type: BIGINT,
            allowNull: false,
            field: 'add_time'
        }
    },{
        tableName:'access'
    })
    Access.associate = function(){
        //自查询关联
        app.model.Access.hasMany(app.model.Access,{foreginKey:'moduleId',targetKey:'id',through:null})
    }
    return Access
}