const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const address_id = req.params.address_id;

    const result = await dbConn.transaction(async (trx) => {
      // Check if address exists and belongs to the logged-in user
      const address = await trx("user_addresses")
        .where({
          address_id,
          user_id: userId,
          is_active: true,
        })
        .first();

      if (!address) {
        throwError("Address not found", 404);
      }

      // Soft delete the address
      await trx("user_addresses")
        .where({
          address_id,
          user_id: userId,
        })
        .update({
          is_active: false,
          is_default: false,
          updated_at: trx.fn.now(),
        });

      return {
        address_id,
      };
    });

    return res.status(200).json({
      message: "Address deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);

    return res.status(500).json({
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};

module.exports = deleteAddress;
