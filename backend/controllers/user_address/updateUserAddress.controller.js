const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const updateAddress = async (req, res) => {
  try {
    // USER ID FROM JWT TOKEN
    const userId = req.user.id;

    // ADDRESS ID FROM PARAMS
    const addressId = req.params.address_id;

    const {
      f_name,
      l_name,
      full_address,
      city,
      state,
      postal_code,
      is_default,
    } = req.body;

    const result = await dbConn.transaction(async (trx) => {
      // CHECK ADDRESS EXISTS & BELONGS TO USER
      const address = await trx("user_addresses")
        .where({
          address_id: addressId,
          user_id: userId,
          is_active: true,
        })
        .first();

      if (!address) {
        throwError("Address not found", 404);
      }

      // CREATE UPDATE OBJECT ONLY WITH PROVIDED FIELDS
      const updateData = {};

      if (f_name !== undefined) updateData.f_name = f_name;
      if (l_name !== undefined) updateData.l_name = l_name;
      if (full_address !== undefined) updateData.full_address = full_address;
      if (city !== undefined) updateData.city = city;
      if (state !== undefined) updateData.state = state;
      if (postal_code !== undefined) updateData.postal_code = postal_code;

      // HANDLE DEFAULT ADDRESS
      if (is_default !== undefined) {
        updateData.is_default = is_default;

        if (is_default) {
          await trx("user_addresses")
            .where({
              user_id: userId,
              is_default: true,
            })
            .whereNot({
              address_id: addressId,
            })
            .update({
              is_default: false,
              updated_at: trx.fn.now(),
            });
        }
      }

      // NOTHING TO UPDATE
      if (Object.keys(updateData).length === 0) {
        throwError("No fields provided for update", 400);
      }

      updateData.updated_at = trx.fn.now();

      // UPDATE ADDRESS
      await trx("user_addresses")
        .where({
          address_id: addressId,
          user_id: userId,
        })
        .update(updateData);

      // FETCH UPDATED ADDRESS
      const updatedAddress = await trx("user_addresses")
        .where({
          address_id: addressId,
        })
        .first();

      return updatedAddress;
    });

    return res.status(200).json({
      message: "Address updated successfully",
      data: result,
    });
  } catch (error) {
    console.log("UPDATE ADDRESS ERROR", error);

    return res.status(error.statusCode || error.status || 500).json({
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};

module.exports = updateAddress;
