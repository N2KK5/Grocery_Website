import mongoose from "mongoose";

// Data Schema
const ProductSchema = new mongoose.Schema({
   name: {
       type: String,
   },
    price: {
       type: Number,
    },
    imgurl: {
        type: String,
    },
},
{
    timestamps: true,
}
);

// Data Model
const ProductModel = mongoose.model("Product_List", ProductSchema);

export default ProductModel;