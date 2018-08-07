'use strict';

const jwt = require('jsonwebtoken');

const Controller = require('egg').Controller;

class ClockController extends Controller {
    // 打卡
    async clockUp() {
        const shop_id = this.ctx.request.body.shop_id;
        const shop_name = this.ctx.request.body.shop_name;
        if (!shop_id || !shop_name) {
            this.ctx.throw(404, '店铺id和店铺名不能为空');
        }
        const token = this.ctx.header.authorization;
        const userInfo = jwt.verify(token.split('Bearer ')[1], this.app.config.jwtSecret);
        await this.ctx.service.clock.clockUp(shop_id, userInfo.user_id, shop_name);
        this.ctx.status = 200;
        this.ctx.body = {"msg": "打卡成功"}
    }

    // 获取用户打卡记录
    async clockList() {
        const token = this.ctx.header.authorization;
        const userInfo = jwt.verify(token.split('Bearer ')[1], this.app.config.jwtSecret);
        this.ctx.body = await this.ctx.service.clock.clockList(userInfo.user_id);
    }
}

module.exports = ClockController;