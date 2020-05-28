'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,io} = app;
  console.log('app===============================================>',app.io)
  router.get('/', controller.home.index);
  io.route('chat',app.io.controller.chat.index)
};
