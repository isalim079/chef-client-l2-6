// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["i.ibb.co.com", "i.ibb.co", "lh3.googleusercontent.com", "images.pexels.com", "images.unsplash.com"],
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
    };
    return config;
  },
};

export default nextConfig;
