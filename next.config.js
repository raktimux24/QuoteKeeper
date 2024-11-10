/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['lucide-react'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module and other Node.js specifics
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        undici: false,
      };
    }

    // Add babel-loader for handling undici and other problematic modules
    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /node_modules\/(?!undici)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-private-methods'
          ]
        }
      }
    });

    return config;
  },
  // Add experimental features to support newer JavaScript features
  experimental: {
    esmExternals: 'loose', // Required for undici
  }
};

module.exports = nextConfig; 