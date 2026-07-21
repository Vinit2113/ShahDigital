// THIS PAGE IS FOR CONTACT-MODEL WHERE USER WILL ENTER IT'S DETAIL AND SEND THE INFROMATION THE THE OWNER THORUGH EMAIL AND STORE IT IN DATABASE !

const dbConn = require("../../db/knex");
const existingProductQuery = require("../../services/product.servics");
const throwError = require("../../utils/WebError");

const contactModel = async (req, res) => {
  try {
    const { name, email, phone, message, productId } = req.body;
    console.log(name, email, phone, message, productId);

    if (!name || !email || !phone || !message || !productId) {
      throwError("All details required", 400);
    }
    await existingProductQuery(productId);

    await dbConn("enquiries").insert({
      name,
      email,
      phone,
      message,
      product_id: productId,
    });

    return res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "INTERNAL SERVER ERROR " });
  }
};

module.exports = contactModel;
