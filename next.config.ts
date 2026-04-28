import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local-only abstract gradient SVGs in /public/art are author-controlled,
    // not user-uploaded — safe to serve via next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
