/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586345121630_9638';
  config.session = {
    key: 'neeplus',
    maxAge: 1800 * 1000,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  // add your middleware config here
  config.middleware = ['jwts'];
  config.jwts = {
    ignore:['/base','/user/login']
  }
  //swaggerdoc配置
  config.swaggerdoc = {
      dirScanner: './app/controller',
      apiInfo: {
      title: 'project api',
      description: '开课吧接⼝ swagger-ui for egg',
      version: '1.0.0',
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      enableSecurity: false,
      // enableValidate: true,
      routerMap: true,
      enable: true,
    }
    //token生成
    config.jwt = {
      secret: '123456',
    }
    //关闭csrf验证功能
    config.security={
      csrf: {
        enable:false,
        queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
        bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      },
    }
    //数据库配置链接
    config.sequelize = {
      dialect:'mysql',
      host: "localhost",
      username: "root",
      password: "SIGmh6lDRL_Q",
      database: "console"
    }
    
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
