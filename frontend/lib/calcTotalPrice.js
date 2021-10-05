const calcTotalPrice = (cart) => {
  const totalPrice = cart.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);
  return Math.ceil(totalPrice);
};

export default calcTotalPrice;
