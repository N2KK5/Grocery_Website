// Import Modules
import express from 'express';

// Controller Module
import {
    productCreate,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

// Router Config
const router = express.Router();

// Create Product | POST Method
router.post('/', productCreate);

// List All Product | GET Method
router.get('/', getProducts);

// Find One Product | GET Method
router.get('/:id', getProduct);

// Update Product | PUT Method
router.put('/:id', updateProduct);

// Delete Product | DELETE Method
router.delete('/:id', deleteProduct);

export default router;