'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const Article = app.model.define('yp_articles', {
        article_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//文章id
        shop_id: INTEGER,//店铺id
        article_img: STRING(255),//文章封面
        article_title: STRING(255),//文章标题
        article_url: STRING(255),//跳转链接
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return Article;
};