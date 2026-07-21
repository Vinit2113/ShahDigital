const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const listAllProfile = async (req, res) => {
  try {
    // Route already requires onlyAdmins (admin or owner) - no need to
    // re-check role here too.

    const allUser = await dbConn("shahDigital.customers as c")
      .select(
        "c.id",
        "c.name",
        "c.username",
        "c.email",
        "r.role_id",
        "r.name as role_name",
      )
      .leftJoin("shahDigital.user_role as ur", "c.id", "ur.user_id")
      .leftJoin("shahDigital.roles as r", "ur.role_id", "r.role_id");

    return res
      .status(200)
      .json({ message: "Users fetched successfully", Data: allUser });
  } catch (error) {
    console.log("List user error ", error);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = {
  listAllProfile,
};
