/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITE_URL: 'http://localhost:3000',
    PROD_SITE_URL: ''
  }
}

module.exports = nextConfig
