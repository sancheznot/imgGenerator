/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // next.js config
    images: {
      domains: ["oaidalleapiprodscus.blob.core.windows.net"],
    },
    // output: 'export',
    // basePath: '/app',

});


