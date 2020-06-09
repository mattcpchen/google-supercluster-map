/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/app.js":
/*!***************************!*\
  !*** ./src/server/app.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(/*! express */ \"express\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nmodule.exports = function () {\n  var app = express(); // app.set('port', process.env.PORT || 57358);\n\n  app.set('port', process.env.PORT || 8080); // webpack with HMR\n\n  if (process.env.NODE_ENV === 'development') {\n    var webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\n    var webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n\n    var webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n\n    var webpackConfig = __webpack_require__(/*! ../../webpack.client.config */ \"./webpack.client.config.js\");\n\n    var compiler = webpack(webpackConfig);\n    app.use(webpackDevMiddleware(compiler, {\n      noInfo: true,\n      publicPath: webpackConfig.output.publicPath\n    }));\n    app.use(webpackHotMiddleware(compiler));\n  } // static routes\n\n\n  if (process.env.NODE_ENV === 'development') {\n    app.use(express[\"static\"](path.join(__dirname, '../../public/')));\n    app.use(express[\"static\"](path.join(__dirname, '../../dist/')));\n  } else if (process.env.NODE_ENV === 'production') {\n    app.use(express[\"static\"]('public'));\n    app.use(express[\"static\"]('dist'));\n  } // routes\n\n\n  app.get('/', _index);\n  return app;\n};\n\nvar _index = function _index(req, res) {\n  var indexHtmlPath = path.resolve('public/index.html');\n  res.sendFile(indexHtmlPath);\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/server/app.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var app = __webpack_require__(/*! ./app */ \"./src/server/app.js\")();\n\napp.listen(app.get('port'), function (err) {\n  if (err) return;\n  console.log('Server up ===> http://localhost:' + app.get('port'));\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./webpack.client.config.js":
/*!**********************************!*\
  !*** ./webpack.client.config.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(/*! path */ \"path\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nmodule.exports = {\n  mode: 'development',\n  entry: './src/client/index.js',\n  output: {\n    path: path.resolve(__dirname, './dist'),\n    filename: 'bundle.js',\n    publicPath: '/'\n  },\n  module: {\n    rules: [{\n      test: /\\.(js)$/,\n      exclude: /node_modules/,\n      use: 'babel-loader'\n    }]\n  },\n  plugins: [new webpack.HotModuleReplacementPlugin()],\n  devServer: {\n    contentBase: \"./public\",\n    colors: true,\n    hot: true,\n    headers: {\n      'Access-Control-Allow-Origin': '*'\n    },\n    historyApiFallback: true,\n    inline: true\n  },\n  optimization: {\n    nodeEnv: false\n  }\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./webpack.client.config.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ })

/******/ });