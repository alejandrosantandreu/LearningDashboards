import {environment} from './environments/environment'

const PROXY_CONFIG = [
    {
        context: ["/api/*"],
        target: environment.api,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "https://backend-learning-dashboard.adaptable.app"
        }
    }
];
module.exports = PROXY_CONFIG;