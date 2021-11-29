const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);
exports.stripePayment = async (req, res) => {
  stripe.charges.create(
    {
      //if user make any payment stripe return token id
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json({
          success: false,
          message:
            "Something when wrong with the payment",
          stripeError,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Payment successfull",
          stripeResponse,
        });
      }
    },
  );
};
