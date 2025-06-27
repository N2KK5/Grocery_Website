import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";

export const secretKey = uuidv4();
console.log(secretKey);

// DB Model
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export const Register_api = async (req, res) => {
    try {
        // Encoded Data
        const password_enc = await bcrypt.hash(req.body.password, 10);

        // User Checking
        const CheckUser = await UserModel.findOne({ name: req.body.username });

        if (CheckUser) {
            res.status(200).render(
                'store/account/page',
                {
                    msg: 'Account already exists',
                }
            );
        } else {
            if(!CheckUser)
            {
                const newUser = await new UserModel({
                    name: req.body.username,
                    password: password_enc,
                });

                const CreateUser = await newUser.save();
                console.log(CreateUser);
                res.status(200).render(
                    'store/account/page',
                    {
                        msg: 'User registered successfully',
                    }
                );
            }
        }
    } catch (error) {
        res.status(500).redirect('/internal-error');
    }
};

export const Login_api = async (req, res) => {
    try {

        const CheckUser = await UserModel.findOne({
            name: req.body.username,
        });

        console.log(CheckUser)

        // Compare decode
        const pass_dec = await bcrypt.compare(req.body.password, CheckUser.password);

        console.log(pass_dec);

        if (!pass_dec)
        {
            res.status(500).render(
                'store/account/page',
                {
                    message: 'Incorrect password',
                }
            );
        }

        const user = CheckUser.name;

        // JWT Token
        const cookieOption = {
            expiresIn: '24h',
            algorithm: 'HS256'
        };

        const token = jwt.sign({user}, secretKey, cookieOption);

        console.log(token);

        // Cookie response
        res.cookie('app', token, { expiresIn: '1h' , httpOnly: true });

        res.status(200).redirect('/home');

    } catch (error) {

        res.status(500).redirect('/internal-error');
    }
};

// List All Product
export const list_products_api = async (req, res) => {
    try {
        const view = await ProductModel.find().lean();

        if (view)
        {
            res.status(200).render(
                'store/product/shop',
                {
                    title: 'Shop',
                    products: view,
                    user: req.user,
                }
            );
        }

    } catch (error) {
        res.render(
            'store/error/internal_err',
            {
                msg: 'Internal Server Error',
                status_code: error,
            }
        );
    }
};

// Update Product
export const update_product_api = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            }
        ).lean();

        if (!product)
        {
            res.status(404).render(
                'store/product/edit',
                {
                    msg: `Product with this ${ product._id } not found`,
                }
            );
        }

        res.status(200).redirect('/shop');


    } catch (error) {
        res.render(
            'store/error/internal_err',
            {
                msg: 'Internal Server Error',
                status_code: error,
            }
        );
    }
};

// Delete API
export const delete_Product_api = async (req, res) => {
      try {

          const id = req.params.id;

          const product = await ProductModel.findById(id);
          await product.deleteOne();

          res.status(200).redirect('/shop');

      } catch (error) {
          res.render(
              'store/error/internal_err',
              {
                  msg: 'Internal Server Error',
                  status_code: error,
              }
          );
      }
};