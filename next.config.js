module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/reservas',
          permanent: true,
        },
      ]
    },
  }