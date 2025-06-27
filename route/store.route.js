// Import Modules
import express from 'express';

// Import store controller
import {
    home_page,
    about_page,
    shop_page,
    contact_page,
    account_page,
    veg_page,
    isLoggedIn,
    internal_error_page,
    logout_api,
    edit_page,
    juice_page,
    form_page,
    order_page,
    cart_page,
    createacc_page
} from '../controllers/store.controller.js'

// Router Config
const router = express.Router();

// Home Page
router.get(['/', '/home'], isLoggedIn, home_page);

// About Page
router.get('/about',isLoggedIn, about_page);

// Contact Page
router.get('/contact', isLoggedIn, contact_page);

// Shop Page
router.get('/shop', isLoggedIn, shop_page);

// Vegetables Page
router.get('/vegetables',  isLoggedIn, veg_page);

// Juice Page
router.get('/juice',  isLoggedIn, juice_page);

// Form Page
router.get('/form',  isLoggedIn, form_page);

// Form Page
router.get('/cartpage',  isLoggedIn, cart_page);

// Order Page
router.get('/order',  isLoggedIn, order_page);

// Account Page
router.get('/account', account_page);

// CreateAccount Page
router.get('/createacc', createacc_page);

// Edit Product Page
router.get('/edit-page/:id', isLoggedIn, edit_page);

// Error pages
router.get('/internal-error', internal_error_page);

// logout
router.get('/logout', logout_api);

export default router;
