module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://60.205.247.119:8080/visit-sys",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
