'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    require('./router/api')(app);
    require('./router/admin')(app);
};