const { UserCart } = require('./schema');

module.exports.AddToCart = async (req, res) => {
    try {
        const user = req.user._id;
        const { product, quantity } = req.body;

        let userCart = await UserCart.findOne({ userId: user });
        if (!userCart) {
            userCart = await UserCart.create({ userId: user, items: [] });
        }

        const existingCartItemIndex = userCart.items.findIndex(item => item.product.equals(product));
        if (existingCartItemIndex !== -1) {
            userCart.items[existingCartItemIndex].quantity += quantity;
        } else {
            userCart.items.push({ product, quantity });
        }

        await userCart.save();
        res.json({ message: 'Product added to cart', success: true });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding the product to cart', success: false });
    }
};

module.exports.getCartItems = async (req, res) => {
    try {
        const user = req.user._id;

        const userCart = await UserCart.findOne({ userId: user }).populate('items.product');
        if (!userCart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.json({ data: userCart.items });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
}


module.exports.updateCart = async (req, res) => {
    try {
        const user = req.user._id;
        const { product, quantity } = req.body;

        const userCart = await UserCart.findOne({ userId: user });
        const existingCartItem = userCart.items.find(item => item.product.equals(product));
        if (existingCartItem) {
            existingCartItem.quantity = quantity;
            await userCart.save();
            res.json({ message: 'Cart updated' });
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'An error occurred while updating the cart' });
    }
};


module.exports.removeFromCart = async (req, res) => {
    try {
        const user = req.user._id; 
        const { product } = req.params;
        const userCart = await UserCart.findOne({ userId: user });
        const updatedItems = userCart.items.filter(item => !item.product.equals(product));
        userCart.items = updatedItems;
        await userCart.save();
        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing the product from cart' });
    }
};

module.exports.clearCart = async (req, res) => {
    try {
      const user= req.user._id; 
      await UserCart.deleteMany({ userId: user });
      res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ error: 'Failed to clear cart' });
    }
  };

