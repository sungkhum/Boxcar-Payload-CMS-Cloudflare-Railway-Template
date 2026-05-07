import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the full Next build output in the runtime image so Railway's
  // preDeployCommand can run Payload migrations from the same image.
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Allow images served from R2 via the public bucket URL or a custom CDN domain.
      // Set R2_PUBLIC_URL to e.g. https://media.your-domain.com or https://pub-xxx.r2.dev
      ...(process.env.R2_PUBLIC_URL
        ? [
            {
              protocol: 'https',
              hostname: new URL(process.env.R2_PUBLIC_URL).hostname,
            },
          ]
        : []),
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
