const dbConn = require("../../db/knex");
const { generateToken } = require("../../utils/jwt");
const throwError = require("../../utils/WebError");
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
  try {
    // ADMIN DETAILS REQUIRED
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      throwError("All fields required.", 400);
    }

    // NORMALIZE INPUT
    const normalizeName = name.trim();
    const normalizeEmail = email.trim().toLowerCase();
    const normalizePassword = password.trim();

    // GENERATE USERNAME AUTOMATICALLY
    const generateAdminUsername = (email) => {
      const base = email.split("")[0];
      const unique = Date.now();
      return `admin_${base}_${unique}`;
    };

    const username = generateAdminUsername(normalizeEmail);

    // HASH PASSWORD
    const saltRound = parseInt(process.env.SALTROUNDS) || 10;
    const hashPassword = await bcrypt.hash(normalizePassword, saltRound);

    const admin = await dbConn.transaction(async (trx) => {
      const customer = trx("shahDigital.customers");

      // CHECK IF USER EXISTS OR NOT !
      const existingUser = await customer
        .where({ email: normalizeEmail })
        .first();

      if (existingUser) {
        throwError("Admin already exists with this email", 409);
      }

      // INSERT ADMIN USER
      const [userId] = await customer.insert({
        name: normalizeName,
        username,
        email: normalizeEmail,
        password: hashPassword,
        status: "active",
        is_verified: true,
        created_at: trx.fn.now(),
        updated_at: trx.fn.now(),
      });

      // GET ADMIN ROLE
      const role = await trx("roles").where({ name: "admin" }).first();
      if (!role) {
        throwError("Admin role not found", 500);
      }
      // Assign role
      await trx("user_role").insert({
        user_id: userId,
        role_id: role.role_id,
      });
      return {
        id: userId,
        role: role.name,
      };
    });


    // GENERATE JWT TOKEN
    const token = generateToken({
      id: admin.id,
      email: normalizeEmail,
      role: admin.role,
    });

    // SENDING TOKEN TO FRONTEND USING COOKIE
    // FIX: "samSite" was a typo (silently ignored by the cookie parser -
    // this cookie had no CSRF protection at all), and `secure` was
    // commented out - both fixed here.
    res.cookie("admin_access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day time-limit
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin.id,
        name: normalizeName,
        email: normalizeEmail,
        username,
      },
    });
  } catch (error) {
    console.log("Admin register error: ", error);
    return res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "INTERNAL SERVER ERROR",
    });
  }
};

module.exports = registerAdmin;
