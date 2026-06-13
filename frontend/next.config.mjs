import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do not set output: "standalone" — @netlify/plugin-nextjs manages the output.
  experimental: {
    // Enable server components
  },
};

export default withNextIntl(nextConfig);
