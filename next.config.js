// const nextTranslate = require("next-translate");

// module.exports = nextTranslate({
//   reactStrictMode: true,
// });

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tasks",
        permanent: true,
      },
    ];
  },
};
