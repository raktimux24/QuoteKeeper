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
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
      };
    }

    // Add specific loader for undici
    config.module.rules.push({
      test: /\.m?js$/,
      include: [
        /node_modules\/@firebase\/auth\/node_modules\/undici/,
        /node_modules\/undici/
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                node: 'current',
              },
              modules: 'commonjs'
            }]
          ],
          plugins: [
            '@babel/plugin-proposal-private-methods',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-private-property-in-object'
          ],
          cacheDirectory: true
        }
      }
    });

    return config;
  }
};

module.exports = nextConfig; 