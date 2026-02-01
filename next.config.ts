import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project is static-first and does not require server APIs.
  //
  // Note: Cursor's sandbox environment can restrict process spawning and
  // port binding, which may cause Next build workers to fail. Disabling the
  // webpack build worker keeps local builds deterministic here.
  experimental: {
    webpackBuildWorker: false,
    // Keep static generation single-worker friendly in restricted environments.
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 100,
  },
};

export default nextConfig;
