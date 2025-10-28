/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'out',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }),
  reactStrictMode: true,
}

module.exports = nextConfig
