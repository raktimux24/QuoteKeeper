/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Handle undici and other Node.js modules
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        undici: false
      };
    }

    // Add rule for handling Firebase modules
    config.module.rules.push({
      test: /\.m?js$/,
      include: [
        /node_modules\/@firebase/,
        /node_modules\/firebase/,
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

    return config;
  }
};

module.exports = nextConfig; 