/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgix.cosmicjs.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cosmicjs.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blocks/products',
        destination: '/blocks/ecommerce',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
