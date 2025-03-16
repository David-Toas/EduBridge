import withPWA from 'next-pwa';

const pwa = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://edubridge-uwk9.onrender.com/api/:path*',
      },
    ];
  },
};

export default pwa(nextConfig);