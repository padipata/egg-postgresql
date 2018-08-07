'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = app => {
    class AdminUser extends app.Service {
        /**
         * 登录
         *
         * @param user.user_name:管理员账号
         * @param user.password:密码
         *
         *  @return {Promise<*>}
         */
        async login(user) {
            const user_name = user.user_name;
            const password = crypto.createHash('md5').update(user.password).digest('hex');
            const userInfo = await this.ctx.model.Admin.findOne(
                {
                    where: {user_name: user_name, password: password}
                }
            );
            if (userInfo && userInfo.dataValues.user_id) {
                // 生成token
                const token = jwt.sign({user_id: userInfo.user_id}, app.config.jwtSecret, {expiresIn: '7d'});
                this.ctx.set('authorization', 'Bearer ' + token);
                return {"token": `Bearer ${token}`};
            }
            return false;
        }

        /**
         * 用户列表查询
         *
         * @param user.nick_name   用户名
         *
         * @return {Promise<*>}
         */
        async adminUserList(user) {
            let offset = 0
            if (user.offset > 0) {
                offset = (user.offset - 1) * user.limit;
            }
            const limit = user.limit;

            const order_by = 'created_at';
            const order = 'DESC';

            const users = await this.ctx.model.User.findAndCountAll({
                where: {
                    nick_name: {'$like': `%${user.nick_name ? user.nick_name : ''}%`},
                },
                offset,
                limit,
                order: [[order_by, order.toUpperCase()]],
            });

            if (!users || users.length === 0) {
                this.ctx.throw(404, '暂无用户信息');
            }

            return users;
        }
    }

    return AdminUser;
};