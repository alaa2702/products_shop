import { Request, Response, NextFunction } from 'express';
import { getProductService } from '../products/products.servces';
import {getCartService, addNewItemToCartService,updateItemInCartService ,createCartService,deleteItemFromCartService } from './cart.services';

// Add a product to the user's cart
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    const { productId, amount } = req.body;
    const product = await getProductService(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const userId = (req as any).user?.id;
    const cart = await getCartService(userId);
    if (!cart) {
        const newCart = await createCartService(userId);
        await addNewItemToCartService(productId, amount, newCart.id);
    } else {
        const cartItem = cart.products.find((item) => item.productId === productId);
        if (cartItem) {
            const newAmount = cartItem.amount + amount;
            await updateItemInCartService(cartItem.id, newAmount);
        } else {
            await addNewItemToCartService(productId, amount, cart.id);
        }
    }
    res.status(201).json({ message: 'Product added to cart' });
};

// // Update the quantity of a product in the user's cart
 export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
        const { productId, amount } = req.body;
        const userId = (req as any).user?.id;
        const cart = await getCartService(userId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const cartItem = cart.products.find((item) => item.productId === productId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        await updateItemInCartService(cartItem.id, amount);
        res.status(200).json({ message: 'Cart item updated' });
  
 };

// Remove a product from the user's cart
export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;;
    const userId = (req as any).user?.id;
    const cart = await getCartService(userId);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    const cartItem = cart.products.find((item) => item.productId === productId);
    if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart' });
    }
    await deleteItemFromCartService(cartItem.id);
    res.status(200).json({ message: 'Product removed from cart' });
};

// Get the user's cart
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    const cart = await getCartService(userId);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
};