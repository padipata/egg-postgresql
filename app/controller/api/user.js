'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 微信授权
    async login() {
        const {app, ctx} = this;

        const code = ctx.params.code;
        if (!code) {
            ctx.throw(404, 'code为空');
        }

        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${app.config.xcx_appId}&secret=${app.config.xcx_appSecret}&js_code=${code}&grant_type=authorization_code`;
        const result = await ctx.curl(url, {dataType: 'json'});
        const openId = result.data.openid;

        if (openId) {
            let userInfo = await ctx.service.user.wxHasRegister(openId);//判断是否新用户
            // 新用户注册
            if (userInfo === false) {
                userInfo = await ctx.service.user.wxRegister({
                    open_id: openId,
                    nick_name: 'wechat_xcx',
                    password: crypto.createHash('md5').update('wechat').digest('hex'),
                });
            }
            // 生成token
            const token = jwt.sign({user_id: userInfo.user_id}, app.config.jwtSecret, {expiresIn: '7d'});
            ctx.body = {token: `Bearer ${token}`, open_id: openId};
            ctx.set('authorization', 'Bearer ' + token);
        } else {
            ctx.throw(500, '获取openId失败');
        }

        ctx.status = result.status;
    }

    // 用户信息
    async userInfo() {
        const token = this.ctx.header.authorization;
        const userInfo = jwt.verify(token.split('Bearer ')[1], this.app.config.jwtSecret);
        this.ctx.body = await this.ctx.service.user.userInfo(userInfo.user_id);
    }

    // 设置用户成功
    async setUserInfo() {
        const token = this.ctx.header.authorization;
        const userInfo = jwt.verify(token.split('Bearer ')[1], this.app.config.jwtSecret);
        await this.ctx.service.user.setUserInfo(userInfo.user_id, this.ctx.request.body);
        this.ctx.body = {"msg": "设置成功"}
    }

}

module.exports = UserController;