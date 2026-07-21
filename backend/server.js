const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3000;

// Bind to localhost only - this process should never be reachable
// directly, only through the reverse proxy in front of it. The firewall
// blocking this port externally is the primary control; this is
// defense in depth in case that's ever misconfigured.
app.listen(port, "127.0.0.1", () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});

// Without these, an unhandled rejection or a thrown error outside of
// Express's own request handling would otherwise crash silently (or hang)
// with nothing in the logs to diagnose it by, particularly awkward when
// running as an unattended Windows service.
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
  process.exit(1);
});
