/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/server/db/index.ts":
      /*!********************************!*\
  !*** ./src/server/db/index.ts ***!
  \********************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.Query = exports.Connection = void 0;\nvar mysql = __webpack_require__(/*! mysql */ "mysql");\nvar users_1 = __webpack_require__(/*! ./users */ "./src/server/db/users.ts");\nexports.Connection = mysql.createConnection({\n    host: "localhost",\n    port: 3306,\n    user: "JasonLayton",\n    password: "fakepassword",\n    database: "the_dynamic_curriculum",\n});\nvar Query = function (query, values) {\n    return new Promise(function (resolve, reject) {\n        exports.Connection.query(query, values, function (err, results) {\n            if (err)\n                return reject(err);\n            return resolve(results);\n        });\n    });\n};\nexports.Query = Query;\nexports.default = {\n    users: users_1.default,\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/index.ts?'
        );

        /***/
      },

    /***/ "./src/server/db/users.ts":
      /*!********************************!*\
  !*** ./src/server/db/users.ts ***!
  \********************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError("Generator is already executing.");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nvar index_1 = __webpack_require__(/*! ./index */ "./src/server/db/index.ts");\nvar all = function () { return __awaiter(void 0, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        return [2 /*return*/, index_1.Query("SELECT * from users")];\n    });\n}); };\nvar singleUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {\n    return __generator(this, function (_a) {\n        return [2 /*return*/, index_1.Query("SELECT * FROM users WHERE id=?", [id])];\n    });\n}); };\n//const createUser = async (user)\nexports.default = {\n    all: all,\n    singleUser: singleUser,\n};\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/db/users.ts?'
        );

        /***/
      },

    /***/ "./src/server/routes.ts":
      /*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nvar express = __webpack_require__(/*! express */ "express");\nvar routesForUsers_1 = __webpack_require__(/*! ./routesForUsers */ "./src/server/routesForUsers.ts");\nvar router = express.Router();\nrouter.get("/api/hello", function (req, res, next) {\n    res.json("World");\n});\nrouter.use("/users", routesForUsers_1.default);\nexports.default = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routes.ts?'
        );

        /***/
      },

    /***/ "./src/server/routesForUsers.ts":
      /*!**************************************!*\
  !*** ./src/server/routesForUsers.ts ***!
  \**************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError("Generator is already executing.");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ "express");\nvar db_1 = __webpack_require__(/*! ./db */ "./src/server/db/index.ts");\nvar router = express_1.Router();\n// router.get("/", async (req, res, next) => {\n//   try {\n//     let users = await db.users.all();\n//     res.json(users);\n//     console.log("hey");\n//   } catch (e) {\n//     console.log(e);\n//     res.sendStatus(500);\n//   }\n// });\nrouter.get("/:id?", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, _a, _b, _c, _d, e_1;\n    return __generator(this, function (_e) {\n        switch (_e.label) {\n            case 0:\n                id = Number(req.params.id);\n                _e.label = 1;\n            case 1:\n                _e.trys.push([1, 6, , 7]);\n                if (!id) return [3 /*break*/, 3];\n                _b = (_a = res).json;\n                return [4 /*yield*/, db_1.default.users.singleUser(id)];\n            case 2:\n                _b.apply(_a, [_e.sent()]);\n                return [3 /*break*/, 5];\n            case 3:\n                _d = (_c = res).json;\n                return [4 /*yield*/, db_1.default.users.all()];\n            case 4:\n                _d.apply(_c, [_e.sent()]);\n                _e.label = 5;\n            case 5: return [3 /*break*/, 7];\n            case 6:\n                e_1 = _e.sent();\n                console.log(e_1);\n                res.sendStatus(500);\n                return [3 /*break*/, 7];\n            case 7: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/routesForUsers.ts?'
        );

        /***/
      },

    /***/ "./src/server/server.ts":
      /*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nvar express = __webpack_require__(/*! express */ "express");\nvar routes_1 = __webpack_require__(/*! ./routes */ "./src/server/routes.ts");\nvar app = express();\napp.use(express.static("public"));\napp.use("/api", routes_1.default);\nvar port = process.env.PORT || 3000;\napp.listen(port, function () { return console.log("Server listening on port: " + port); });\n\n\n//# sourceURL=webpack://barebones-react-typescript-express/./src/server/server.ts?'
        );

        /***/
      },

    /***/ express:
      /*!**************************!*\
  !*** external "express" ***!
  \**************************/
      /***/ (module) => {
        module.exports = require("express");

        /***/
      },

    /***/ mysql:
      /*!************************!*\
  !*** external "mysql" ***!
  \************************/
      /***/ (module) => {
        module.exports = require("mysql");

        /***/
      },

    /******/
  }; // The module cache
  /************************************************************************/
  /******/ /******/ var __webpack_module_cache__ = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ __webpack_modules__[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // startup // Load entry module and return exports // This entry module can't be inlined because the eval devtool is used.
  /******/
  /************************************************************************/
  /******/
  /******/ /******/ /******/ /******/ var __webpack_exports__ = __webpack_require__(
    "./src/server/server.ts"
  );
  /******/
  /******/
})();
