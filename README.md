# node.js + postgresql 开发模板

## 更新信息

更新时间| 更新内容|更新说明
---|---|---
2018-07-13 | 初始化项目 |
2018-07-13 | 添加egg-validate| 参数校验
2018-07-13 | 添加egg-sequelize| 数据库
2018-07-13 | 配置csrf安全|
2018-07-13 | 添加egg-cors| 解决浏览器跨域
2018-07-13 | 添加jsonwebtoken | 生成 token
2018-07-13 | 添加中间件 auth.js | 校验用户 token 信息
2018-07-13 | 添加crypto加密 | crypto.createHash('md5').update(user.user_name).digest('hex');
2018-07-13 | 添加中间件 wechat.js | 封装微信授权校验

### 本地开发

```bash
$ npm install
$ createdb example-dev --owner root //使用 root 用户创建一个 example-dev 数据库
$ npm run migrate:up
$ npm run dev
$ open http://localhost:7001/users
```

### 生产部署

Use `EGG_SERVER_ENV=prod` to enable prod mode

```bash
$ createdb example-prod --owner postgres
$ NODE_ENV=production npm run migrate:up
$ EGG_SERVER_ENV=prod npm start
```

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新。

