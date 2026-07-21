const crypto = require("crypto");
const throwError = require("../../utils/WebError");
const dbConn = require("../../db/knex");
const { passwordResetMail } = require("../../utils/mailer");
const { hashOTP } = require("../../utils/otp");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      throwError("Email is required", 400);
    }

    const normalizeEmail = email.trim().toLowerCase();

    const user = await dbConn("shahDigital.customers")
      .where({ email: normalizeEmail })
      .first();

    if (!user) {
      return res
        .status(200)
        .json({ message: "If email exists, reset link will be sent." });
    }

    // Generate secure token - only the hash is stored, the raw token is
    // emailed to the user and never persisted (mirrors the OTP handling).
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    await dbConn("shahDigital.customers").where({ id: user.id }).update({
      reset_token: hashOTP(resetToken),
      reset_token_expiry: tokenExpiry,
    });

    // CREATE RESET LINK !

    // /reset-password frontend route/page yet, so this link isn't
    // consumable end-to-end until that's built; this only fixes the URL
    // itself pointing at the right host.
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:2040"}/reset-password?token=${resetToken}&email=${normalizeEmail}`;

    await passwordResetMail(normalizeEmail, resetLink);

    return res
      .status(200)
      .json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.log(error);
    throwError("INTERNAL SERVER ERROR", 500);
  }
};

module.exports = forgotPassword;
