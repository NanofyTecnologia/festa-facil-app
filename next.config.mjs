/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'gtreqzctrqppqncegkpw.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
}

export default nextConfig
