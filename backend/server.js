const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, "127.0.0.1", () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
  process.exit(1);
});
