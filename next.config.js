/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Avoid bundling undici on the client side
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
    }

    // Add babel-loader for handling private class fields
    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /node_modules\/(?!undici)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties'],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig; 