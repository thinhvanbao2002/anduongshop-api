import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'products'
        },
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('carts', cartSchema);
export default Cart;
