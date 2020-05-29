const room = "default_room";

module.exports = () => {
    return async(ctx, next) => {
        // 权限校验通过
        ctx.socket.emit('res', 'auth success');
        // 加入房间
        ctx.socket.join(room);
        // 放行
        await next();
   }
};