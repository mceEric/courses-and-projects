const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  sw: "/sw.js",
  scope: "/participant",
});

module.exports = withPWA({
  reactStrictMode: false,
});
