/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ مهم: لتوليد static files
  images: {
    unoptimized: true, // ✅ لتفادي مشاكل الصور
  },
  // إذا كنت تستخدم Router paths
  trailingSlash: true,
}

module.exports = nextConfig
