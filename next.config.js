/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: 'http://localhost:3000',
    PROD_SITE_URL: ''
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
