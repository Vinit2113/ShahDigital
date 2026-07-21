const logouAdmin = async (req, res) => {
  try {
    res.clearCookie("admin_access_token", {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Admin logout successfully" });
  } catch (error) {
    console.log("Logout error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = logouAdmin;
