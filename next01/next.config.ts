import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// };
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "3000",
//         pathname: "/uploads/**",
//       },
//     ],
//   },
// };
/**
//  @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "3000",
//         // pathname: "/uploads/**",
//         pathname: "/media/**",
//       },
//       {
//         protocol: "https",
//         hostname: "*.gstatic.com",
//       },
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;
// export default nextConfig;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
