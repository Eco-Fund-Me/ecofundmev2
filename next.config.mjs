/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
};

export default nextConfig;