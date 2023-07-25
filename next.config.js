/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate");

const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require("./scripts/sitemap_products");
      require("./scripts/sitemap_products_en");
    }
    return;
  },
  ...nextTranslate(),

  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["localhost", "priceay.herokuapp.com", "res.cloudinary.com"],
  },

  async redirects() {
    return [
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
