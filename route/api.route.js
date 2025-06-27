// Import Modules
import express from 'express';

// Router Config
const router = express.Router();

import {
    Register_api,
    Login_api,
    list_products_api,
    update_product_api,
    delete_Product_api
} from '../controllers/api.controller.js';

import { isLoggedIn } from "../controllers/store.controller.js";
import {deleteProduct} from "../controllers/product.controller.js";

router.post('/auth/register', Register_api);

// Login User || POST Method
router.post('/auth/login', Login_api);

// View Product || GET MEthod
router.get('/view-product', isLoggedIn, list_products_api);

// Update Product || PUT Method
router.put('/update-product/:id', isLoggedIn, update_product_api);

// Deleteeee Product
router.delete('/delete-product/:id', isLoggedIn, delete_Product_api);

export default router;

