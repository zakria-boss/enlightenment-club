/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true // Disables ESLint during builds
  },
  images: {
    domains: ['via.placeholder.com'], // Add external image domains here
  },
  // Disables type checking entirely. NOT RECOMMENDED for production
  // compiler: {
  //   styledComponents: true,
  //   reactRemoveProperties: false,
  //   removeConsole: false
  // }
  //   reactStrictMode: true,
  //   swcMinify: true,
  //   experimental: {
  //     appDir: true
  //   }
};

export default nextConfig;
