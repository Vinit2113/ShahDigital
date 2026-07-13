const jwt = require("jsonwebtoken");
const dbConn = require("../db/knex");

const verifyToken = async (req, res, next) => {
  try {
    let token = null;

    // CHECK AUTHORIZATION HEADER
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    // IF NOT HEADER CHECK COOKIE
    if (!token && req.cookies?.access_token) {
      token = req.cookies.access_token;
    }
    // IF TOKEN NOT FOUND
    console.log("here is token", token);

    if (!token) {
      return res.status(401).json({
        message: "Authorization token missing",
        code: "NO_TOKEN",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Here is Decoded: ", decoded);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Session expired. Please login again.",
          code: "TOKEN_EXPIRED",
        });
      }

      return res.status(401).json({
        message: "Invalid token",
        code: "TOKEN_INVALID",
      });
    }

    // Fetch user from DB
    const user = await dbConn("shahDigital.customers")
      .select("id", "status", "is_verified", "deleted_at")
      .where({ id: decoded.id })
      .first();

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    if (user.deleted_at !== null) {
      return res.status(401).json({
        message: "Account has been deleted",
        code: "ACCOUNT_DELETED",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: `Account is ${user.status}`,
        code: "ACCOUNT_INACTIVE",
      });
    }

    // Attach user data to request
    req.user = {
      ...decoded,
      status: user.status,
      is_verified: user.is_verified,
      deleted_at: user.deleted_at,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(500).json({
      message: "Internal server error",
      code: "SERVER_ERROR",
    });
  }
};

module.exports = verifyToken;
