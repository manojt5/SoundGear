'use strict';

/**
 * compliant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::compliant.compliant');
