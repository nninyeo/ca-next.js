 /** @type {import('next').NextConfig} */
 const nextConfig = {
    experimental: {
      appDir: true,
    },

    //노드 버전 문제로 인해 topLevelAwait기능은 일단 해제.
    // webpack(config) {
    //   config.experiments = { ...config.experiments, topLevelAwait: true }
    //   return config
    // }
  }
  module.exports = nextConfig