'use strict';

/**
 * templating service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::templating.templating');
