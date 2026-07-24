const rateLimit = require("express-rate-limit");

// LOGIN: 10 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

// OTP VERIFY: 10 attempts per 15 minutes per IP (6-digit OTP brute force protection)
const otpVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many OTP attempts. Please try again later." },
});

// OTP RESEND / FORGOT PASSWORD: 5 requests per 15 minutes per IP (prevents email bombing)
const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

// ADMIN WRITES: 100 create/update/delete/restore requests per 15 minutes
// per IP (category/attribute/brand/mapping). Generous enough for normal
// admin usage, still blocks scripted abuse against an authenticated route.
const adminWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

module.exports = {
  loginLimiter,
  otpVerifyLimiter,
  otpRequestLimiter,
  adminWriteLimiter,
};
