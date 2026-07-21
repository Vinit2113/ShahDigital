
const dbConn = require("../../db/knex");

const listEnquiries = async (req, res) => {
  try {
    const enquiries = await dbConn("enquiries as e")
      // LEFT JOIN, not join - general enquiries (Navbar "Enquire Now", no
      // product attached) have product_id = NULL and would otherwise be
      // silently dropped by an inner join.
      .leftJoin("shahDigital.products as p", "e.product_id", "p.product_id")
      .select(
        "e.enquiries_id",
        "e.name",
        "e.email",
        "e.phone",
        "e.message",
        "e.status",
        "e.created_at",
        "p.product_id",
        "p.product_display_name",
      )
      .orderBy("e.created_at", "desc");

    return res.status(200).json({
      message: "Enquiries fetched successfully",
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "INTERNAL SERVER ERROR" });
  }
};

module.exports = listEnquiries;
