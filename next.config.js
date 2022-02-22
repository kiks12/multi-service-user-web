/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: 'http://localhost:3000',
    PROD_SITE_URL: '',
    BACKEND_URL: 'http://localhost:4000'
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost'],
  }
}

module.exports = nextConfig
