/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true // Disables ESLint during builds
    },
    // Disables type checking entirely.  NOT RECOMMENDED for production
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
