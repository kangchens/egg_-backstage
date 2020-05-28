'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  swaggerdoc:{
    enable: true,
    package: 'egg-swagger-doc-feat',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  sequelize:{
    enable:true,
    package:'egg-sequelize'
  },
  io:{
    enable: true,
    package: 'egg-socket.io',
  }
};
