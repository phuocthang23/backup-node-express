export const Images = {
  getNotFound() {
    return new URL("./images/pngegg.png", import.meta.url).href;
  },

  getHome() {
    // file tĩnh
    return {
      getLogo() {
        return new URL("./images/logo.png", import.meta.url).href;
      },
      getBanner() {
        return new URL("./images/banner.png", import.meta.url).href;
      },
    };
  },
};
