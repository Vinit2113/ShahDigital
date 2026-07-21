const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const userBlock = async (req, res) => {
  try {
    const { userid } = req.params;

    // Route already requires onlyAdmins (admin or owner) - no need to
    // re-check role here too.

    // FIND THE USER BY ID
    const getUser = await dbConn("shahDigital.customers")
      .select("name", "username", "email", "status", "is_verified")
      .where({ id: userid })
      .whereNull("deleted_at")
      .first();

    if (!getUser) {
      return throwError("User not found", 404);
    }

    if (getUser.status === "blocked") {
      return throwError("User already blocked", 401);
    }

    if (getUser.status === "inactive") {
      return throwError("User is Inactive", 401);
    }

    await dbConn("shahDigital.customers")
      .where({ id: userid })
      .andWhere({ status: "active" })
      .whereNull("deleted_at")
      .update({
        status: "blocked",
      });

    return res.status(200).json({ message: "User Blocked successfully" });
  } catch (error) {
    console.log("BLOCK USER: ", error);
    // return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};
module.exports = userBlock;
