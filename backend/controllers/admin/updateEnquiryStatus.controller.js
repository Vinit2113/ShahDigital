
const dbConn = require("../../db/knex");
const throwError = require("../../utils/WebError");

const ALLOWED_STATUSES = ["NEW", "CONTACTED", "CLOSED"];

const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiryId = req.params.enquiry_id;
    const { status } = req.body;

    if (!enquiryId) {
      throwError("Enquiry id is required", 400);
    }

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      throwError(
        `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`,
        400,
      );
    }

    const existingEnquiry = await dbConn("enquiries")
      .where({ enquiries_id: enquiryId })
      .first();

    if (!existingEnquiry) {
      throwError("Enquiry not found", 404);
    }

    await dbConn("enquiries")
      .where({ enquiries_id: enquiryId })
      .update({ status, updated_at: dbConn.fn.now() });

    return res
      .status(200)
      .json({ message: "Enquiry status updated successfully" });
  } catch (error) {
    console.log(error);

    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "INTERNAL SERVER ERROR" });
  }
};

module.exports = updateEnquiryStatus;
