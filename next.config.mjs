import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for client-side only app
  images: {
    unoptimized: true, // Required for static export
  },

  // Optional: Configure trailing slashes
  trailingSlash: true,

  // Optional: Asset prefix for CDN
  // assetPrefix: 'https://cdn.timemaster.app',

  // Optimize bundle (swcMinify is enabled by default in Next.js 13+)
};

// Wrap config with bundle analyzer
export default bundleAnalyzer(nextConfig);
