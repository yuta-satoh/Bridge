/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   optimizeFonts: true,
  // },
  reactStrictMode: true,
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/api',
  //       destination: 'http://127.0.0.1:8000',
  //     },
  //     {
  //       source: '/api/:slug',
  //       destination: 'http://127.0.0.1:8000/:slug',
  //     },
  //   ];
  // },
}

module.exports = nextConfig

// module.exports = {
//   nextConfig,
//   experimental: {
//     optimizeFonts: true,
//   },
// };
