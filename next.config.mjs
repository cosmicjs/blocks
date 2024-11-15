/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgix.cosmicjs.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cosmicjs.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blocks/products",
        destination: "/blocks/ecommerce",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "clipboard-read=*, clipboard-write=*",
          },
        ],
      },
    ]
  },
}

export default nextConfig
