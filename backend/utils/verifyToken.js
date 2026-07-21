const jwt = require("jsonwebtoken");
const dbConn = require("../db/knex");

// Builds an auth middleware bound to a specific cookie name, so the
// customer session and the admin session never share/overwrite the same
// browser cookie.
const makeVerifyToken = (cookieName) => {
  return async (req, res, next) => {
    try {
      let token = null;

      // CHECK AUTHORIZATION HEADER
      const authHeader = req.headers.authorization;

      // Check Authorization header
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
      // IF NOT HEADER CHECK COOKIE
      if (!token && req.cookies?.[cookieName]) {
        token = req.cookies[cookieName];
      }
      // IF TOKEN NOT FOUND

      if (!token) {
        return res.status(401).json({
          message: "Authorization token missing",
          code: "NO_TOKEN",
        });
      }

      let decoded;

      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
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
};

const verifyToken = makeVerifyToken("access_token");
const verifyAdminToken = makeVerifyToken("admin_access_token");

module.exports = verifyToken;
module.exports.verifyAdminToken = verifyAdminToken;
