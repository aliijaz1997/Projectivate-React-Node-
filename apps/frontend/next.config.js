const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);
module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ["via.placeholder.com"],
  },
});
