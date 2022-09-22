const { resolve } = require('path');
const fs = require('fs');
const PROJECT_CONFIG = require('../project-config.js');

module.exports = function getDevServerConfig(options) {
  const HOST_NAME = PROJECT_CONFIG.DEV_SERVER_HOST;
  const PORT = PROJECT_CONFIG.DEV_SERVER_PORT;

  const devServer = {
    static: resolve(PROJECT_CONFIG.WEB_ROOT),
    host: HOST_NAME,
    port: PORT,
    compress: true,
    //disableHostCheck: true,
    hot: true,
    https: {
      spdy: {
        protocols: ['http/1.1']
      }
    },
    // noInfo: false,
    // stats: {
    //   // Config for minimal console.log mess.
    //   assets: true,
    //   colors: true,
    //   version: false,
    //   hash: false,
    //   timings: false,
    //   chunks: false,
    //   chunkModules: false,
    //   children: false
    // },
    open: true,

    // inline: true,
    historyApiFallback: {
      index: './index.html'
    }
  };

  // console.log('>>>> options.IS_MOCK_SERVER : ', options.IS_MOCK_SERVER);
  if (options.IS_MOCK_SERVER) {
    devServer.onBeforeSetupMiddleware = function handleAPIRequest(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.all('/api/**', function (req, res) {
        console.log('>>> req.path : ', req.path);
        console.log('>>> req.method : ', req.method);

        // console.log('>>>>>> req: ', req);

        const requestedPath = req.path;
        const derivedMockPath = `${requestedPath}/${req.method}`;

        // if(req.query) {
        // 	derivedMockPath = derivedMockPath +
        // }

        // console.log(`>>>> API Request\n\tMethod : ${req.method}\n\tUrl : ${requestedUrl}`);

        const mockPath = resolve(`${PROJECT_CONFIG.MOCK_ROOT}/`);

        try {
          const jsonResponse = JSON.parse(
            fs.readFileSync(`${mockPath}${derivedMockPath}.json`, 'utf8')
          );

          res.json(jsonResponse);
        } catch (error) {
          res.statusCode = 500;
          res.json(error);
        }
      });
    }
  }

  return devServer;
};
