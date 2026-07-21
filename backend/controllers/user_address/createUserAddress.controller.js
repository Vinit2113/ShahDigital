const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const createAddress = async (req, res) => {
  try {
    // USER ID FROM JWT TOKEN
    const userId = req.user.id;

    const {
      f_name,
      l_name,
      full_address,
      city,
      state,
      postal_code,
      is_default = false,
    } = req.body;

    // VALIDATION
    if (
      !f_name ||
      !l_name ||
      !full_address ||
      !city ||
      !state ||
      !postal_code
    ) {
      return res.status(400).json({
        message: "All address fields are required",
      });
    }

    const result = await dbConn.transaction(async (trx) => {
      // CHECK USER EXISTS
      const user = await trx("customers").where({ id: userId }).first();

      if (!user) {
        throwError("User not found", 404);
      }

      // IF NEW ADDRESS IS DEFAULT
      // REMOVE OLD DEFAULT ADDRESS
      if (is_default) {
        await trx("user_addresses")
          .where({
            user_id: userId,
            is_default: true,
          })
          .update({
            is_default: false,
            updated_at: trx.fn.now(),
          });
      }

      // INSERT ADDRESS
      const [addressId] = await trx("user_addresses").insert({
        user_id: userId,
        f_name,
        l_name,
        full_address,
        city,
        state,
        postal_code,
        is_default,
        is_active: true,
        created_at: trx.fn.now(),
        updated_at: trx.fn.now(),
      });

      // FETCH CREATED ADDRESS
      const address = await trx("user_addresses")
        .where({
          address_id: addressId,
        })
        .first();

      return address;
    });

    return res.status(201).json({
      message: "Address created successfully",
      data: result,
    });
  } catch (error) {
    console.log("CREATE ADDRESS ERROR", error);

    return res.status(500).json({
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};

module.exports = createAddress;
