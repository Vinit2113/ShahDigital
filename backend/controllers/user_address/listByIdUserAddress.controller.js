const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const getUserAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const address = await dbConn("shahDigital.user_addresses")
      .where({
        user_id: req.user.id,
        is_active: true,
      })
      .orderBy("is_default", "desc")
      .orderBy("created_at", "desc")
      .first();

    if (!address) {
      throwError("No default address found", 404);
    }

    return res.status(200).json({
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    console.log("GET USER ADDRESS ERROR", error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};

module.exports = getUserAddress;
