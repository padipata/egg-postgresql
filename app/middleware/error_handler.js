'use strict';

module.exports = (option, app) => {

    /**
     * 异常处理中间件
     * @author padipata
     *
     * @param cxt
     * @param next
     *
     * @modified by padipata on 15:01 2018/7/19
     * @return {Promise<void>}
     */

    return async function (ctx, next) {
        try {
            await
                next();
            if (ctx.status !== 200) {
                ctx.body = {error: ctx.body};
            }
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，会自动记录一条错误日志
            app.emit('error', err, this);
            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'prod' ? '内容太火爆，请稍后重试' : err.message;
            // 从 error 对象上读出各个属性，设置到响应中
            ctx.body = {error: error};
            ctx.status = status;
        }
    };
};
