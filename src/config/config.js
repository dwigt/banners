import config from 'react-global-configuration';

config.set({
    // apiRoot: "https://dwigt.github.io/banners/bannerapi"
        apiRoot: process.env.PUBLIC_URL + "/banners"
});