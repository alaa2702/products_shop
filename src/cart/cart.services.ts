//create cart service
import prisma from "../utils/prisma";

export const createCartService = async (id: number) => {
  const cart = await prisma.cart.create({
    data: {
      userId: id,
    },
  });
  return cart;
};
export const getCartService = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { products: true },
    });
    return cart;
    };

export const addNewItemToCartService = async (productId: number, amount: number, cartId: number) => {
    await prisma.productsCart.create({
      data: {
        cartId,  
        productId,
        amount,
      },
    });
  
}
export const updateItemInCartService = async (productId: number, amount: number) => {
  await prisma.productsCart.update({
    where: { id: productId },
    data: { amount },
  });
};

export const deleteItemFromCartService = async (productId: number) => {
  await prisma.productsCart.delete({
    where: { id: productId },
  });
};