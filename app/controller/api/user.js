'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 微信授权
    async login() {
        const code = this.ctx.params.code;
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.app.config.appId}&secret=${this.app.config.appSecret}&js_code=${code}&grant_type=authorization_code`;
        const result = await this.ctx.curl(url, {dataType: 'json'});
        const openId = result.data.openid;
        if (openId) {
            const hasRegister = await this.ctx.service.user.hasRegister(openId);//判断是否新用户
            //新用户需要先注册
            if (!hasRegister) {
                await this.ctx.service.user.register({open_id: openId});
            }
            // 生成token
            const token = jwt.sign({open_id: openId}, this.app.config.jwtSecret, {expiresIn: '7d'});
            this.ctx.body = {token: `Bearer ${token}`, open_id: openId};
            this.ctx.set('authorization', 'Bearer ' + token);
        } else {
            this.ctx.body = '获取openId失败';
        }
        this.ctx.status = result.status;
    }

    // 用户列表
    async users() {
        this.ctx.body = await this.ctx.service.user.list(this.ctx.query);
    }

    // 用户信息
    async user() {
        this.ctx.body = await this.ctx.service.user.find(this.ctx.params.id);
    }
}

module.exports = UserController;