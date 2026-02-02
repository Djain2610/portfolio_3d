/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration for Next.js 16+
  turbopack: {},

  // Enforce binary assets as raw files when imported (defensive only)
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(glb|gltf|bin|hdr|ktx2)$/i,
        type: "asset/resource",
        parser: { dataUrlCondition: { maxSize: 0 } },
      },
      {
        test: /\.(png|jpe?g|webp)$/i,
        type: "asset/resource",
        parser: { dataUrlCondition: { maxSize: 0 } },
      }
    );
    return config;
  },
  
  // Ensure static files are served correctly
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
