// DB Data Model Import
import ProductModel from "../models/product.model.js";

export const productCreate = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(200).json(product);
    } catch (error){
        res.status(500).json({ msg: "Internal Server Error" })
    }
};

export const getProducts = async (req, res) => {
    try {
        const product = await ProductModel.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error.message, { msg: "Internal Server Error" });
    }
};

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);

        if (!product)
        {
            res.status(404).json({ message: `Product with this ${id} not found` })
        } else {
            res.status(200).json(product);
        }

    } catch (error) {
        res.status(500).json(error.message, { msg: "Internal Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndUpdate(id, req.body);

        if (!product)
        {
            res.status(404).json({ message: `Product with this ${id} not found` })
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json(error.message, { msg: "Internal Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product)
        {
            res.status(404).json({ message: `Product with this ${id} not found` })
        } else {
            res.status(200).json({ message: "Product Deleted Successfully" });
        }
    } catch (error) {
        res.status(500).json(error.message, { msg: "Internal Server Error" });
    }
};