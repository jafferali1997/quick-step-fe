/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // productionBrowserSourceMaps: false, // Disable source maps in development
  // optimizeFonts: false, // Disable font optimization
  // experimental: {
  //   modern: true,
  //   modularize: true,
  //   css: true
  // },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.js$/,
  //     use: [
  //       {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: [['next/babel', { 'preset-env': { modules: 'commonjs' } }]],
  //           plugins: ['babel-plugin-module-resolver']
  //         }
  //       }
  //     ]
  //   });
  //   return config;
  // },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
