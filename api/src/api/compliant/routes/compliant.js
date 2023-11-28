'use strict';

/**
 * compliant router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::compliant.compliant');
