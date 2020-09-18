"use strict";
exports.__esModule = true;
// Services
var customers_service_fake_1 = require("./customers.service.fake"); // You have to comment this, when your real back-end is done
exports.CustomersService = customers_service_fake_1.CustomersService;
// export { CustomersService } from './customers.service'; // You have to uncomment this, when your real back-end is done
var products_service_fake_1 = require("./products.service.fake"); // You have to comment this, when your real back-end is done
exports.ProductsService = products_service_fake_1.ProductsService;
// export { ProductsService } from './products.service'; // You have to uncomment this, when your real back-end is done
var product_remarks_service_fake_1 = require("./product-remarks.service.fake"); // You have to comment this, when your real back-end is done
exports.ProductRemarksService = product_remarks_service_fake_1.ProductRemarksService;
// export { ProductRemarksService }
// from './product-remarks.service'; // You have to uncomment this, when your real back-end is done
var product_specifications_service_fake_1 = require("./product-specifications.service.fake"); // You have to comment this, when your real back-end is done
exports.ProductSpecificationsService = product_specifications_service_fake_1.ProductSpecificationsService;
// export { ProductSpecificationsService }
// from './product-specifications.service'; // You have to uncomment this, when your real back-end is done
var properties_service_1 = require("./properties.service");
exports.PropertiesService = properties_service_1.PropertiesService;

//# sourceMappingURL=index.js.map
