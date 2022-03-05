/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    disable: true
  }
}

const withPWA = require('next-pwa')

module.exports = withPWA(nextConfig)
