// Import Modules
import jwt from "jsonwebtoken";
import { secretKey } from "./api.controller.js";
import { promisify } from "util";


// Product Model
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";


// Home Page
export const home_page = (req, res) => {
    if(!req.user){
        res.redirect('/account');
    } else {
        res.render('store/Home',
            { title: 'Home',
              user: req.user,
            });
    }

};

export const about_page = (req, res) => {
    if (!req.user)
    {
        res.redirect('/account');
    } else {
        res.render(
            'store/About',
            {
                title: 'About',
                user: req.user,
            }
        );
    }

};

export const contact_page = (req, res) => {
    if (!req.user)
    {
        res.redirect('/account');
    } else {
        res.render('store/contact', { title: 'contact', user: req.user });
    }
};

export const shop_page = async (req, res) => {

    if (!req.user)
    {
        res.redirect('/account');
    } else {
        res.render('store/product/shop', { title: 'Shop', user: req.user });
    }
};



export const veg_page = async (req, res) => {

    if (!req.user)
    {
        res.redirect('/account');
    } else {
        res.render('store/product/vegetables', { title: 'Vegetables', user: req.user });
    }
};



export const juice_page = async (req, res) => {

    if (!req.user)
    {
        res.redirect('/account');
    } else {
        res.render('store/product/juice', { title: 'Juice', user: req.user });
    }
};

export const form_page = async (req, res) => {

    if (!req.user)
    {
        res.redirect('/account');
    } else {
        res.render('store/product/form', { title: 'Form', user: req.user });
    }
};

export const order_page = async (req, res) => {

    if (!req.user)
    {
        res.redirect('/account');
    } else {
        res.render('store/product/order', { title: 'Order', user: req.user });
    }
};

export const account_page = (req, res) => {
    res.render(
        'store/account/page',
        {
            title: 'Account',
        }
    );
};


export const createacc_page = async (req, res) => {
   
    res.render(
        'store/account/createacc',
        {
            title: 'CreateAccount',
        }
    );
    
};



export const edit_page = async (req, res) => {

    if (!req.user) {
        res.redirect('/account');
    } else {

        const id = req.params.id;
        const product = await ProductModel.findById(id).lean();

        console.log(product);

        res.status(200).render(
            'store/product/edit',
            {
                title: 'Edit Page',
                product: product,
            }
        );
    }

}

export const cart_page = (req, res) => {

    res.render(
        'store/cart/cartpage',
        {
            title: 'Cart',
        }
    );
};





  

// Internal Error
export const internal_error_page = (req, res) => {
    res.render(
        'store/error/internal_err',
        {
            msg: 'Internal Server Error',
            status_code: "Status Code: 500",
        }
    );
}


//logout
export const logout_api = (req, res) => {
    res.clearCookie('app');
    res.redirect('/account');
}




export const isLoggedIn = async (req, res, next) => {
    try {

        if (req.cookies.app)
        {
            const dec = await promisify(jwt.verify)(
                req.cookies.app,
                secretKey,
            );
            // console.log(dec);

            const check = await UserModel.findOne({ name: dec.user });
            // console.log(checkUser);

            req.user = check.name;

            // console.log(req.user);

            return next()

        } else {
            return next()
        }

    } catch (error) {
        console.log(error);
        return next()
    }
}












