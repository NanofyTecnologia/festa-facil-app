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
        protocol: 'http',
        hostname: 'festafacil.devfy.com.br',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'festafacil.devfy.com.br',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'gtreqzctrqppqncegkpw.supabase.co',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'b9be-191-13-42-121.ngrok-free.app',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
