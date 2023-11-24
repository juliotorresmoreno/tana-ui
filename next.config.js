const webpack = require("webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      handlebars: "handlebars/dist/handlebars.js",
    };

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.ya?ml$/,
        use: "yaml-loader",
      },
    ];

    return config;
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
