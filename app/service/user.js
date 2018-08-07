'use strict';

const jwt = require('jsonwebtoken');

module.exports = app => {
    class User extends app.Service {
        /**
         * 该账号是否已经注册
         *
         * @param open_id  用户openid
         *
         * @return {Promise<*>}
         */
        async wxHasRegister(open_id) {
            const user = await this.ctx.model.User.findOne(
                {
                    where: {open_id: open_id}
                }
            );
            if (user && user.dataValues.open_id) {
                return user;
            }
            return false;
        }

        /**
         * 新用户注册
         *
         * @param user  用户信息对象
         *
         * @return {Promise<*>}
         */
        async wxRegister(user) {
            const userInfo = await this.ctx.model.User.create(user);
            return userInfo.dataValues;
        }

        /**
         * 用户信息
         *
         * @param user_id
         *
         * @return {Promise<*>}
         */
        async userInfo(user_id) {
            const user = await this.ctx.model.User.findOne(
                {
                    where: {user_id: user_id}
                }
            );
            if (!user) {
                this.ctx.throw(404, '用户不存在')
            }
            return user;
        }

        /**
         * 设置用户信息
         */
        async setUserInfo(user_id, user) {
            await this.ctx.model.User.update(user, {where: {user_id: user_id}});
        }
    }


    return User;
};