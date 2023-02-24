/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/api',
        destination: 'http://localhost:8000',
      },
      {
        source: '/api/:slug',
        destination: 'http://localhost:8000/:slug',
      },
    ];
  },
}

module.exports = nextConfig
