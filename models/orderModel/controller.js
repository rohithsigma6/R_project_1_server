const {Order} = require('./schema');

module.exports.placeOrder = async (req, res) => {
  try {
    const  user  = req.user._id; 
    const { items, paymentDetails, shippingDetails, totalAmount } = req.body;
    const newOrder = new Order({
      user,
      items,
      paymentDetails,
      shippingDetails,
      totalAmount
    });

    await newOrder.save();
    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'An error occurred while placing the order' });
  }
};



module.exports.getOrdersForUser = async (req, res) => {
  try {
    const user = req.user._id; 

    const orders = await Order.find({ user: user }).populate('items.product');

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

