import * as jsxRuntime from "react/jsx-runtime";
import { router, usePage, Link, Head, useForm as useForm$1, createInertiaApp } from "@inertiajs/react";
import { useDispatch, useSelector, Provider } from "react-redux";
import createNextState, { enableES5, isDraftable, isDraft } from "immer";
import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import * as React from "react";
import React__default, { useMemo, useRef, useReducer, useEffect, useCallback, forwardRef, useImperativeHandle, Fragment as Fragment$1, useState, createElement, createContext } from "react";
import Collapse, { Panel } from "rc-collapse";
import dayjs from "dayjs";
import classNames from "classnames";
import route from "ziggy-js";
import Skeleton from "react-loading-skeleton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Slider from "react-slick";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "react-helmet";
import ReactPaginate from "react-paginate";
import "tua-body-scroll-lock";
import PropTypes from "prop-types";
import { fromEvent } from "file-selector";
import accepts from "attr-accept";
import { Dialog } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import { useMediaQuery } from "react-responsive";
import { useDebounceEffect } from "ahooks";
import { jsonLdScriptProps } from "react-schemaorg";
import { Link as Link$1 } from "react-router-dom";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
const useAppDispatch = useDispatch;
const useAppSelector = useSelector;
var __extends = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __generator = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function(obj, key, value) {
  return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
};
var __spreadValues = function(a, b) {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var _i = 0, _c = __getOwnPropSymbols(b); _i < _c.length; _i++) {
      var prop = _c[_i];
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = function(a, b) {
  return __defProps(a, __getOwnPropDescs(b));
};
var __async = function(__this, __arguments, generator) {
  return new Promise(function(resolve, reject) {
    var fulfilled = function(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = function(value) {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = function(x) {
      return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0)
    return void 0;
  if (typeof arguments[0] === "object")
    return compose;
  return compose.apply(null, arguments);
};
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  var proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  var baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}
function getTimeMeasureUtils(maxDelay, fnName) {
  var elapsed = 0;
  return {
    measureTime: function(fn) {
      var started = Date.now();
      try {
        return fn();
      } finally {
        var finished = Date.now();
        elapsed += finished - started;
      }
    },
    warnIfExceeded: function() {
      if (elapsed > maxDelay) {
        console.warn(fnName + " took " + elapsed + "ms, which is more than the warning threshold of " + maxDelay + "ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.");
      }
    }
  };
}
var MiddlewareArray = (
  /** @class */
  function(_super) {
    __extends(MiddlewareArray2, _super);
    function MiddlewareArray2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, MiddlewareArray2.prototype);
      return _this;
    }
    Object.defineProperty(MiddlewareArray2, Symbol.species, {
      get: function() {
        return MiddlewareArray2;
      },
      enumerable: false,
      configurable: true
    });
    MiddlewareArray2.prototype.concat = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray2.prototype.prepend = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr[0].concat(this))))();
      }
      return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr.concat(this))))();
    };
    return MiddlewareArray2;
  }(Array)
);
function freezeDraftable(val) {
  return isDraftable(val) ? createNextState(val, function() {
  }) : val;
}
var isProduction = process.env.NODE_ENV === "production";
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  throw new Error(prefix + ": " + (message || ""));
}
function stringify(obj, serializer, indent, decycler) {
  return JSON.stringify(obj, getSerialize(serializer, decycler), indent);
}
function getSerialize(serializer, decycler) {
  var stack = [], keys = [];
  if (!decycler)
    decycler = function(_, value) {
      if (stack[0] === value)
        return "[Circular ~]";
      return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
    };
  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this);
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
      if (~stack.indexOf(value))
        value = decycler.call(this, key, value);
    } else
      stack.push(value);
    return serializer == null ? value : serializer.call(this, key, value);
  };
}
function isImmutableDefault(value) {
  return typeof value !== "object" || value == null || Object.isFrozen(value);
}
function trackForMutations(isImmutable, ignorePaths, obj) {
  var trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
  return {
    detectMutations: function() {
      return detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
    }
  };
}
function trackProperties(isImmutable, ignorePaths, obj, path) {
  if (ignorePaths === void 0) {
    ignorePaths = [];
  }
  if (path === void 0) {
    path = "";
  }
  var tracked = { value: obj };
  if (!isImmutable(obj)) {
    tracked.children = {};
    for (var key in obj) {
      var childPath = path ? path + "." + key : key;
      if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
        continue;
      }
      tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
    }
  }
  return tracked;
}
function detectMutations(isImmutable, ignorePaths, trackedProperty, obj, sameParentRef, path) {
  if (ignorePaths === void 0) {
    ignorePaths = [];
  }
  if (sameParentRef === void 0) {
    sameParentRef = false;
  }
  if (path === void 0) {
    path = "";
  }
  var prevObj = trackedProperty ? trackedProperty.value : void 0;
  var sameRef = prevObj === obj;
  if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
    return { wasMutated: true, path };
  }
  if (isImmutable(prevObj) || isImmutable(obj)) {
    return { wasMutated: false };
  }
  var keysToDetect = {};
  for (var key in trackedProperty.children) {
    keysToDetect[key] = true;
  }
  for (var key in obj) {
    keysToDetect[key] = true;
  }
  for (var key in keysToDetect) {
    var childPath = path ? path + "." + key : key;
    if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
      continue;
    }
    var result = detectMutations(isImmutable, ignorePaths, trackedProperty.children[key], obj[key], sameRef, childPath);
    if (result.wasMutated) {
      return result;
    }
  }
  return { wasMutated: false };
}
function createImmutableStateInvariantMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  if (process.env.NODE_ENV === "production") {
    return function() {
      return function(next) {
        return function(action) {
          return next(action);
        };
      };
    };
  }
  var _c = options.isImmutable, isImmutable = _c === void 0 ? isImmutableDefault : _c, ignoredPaths = options.ignoredPaths, _d = options.warnAfter, warnAfter = _d === void 0 ? 32 : _d, ignore = options.ignore;
  ignoredPaths = ignoredPaths || ignore;
  var track = trackForMutations.bind(null, isImmutable, ignoredPaths);
  return function(_c2) {
    var getState = _c2.getState;
    var state = getState();
    var tracker = track(state);
    var result;
    return function(next) {
      return function(action) {
        var measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
        measureUtils.measureTime(function() {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          invariant(!result.wasMutated, "A state mutation was detected between dispatches, in the path '" + (result.path || "") + "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        var dispatchedAction = next(action);
        measureUtils.measureTime(function() {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          result.wasMutated && invariant(!result.wasMutated, "A state mutation was detected inside a dispatch, in the path: " + (result.path || "") + ". Take a look at the reducer(s) handling the action " + stringify(action) + ". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        measureUtils.warnIfExceeded();
        return dispatchedAction;
      };
    };
  };
}
function isPlain(val) {
  var type = typeof val;
  return val == null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || isPlainObject(val);
}
function findNonSerializableValue(value, path, isSerializable, getEntries, ignoredPaths) {
  if (path === void 0) {
    path = "";
  }
  if (isSerializable === void 0) {
    isSerializable = isPlain;
  }
  if (ignoredPaths === void 0) {
    ignoredPaths = [];
  }
  var foundNestedSerializable;
  if (!isSerializable(value)) {
    return {
      keyPath: path || "<root>",
      value
    };
  }
  if (typeof value !== "object" || value === null) {
    return false;
  }
  var entries = getEntries != null ? getEntries(value) : Object.entries(value);
  var hasIgnoredPaths = ignoredPaths.length > 0;
  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var _c = entries_1[_i], key = _c[0], nestedValue = _c[1];
    var nestedPath = path ? path + "." + key : key;
    if (hasIgnoredPaths && ignoredPaths.indexOf(nestedPath) >= 0) {
      continue;
    }
    if (!isSerializable(nestedValue)) {
      return {
        keyPath: nestedPath,
        value: nestedValue
      };
    }
    if (typeof nestedValue === "object") {
      foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths);
      if (foundNestedSerializable) {
        return foundNestedSerializable;
      }
    }
  }
  return false;
}
function createSerializableStateInvariantMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  if (process.env.NODE_ENV === "production") {
    return function() {
      return function(next) {
        return function(action) {
          return next(action);
        };
      };
    };
  }
  var _c = options.isSerializable, isSerializable = _c === void 0 ? isPlain : _c, getEntries = options.getEntries, _d = options.ignoredActions, ignoredActions = _d === void 0 ? [] : _d, _e = options.ignoredActionPaths, ignoredActionPaths = _e === void 0 ? ["meta.arg", "meta.baseQueryMeta"] : _e, _f = options.ignoredPaths, ignoredPaths = _f === void 0 ? [] : _f, _g = options.warnAfter, warnAfter = _g === void 0 ? 32 : _g, _h = options.ignoreState, ignoreState = _h === void 0 ? false : _h, _j = options.ignoreActions, ignoreActions = _j === void 0 ? false : _j;
  return function(storeAPI) {
    return function(next) {
      return function(action) {
        var result = next(action);
        var measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
        if (!ignoreActions && !(ignoredActions.length && ignoredActions.indexOf(action.type) !== -1)) {
          measureUtils.measureTime(function() {
            var foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths);
            if (foundActionNonSerializableValue) {
              var keyPath = foundActionNonSerializableValue.keyPath, value = foundActionNonSerializableValue.value;
              console.error("A non-serializable value was detected in an action, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
            }
          });
        }
        if (!ignoreState) {
          measureUtils.measureTime(function() {
            var state = storeAPI.getState();
            var foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths);
            if (foundStateNonSerializableValue) {
              var keyPath = foundStateNonSerializableValue.keyPath, value = foundStateNonSerializableValue.value;
              console.error("A non-serializable value was detected in the state, in the path: `" + keyPath + "`. Value:", value, "\nTake a look at the reducer(s) handling this action type: " + action.type + ".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)");
            }
          });
          measureUtils.warnIfExceeded();
        }
        return result;
      };
    };
  };
}
function isBoolean(x) {
  return typeof x === "boolean";
}
function curryGetDefaultMiddleware() {
  return function curriedGetDefaultMiddleware(options) {
    return getDefaultMiddleware(options);
  };
}
function getDefaultMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  var _c = options.thunk, thunk = _c === void 0 ? true : _c, _d = options.immutableCheck, immutableCheck = _d === void 0 ? true : _d, _e = options.serializableCheck, serializableCheck = _e === void 0 ? true : _e;
  var middlewareArray = new MiddlewareArray();
  if (thunk) {
    if (isBoolean(thunk)) {
      middlewareArray.push(thunkMiddleware);
    } else {
      middlewareArray.push(thunkMiddleware.withExtraArgument(thunk.extraArgument));
    }
  }
  if (process.env.NODE_ENV !== "production") {
    if (immutableCheck) {
      var immutableOptions = {};
      if (!isBoolean(immutableCheck)) {
        immutableOptions = immutableCheck;
      }
      middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
    }
    if (serializableCheck) {
      var serializableOptions = {};
      if (!isBoolean(serializableCheck)) {
        serializableOptions = serializableCheck;
      }
      middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
    }
  }
  return middlewareArray;
}
var IS_PRODUCTION = process.env.NODE_ENV === "production";
function configureStore(options) {
  var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
  var _c = options || {}, _d = _c.reducer, reducer2 = _d === void 0 ? void 0 : _d, _e = _c.middleware, middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e, _f = _c.devTools, devTools = _f === void 0 ? true : _f, _g = _c.preloadedState, preloadedState = _g === void 0 ? void 0 : _g, _h = _c.enhancers, enhancers = _h === void 0 ? void 0 : _h;
  var rootReducer;
  if (typeof reducer2 === "function") {
    rootReducer = reducer2;
  } else if (isPlainObject(reducer2)) {
    rootReducer = combineReducers(reducer2);
  } else {
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  }
  var finalMiddleware = middleware;
  if (typeof finalMiddleware === "function") {
    finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
    if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
      throw new Error("when using a middleware builder function, an array of middleware must be returned");
    }
  }
  if (!IS_PRODUCTION && finalMiddleware.some(function(item) {
    return typeof item !== "function";
  })) {
    throw new Error("each middleware provided to configureStore must be a function");
  }
  var middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
  var finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools(__spreadValues({
      trace: !IS_PRODUCTION
    }, typeof devTools === "object" && devTools));
  }
  var storeEnhancers = [middlewareEnhancer];
  if (Array.isArray(enhancers)) {
    storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
  } else if (typeof enhancers === "function") {
    storeEnhancers = enhancers(storeEnhancers);
  }
  var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
}
function createAction(type, prepareAction) {
  function actionCreator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (prepareAction) {
      var prepared = prepareAction.apply(void 0, args);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }
      return __spreadValues(__spreadValues({
        type,
        payload: prepared.payload
      }, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
    }
    return { type, payload: args[0] };
  }
  actionCreator.toString = function() {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function(action) {
    return action.type === type;
  };
  return actionCreator;
}
function executeReducerBuilderCallback(builderCallback) {
  var actionsMap = {};
  var actionMatchers = [];
  var defaultCaseReducer;
  var builder = {
    addCase: function(typeOrActionCreator, reducer2) {
      if (process.env.NODE_ENV !== "production") {
        if (actionMatchers.length > 0) {
          throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");
        }
        if (defaultCaseReducer) {
          throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");
        }
      }
      var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (type in actionsMap) {
        throw new Error("addCase cannot be called with two reducers for the same action type");
      }
      actionsMap[type] = reducer2;
      return builder;
    },
    addMatcher: function(matcher, reducer2) {
      if (process.env.NODE_ENV !== "production") {
        if (defaultCaseReducer) {
          throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
        }
      }
      actionMatchers.push({ matcher, reducer: reducer2 });
      return builder;
    },
    addDefaultCase: function(reducer2) {
      if (process.env.NODE_ENV !== "production") {
        if (defaultCaseReducer) {
          throw new Error("`builder.addDefaultCase` can only be called once");
        }
      }
      defaultCaseReducer = reducer2;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function isStateFunction(x) {
  return typeof x === "function";
}
var hasWarnedAboutObjectNotation = false;
function createReducer(initialState2, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
  if (actionMatchers === void 0) {
    actionMatchers = [];
  }
  if (process.env.NODE_ENV !== "production") {
    if (typeof mapOrBuilderCallback === "object") {
      if (!hasWarnedAboutObjectNotation) {
        hasWarnedAboutObjectNotation = true;
        console.warn("The object notation for `createReducer` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
      }
    }
  }
  var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _c[0], finalActionMatchers = _c[1], finalDefaultCaseReducer = _c[2];
  var getInitialState;
  if (isStateFunction(initialState2)) {
    getInitialState = function() {
      return freezeDraftable(initialState2());
    };
  } else {
    var frozenInitialState_1 = freezeDraftable(initialState2);
    getInitialState = function() {
      return frozenInitialState_1;
    };
  }
  function reducer2(state, action) {
    if (state === void 0) {
      state = getInitialState();
    }
    var caseReducers = __spreadArray([
      actionsMap[action.type]
    ], finalActionMatchers.filter(function(_c2) {
      var matcher = _c2.matcher;
      return matcher(action);
    }).map(function(_c2) {
      var reducer22 = _c2.reducer;
      return reducer22;
    }));
    if (caseReducers.filter(function(cr) {
      return !!cr;
    }).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce(function(previousState, caseReducer) {
      if (caseReducer) {
        if (isDraft(previousState)) {
          var draft = previousState;
          var result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          var result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return createNextState(previousState, function(draft2) {
            return caseReducer(draft2, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer2.getInitialState = getInitialState;
  return reducer2;
}
var hasWarnedAboutObjectNotation2 = false;
function getType2(slice, actionKey) {
  return slice + "/" + actionKey;
}
function createSlice(options) {
  var name2 = options.name;
  if (!name2) {
    throw new Error("`name` is a required option for createSlice");
  }
  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    if (options.initialState === void 0) {
      console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    }
  }
  var initialState2 = typeof options.initialState == "function" ? options.initialState : freezeDraftable(options.initialState);
  var reducers = options.reducers || {};
  var reducerNames = Object.keys(reducers);
  var sliceCaseReducersByName = {};
  var sliceCaseReducersByType = {};
  var actionCreators = {};
  reducerNames.forEach(function(reducerName) {
    var maybeReducerWithPrepare = reducers[reducerName];
    var type = getType2(name2, reducerName);
    var caseReducer;
    var prepareCallback;
    if ("reducer" in maybeReducerWithPrepare) {
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    } else {
      caseReducer = maybeReducerWithPrepare;
    }
    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
    actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
  });
  function buildReducer() {
    if (process.env.NODE_ENV !== "production") {
      if (typeof options.extraReducers === "object") {
        if (!hasWarnedAboutObjectNotation2) {
          hasWarnedAboutObjectNotation2 = true;
          console.warn("The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
        }
      }
    }
    var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _d = _c[0], extraReducers = _d === void 0 ? {} : _d, _e = _c[1], actionMatchers = _e === void 0 ? [] : _e, _f = _c[2], defaultCaseReducer = _f === void 0 ? void 0 : _f;
    var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
    return createReducer(initialState2, function(builder) {
      for (var key in finalCaseReducers) {
        builder.addCase(key, finalCaseReducers[key]);
      }
      for (var _i = 0, actionMatchers_1 = actionMatchers; _i < actionMatchers_1.length; _i++) {
        var m = actionMatchers_1[_i];
        builder.addMatcher(m.matcher, m.reducer);
      }
      if (defaultCaseReducer) {
        builder.addDefaultCase(defaultCaseReducer);
      }
    });
  }
  var _reducer;
  return {
    name: name2,
    reducer: function(state, action) {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer(state, action);
    },
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName,
    getInitialState: function() {
      if (!_reducer)
        _reducer = buildReducer();
      return _reducer.getInitialState();
    }
  };
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function(size) {
  if (size === void 0) {
    size = 21;
  }
  var id = "";
  var i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var commonProperties = [
  "name",
  "message",
  "stack",
  "code"
];
var RejectWithValue = (
  /** @class */
  function() {
    function RejectWithValue2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return RejectWithValue2;
  }()
);
var FulfillWithMeta = (
  /** @class */
  function() {
    function FulfillWithMeta2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return FulfillWithMeta2;
  }()
);
var miniSerializeError = function(value) {
  if (typeof value === "object" && value !== null) {
    var simpleError = {};
    for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
      var property = commonProperties_1[_i];
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return { message: String(value) };
};
var createAsyncThunk = function() {
  function createAsyncThunk2(typePrefix, payloadCreator, options) {
    var fulfilled = createAction(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
      return {
        payload,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "fulfilled"
        })
      };
    });
    var pending = createAction(typePrefix + "/pending", function(requestId, arg, meta) {
      return {
        payload: void 0,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "pending"
        })
      };
    });
    var rejected = createAction(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
      return {
        payload,
        error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          rejectedWithValue: !!payload,
          requestStatus: "rejected",
          aborted: (error == null ? void 0 : error.name) === "AbortError",
          condition: (error == null ? void 0 : error.name) === "ConditionError"
        })
      };
    });
    var displayedWarning = false;
    var AC = typeof AbortController !== "undefined" ? AbortController : (
      /** @class */
      function() {
        function class_1() {
          this.signal = {
            aborted: false,
            addEventListener: function() {
            },
            dispatchEvent: function() {
              return false;
            },
            onabort: function() {
            },
            removeEventListener: function() {
            },
            reason: void 0,
            throwIfAborted: function() {
            }
          };
        }
        class_1.prototype.abort = function() {
          if (process.env.NODE_ENV !== "production") {
            if (!displayedWarning) {
              displayedWarning = true;
              console.info("This platform does not implement AbortController. \nIf you want to use the AbortController to react to `abort` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.");
            }
          }
        };
        return class_1;
      }()
    );
    function actionCreator(arg) {
      return function(dispatch, getState, extra) {
        var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
        var abortController = new AC();
        var abortReason;
        function abort(reason) {
          abortReason = reason;
          abortController.abort();
        }
        var promise2 = function() {
          return __async(this, null, function() {
            var _a, _b, finalAction, conditionResult, abortedPromise, err_1, skipDispatch;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _c.trys.push([0, 4, , 5]);
                  conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, { getState, extra });
                  if (!isThenable(conditionResult))
                    return [3, 2];
                  return [4, conditionResult];
                case 1:
                  conditionResult = _c.sent();
                  _c.label = 2;
                case 2:
                  if (conditionResult === false || abortController.signal.aborted) {
                    throw {
                      name: "ConditionError",
                      message: "Aborted due to condition callback returning false."
                    };
                  }
                  abortedPromise = new Promise(function(_, reject) {
                    return abortController.signal.addEventListener("abort", function() {
                      return reject({
                        name: "AbortError",
                        message: abortReason || "Aborted"
                      });
                    });
                  });
                  dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, { requestId, arg }, { getState, extra })));
                  return [4, Promise.race([
                    abortedPromise,
                    Promise.resolve(payloadCreator(arg, {
                      dispatch,
                      getState,
                      extra,
                      requestId,
                      signal: abortController.signal,
                      abort,
                      rejectWithValue: function(value, meta) {
                        return new RejectWithValue(value, meta);
                      },
                      fulfillWithValue: function(value, meta) {
                        return new FulfillWithMeta(value, meta);
                      }
                    })).then(function(result) {
                      if (result instanceof RejectWithValue) {
                        throw result;
                      }
                      if (result instanceof FulfillWithMeta) {
                        return fulfilled(result.payload, requestId, arg, result.meta);
                      }
                      return fulfilled(result, requestId, arg);
                    })
                  ])];
                case 3:
                  finalAction = _c.sent();
                  return [3, 5];
                case 4:
                  err_1 = _c.sent();
                  finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                  return [3, 5];
                case 5:
                  skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                  if (!skipDispatch) {
                    dispatch(finalAction);
                  }
                  return [2, finalAction];
              }
            });
          });
        }();
        return Object.assign(promise2, {
          abort,
          requestId,
          arg,
          unwrap: function() {
            return promise2.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(actionCreator, {
      pending,
      rejected,
      fulfilled,
      typePrefix
    });
  }
  createAsyncThunk2.withTypes = function() {
    return createAsyncThunk2;
  };
  return createAsyncThunk2;
}();
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}
var alm = "listenerMiddleware";
createAction(alm + "/add");
createAction(alm + "/removeAll");
createAction(alm + "/remove");
var promise;
typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : globalThis) : function(cb) {
  return (promise || (promise = Promise.resolve())).then(cb).catch(function(err) {
    return setTimeout(function() {
      throw err;
    }, 0);
  });
};
enableES5();
const api = axios.create({
  withCredentials: true,
  baseURL: `${"https://signs365.test"}/api`
});
api.interceptors.request.use(async (config) => {
  if (config.headers === void 0) {
    config.headers = {};
  }
  return config;
});
axios.defaults.withCredentials = true;
class AuthService {
  static async login(email, password) {
    await api.get("/sanctum/csrf-cookie");
    return api.post("/auth/login", { email, password });
  }
  static getUser() {
    return api.get("user");
  }
  static async register(email, password, name2) {
    await api.get("/sanctum/csrf-cookie");
    return api.post("/auth/register", { email, password, name: name2 });
  }
  static async logout() {
    return api.post("/auth/logout");
  }
  static async sendForgotPasswordRequest(email) {
    return api.post("/auth/forgot", { email });
  }
  static async resetPassword(token, password, passwordConfirmation) {
    return api.post("/auth/reset-password", {
      token,
      password,
      passwordConfirmation
    });
  }
}
class CartService {
  static getCart() {
    return api.get("/cart");
  }
  static calculateSinglePrice(productID, option_id, addons, unit, width, height, quantity, size_id) {
    return api.post("/cart/calculate-single", {
      product_id: productID,
      option_id,
      addons,
      unit,
      width,
      height,
      quantity,
      size_id
    });
  }
  static addToCart(body) {
    const formData = new FormData();
    console.log(body);
    for (const [key, value] of Object.entries(body)) {
      if (!value)
        continue;
      if (key === "addons") {
        for (let i = 0; i < value.length; i++) {
          for (let keyOfAddon of Object.keys(value[i])) {
            const field = value[i][keyOfAddon];
            formData.append(
              `addons[${i}][${keyOfAddon}]`,
              field instanceof Array ? JSON.stringify(field) : field
            );
          }
        }
        continue;
      }
      if (key === "files") {
        value.forEach((item) => formData.append(`files[]`, item));
        continue;
      }
      formData.append(key, value);
    }
    return api.post("/cart/add", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  static updateQuantity(body) {
    return api.post("/cart/update-quantity", body);
  }
  static removeItemFromCart(body) {
    return api.post("/cart/remove-item", body);
  }
  static clearCart() {
    return api.post("/cart/clear");
  }
}
class CategoryService {
  static getCategoriesWithProducts() {
    return api.get("/categories");
  }
}
const initialState$4 = {
  cart: void 0,
  loaded: false,
  fetching: false
};
const initCart = createAsyncThunk(
  "cart/init",
  async function(_, { rejectWithValue }) {
    try {
      const { data } = await CartService.getCart();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to get cart");
    }
  }
);
const addToCart = createAsyncThunk("cart/add", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.addToCart(params);
    return data;
  } catch (error) {
    return rejectWithValue("Failed add to cart");
  }
});
const updateQuantity = createAsyncThunk("cart/update-quantity", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.updateQuantity(params);
    return data;
  } catch (error) {
    return rejectWithValue("Failed add to cart");
  }
});
const removeItemFromCart = createAsyncThunk("cart/remove-item", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.removeItemFromCart(params);
    return data;
  } catch (error) {
    return rejectWithValue("Failed remove item from cart");
  }
});
const clearCart = createAsyncThunk("cart/clear", async (_, { rejectWithValue }) => {
  try {
    const { data } = await CartService.clearCart();
    if (data.ok) {
      return data;
    } else {
      return rejectWithValue("Failed clear cart");
    }
  } catch (error) {
    return rejectWithValue("Failed remove item from cart");
  }
});
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState$4,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initCart.pending, (state, action) => {
      state.loaded = false;
    });
    builder.addCase(initCart.fulfilled, (state, action) => {
      state.loaded = true;
      state.cart = action.payload;
    });
    builder.addCase(addToCart.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });
    builder.addCase(updateQuantity.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });
    builder.addCase(removeItemFromCart.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });
    builder.addCase(clearCart.pending, (state, action) => {
      state.fetching = true;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = {
        items: [],
        total: 0,
        tax: 0,
        total_with_tax: 0
      };
    });
  }
});
const cartReducer = cartSlice.reducer;
function generateAttributtesCartItem(attributes) {
  const customSize = (attributes == null ? void 0 : attributes.customSize) ? `${attributes.customSize.title};` : null;
  const calculatorSizes = !(attributes == null ? void 0 : attributes.customSize) && attributes.width && attributes.height ? `${attributes.width} x ${attributes.height} ${attributes == null ? void 0 : attributes.unit};` : null;
  return `${attributes == null ? void 0 : attributes.productOption.title}; ${customSize ? customSize : ""} ${calculatorSizes ? calculatorSizes : ""}`;
}
const CartItem = ({
  name: name2,
  quantity,
  price,
  id,
  attributes,
  associatedModel
}) => {
  const dispatch = useAppDispatch();
  const addItem = async () => {
    try {
      router.post(
        "/api/cart/update-quantity",
        {
          item_id: id,
          type: "add"
        },
        {
          onSuccess: () => {
            toast(`Successfully increased the quantity of ${name2}`, {
              type: "success"
            });
          }
        }
      );
    } catch (error) {
      toast("An error occurred while adding to cart", { type: "error" });
    }
  };
  const reduceItem = async () => {
    try {
      router.post(
        "/api/cart/update-quantity",
        {
          item_id: id,
          type: "reduce"
        },
        {
          onSuccess: () => {
            toast(`Successfully reduced the quantity of ${name2}`, {
              type: "success"
            });
          }
        }
      );
    } catch (error) {
      toast("An error occurred while reducing item", { type: "error" });
    }
  };
  const removeItem = async () => {
    try {
      await dispatch(removeItemFromCart({ item_id: id })).unwrap();
      toast(`Successfully removed ${name2}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };
  return /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx("td", { className: "ps-product__remove", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: removeItem, children: /* @__PURE__ */ jsx("i", { className: "icon-cross" }) }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__thumbnail", children: /* @__PURE__ */ jsx("a", { className: "ps-product__image", children: /* @__PURE__ */ jsx("figure", { children: associatedModel.images && associatedModel.images.length > 0 ? /* @__PURE__ */ jsx(
      "img",
      {
        src: `/storage/${associatedModel.images[0].path}`,
        alt: associatedModel.images[0].alt ? associatedModel.images[0].alt : name2
      }
    ) : null }) }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__name", children: /* @__PURE__ */ jsxs("a", { href: "", children: [
      name2,
      /* @__PURE__ */ jsx("p", { children: generateAttributtesCartItem(attributes) })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__meta", children: /* @__PURE__ */ jsxs("span", { className: "ps-product__price", children: [
      "$",
      price.toLocaleString()
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "ps-product__quantity", children: /* @__PURE__ */ jsxs("div", { className: "def-number-input number-input safari_only", children: [
      /* @__PURE__ */ jsx("button", { className: "minus", onClick: reduceItem, children: /* @__PURE__ */ jsx("i", { className: "icon-minus" }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "quantity",
          min: "1",
          name: "quantity",
          value: quantity,
          type: "number",
          readOnly: true
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "plus", onClick: addItem, children: /* @__PURE__ */ jsx("i", { className: "icon-plus" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("td", { className: "ps-product__subtotal", children: [
      "$",
      (price * quantity).toLocaleString()
    ] })
  ] });
};
const CartList = ({ items }) => {
  return /* @__PURE__ */ jsx("div", { className: "ps-shopping__table", children: /* @__PURE__ */ jsxs("table", { className: "table ps-table ps-table--product", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "ps-product__remove" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__thumbnail" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__name", children: "Product name" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__meta", children: "Unit price" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__quantity", children: "Quantity" }),
      /* @__PURE__ */ jsx("th", { className: "ps-product__subtotal", children: "Subtotal" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: items.map((cartItem) => /* @__PURE__ */ jsx(CartItem, { ...cartItem, id: cartItem.id })) })
  ] }) });
};
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$1(arr);
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$1(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
var FILE_INVALID_TYPE = "file-invalid-type";
var FILE_TOO_LARGE = "file-too-large";
var FILE_TOO_SMALL = "file-too-small";
var TOO_MANY_FILES = "too-many-files";
var getInvalidTypeRejectionErr = function getInvalidTypeRejectionErr2(accept) {
  accept = Array.isArray(accept) && accept.length === 1 ? accept[0] : accept;
  var messageSuffix = Array.isArray(accept) ? "one of ".concat(accept.join(", ")) : accept;
  return {
    code: FILE_INVALID_TYPE,
    message: "File type must be ".concat(messageSuffix)
  };
};
var getTooLargeRejectionErr = function getTooLargeRejectionErr2(maxSize) {
  return {
    code: FILE_TOO_LARGE,
    message: "File is larger than ".concat(maxSize, " ").concat(maxSize === 1 ? "byte" : "bytes")
  };
};
var getTooSmallRejectionErr = function getTooSmallRejectionErr2(minSize) {
  return {
    code: FILE_TOO_SMALL,
    message: "File is smaller than ".concat(minSize, " ").concat(minSize === 1 ? "byte" : "bytes")
  };
};
var TOO_MANY_FILES_REJECTION = {
  code: TOO_MANY_FILES,
  message: "Too many files"
};
function fileAccepted(file, accept) {
  var isAcceptable = file.type === "application/x-moz-file" || accepts(file, accept);
  return [isAcceptable, isAcceptable ? null : getInvalidTypeRejectionErr(accept)];
}
function fileMatchSize(file, minSize, maxSize) {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize)) {
      if (file.size > maxSize)
        return [false, getTooLargeRejectionErr(maxSize)];
      if (file.size < minSize)
        return [false, getTooSmallRejectionErr(minSize)];
    } else if (isDefined(minSize) && file.size < minSize)
      return [false, getTooSmallRejectionErr(minSize)];
    else if (isDefined(maxSize) && file.size > maxSize)
      return [false, getTooLargeRejectionErr(maxSize)];
  }
  return [true, null];
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function allFilesAccepted(_ref) {
  var files = _ref.files, accept = _ref.accept, minSize = _ref.minSize, maxSize = _ref.maxSize, multiple = _ref.multiple, maxFiles = _ref.maxFiles, validator = _ref.validator;
  if (!multiple && files.length > 1 || multiple && maxFiles >= 1 && files.length > maxFiles) {
    return false;
  }
  return files.every(function(file) {
    var _fileAccepted = fileAccepted(file, accept), _fileAccepted2 = _slicedToArray$1(_fileAccepted, 1), accepted = _fileAccepted2[0];
    var _fileMatchSize = fileMatchSize(file, minSize, maxSize), _fileMatchSize2 = _slicedToArray$1(_fileMatchSize, 1), sizeMatch = _fileMatchSize2[0];
    var customErrors = validator ? validator(file) : null;
    return accepted && sizeMatch && !customErrors;
  });
}
function isPropagationStopped(event) {
  if (typeof event.isPropagationStopped === "function") {
    return event.isPropagationStopped();
  } else if (typeof event.cancelBubble !== "undefined") {
    return event.cancelBubble;
  }
  return false;
}
function isEvtWithFiles(event) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  }
  return Array.prototype.some.call(event.dataTransfer.types, function(type) {
    return type === "Files" || type === "application/x-moz-file";
  });
}
function onDocumentDragOver(event) {
  event.preventDefault();
}
function isIe(userAgent) {
  return userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1;
}
function isEdge(userAgent) {
  return userAgent.indexOf("Edge/") !== -1;
}
function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
  return isIe(userAgent) || isEdge(userAgent);
}
function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return fns.some(function(fn) {
      if (!isPropagationStopped(event) && fn) {
        fn.apply(void 0, [event].concat(args));
      }
      return isPropagationStopped(event);
    });
  };
}
function canUseFileSystemAccessAPI() {
  return "showOpenFilePicker" in window;
}
function pickerOptionsFromAccept(accept) {
  if (isDefined(accept)) {
    var acceptForPicker = Object.entries(accept).filter(function(_ref2) {
      var _ref3 = _slicedToArray$1(_ref2, 2), mimeType = _ref3[0], ext = _ref3[1];
      var ok = true;
      if (!isMIMEType(mimeType)) {
        console.warn('Skipped "'.concat(mimeType, '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.'));
        ok = false;
      }
      if (!Array.isArray(ext) || !ext.every(isExt)) {
        console.warn('Skipped "'.concat(mimeType, '" because an invalid file extension was provided.'));
        ok = false;
      }
      return ok;
    }).reduce(function(agg, _ref4) {
      var _ref5 = _slicedToArray$1(_ref4, 2), mimeType = _ref5[0], ext = _ref5[1];
      return _objectSpread$1(_objectSpread$1({}, agg), {}, _defineProperty$1({}, mimeType, ext));
    }, {});
    return [{
      // description is required due to https://crbug.com/1264708
      description: "Files",
      accept: acceptForPicker
    }];
  }
  return accept;
}
function acceptPropAsAcceptAttr(accept) {
  if (isDefined(accept)) {
    return Object.entries(accept).reduce(function(a, _ref6) {
      var _ref7 = _slicedToArray$1(_ref6, 2), mimeType = _ref7[0], ext = _ref7[1];
      return [].concat(_toConsumableArray$1(a), [mimeType], _toConsumableArray$1(ext));
    }, []).filter(function(v) {
      return isMIMEType(v) || isExt(v);
    }).join(",");
  }
  return void 0;
}
function isAbort(v) {
  return v instanceof DOMException && (v.name === "AbortError" || v.code === v.ABORT_ERR);
}
function isSecurityError(v) {
  return v instanceof DOMException && (v.name === "SecurityError" || v.code === v.SECURITY_ERR);
}
function isMIMEType(v) {
  return v === "audio/*" || v === "video/*" || v === "image/*" || v === "text/*" || /\w+\/[-+.\w]+/g.test(v);
}
function isExt(v) {
  return /^.*\.[\w]+$/.test(v);
}
var _excluded = ["children"], _excluded2 = ["open"], _excluded3 = ["refKey", "role", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"], _excluded4 = ["refKey", "onChange", "onClick"];
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var Dropzone$1 = /* @__PURE__ */ forwardRef(function(_ref, ref) {
  var children = _ref.children, params = _objectWithoutProperties(_ref, _excluded);
  var _useDropzone = useDropzone(params), open = _useDropzone.open, props = _objectWithoutProperties(_useDropzone, _excluded2);
  useImperativeHandle(ref, function() {
    return {
      open
    };
  }, [open]);
  return /* @__PURE__ */ React__default.createElement(Fragment$1, null, children(_objectSpread(_objectSpread({}, props), {}, {
    open
  })));
});
Dropzone$1.displayName = "Dropzone";
var defaultProps = {
  disabled: false,
  getFilesFromEvent: fromEvent,
  maxSize: Infinity,
  minSize: 0,
  multiple: true,
  maxFiles: 0,
  preventDropOnDocument: true,
  noClick: false,
  noKeyboard: false,
  noDrag: false,
  noDragEventsBubbling: false,
  validator: null,
  useFsAccessApi: true,
  autoFocus: false
};
Dropzone$1.defaultProps = defaultProps;
Dropzone$1.propTypes = {
  /**
   * Render function that exposes the dropzone state and prop getter fns
   *
   * @param {object} params
   * @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} params.open Open the native file selection dialog
   * @param {boolean} params.isFocused Dropzone area is in focus
   * @param {boolean} params.isFileDialogActive File dialog is opened
   * @param {boolean} params.isDragActive Active drag is in progress
   * @param {boolean} params.isDragAccept Dragged files are accepted
   * @param {boolean} params.isDragReject Some dragged files are rejected
   * @param {File[]} params.acceptedFiles Accepted files
   * @param {FileRejection[]} params.fileRejections Rejected files and why they were rejected
   */
  children: PropTypes.func,
  /**
   * Set accepted file types.
   * Checkout https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker types option for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all (https://github.com/react-dropzone/react-dropzone/issues/276).
   */
  accept: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: PropTypes.bool,
  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: PropTypes.bool,
  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: PropTypes.bool,
  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: PropTypes.bool,
  /**
   * If true, disables drag 'n' drop
   */
  noDrag: PropTypes.bool,
  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: PropTypes.bool,
  /**
   * Minimum file size (in bytes)
   */
  minSize: PropTypes.number,
  /**
   * Maximum file size (in bytes)
   */
  maxSize: PropTypes.number,
  /**
   * Maximum accepted number of files
   * The default value is 0 which means there is no limitation to how many files are accepted.
   */
  maxFiles: PropTypes.number,
  /**
   * Enable/disable the dropzone
   */
  disabled: PropTypes.bool,
  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: PropTypes.func,
  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: PropTypes.func,
  /**
   * Cb for when opening the file dialog
   */
  onFileDialogOpen: PropTypes.func,
  /**
   * Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   * to open the file picker instead of using an `<input type="file">` click event.
   */
  useFsAccessApi: PropTypes.bool,
  /**
   * Set to true to focus the root element on render
   */
  autoFocus: PropTypes.bool,
  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: PropTypes.func,
  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: PropTypes.func,
  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: PropTypes.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
   *
   * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
   * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   * If `multiple` is set to false and additional files are dropped,
   * all files besides the first will be rejected.
   * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
   *
   * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
   * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
   *
   * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```js
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   *
   * @param {File[]} acceptedFiles
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  onDrop: PropTypes.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: PropTypes.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: PropTypes.func,
  /**
   * Cb for when there's some error from any of the promises.
   *
   * @param {Error} error
   */
  onError: PropTypes.func,
  /**
   * Custom validation function. It must return null if there's no errors.
   * @param {File} file
   * @returns {FileError|FileError[]|null}
   */
  validator: PropTypes.func
};
var initialState$3 = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  acceptedFiles: [],
  fileRejections: []
};
function useDropzone() {
  var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _defaultProps$props = _objectSpread(_objectSpread({}, defaultProps), props), accept = _defaultProps$props.accept, disabled = _defaultProps$props.disabled, getFilesFromEvent = _defaultProps$props.getFilesFromEvent, maxSize = _defaultProps$props.maxSize, minSize = _defaultProps$props.minSize, multiple = _defaultProps$props.multiple, maxFiles = _defaultProps$props.maxFiles, onDragEnter = _defaultProps$props.onDragEnter, onDragLeave = _defaultProps$props.onDragLeave, onDragOver = _defaultProps$props.onDragOver, onDrop = _defaultProps$props.onDrop, onDropAccepted = _defaultProps$props.onDropAccepted, onDropRejected = _defaultProps$props.onDropRejected, onFileDialogCancel = _defaultProps$props.onFileDialogCancel, onFileDialogOpen = _defaultProps$props.onFileDialogOpen, useFsAccessApi = _defaultProps$props.useFsAccessApi, autoFocus = _defaultProps$props.autoFocus, preventDropOnDocument = _defaultProps$props.preventDropOnDocument, noClick = _defaultProps$props.noClick, noKeyboard = _defaultProps$props.noKeyboard, noDrag = _defaultProps$props.noDrag, noDragEventsBubbling = _defaultProps$props.noDragEventsBubbling, onError = _defaultProps$props.onError, validator = _defaultProps$props.validator;
  var acceptAttr = useMemo(function() {
    return acceptPropAsAcceptAttr(accept);
  }, [accept]);
  var pickerTypes = useMemo(function() {
    return pickerOptionsFromAccept(accept);
  }, [accept]);
  var onFileDialogOpenCb = useMemo(function() {
    return typeof onFileDialogOpen === "function" ? onFileDialogOpen : noop;
  }, [onFileDialogOpen]);
  var onFileDialogCancelCb = useMemo(function() {
    return typeof onFileDialogCancel === "function" ? onFileDialogCancel : noop;
  }, [onFileDialogCancel]);
  var rootRef = useRef(null);
  var inputRef = useRef(null);
  var _useReducer = useReducer(reducer, initialState$3), _useReducer2 = _slicedToArray(_useReducer, 2), state = _useReducer2[0], dispatch = _useReducer2[1];
  var isFocused = state.isFocused, isFileDialogActive = state.isFileDialogActive;
  var fsAccessApiWorksRef = useRef(typeof window !== "undefined" && window.isSecureContext && useFsAccessApi && canUseFileSystemAccessAPI());
  var onWindowFocus = function onWindowFocus2() {
    if (!fsAccessApiWorksRef.current && isFileDialogActive) {
      setTimeout(function() {
        if (inputRef.current) {
          var files = inputRef.current.files;
          if (!files.length) {
            dispatch({
              type: "closeDialog"
            });
            onFileDialogCancelCb();
          }
        }
      }, 300);
    }
  };
  useEffect(function() {
    window.addEventListener("focus", onWindowFocus, false);
    return function() {
      window.removeEventListener("focus", onWindowFocus, false);
    };
  }, [inputRef, isFileDialogActive, onFileDialogCancelCb, fsAccessApiWorksRef]);
  var dragTargetsRef = useRef([]);
  var onDocumentDrop = function onDocumentDrop2(event) {
    if (rootRef.current && rootRef.current.contains(event.target)) {
      return;
    }
    event.preventDefault();
    dragTargetsRef.current = [];
  };
  useEffect(function() {
    if (preventDropOnDocument) {
      document.addEventListener("dragover", onDocumentDragOver, false);
      document.addEventListener("drop", onDocumentDrop, false);
    }
    return function() {
      if (preventDropOnDocument) {
        document.removeEventListener("dragover", onDocumentDragOver);
        document.removeEventListener("drop", onDocumentDrop);
      }
    };
  }, [rootRef, preventDropOnDocument]);
  useEffect(function() {
    if (!disabled && autoFocus && rootRef.current) {
      rootRef.current.focus();
    }
    return function() {
    };
  }, [rootRef, autoFocus, disabled]);
  var onErrCb = useCallback(function(e) {
    if (onError) {
      onError(e);
    } else {
      console.error(e);
    }
  }, [onError]);
  var onDragEnterCb = useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [].concat(_toConsumableArray(dragTargetsRef.current), [event.target]);
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function(files) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        var fileCount = files.length;
        var isDragAccept = fileCount > 0 && allFilesAccepted({
          files,
          accept: acceptAttr,
          minSize,
          maxSize,
          multiple,
          maxFiles,
          validator
        });
        var isDragReject = fileCount > 0 && !isDragAccept;
        dispatch({
          isDragAccept,
          isDragReject,
          isDragActive: true,
          type: "setDraggedFiles"
        });
        if (onDragEnter) {
          onDragEnter(event);
        }
      }).catch(function(e) {
        return onErrCb(e);
      });
    }
  }, [getFilesFromEvent, onDragEnter, onErrCb, noDragEventsBubbling, acceptAttr, minSize, maxSize, multiple, maxFiles, validator]);
  var onDragOverCb = useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    var hasFiles = isEvtWithFiles(event);
    if (hasFiles && event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = "copy";
      } catch (_unused) {
      }
    }
    if (hasFiles && onDragOver) {
      onDragOver(event);
    }
    return false;
  }, [onDragOver, noDragEventsBubbling]);
  var onDragLeaveCb = useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    var targets = dragTargetsRef.current.filter(function(target) {
      return rootRef.current && rootRef.current.contains(target);
    });
    var targetIdx = targets.indexOf(event.target);
    if (targetIdx !== -1) {
      targets.splice(targetIdx, 1);
    }
    dragTargetsRef.current = targets;
    if (targets.length > 0) {
      return;
    }
    dispatch({
      type: "setDraggedFiles",
      isDragActive: false,
      isDragAccept: false,
      isDragReject: false
    });
    if (isEvtWithFiles(event) && onDragLeave) {
      onDragLeave(event);
    }
  }, [rootRef, onDragLeave, noDragEventsBubbling]);
  var setFiles = useCallback(function(files, event) {
    var acceptedFiles = [];
    var fileRejections = [];
    files.forEach(function(file) {
      var _fileAccepted = fileAccepted(file, acceptAttr), _fileAccepted2 = _slicedToArray(_fileAccepted, 2), accepted = _fileAccepted2[0], acceptError = _fileAccepted2[1];
      var _fileMatchSize = fileMatchSize(file, minSize, maxSize), _fileMatchSize2 = _slicedToArray(_fileMatchSize, 2), sizeMatch = _fileMatchSize2[0], sizeError = _fileMatchSize2[1];
      var customErrors = validator ? validator(file) : null;
      if (accepted && sizeMatch && !customErrors) {
        acceptedFiles.push(file);
      } else {
        var errors = [acceptError, sizeError];
        if (customErrors) {
          errors = errors.concat(customErrors);
        }
        fileRejections.push({
          file,
          errors: errors.filter(function(e) {
            return e;
          })
        });
      }
    });
    if (!multiple && acceptedFiles.length > 1 || multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles) {
      acceptedFiles.forEach(function(file) {
        fileRejections.push({
          file,
          errors: [TOO_MANY_FILES_REJECTION]
        });
      });
      acceptedFiles.splice(0);
    }
    dispatch({
      acceptedFiles,
      fileRejections,
      type: "setFiles"
    });
    if (onDrop) {
      onDrop(acceptedFiles, fileRejections, event);
    }
    if (fileRejections.length > 0 && onDropRejected) {
      onDropRejected(fileRejections, event);
    }
    if (acceptedFiles.length > 0 && onDropAccepted) {
      onDropAccepted(acceptedFiles, event);
    }
  }, [dispatch, multiple, acceptAttr, minSize, maxSize, maxFiles, onDrop, onDropAccepted, onDropRejected, validator]);
  var onDropCb = useCallback(function(event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [];
    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function(files) {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }
        setFiles(files, event);
      }).catch(function(e) {
        return onErrCb(e);
      });
    }
    dispatch({
      type: "reset"
    });
  }, [getFilesFromEvent, setFiles, onErrCb, noDragEventsBubbling]);
  var openFileDialog = useCallback(function() {
    if (fsAccessApiWorksRef.current) {
      dispatch({
        type: "openDialog"
      });
      onFileDialogOpenCb();
      var opts = {
        multiple,
        types: pickerTypes
      };
      window.showOpenFilePicker(opts).then(function(handles) {
        return getFilesFromEvent(handles);
      }).then(function(files) {
        setFiles(files, null);
        dispatch({
          type: "closeDialog"
        });
      }).catch(function(e) {
        if (isAbort(e)) {
          onFileDialogCancelCb(e);
          dispatch({
            type: "closeDialog"
          });
        } else if (isSecurityError(e)) {
          fsAccessApiWorksRef.current = false;
          if (inputRef.current) {
            inputRef.current.value = null;
            inputRef.current.click();
          } else {
            onErrCb(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."));
          }
        } else {
          onErrCb(e);
        }
      });
      return;
    }
    if (inputRef.current) {
      dispatch({
        type: "openDialog"
      });
      onFileDialogOpenCb();
      inputRef.current.value = null;
      inputRef.current.click();
    }
  }, [dispatch, onFileDialogOpenCb, onFileDialogCancelCb, useFsAccessApi, setFiles, onErrCb, pickerTypes, multiple]);
  var onKeyDownCb = useCallback(function(event) {
    if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
      return;
    }
    if (event.key === " " || event.key === "Enter" || event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      openFileDialog();
    }
  }, [rootRef, openFileDialog]);
  var onFocusCb = useCallback(function() {
    dispatch({
      type: "focus"
    });
  }, []);
  var onBlurCb = useCallback(function() {
    dispatch({
      type: "blur"
    });
  }, []);
  var onClickCb = useCallback(function() {
    if (noClick) {
      return;
    }
    if (isIeOrEdge()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }, [noClick, openFileDialog]);
  var composeHandler = function composeHandler2(fn) {
    return disabled ? null : fn;
  };
  var composeKeyboardHandler = function composeKeyboardHandler2(fn) {
    return noKeyboard ? null : composeHandler(fn);
  };
  var composeDragHandler = function composeDragHandler2(fn) {
    return noDrag ? null : composeHandler(fn);
  };
  var stopPropagation = function stopPropagation2(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  };
  var getRootProps = useMemo(function() {
    return function() {
      var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref2$refKey = _ref2.refKey, refKey = _ref2$refKey === void 0 ? "ref" : _ref2$refKey, role = _ref2.role, onKeyDown = _ref2.onKeyDown, onFocus = _ref2.onFocus, onBlur = _ref2.onBlur, onClick = _ref2.onClick, onDragEnter2 = _ref2.onDragEnter, onDragOver2 = _ref2.onDragOver, onDragLeave2 = _ref2.onDragLeave, onDrop2 = _ref2.onDrop, rest = _objectWithoutProperties(_ref2, _excluded3);
      return _objectSpread(_objectSpread(_defineProperty({
        onKeyDown: composeKeyboardHandler(composeEventHandlers(onKeyDown, onKeyDownCb)),
        onFocus: composeKeyboardHandler(composeEventHandlers(onFocus, onFocusCb)),
        onBlur: composeKeyboardHandler(composeEventHandlers(onBlur, onBlurCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
        onDragEnter: composeDragHandler(composeEventHandlers(onDragEnter2, onDragEnterCb)),
        onDragOver: composeDragHandler(composeEventHandlers(onDragOver2, onDragOverCb)),
        onDragLeave: composeDragHandler(composeEventHandlers(onDragLeave2, onDragLeaveCb)),
        onDrop: composeDragHandler(composeEventHandlers(onDrop2, onDropCb)),
        role: typeof role === "string" && role !== "" ? role : "presentation"
      }, refKey, rootRef), !disabled && !noKeyboard ? {
        tabIndex: 0
      } : {}), rest);
    };
  }, [rootRef, onKeyDownCb, onFocusCb, onBlurCb, onClickCb, onDragEnterCb, onDragOverCb, onDragLeaveCb, onDropCb, noKeyboard, noDrag, disabled]);
  var onInputElementClick = useCallback(function(event) {
    event.stopPropagation();
  }, []);
  var getInputProps = useMemo(function() {
    return function() {
      var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, onChange = _ref3.onChange, onClick = _ref3.onClick, rest = _objectWithoutProperties(_ref3, _excluded4);
      var inputProps = _defineProperty({
        accept: acceptAttr,
        multiple,
        type: "file",
        style: {
          display: "none"
        },
        onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onInputElementClick)),
        tabIndex: -1
      }, refKey, inputRef);
      return _objectSpread(_objectSpread({}, inputProps), rest);
    };
  }, [inputRef, accept, multiple, onDropCb, disabled]);
  return _objectSpread(_objectSpread({}, state), {}, {
    isFocused: isFocused && !disabled,
    getRootProps,
    getInputProps,
    rootRef,
    inputRef,
    open: composeHandler(openFileDialog)
  });
}
function reducer(state, action) {
  switch (action.type) {
    case "focus":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: true
      });
    case "blur":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: false
      });
    case "openDialog":
      return _objectSpread(_objectSpread({}, initialState$3), {}, {
        isFileDialogActive: true
      });
    case "closeDialog":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFileDialogActive: false
      });
    case "setDraggedFiles":
      return _objectSpread(_objectSpread({}, state), {}, {
        isDragActive: action.isDragActive,
        isDragAccept: action.isDragAccept,
        isDragReject: action.isDragReject
      });
    case "setFiles":
      return _objectSpread(_objectSpread({}, state), {}, {
        acceptedFiles: action.acceptedFiles,
        fileRejections: action.fileRejections
      });
    case "reset":
      return _objectSpread({}, initialState$3);
    default:
      return state;
  }
}
function noop() {
}
const baseStyle = {
  flex: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  flexDirection: "column",
  transition: "border .24s ease-in-out"
};
const focusedStyle = {
  borderColor: "#2196f3"
};
const acceptStyle = {
  borderColor: "#00e676"
};
const rejectStyle = {
  borderColor: "#ff1744"
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4
};
const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};
const img = {
  display: "block",
  width: "auto",
  height: "100%"
};
const Dropzone = ({ onDrop }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { "image/*": [] },
    onDrop(acceptedFiles, fileRejections, event) {
      setFiles(
        acceptedFiles.map(
          (file) => Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
      console.log(acceptedFiles);
    }
  });
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  useEffect(() => {
    if (onDrop) {
      onDrop(files);
    }
  }, [files]);
  const style2 = useMemo(
    () => ({
      ...baseStyle,
      ...isFocused ? focusedStyle : {},
      ...isDragAccept ? acceptStyle : {},
      ...isDragReject ? rejectStyle : {}
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const thumbs = files.map((file) => /* @__PURE__ */ jsx("div", { style: thumb, children: /* @__PURE__ */ jsx("div", { style: thumbInner, children: /* @__PURE__ */ jsx(
    "img",
    {
      src: file.preview,
      style: img,
      onLoad: () => {
        URL.revokeObjectURL(file.preview);
      }
    }
  ) }) }, file.name));
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("div", { ...getRootProps({ style: { ...style2, flexDirection: "column" } }), children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsx("div", { children: "Drag 'n' drop some files here, or click to select files" })
    ] }),
    /* @__PURE__ */ jsx(
      "aside",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          marginTop: 15,
          flexWrap: "wrap"
        },
        children: thumbs
      }
    )
  ] });
};
const EmptyPage = ({
  size = "default",
  iconClass,
  title
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "cart-empty text-center title-with-icon-section",
      style: { height: size === "small" ? "50vh" : "70vh", width: "100%" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", children: /* @__PURE__ */ jsx(
          "i",
          {
            className: iconClass,
            style: { color: "#5b6c8f", fontSize: 120 }
          }
        ) }),
        /* @__PURE__ */ jsx("h1", { className: "cart-title", style: { color: "#103178", marginTop: 20 }, children: title })
      ]
    }
  );
};
const getCollapsedHeight = () => ({
  height: 0,
  opacity: 0
});
const getRealHeight = (node) => ({
  height: node.scrollHeight,
  opacity: 1
});
const getCurrentHeight = (node) => ({
  height: node.offsetHeight
});
const skipOpacityTransition = (_, event) => event.propertyName === "height";
const collapseMotion = {
  motionName: "rc-collapse-motion",
  onEnterStart: getCollapsedHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
  leavedClassName: "rc-collapse-content-hidden"
};
const index = "";
const style$7 = "";
const arrowPath = "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";
function expandIcon({ isActive }) {
  return /* @__PURE__ */ jsx("i", { style: { marginRight: ".5rem" }, children: /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 1024 1024",
      width: "1em",
      height: "1em",
      fill: "currentColor",
      style: {
        verticalAlign: "-.125em",
        transition: "transform .2s",
        transform: `rotate(${isActive ? 90 : 0}deg)`
      },
      children: /* @__PURE__ */ jsx("path", { d: arrowPath })
    }
  ) });
}
const OrderCard = ({
  status,
  total_without_tax,
  total,
  address,
  uuid,
  created_at,
  order_items
}) => {
  console.log(order_items);
  return /* @__PURE__ */ jsxs("div", { className: "order-item", style: { marginBottom: 25 }, children: [
    /* @__PURE__ */ jsx("div", { className: "order-item-panel-title", children: /* @__PURE__ */ jsxs("h2", { children: [
      "Order UUID",
      " ",
      /* @__PURE__ */ jsx("strong", { style: { textTransform: "uppercase" }, children: uuid })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "order-item-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Status:" }),
        /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Order Date:" }),
        /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: dayjs(created_at).format("MMM D, YYYY h:mm A	") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Address:" }),
        /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: address })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Total Without Tax:" }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-10 col-6 order-item-value", children: [
          "$",
          total_without_tax.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Total:" }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-10 col-6 order-item-value", children: [
          "$",
          total.toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { accordion: true, openMotion: collapseMotion, children: /* @__PURE__ */ jsx(
      Panel,
      {
        header: `${order_items.length} Orders Items`,
        expandIcon,
        children: order_items.map((item) => {
          var _a, _b;
          return /* @__PURE__ */ jsxs("div", { className: "mini-order-item", children: [
            ((_a = item.product) == null ? void 0 : _a.images.length) >= 1 ? /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${item.product.images[0].path}`,
                alt: item.product.images[0].alt,
                style: { width: 100, height: 100, objectFit: "cover" }
              }
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: 100,
                  height: 100,
                  background: "rgb(227, 227, 227)"
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { width: "100%", marginLeft: 25 }, children: [
              /* @__PURE__ */ jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Name:" }),
                /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: ((_b = item.product) == null ? void 0 : _b.title) || "Deleted Product" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Quantity:" }),
                /* @__PURE__ */ jsx("div", { className: "col-md-10 col-6 order-item-value", children: item.quantity })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "row", children: [
                /* @__PURE__ */ jsx("div", { className: "col-md-2 col-6 order-item-title", children: "Price:" }),
                /* @__PURE__ */ jsxs("div", { className: "col-md-10 col-6 order-item-value", children: [
                  "$",
                  item.price.toLocaleString()
                ] })
              ] })
            ] })
          ] }, item.id);
        })
      }
    ) })
  ] });
};
const style$6 = "";
const Footer = ({}) => {
  const { homeCategories, cart } = usePage().props;
  return /* @__PURE__ */ jsx("footer", { className: "ps-footer ps-footer--5 pt-50", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "ps-footer__middle", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("div", { className: "ps-footer--address", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "ps-logo-footer",
          style: { textAlign: "center" },
          children: /* @__PURE__ */ jsxs("a", { href: "/", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/img/logo-white.png",
                style: { width: 250 },
                alt: "Signs7"
              }
            ),
            /* @__PURE__ */ jsx(
              "h3",
              {
                style: {
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  marginTop: 10,
                  marginBottom: 50
                },
                children: "Everything for your business"
              }
            )
          ] })
        }
      ) }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("div", { className: "row", children: homeCategories.map((category) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "col-md-4",
          style: { textAlign: "center", marginTop: 20 },
          children: /* @__PURE__ */ jsxs("div", { className: "ps-footer--block", children: [
            /* @__PURE__ */ jsx(
              "h5",
              {
                className: "ps-block__title",
                style: { textTransform: "uppercase" },
                children: category.title
              }
            ),
            /* @__PURE__ */ jsx("ul", { className: "ps-block__list", children: category.products.map((product) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: `/shop/product/${product.slug}`, children: product.title }) }, `footer-product-${product.id}`)) })
          ] })
        },
        category.id
      )) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-footer--bottom", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 col-md-6", children: /* @__PURE__ */ jsx("p", { children: "Copyright © 2023 Signs7. All Rights Reserved" }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-6 text-right", children: [
        /* @__PURE__ */ jsx("img", { src: "img/payment.png", alt: "" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "payment-light",
            src: "img/payment-light.png",
            alt: ""
          }
        )
      ] })
    ] }) })
  ] }) });
};
const Input = React__default.forwardRef(
  ({ formType, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames({
          "ps-checkout__group": formType === "checkout",
          "ps-form__group": formType === "profile"
        }),
        children: [
          props.label ? /* @__PURE__ */ jsx(
            "label",
            {
              className: classNames({
                "ps-checkout__label": formType === "checkout",
                "ps-form__label": formType === "profile"
              }),
              children: props.label
            }
          ) : null,
          /* @__PURE__ */ jsx(
            "input",
            {
              type: props.type || "text",
              ref,
              className: classNames({
                "ps-input": formType === "checkout",
                "form-control ps-form__input": formType === "profile"
              }),
              ...props
            }
          ),
          props.error ? /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                textTransform: "capitalize",
                color: "#ff5252",
                fontSize: 12,
                marginTop: 8
              },
              children: props.error
            }
          ) : null
        ]
      }
    );
  }
);
const CartMiniItem = ({
  name: name2,
  price,
  quantity,
  id,
  associatedModel
}) => {
  const dispatch = useAppDispatch();
  const removeItem = async () => {
    try {
      await dispatch(removeItemFromCart({ item_id: id })).unwrap();
      toast(`Successfully removed ${name2}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "ps-product--mini-cart", children: [
    /* @__PURE__ */ jsx("a", { className: "ps-product__thumbnail", href: "", children: associatedModel.images && associatedModel.images.length > 0 ? /* @__PURE__ */ jsx(
      "img",
      {
        src: `/storage/${associatedModel.images[0].path}`,
        alt: associatedModel.images[0].alt ? associatedModel.images[0].alt : name2
      }
    ) : null }),
    /* @__PURE__ */ jsxs("div", { className: "ps-product__content", children: [
      /* @__PURE__ */ jsxs("a", { className: "ps-product__name", href: "", children: [
        name2,
        " x",
        quantity
      ] }),
      /* @__PURE__ */ jsx("p", { className: "ps-product__meta", children: /* @__PURE__ */ jsxs("span", { className: "ps-product__price", children: [
        "$",
        price.toLocaleString()
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        className: "ps-product__remove",
        onClick: () => removeItem(),
        style: { cursor: "pointer" },
        children: /* @__PURE__ */ jsx("i", { className: "icon-cross" })
      }
    )
  ] });
};
var cssUnit = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true
};
function parseLengthAndUnit(size) {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px"
    };
  }
  var value;
  var valueString = (size.match(/^[0-9.]*/) || "").toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }
  var unit = (size.match(/[^0-9]*$/) || "").toString();
  if (cssUnit[unit]) {
    return {
      value,
      unit
    };
  }
  console.warn("React Spinners: ".concat(size, " is not a valid css value. Defaulting to ").concat(value, "px."));
  return {
    value,
    unit: "px"
  };
}
function cssValue(value) {
  var lengthWithunit = parseLengthAndUnit(value);
  return "".concat(lengthWithunit.value).concat(lengthWithunit.unit);
}
var createAnimation = function(loaderName, frames, suffix) {
  var animationName = "react-spinners-".concat(loaderName, "-").concat(suffix);
  if (typeof window == "undefined" || !window.document) {
    return animationName;
  }
  var styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  var styleSheet = styleEl.sheet;
  var keyFrames = "\n    @keyframes ".concat(animationName, " {\n      ").concat(frames, "\n    }\n  ");
  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }
  return animationName;
};
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var beat = createAnimation("BeatLoader", "50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}", "beat");
function BeatLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 15 : _f, _g = _a.margin, margin = _g === void 0 ? 2 : _g, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size", "margin"]);
  var wrapper = __assign({ display: "inherit" }, cssOverride);
  var style2 = function(i) {
    return {
      display: "inline-block",
      backgroundColor: color,
      width: cssValue(size),
      height: cssValue(size),
      margin: cssValue(margin),
      borderRadius: "100%",
      animation: "".concat(beat, " ").concat(0.7 / speedMultiplier, "s ").concat(i % 2 ? "0s" : "".concat(0.35 / speedMultiplier, "s"), " infinite linear"),
      animationFillMode: "both"
    };
  };
  if (!loading) {
    return null;
  }
  return React.createElement(
    "span",
    __assign({ style: wrapper }, additionalprops),
    React.createElement("span", { style: style2(1) }),
    React.createElement("span", { style: style2(2) }),
    React.createElement("span", { style: style2(3) })
  );
}
const MiniCartModal = ({ active }) => {
  const { loaded, cart } = useAppSelector((state) => state.cart);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames("ps-cart--mini", {
        active
      }),
      children: loaded ? /* @__PURE__ */ jsx(Fragment, { children: cart.items.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("ul", { className: "ps-cart__items", children: /* @__PURE__ */ jsx("li", { className: "ps-cart__item", children: cart.items.map((item, index2) => {
          if (index2 <= 2) {
            return /* @__PURE__ */ createElement(CartMiniItem, { ...item, key: item.id });
          }
        }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ps-cart__total", children: [
          /* @__PURE__ */ jsx("span", { children: "Subtotal " }),
          /* @__PURE__ */ jsxs("span", { children: [
            "$",
            cart.total_with_tax.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ps-cart__footer", children: [
          /* @__PURE__ */ jsx(Link$1, { className: "ps-btn ps-btn--outline", to: "/cart", children: "View Cart" }),
          /* @__PURE__ */ jsx(Link$1, { className: "ps-btn ps-btn--warning", to: "/cart/checkout", children: "Checkout" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "ps-cart__empty", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", children: /* @__PURE__ */ jsx("i", { className: "fa fa-shopping-basket" }) }),
        /* @__PURE__ */ jsx("p", { className: "ps-cart__text", children: "Your cart is currently empty" })
      ] }) }) : /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsx(BeatLoader, {}) })
    }
  );
};
const style$5 = "";
const Menu = ({}) => {
  const { homeCategories, cart, auth } = usePage().props;
  const [state, setState] = useState({
    showMiniAuth: false,
    showMiniCart: false
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "header",
    {
      className: "ps-header ps-header--2 ps-header--7 ps-header--4",
      style: { borderBottom: "1px solid #d9dee8" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "ps-header__top", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxs("div", { className: "header-left d-flex", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:(949)9421363",
                className: "ps-header__text d-flex align-items-center",
                children: [
                  /* @__PURE__ */ jsx("i", { className: "icon-telephone" }),
                  /* @__PURE__ */ jsx("strong", { style: { marginLeft: 5 }, children: "+(949) 942-1363 - Call Us" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "http://google.com",
                className: "ps-header__text d-flex align-items-center",
                children: [
                  /* @__PURE__ */ jsx("i", { className: "icon-envelope" }),
                  /* @__PURE__ */ jsx("strong", { style: { marginLeft: 5 }, children: "info@signs7.com" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "http://google.com",
                className: "ps-header__text d-flex align-items-center",
                children: [
                  /* @__PURE__ */ jsx("i", { className: "icon-map-marker" }),
                  /* @__PURE__ */ jsx("strong", { style: { marginLeft: 5 }, children: "New York" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-top__right", children: [
            /* @__PURE__ */ jsxs("div", { className: "ps-language-currency", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "ps-dropdown-value with-dp-modal",
                  onMouseLeave: () => setState((oldState) => ({
                    ...oldState,
                    showMiniAuth: false
                  })),
                  onMouseEnter: () => setState((oldState) => ({
                    ...oldState,
                    showMiniAuth: true
                  })),
                  children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      className: "ps-header__item",
                      href: auth.user ? "/profile" : "/login",
                      children: /* @__PURE__ */ jsx("i", { className: "icon-user" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  onMouseLeave: () => setState((oldState) => ({
                    ...oldState,
                    showMiniCart: false
                  })),
                  onMouseEnter: () => setState((oldState) => ({
                    ...oldState,
                    showMiniCart: true
                  })),
                  className: "ps-dropdown-value with-dp-modal",
                  children: [
                    /* @__PURE__ */ jsxs(Link, { className: "ps-header__item", href: "/cart", id: "cart-mini", children: [
                      /* @__PURE__ */ jsx("i", { className: "icon-cart-empty" }),
                      cart.items.length > 0 ? /* @__PURE__ */ jsx("span", { className: "badge-mini", children: cart.items.length }) : null
                    ] }),
                    /* @__PURE__ */ jsx(MiniCartModal, { active: state.showMiniCart })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "menu-top", children: [
              /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx("a", { className: "nav-link", href: "#", children: "About" }) }),
              /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx("a", { className: "nav-link", href: "#", children: "Contact" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-header__text", children: [
              "Need help? ",
              /* @__PURE__ */ jsx("strong", { children: "0020 500 - MYMEDI - 000" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "ps-header__middle", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "ps-header__menu", style: { width: "100%" }, children: /* @__PURE__ */ jsxs("ul", { className: "menu-custom", children: [
          /* @__PURE__ */ jsx("li", { className: "ps-logo custom-logo", children: /* @__PURE__ */ jsxs(Link, { href: "/", children: [
            /* @__PURE__ */ jsx("img", { src: "/img/logo.png", alt: "" }),
            /* @__PURE__ */ jsx("img", { className: "sticky-logo", src: "/img/logo.png", alt: "" })
          ] }) }),
          homeCategories.map(
            ({ id, title, icon, slug, products }, index2) => /* @__PURE__ */ jsxs(
              "li",
              {
                className: "ps-category__item ps-category__item-custom has-dropdown",
                children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: `/shop/category/${slug}`,
                      className: "ps-category__link",
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: `/storage/${icon}`,
                          alt: title,
                          style: { width: "34px", height: "34px" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "ps-category__name", children: /* @__PURE__ */ jsx(Link, { href: `/shop/category/${slug}`, children: title }) }),
                  /* @__PURE__ */ jsx("div", { className: "dropdown-content-menu", children: products.map((product) => /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: `/shop/product/${product.slug}`,
                      children: product.title
                    },
                    `${id}-${product.id}`
                  )) })
                ]
              },
              id
            )
          )
        ] }) }) }) })
      ]
    }
  ) });
};
const style$4 = "";
const MobileHeader = ({}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { homeCategories, cart, auth } = usePage().props;
  const closeMenu = () => setShowMenu(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "ps-header ps-header--6 ps-header--mobile", children: /* @__PURE__ */ jsx("div", { className: "ps-header__middle", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsx("div", { className: "ps-logo", children: /* @__PURE__ */ jsxs("a", { href: "/", children: [
        " ",
        /* @__PURE__ */ jsx("img", { src: "/img/logo.png", alt: "", style: { width: 80 } })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "ps-header__right", children: /* @__PURE__ */ jsx("ul", { className: "ps-header__icons", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          className: "ps-header__item menu-slide",
          href: "#",
          onClick: (e) => {
            e.preventDefault();
            setShowMenu(true);
          },
          children: /* @__PURE__ */ jsx("i", { className: "fa-solid fa-bars" })
        }
      ) }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames("ps-menu--slidebar has-close-icon", {
          active: showMenu
        }),
        children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              id: "close-menu",
              className: "ic-mobile-menu-close-button close-menu",
              onClick: (e) => {
                e.preventDefault();
                setShowMenu(false);
              },
              children: /* @__PURE__ */ jsx("i", { className: "icon-cross" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "ps-menu__content", children: /* @__PURE__ */ jsxs("ul", { className: "menu--mobile", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, href: "/", children: "Home" }) }),
            /* @__PURE__ */ jsx("div", { className: "divider" }),
            homeCategories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, href: "/cart", children: category.title }) }, category.id)),
            /* @__PURE__ */ jsx("div", { className: "divider" }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { onClick: closeMenu, href: "/cart", children: [
              "Shopping Cart | ",
              cart.items.length
            ] }) }),
            auth.user ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, href: "/profile", children: "Profile" }) }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, href: "/login", children: "Login" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { onClick: closeMenu, href: "/register", children: "Create account" }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "ps-menu__footer", children: /* @__PURE__ */ jsx("div", { className: "ps-menu__item", children: /* @__PURE__ */ jsxs("div", { className: "ps-menu__contact", children: [
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "tel:+998999010033", style: { color: "#103178" }, children: /* @__PURE__ */ jsx("strong", { children: "+998 99 901 00 33" }) }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "tel:+998974243004", style: { color: "#103178" }, children: /* @__PURE__ */ jsx("strong", { children: "info@sign7.com" }) })
          ] }) }) })
        ]
      }
    )
  ] });
};
const style$3 = "";
const Ziggy = { "url": "https://signs365.test", "port": null, "defaults": {}, "routes": { "filament.asset": { "uri": "filament/assets/{file}", "methods": ["GET", "HEAD"], "wheres": { "file": ".*" } }, "filament.auth.logout": { "uri": "filament/logout", "methods": ["POST"] }, "filament.auth.login": { "uri": "admin/login", "methods": ["GET", "HEAD"] }, "filament.pages.dashboard": { "uri": "admin", "methods": ["GET", "HEAD"] }, "filament.resources.media.index": { "uri": "admin/media", "methods": ["GET", "HEAD"] }, "filament.resources.media.create": { "uri": "admin/media/create", "methods": ["GET", "HEAD"] }, "filament.resources.media.edit": { "uri": "admin/media/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.cities.index": { "uri": "admin/cities", "methods": ["GET", "HEAD"] }, "filament.resources.cities.create": { "uri": "admin/cities/create", "methods": ["GET", "HEAD"] }, "filament.resources.cities.edit": { "uri": "admin/cities/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.faqs.index": { "uri": "admin/faqs", "methods": ["GET", "HEAD"] }, "filament.resources.faqs.create": { "uri": "admin/faqs/create", "methods": ["GET", "HEAD"] }, "filament.resources.faqs.edit": { "uri": "admin/faqs/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.orders.index": { "uri": "admin/orders", "methods": ["GET", "HEAD"] }, "filament.resources.orders.create": { "uri": "admin/orders/create", "methods": ["GET", "HEAD"] }, "filament.resources.orders.edit": { "uri": "admin/orders/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.product-addons.index": { "uri": "admin/product-addons", "methods": ["GET", "HEAD"] }, "filament.resources.product-addons.create": { "uri": "admin/product-addons/create", "methods": ["GET", "HEAD"] }, "filament.resources.product-addons.edit": { "uri": "admin/product-addons/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.product-categories.index": { "uri": "admin/product-categories", "methods": ["GET", "HEAD"] }, "filament.resources.product-categories.create": { "uri": "admin/product-categories/create", "methods": ["GET", "HEAD"] }, "filament.resources.product-categories.edit": { "uri": "admin/product-categories/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.product-options.index": { "uri": "admin/product-options", "methods": ["GET", "HEAD"] }, "filament.resources.product-options.create": { "uri": "admin/product-options/create", "methods": ["GET", "HEAD"] }, "filament.resources.product-options.edit": { "uri": "admin/product-options/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.products.index": { "uri": "admin/products", "methods": ["GET", "HEAD"] }, "filament.resources.products.create": { "uri": "admin/products/create", "methods": ["GET", "HEAD"] }, "filament.resources.products.edit": { "uri": "admin/products/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.shippings.index": { "uri": "admin/shippings", "methods": ["GET", "HEAD"] }, "filament.resources.shippings.create": { "uri": "admin/shippings/create", "methods": ["GET", "HEAD"] }, "filament.resources.shippings.edit": { "uri": "admin/shippings/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.size-lists.index": { "uri": "admin/size-lists", "methods": ["GET", "HEAD"] }, "filament.resources.size-lists.create": { "uri": "admin/size-lists/create", "methods": ["GET", "HEAD"] }, "filament.resources.size-lists.edit": { "uri": "admin/size-lists/{record}/edit", "methods": ["GET", "HEAD"] }, "filament.resources.users.index": { "uri": "admin/users", "methods": ["GET", "HEAD"] }, "filament.resources.users.create": { "uri": "admin/users/create", "methods": ["GET", "HEAD"] }, "filament.resources.users.edit": { "uri": "admin/users/{record}/edit", "methods": ["GET", "HEAD"] }, "sanctum.csrf-cookie": { "uri": "api/sanctum/csrf-cookie", "methods": ["GET", "HEAD"] }, "livewire.message": { "uri": "livewire/message/{name}", "methods": ["POST"] }, "livewire.message-localized": { "uri": "{locale}/livewire/message/{name}", "methods": ["POST"] }, "livewire.upload-file": { "uri": "livewire/upload-file", "methods": ["POST"] }, "livewire.preview-file": { "uri": "livewire/preview-file/{filename}", "methods": ["GET", "HEAD"] }, "ignition.healthCheck": { "uri": "_ignition/health-check", "methods": ["GET", "HEAD"] }, "ignition.executeSolution": { "uri": "_ignition/execute-solution", "methods": ["POST"] }, "ignition.updateConfig": { "uri": "_ignition/update-config", "methods": ["POST"] }, "home": { "uri": "/", "methods": ["GET", "HEAD"] } } };
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
const SocialFixedButtons = ({}) => {
  const socialFixedRef = React__default.useRef();
  usePage().props;
  useEffect(() => {
    const handleScroll = (e) => {
      const screen = e.currentTarget;
      if (route(void 0, void 0, void 0, Ziggy).current() !== "home") {
        socialFixedRef.current.classList.remove("active-right");
        return;
      }
      if (screen.scrollY > 220) {
        socialFixedRef.current.classList.remove("active-right");
      } else {
        socialFixedRef.current.classList.add("active-right");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "ul",
    {
      className: classNames("social-fixed-btns", {
        "active-right": route(void 0, void 0, void 0, Ziggy).current() === "home"
      }),
      ref: socialFixedRef,
      children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "mailto:info@signs.com", children: [
          /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { className: "fas fa-envelope" }) }),
          /* @__PURE__ */ jsx("span", { children: "E-Mail" })
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "https://api.whatsapp.com/send?phone=123123", children: [
          /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { className: "fab fa-whatsapp" }) }),
          /* @__PURE__ */ jsx("span", { children: "WhatsApp" })
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "tel:+1", children: [
          /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { "aria-hidden": "true", className: "fas fa-phone" }) }),
          /* @__PURE__ */ jsx("span", { children: "Call us" })
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "tel:+1", children: [
          /* @__PURE__ */ jsx("div", { className: "icon-box-social", children: /* @__PURE__ */ jsx("i", { "aria-hidden": "true", className: "fab fa-instagram" }) }),
          /* @__PURE__ */ jsx("span", { children: "Instagram" })
        ] }) })
      ]
    }
  );
};
const OrdersList = ({
  data,
  pageCount,
  currentPage
}) => {
  if (data.length === 0) {
    return /* @__PURE__ */ jsx(
      EmptyPage,
      {
        iconClass: "fa fa-shopping-basket",
        title: "No Orders",
        size: "small"
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    data.map((order) => /* @__PURE__ */ jsx(OrderCard, { ...order }, order.uuid)),
    pageCount > 1 ? /* @__PURE__ */ jsxs("div", { className: "pagination-list", style: { marginBottom: 30 }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "pagenation-custom",
          onClick: () => router.get(`/profile?page=${currentPage - 1}`),
          disabled: currentPage === 1,
          children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-left" })
        }
      ),
      /* @__PURE__ */ jsxs("span", { style: { marginLeft: 5, marginRight: 5 }, children: [
        "Page",
        /* @__PURE__ */ jsxs("strong", { children: [
          currentPage,
          " of ",
          pageCount
        ] }),
        " "
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "pagenation-custom",
          onClick: () => router.get(`/profile?page=${currentPage + 1}`),
          disabled: currentPage === pageCount,
          children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-right" })
        }
      )
    ] }) : null
  ] });
};
const CheckoutSidebar = ({ submiting }) => {
  const { cart } = usePage().props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "ps-checkout__order",
      style: { position: "sticky", top: "100px" },
      children: [
        /* @__PURE__ */ jsx("h3", { className: "ps-checkout__heading", children: "Your order" }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Product" }),
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Subtotal" })
        ] }),
        (cart == null ? void 0 : cart.items) && cart.items.length ? cart.items.map((cartItem) => /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row ps-product", children: [
          /* @__PURE__ */ jsxs("div", { className: "ps-product__name", children: [
            cartItem.name,
            " x ",
            /* @__PURE__ */ jsx("span", { children: cartItem.quantity })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-product__price", children: [
            "$",
            (cartItem.quantity * cartItem.price).toLocaleString()
          ] })
        ] }, cartItem.id)) : /* @__PURE__ */ jsx(Skeleton, { count: 4 }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Subtotal" }),
          /* @__PURE__ */ jsx("div", { className: "ps-product__price", children: (cart == null ? void 0 : cart.total) ? `$${cart == null ? void 0 : cart.total.toLocaleString()}` : /* @__PURE__ */ jsx(Skeleton, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Tax" }),
          /* @__PURE__ */ jsx("div", { className: "ps-product__price", children: (cart == null ? void 0 : cart.tax) ? `$${cart == null ? void 0 : cart.tax.toLocaleString()}` : /* @__PURE__ */ jsx(Skeleton, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ps-checkout__row", children: [
          /* @__PURE__ */ jsx("div", { className: "ps-title", children: "Total" }),
          /* @__PURE__ */ jsx("div", { className: "ps-product__price", children: (cart == null ? void 0 : cart.total_with_tax) ? `$${cart == null ? void 0 : cart.total_with_tax.toLocaleString()}` : /* @__PURE__ */ jsx(Skeleton, {}) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ps-checkout__payment", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "ps-btn ps-btn--warning custom-button",
            type: "submit",
            disabled: submiting,
            children: "Place order"
          }
        ) })
      ]
    }
  );
};
class PaymentService {
  static retrivePaymentIntent() {
    return api.post(
      "/payment-intent"
    );
  }
  static updateTempOrder(tempOrderID, data) {
    return api.post(`temp-order/update/${tempOrderID}`, data);
  }
  static getPaymentIntent(payment_intent) {
    return api.get(`/payment-intent/retrive/${payment_intent}`);
  }
}
const CheckOutSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required("Phone is required!"),
  address: yup.string().required("Address is required!"),
  notes: yup.string().nullable(),
  user_id: yup.string().nullable()
});
const PaymentForm = ({ tempOrderID }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const stripe = useStripe();
  const elements = useElements();
  const { auth } = usePage().props;
  const [submiting, setSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CheckOutSchema),
    defaultValues: {
      name: ((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.name) ?? "",
      email: ((_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.email) ?? "",
      user_id: ((_c = auth == null ? void 0 : auth.user) == null ? void 0 : _c.id) ?? void 0
    }
  });
  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }
    setSubmiting(true);
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null) {
        delete data[key];
      }
    });
    await PaymentService.updateTempOrder(tempOrderID, data);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href.split("?")[0] + "/success-payment",
        payment_method_data: {
          billing_details: {
            address: {
              country: "US",
              postal_code: "",
              state: "",
              city: "",
              line1: "",
              line2: ""
            }
          }
        }
      }
    });
    if (error) {
      setErrorMessage(error.message);
      setSubmiting(false);
    } else {
      setSubmiting(false);
    }
  };
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
    /* @__PURE__ */ jsx("div", { className: "col-12 col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "ps-checkout__form", children: [
      /* @__PURE__ */ jsx("h3", { className: "ps-checkout__heading", children: "Billing details" }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: !auth.user ? /* @__PURE__ */ jsx(
          Input,
          {
            ...register("name"),
            error: (_d = errors.name) == null ? void 0 : _d.message,
            placeholder: "Your name",
            disabled: submiting,
            label: "Name",
            formType: "checkout"
          }
        ) : null }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: /* @__PURE__ */ jsx(
          Input,
          {
            ...register("phone"),
            type: "tel",
            placeholder: "Phone number",
            error: (_e = errors.phone) == null ? void 0 : _e.message,
            disabled: submiting,
            formType: "checkout",
            label: "Phone"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: !auth.user ? /* @__PURE__ */ jsx(
          Input,
          {
            ...register("email"),
            type: "email",
            placeholder: "Email",
            error: (_f = errors.email) == null ? void 0 : _f.message,
            disabled: submiting,
            formType: "checkout",
            label: "Email"
          }
        ) : null }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-12", children: /* @__PURE__ */ jsx(
          Input,
          {
            ...register("address"),
            type: "tel",
            placeholder: "Address",
            error: (_g = errors.address) == null ? void 0 : _g.message,
            disabled: submiting,
            formType: "checkout",
            label: "Address"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "ps-checkout__group", children: [
          /* @__PURE__ */ jsx("label", { className: "ps-checkout__label", children: "Order notes (optional)" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "ps-textarea",
              rows: 7,
              ...register("notes"),
              placeholder: "Notes about your order, e.g. special notes for delivery."
            }
          ),
          ((_h = errors.notes) == null ? void 0 : _h.message) ? /* @__PURE__ */ jsx(
            "p",
            {
              style: {
                textTransform: "capitalize",
                color: "#ff5252"
              },
              children: (_i = errors.notes) == null ? void 0 : _i.message
            }
          ) : null
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "col-12", children: [
          submiting ? /* @__PURE__ */ jsx("div", { className: "overlay-loading", children: /* @__PURE__ */ jsx(BeatLoader, {}) }) : null,
          /* @__PURE__ */ jsx(
            PaymentElement,
            {
              options: {
                fields: { billingDetails: { address: "never" } }
              }
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "col-12 col-lg-4", children: /* @__PURE__ */ jsx(CheckoutSidebar, { submiting }) })
  ] }) });
};
const ProductFormContext = createContext(
  void 0
);
const ProductCard = (props) => {
  const {
    title,
    id,
    slug,
    images,
    with_checkout,
    min_price,
    allowFullPage,
    onClickQuickView
  } = props;
  useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  const productURL = React__default.useMemo(
    () => !props.fullPage ? `/shop/product/${slug}` : `/shop/product/${slug}`,
    [props]
  );
  const handleLinkClick = (e) => {
    if (isMobile || allowFullPage === false) {
      return;
    }
    if (onClickQuickView) {
      e.preventDefault();
      onClickQuickView({ ...props });
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "ps-section__product", style: { height: "100%" }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "ps-product ps-product--standard",
      style: { height: "100%" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__thumbnail ps-product__thumbnail-card", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: "ps-product__image",
            onClick: handleLinkClick,
            href: productURL,
            children: /* @__PURE__ */ jsx("figure", { children: images.slice(0, 2).map((image) => /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${image.thumbnail}`,
                alt: image.alt ? image.alt : title
              }
            )) })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "ps-product__content", children: [
          /* @__PURE__ */ jsx("div", { className: "product-wrapper", children: /* @__PURE__ */ jsx("div", { className: "meta-wrapper", children: props.categories.map((category, index2) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: `/shop/category/${category.slug}`,
              className: "ps-product__branch",
              children: [
                category.title,
                " ",
                index2 < props.categories.length - 1 ? " | " : ""
              ]
            },
            `category-card-product-${category.id}`
          )) }) }),
          /* @__PURE__ */ jsx("h5", { className: "ps-product__title", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: productURL,
              onClick: handleLinkClick,
              style: { fontWeight: 600 },
              children: title
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "ps-product__actions ps-product__group-mobile", children: [
            /* @__PURE__ */ jsx("div", { className: "ps-product__quantity", children: /* @__PURE__ */ jsxs("div", { className: "def-number-input number-input safari_only", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "minus",
                  children: /* @__PURE__ */ jsx("i", { className: "icon-minus" })
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "quantity",
                  min: "0",
                  name: "quantity",
                  value: "1",
                  type: "number"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "plus",
                  children: /* @__PURE__ */ jsx("i", { className: "icon-plus" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__cart", children: /* @__PURE__ */ jsx(
              Link,
              {
                className: "ps-btn ps-btn--warning",
                href: productURL,
                onClick: handleLinkClick,
                children: "Add to cart"
              }
            ) }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: productURL,
                onClick: handleLinkClick,
                children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Details" })
              }
            )
          ] })
        ] })
      ]
    }
  ) }) });
};
class ProductService {
  static getProduct(slug) {
    return api.get(`/products/${slug}`);
  }
  static getProductVariants(slug) {
    return api.get(`/products/${slug}/variants`);
  }
  static sendRequestProduct(slug, data) {
    return api.post(`/product-request/${slug}`, data);
  }
}
const initialState$2 = {
  loading: true,
  selectedOption: void 0,
  addons: [],
  product: void 0,
  productSlug: void 0
};
const getProduct = createAsyncThunk("app/getSingleProduct", async function({ slug }, { rejectWithValue }) {
  try {
    const { data } = await ProductService.getProduct(slug);
    return data.product;
  } catch (error) {
    return rejectWithValue("Error fetch product");
  }
});
const singleProductSlice = createSlice({
  name: "product",
  initialState: initialState$2,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
      if (action.payload.with_checkout) {
        const [firstOption] = action.payload.options;
        state.selectedOption = firstOption;
        state.addons = firstOption.addons.map((addon) => ({
          ...addon,
          isSelected: false,
          quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
          extra_data_selected: []
        }));
      }
      state.loading = false;
    },
    selectProductOption(state, action) {
      state.selectedOption = action.payload;
      state.addons = action.payload.addons.map((addon) => ({
        ...addon,
        isSelected: false,
        quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
        extra_data_selected: []
      }));
    },
    clearProductState(state) {
      state.selectedOption = void 0;
      state.loading = true;
      state.product = void 0;
      state.productSlug = void 0;
    },
    handleAddonChange(state, { payload }) {
      const currentAddon = state.addons.find(
        (addon) => addon.id === payload.id
      );
      if (currentAddon) {
        currentAddon.isSelected = !currentAddon.isSelected;
      }
    },
    updateAddonQuantity(state, { payload }) {
      const { quantity, addonID } = payload;
      const addon = state.addons.find((addon2) => addon2.id === addonID);
      if (addon && addon.withQuantity) {
        addon.quantity = quantity;
      }
    },
    selectExtraDataItems(state, {
      payload
    }) {
      const { addonID, targetExtraData, isMultiSelect } = payload;
      const addon = state.addons.find((addon2) => addon2.id === addonID);
      if (!addon) {
        return;
      }
      const indexOfSelected = addon.extra_data_selected.findIndex(
        (extraData) => extraData.id === targetExtraData.id
      );
      if (indexOfSelected === -1) {
        if (isMultiSelect) {
          addon.extra_data_selected.push(targetExtraData);
        } else {
          const emptySelectedList = [];
          emptySelectedList.push(targetExtraData);
          addon.extra_data_selected = emptySelectedList;
        }
      } else {
        addon.extra_data_selected.splice(indexOfSelected, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      if (action.payload.with_checkout) {
        const [firstOption] = action.payload.options;
        state.selectedOption = firstOption;
        state.addons = firstOption.addons.map((addon) => ({
          ...addon,
          isSelected: false,
          quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
          extra_data_selected: []
        }));
      }
      state.productSlug = action.payload.slug;
      state.loading = false;
    });
  }
});
const {
  setProduct,
  clearProductState,
  selectProductOption,
  handleAddonChange,
  updateAddonQuantity,
  selectExtraDataItems
} = singleProductSlice.actions;
const singleProductSliceReducer = singleProductSlice.reducer;
const style$2 = "";
const PrevArrow = ({ className, style: style2, onClick }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: `${className} custom-arrow left-arrow`,
    style: { ...style2, display: "block" },
    onClick,
    children: /* @__PURE__ */ jsx("i", { className: "icon-chevron-left" })
  }
);
const NextArrow = ({ className, style: style2, onClick }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: `${className} custom-arrow right-arrow`,
    style: { ...style2, display: "block" },
    onClick,
    children: /* @__PURE__ */ jsx("i", { className: "icon-chevron-right" })
  }
);
const ThumbnailSlick = {
  // slidesToShow: 5,
  slidesToScroll: 1,
  lazyLoad: "ondemand",
  dots: false,
  arrows: false,
  focusOnSelect: true,
  infinite: false
};
const MainSlick = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  lazyLoad: "ondemand"
};
const ProductSlider = ({ images, productName }) => {
  const [mainSlickRef, setMainSlickRef] = useState(null);
  const [thumbNailSlickRef, setThumbNailSlickRef] = useState(null);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "ps-product--gallery",
      style: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "sticky-sliders", children: [
        /* @__PURE__ */ jsx(
          Slider,
          {
            ref: (slider) => setMainSlickRef(slider),
            asNavFor: thumbNailSlickRef,
            ...MainSlick,
            nextArrow: /* @__PURE__ */ jsx(NextArrow, {}),
            prevArrow: /* @__PURE__ */ jsx(PrevArrow, {}),
            className: "ps-product__thumbnail",
            children: images.map((img2) => /* @__PURE__ */ jsx("div", { className: "slide", children: /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  paddingBottom: "100%",
                  background: "#EEE",
                  height: 0,
                  position: "relative"
                },
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    style: {
                      width: "100%",
                      height: "100%",
                      display: "block",
                      position: "absolute"
                    },
                    src: `/storage/${img2.path}`,
                    alt: img2.alt ? img2.alt : productName
                  }
                )
              }
            ) }, `main-${img2.id}`))
          }
        ),
        /* @__PURE__ */ jsx(
          Slider,
          {
            ref: (slider) => setThumbNailSlickRef(slider),
            asNavFor: mainSlickRef,
            ...ThumbnailSlick,
            slidesToShow: 5,
            className: "ps-gallery--image",
            style: { display: "block" },
            children: images.map((img2) => /* @__PURE__ */ jsx("div", { className: "slide", children: /* @__PURE__ */ jsx("div", { className: "ps-gallery__item", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${img2.path}`,
                alt: img2.alt ? img2.alt : productName
              }
            ) }) }, `thumb-${img2.id}`))
          }
        )
      ] })
    }
  );
};
const swiper_min = "";
const navigation_min = "";
const pagination_min = "";
const scrollbar_min = "";
const HomeSlider = ({}) => {
  return /* @__PURE__ */ jsxs(
    Swiper,
    {
      modules: [Autoplay],
      loop: true,
      autoplay: {
        delay: 5e3
      },
      className: "mySwiper",
      children: [
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx("div", { className: "ps-banner", style: { background: "#F0F2F5" }, children: /* @__PURE__ */ jsx("div", { className: "container container-initial", children: /* @__PURE__ */ jsxs("div", { className: "ps-banner__block", children: [
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__content", children: [
            /* @__PURE__ */ jsxs("h2", { className: "ps-banner__title", children: [
              "Signs, Decals...",
              /* @__PURE__ */ jsx("br", {}),
              " Only in NY"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ps-banner__desc", children: "Only this week" }),
            /* @__PURE__ */ jsx("a", { className: "bg-warning ps-banner__shop", href: "#", children: "Shop now" }),
            /* @__PURE__ */ jsxs("div", { className: "ps-banner__persen bg-yellow ps-top", children: [
              /* @__PURE__ */ jsx("small", { children: "only" }),
              "$25"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__thumnail", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__round",
                src: "/img/round5.png",
                alt: "alt"
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__image",
                src: "/img/promotion/slide3.webp",
                alt: "alt"
              }
            )
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx("div", { className: "ps-banner", style: { background: "#DAECFA" }, children: /* @__PURE__ */ jsx("div", { className: "container container-initial", children: /* @__PURE__ */ jsxs("div", { className: "ps-banner__block", children: [
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__content", children: [
            /* @__PURE__ */ jsxs("h2", { className: "ps-banner__title", children: [
              "Banner ",
              /* @__PURE__ */ jsx("br", {}),
              " all types"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ps-banner__desc", children: "Only in this week. Don’t misss!" }),
            /* @__PURE__ */ jsxs("div", { className: "ps-banner__price", children: [
              " ",
              /* @__PURE__ */ jsx("span", { children: "$15.99" }),
              /* @__PURE__ */ jsx("del", { children: "$29.99" })
            ] }),
            /* @__PURE__ */ jsx("a", { className: "bg-warning ps-banner__shop", href: "#", children: "Shop now" }),
            /* @__PURE__ */ jsx("div", { className: "ps-banner__persen bg-warning ps-center", children: "-30%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ps-banner__thumnail", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__round",
                src: "/img/round2.png",
                alt: "alt"
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "ps-banner__image",
                src: "/img/promotion/slide1.webp",
                alt: "alt"
              }
            )
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(SwiperNavigation, {})
      ]
    }
  );
};
const SwiperNavigation = () => {
  const swiper = useSwiper();
  return /* @__PURE__ */ jsxs("div", { className: "swipper-nav", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => swiper.slidePrev(),
        className: "slide-prev-swiper swipper-arrow",
        children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-left" })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => swiper.slideNext(),
        className: "slide-next-swiper swipper-arrow",
        children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-right" })
      }
    )
  ] });
};
const DEFAULT_ERROR_MESSAGE = "Something went wrong, please try again later";
function axiosErrorGrab(error) {
  var _a;
  try {
    if (axios.isAxiosError(error)) {
      switch ((_a = error.response) == null ? void 0 : _a.status) {
        case 400:
          return {
            type: "message",
            error: error.response.data.error
          };
        case 422:
          return { type: "validation", errors: error.response.data.errors };
        default:
          return {
            type: "message",
            error: DEFAULT_ERROR_MESSAGE
          };
      }
    }
    return {
      type: "message",
      error: DEFAULT_ERROR_MESSAGE
    };
  } catch (_) {
    return {
      type: "message",
      error: DEFAULT_ERROR_MESSAGE
    };
  }
}
const initialState$1 = {
  authChecked: false,
  isAuthed: false,
  user: void 0
};
const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(email, password);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});
const registerUser = createAsyncThunk("auth/register", async ({ email, password, name: name2 }, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(email, password, name2);
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});
const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await AuthService.logout();
  }
);
const getUserByToken = createAsyncThunk("auth/user", async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.getUser();
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: initialState$1,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.fulfilled, (state, acction) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = acction.payload.user;
    });
    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = action.payload;
    });
    builder.addCase(getUserByToken.rejected, (state) => {
      state.authChecked = true;
      state.isAuthed = false;
      state.user = void 0;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.authChecked = true;
      state.isAuthed = false;
      state.user = void 0;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.authChecked = true;
      state.isAuthed = false;
      state.user = void 0;
    });
  }
});
const authReducer = authSlice.reducer;
yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(7).required()
}).required();
yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(7).required()
}).required();
yup.object({
  password: yup.string().required().min(7),
  passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
});
const CartListMobile = ({ items }) => {
  const dispatch = useAppDispatch();
  const removeItem = async (id) => {
    try {
      await dispatch(removeItemFromCart({ item_id: id })).unwrap();
      toast(`Successfully removed ${name}`, {
        type: "success"
      });
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };
  return /* @__PURE__ */ jsx("ul", { className: "ps-shopping__list", children: items.map((cartItem) => /* @__PURE__ */ jsx("li", { id: cartItem.id, children: /* @__PURE__ */ jsxs("div", { className: "ps-product ps-product--wishlist", children: [
    /* @__PURE__ */ jsx("div", { className: "ps-product__remove", children: /* @__PURE__ */ jsx("a", { href: "#", onClick: () => removeItem(cartItem.id), children: /* @__PURE__ */ jsx("i", { className: "icon-cross" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-product__thumbnail", children: /* @__PURE__ */ jsx("a", { className: "ps-product__image", children: /* @__PURE__ */ jsx("figure", { children: cartItem.associatedModel.images && cartItem.associatedModel.images.length > 0 ? /* @__PURE__ */ jsx(
      "img",
      {
        src: `/storage/${cartItem.associatedModel.images[0].path}`,
        alt: cartItem.associatedModel.images[0].alt
      }
    ) : null }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "ps-product__content", children: [
      /* @__PURE__ */ jsxs("h5", { className: "ps-product__title", children: [
        /* @__PURE__ */ jsx("a", { href: "", children: cartItem.name }),
        /* @__PURE__ */ jsx("p", { children: generateAttributtesCartItem(cartItem.attributes) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ps-product__row", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__label", children: "Price:" }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__value", children: /* @__PURE__ */ jsxs("span", { className: "ps-product__price", children: [
          "$",
          cartItem.price.toLocaleString()
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ps-product__row ps-product__quantity", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__label", children: "Quantity:" }),
        /* @__PURE__ */ jsx("div", { className: "ps-product__value", children: cartItem.quantity })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ps-product__row ps-product__subtotal", children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product__label", children: "Subtotal:" }),
        /* @__PURE__ */ jsxs("div", { className: "ps-product__value", children: [
          "$",
          (cartItem.price * cartItem.quantity).toLocaleString()
        ] })
      ] })
    ] })
  ] }) })) });
};
const LoginSchema = yup.object({
  name: yup.string().min(2).required(),
  email: yup.string().email().required()
}).required();
const ModalContentWithForm = ({ product }) => {
  var _a, _b;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });
  const onSubmit = async (inputs) => {
    setIsSubmitting(true);
    try {
      const { data } = await ProductService.sendRequestProduct(
        product.slug,
        inputs
      );
      if (data.ok) {
        toast("Your request has been sent!", { type: "success" });
      } else {
        toast("Error sending request, please try again later", {
          type: "error"
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      toast("Error sending request, please try again later", {
        type: "error"
      });
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "ps-checkout", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("form", { style: { width: "100%" }, onSubmit: handleSubmit(onSubmit), children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", style: { marginBottom: 0 }, children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "text",
        ...register("name"),
        error: (_a = errors.name) == null ? void 0 : _a.message,
        disabled: isSubmitting,
        formType: "checkout",
        label: "Name"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        type: "email",
        ...register("email"),
        error: (_b = errors.email) == null ? void 0 : _b.message,
        disabled: isSubmitting,
        formType: "checkout",
        label: "Email"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        style: { width: "100%" },
        className: "ps-btn ps-btn--warning custom-button",
        disabled: isSubmitting,
        children: "Let's Talk"
      }
    ) })
  ] }) }) }) }) });
};
const style$1 = "";
const styleAddons = "";
loadStripe("pk_test_51MRiCzBv37yzeDejaQhcSgIPDkQ5HTlspXHOHHebZqVSUeekwszGGn7fdjGyJJQghIzAq2heXH2dCX0JwTHH7qiC00tAE33eMo");
const style = "";
const CatalogProducts = ({
  products,
  currentCategory,
  pageCount,
  currentPage
}) => {
  const handlePageClick = ({ selected }) => {
    if (selected + 1 === currentPage) {
      return;
    }
    router.visit(`?page=${selected + 1}`, {
      method: "get",
      data: {},
      replace: false,
      preserveState: false,
      preserveScroll: false,
      only: [],
      headers: {},
      errorBag: null,
      forceFormData: false,
      onCancelToken: (cancelToken) => {
      },
      onCancel: () => {
      },
      onBefore: (visit) => {
      },
      onStart: (visit) => {
      },
      onProgress: (progress) => {
      },
      onSuccess: (page) => {
      },
      onError: (errors) => {
      },
      onFinish: (visit) => {
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "ps-categogy--grid", children: /* @__PURE__ */ jsx("div", { className: "row m-0", children: products.length > 0 ? products.map((product, idx) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "col-6 col-lg-4 col-xl-3 p-0",
        children: /* @__PURE__ */ jsx(
          ProductCard,
          {
            ...product,
            fullPage: true,
            category: currentCategory,
            allowFullPage: false
          }
        )
      },
      `${product.id}-${idx}`
    )) : /* @__PURE__ */ jsx(
      EmptyPage,
      {
        iconClass: "fa fa-shopping-basket",
        title: "No Products Here",
        size: "small"
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-pagination", children: /* @__PURE__ */ jsx("ul", { className: "pagination custom-pagenation-products", children: /* @__PURE__ */ jsx(
      ReactPaginate,
      {
        activeClassName: "active",
        breakLabel: "...",
        className: classNames({
          pagination: true,
          hide_on_mob_items: pageCount >= 7
        }),
        nextLabel: /* @__PURE__ */ jsx("i", { className: "fa fa-angle-double-right" }),
        initialPage: currentPage > 0 ? currentPage - 1 : 0,
        onPageChange: handlePageClick,
        pageRangeDisplayed: pageCount,
        pageCount,
        previousLabel: /* @__PURE__ */ jsx("i", { className: "fa fa-angle-double-left" }),
        pageClassName: "page-paginate",
        renderOnZeroPageCount: null
      }
    ) }) })
  ] });
};
const SelectProductFile = forwardRef(
  function SelectProductFile2(props, ref) {
    const [state, setState] = useState({
      files: [],
      showModal: false,
      disabled: true
    });
    useImperativeHandle(ref, () => {
      return {
        showModal() {
          setState({
            showModal: true,
            files: [],
            disabled: true
          });
        },
        closeModal() {
          setState({
            showModal: false,
            files: [],
            disabled: true
          });
        }
      };
    });
    useEffect(() => {
      setState((currentState) => ({
        ...currentState,
        disabled: state.files.length === 0
      }));
    }, [state.files]);
    const onAddCart = async () => {
      setState((currentState) => ({ ...currentState, disabled: true }));
      await props.submitHandler(state.files);
      setState({ files: [], showModal: false, disabled: false });
    };
    return /* @__PURE__ */ jsx(
      Dialog,
      {
        open: state.showModal,
        onClose: () => setState({ files: [], showModal: false, disabled: true }),
        children: /* @__PURE__ */ jsx("div", { className: "headless-bg", children: /* @__PURE__ */ jsx(Dialog.Panel, { className: "headless-popup", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "modal-body headless-content",
            style: { textAlign: "center" },
            children: [
              /* @__PURE__ */ jsx("h3", { style: { color: "#103178", marginBottom: 25 }, children: "Please Specify An Image" }),
              /* @__PURE__ */ jsx(
                Dropzone,
                {
                  onDrop: (files) => setState((currentState) => ({ ...currentState, files }))
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "col-md-6", style: { margin: "auto" }, children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "ps-btn ps-btn--warning",
                  onClick: onAddCart,
                  style: { marginTop: 25 },
                  disabled: state.disabled,
                  children: "Add to cart"
                }
              ) })
            ]
          }
        ) }) })
      }
    );
  }
);
const SEOHead = ({
  title = "Online Printing Services",
  description,
  keywords,
  children
}) => {
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    description ? /* @__PURE__ */ jsx("meta", { name: "description", content: description }) : null,
    description ? /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }) : null,
    keywords ? /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }) : null,
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Signs7" }),
    children && children
  ] });
};
const UpdatePasswordForm = ({}) => {
  const { data, setData, errors, processing, post, reset } = useForm$1({
    oldPassword: "",
    newPassword: "",
    passwordConfirmation: ""
  });
  const onSubmit = (e) => {
    e.preventDefault();
    post("/api/profile/password/edit", {
      preserveScroll: false,
      preserveState: false,
      onSuccess: () => {
        toast("Password updated!", { type: "success" });
      },
      onError: (error) => {
        toast(error.error, { type: "error" });
        reset("newPassword", "oldPassword", "passwordConfirmation");
      }
    });
  };
  return /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
    /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Update Password" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        value: data.oldPassword,
        onChange: (e) => setData("oldPassword", e.target.value),
        error: errors.oldPassword,
        type: "password",
        disabled: processing,
        placeholder: "Current Password",
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        value: data.newPassword,
        onChange: (e) => setData("newPassword", e.target.value),
        error: errors.newPassword,
        type: "password",
        disabled: processing,
        placeholder: "New Password",
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        value: data.passwordConfirmation,
        onChange: (e) => setData("passwordConfirmation", e.target.value),
        error: errors.passwordConfirmation,
        type: "password",
        placeholder: "Confirm Password",
        disabled: processing,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", disabled: processing, children: "Update" }) })
  ] }) });
};
const UpdatePersonalInformationForm = ({}) => {
  const { auth } = usePage().props;
  useState(
    auth.user && auth.user.avatar ? `/storage/${auth.user.avatar}` : "/default-profile.png"
  );
  const { data, setData, errors, processing, post } = useForm$1({
    name: auth.user.name,
    email: auth.user.email,
    avatar: void 0,
    preview: auth.user && auth.user.avatar ? `/storage/${auth.user.avatar}` : "/default-profile.png"
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    post("/api/profile/edit", {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast("User information updated", { type: "success" })
    });
  };
  return /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
    /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Personal Information" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "ps-form__group",
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: data.preview,
              style: { width: 120, height: 120, borderRadius: 120 }
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              onChange: (e) => {
                if (e.target.files) {
                  setData({
                    ...data,
                    preview: URL.createObjectURL(e.target.files[0]),
                    avatar: e.target.files[0]
                  });
                }
              },
              type: "file",
              id: "upload",
              hidden: true,
              style: { display: "none" }
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "upload", style: { cursor: "pointer", marginTop: 10 }, children: "Choose file" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        value: data.name,
        onChange: (e) => setData("name", e.target.value),
        type: "text",
        error: errors.name,
        disabled: processing,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        value: data.email,
        onChange: (e) => setData("email", e.target.value),
        type: "email",
        error: errors.email,
        disabled: processing,
        formType: "profile"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Update" }) })
  ] }) });
};
const Cart = (props) => {
  const { cart } = usePage().props;
  const renderCart = () => {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SEOHead, { title: "Shopping Cart" }),
      /* @__PURE__ */ jsxs("h3", { className: "ps-shopping__title", children: [
        "Shopping cart",
        /* @__PURE__ */ jsxs("sup", { children: [
          "(",
          cart.items.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ps-shopping__content", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-7 col-lg-9", children: [
          /* @__PURE__ */ jsx(CartList, { items: cart.items }),
          /* @__PURE__ */ jsx(CartListMobile, { items: cart.items })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-5 col-lg-3", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ps-shopping__label",
              style: {
                fontSize: 18,
                padding: "18px 0px",
                lineHeight: "unset"
              },
              children: "Cart totals"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "ps-shopping__box", children: [
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__row", children: [
              /* @__PURE__ */ jsx("div", { className: "ps-shopping__label", children: "Subtotal" }),
              /* @__PURE__ */ jsxs("div", { className: "ps-shopping__price", children: [
                "$",
                cart.total.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__row", children: [
              /* @__PURE__ */ jsx("div", { className: "ps-shopping__label", children: "Tax" }),
              /* @__PURE__ */ jsxs("div", { className: "ps-shopping__price", children: [
                "$",
                cart.tax.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__row", children: [
              /* @__PURE__ */ jsx("div", { className: "ps-shopping__label", children: "Total" }),
              /* @__PURE__ */ jsxs("div", { className: "ps-shopping__price", children: [
                "$",
                cart.total_with_tax.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ps-shopping__checkout", children: [
              /* @__PURE__ */ jsx(Link, { className: "ps-btn ps-btn--warning", href: "checkout", children: "Proceed to checkout" }),
              /* @__PURE__ */ jsx(Link, { className: "ps-shopping__link", href: "/", children: "Continue To Shopping" })
            ] })
          ] })
        ] })
      ] }) })
    ] });
  };
  const renderEmptyCart = () => {
    return /* @__PURE__ */ jsxs("div", { className: "cart-empty text-center title-with-icon-section", children: [
      /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", children: /* @__PURE__ */ jsx(
        "i",
        {
          className: "fa fa-shopping-basket",
          style: { color: "#5b6c8f", fontSize: 120 }
        }
      ) }),
      /* @__PURE__ */ jsx("h1", { className: "cart-title", style: { color: "#103178", marginTop: 20 }, children: "Your cart is empty" })
    ] });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Shopping cart" }) }),
    /* @__PURE__ */ jsx("div", { className: "ps-shopping", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Shopping cart" })
      ] }),
      /* @__PURE__ */ jsx("div", { children: cart.items.length > 0 ? renderCart() : renderEmptyCart() })
    ] }) })
  ] });
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cart
}, Symbol.toStringTag, { value: "Module" }));
const Catalog = ({
  productsWithPagenation,
  categories,
  currentCategory,
  countedProducts
}) => {
  const { data: products, meta } = productsWithPagenation;
  console.log(meta);
  const [collapseCategories, setCollapseCategories] = useState(true);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: currentCategory.title }),
    /* @__PURE__ */ jsx("div", { className: "ps-categogy", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Shop" }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: currentCategory.title })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "ps-categogy__name", children: [
        currentCategory.title,
        /* @__PURE__ */ jsxs("sup", { children: [
          "(",
          countedProducts,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ps-categogy__content", children: /* @__PURE__ */ jsxs("div", { className: "row row-reverse", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-9", children: /* @__PURE__ */ jsx(
          CatalogProducts,
          {
            currentCategory,
            products,
            pageCount: meta.last_page,
            currentPage: meta.current_page
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-3", children: /* @__PURE__ */ jsx("div", { className: "ps-widget ps-widget--product", children: /* @__PURE__ */ jsxs("div", { className: "ps-widget__block", children: [
          /* @__PURE__ */ jsx("h4", { className: "ps-widget__title", children: "Categories" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: classNames({
                "ps-block-control": true,
                active: collapseCategories
              }),
              onClick: (e) => {
                e.preventDefault();
                setCollapseCategories((isCollapsed) => !isCollapsed);
              },
              children: /* @__PURE__ */ jsx("i", { className: "fa fa-angle-down" })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ps-widget__content ps-widget__category",
              style: {
                display: collapseCategories ? "block" : "none"
              },
              children: /* @__PURE__ */ jsx("ul", { className: "menu--mobile", children: categories.map((category) => /* @__PURE__ */ jsx(
                "li",
                {
                  className: classNames({
                    active: currentCategory.id === category.id
                  }),
                  children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: `/shop/category/${category.slug}`,
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      },
                      children: [
                        category.title,
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "category-go-icon",
                            style: {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            },
                            children: /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-right" })
                          }
                        )
                      ]
                    }
                  )
                },
                `category-${category.slug}`
              )) })
            }
          )
        ] }) }) })
      ] }) })
    ] }) })
  ] });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Catalog
}, Symbol.toStringTag, { value: "Module" }));
const stripePromise = loadStripe("pk_test_51MRiCzBv37yzeDejaQhcSgIPDkQ5HTlspXHOHHebZqVSUeekwszGGn7fdjGyJJQghIzAq2heXH2dCX0JwTHH7qiC00tAE33eMo");
const Checkout = ({}) => {
  const { cart } = usePage().props;
  const [state, setState] = useState({
    clientSecret: void 0,
    tempOrderID: void 0
  });
  useEffect(() => {
    if (!(cart == null ? void 0 : cart.items) || (cart == null ? void 0 : cart.items.length) < 1) {
      console.log("need redirect");
    }
  }, [cart]);
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const { data } = await PaymentService.retrivePaymentIntent();
        setState({
          clientSecret: data.client_secret,
          tempOrderID: data.temp_order_id
        });
      } catch (error) {
        toast("Error initing payment...", { type: "error" });
      }
    };
    fetchPaymentIntent();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: "Checkout" }),
    /* @__PURE__ */ jsx("div", { className: "ps-checkout", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/cart", children: "Shopping cart" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Checkout" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "ps-checkout__title", children: "Checkout" }),
      /* @__PURE__ */ jsx("div", { className: "ps-checkout__content", children: stripePromise && state.clientSecret ? /* @__PURE__ */ jsx(
        Elements,
        {
          stripe: stripePromise,
          options: {
            clientSecret: state.clientSecret,
            locale: "en",
            fonts: [
              {
                cssSrc: "https://fonts.googleapis.com/css?family=Jost"
              }
            ],
            appearance: {
              theme: "flat",
              variables: {
                colorPrimary: "#103178",
                colorBackground: "#f0f2f5",
                colorText: "#103178",
                fontFamily: '"Jost", sans-serif',
                spacingUnit: "4px",
                borderRadius: "40px"
                // See all possible variables below
              }
            }
          },
          children: /* @__PURE__ */ jsx(PaymentForm, { tempOrderID: state.tempOrderID })
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-lg-8", children: [
          /* @__PURE__ */ jsx(Skeleton, { height: 40 }),
          /* @__PURE__ */ jsx(Skeleton, { height: 100, count: 2 }),
          /* @__PURE__ */ jsx(Skeleton, { height: 35, count: 6 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-12 col-lg-4", children: [
          /* @__PURE__ */ jsx(Skeleton, { height: 55 }),
          /* @__PURE__ */ jsx(Skeleton, { height: 35, count: 8 })
        ] })
      ] }) })
    ] }) })
  ] });
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Checkout
}, Symbol.toStringTag, { value: "Module" }));
const EditProfile = ({}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: "Edit Profile" }),
    /* @__PURE__ */ jsx("div", { className: "ps-account", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/profile", children: "Profile" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Edit Profile" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "row", style: { justifyContent: "center" }, children: /* @__PURE__ */ jsxs("div", { className: "col-12 col-md-8", children: [
        /* @__PURE__ */ jsx(UpdatePersonalInformationForm, {}),
        /* @__PURE__ */ jsx(UpdatePasswordForm, {})
      ] }) })
    ] }) })
  ] });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditProfile
}, Symbol.toStringTag, { value: "Module" }));
const ProductShowModal = ({ product, handleClose }) => {
  useMediaQuery({ query: "(max-width: 720px)" });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Dialog, { open: true, onClose: handleClose, children: /* @__PURE__ */ jsx("div", { className: "headless-bg", children: /* @__PURE__ */ jsx(Dialog.Panel, { className: "headless-popup", children: /* @__PURE__ */ jsx("div", { className: "modal-body headless-content", children: /* @__PURE__ */ jsxs("div", { className: "wrap-modal-slider  ps-quickview__body", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "close ps-quickview__close",
        type: "button",
        onClick: handleClose,
        style: { cursor: "pointer", zIndex: 2 },
        "data-dismiss": "modal",
        "aria-label": "Close",
        children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "×" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ps-product--detail", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: product.images ? /* @__PURE__ */ jsx(
        ProductSlider,
        {
          images: product.images,
          productName: product.title
        }
      ) : /* @__PURE__ */ jsx("div", { style: { height: 450, marginBottom: 30 }, children: /* @__PURE__ */ jsx(Skeleton, { height: "100%" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "ps-product__info",
          style: { marginBottom: 0 },
          children: [
            /* @__PURE__ */ jsx("div", { className: "ps-product__branch", children: product.categories.map((category) => /* @__PURE__ */ jsx(Link, { href: `/shop/category/${category.slug}`, children: category.title })) || /* @__PURE__ */ jsx(Skeleton, {}) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__title", children: product.title ? /* @__PURE__ */ jsx("a", { children: product.title }) : /* @__PURE__ */ jsx(Skeleton, { height: 45 }) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__desc", children: product.description ? /* @__PURE__ */ jsx(
              "p",
              {
                className: "product_modal_desc",
                dangerouslySetInnerHTML: {
                  __html: product.description
                }
              }
            ) : /* @__PURE__ */ jsx(Skeleton, { count: 4 }) }),
            /* @__PURE__ */ jsx("div", { className: "no-gutters row", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "ps-product__meta col-md-12",
                style: {
                  marginTop: 0,
                  borderBottom: "1px solid #f0f2f5"
                },
                children: /* @__PURE__ */ jsx(ModalContentWithForm, { product })
              }
            ) })
          ]
        }
      ) })
    ] }) }) }) })
  ] }) }) }) }) }) });
};
const Home = ({ title }) => {
  const { homeCategories, cart } = usePage().props;
  const [product, setProduct2] = useState();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !product ? /* @__PURE__ */ jsx(SEOHead, { title }) : /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: product.seo_title,
        description: product.seo_desc,
        keywords: product.seo_keywords
      }
    ),
    product ? /* @__PURE__ */ jsx(
      ProductShowModal,
      {
        product,
        handleClose: () => setProduct2(void 0)
      }
    ) : null,
    /* @__PURE__ */ jsxs("div", { className: "ps-home ps-home--4", children: [
      /* @__PURE__ */ jsx("section", { className: "ps-section--banner", children: /* @__PURE__ */ jsx(HomeSlider, {}) }),
      homeCategories.map((category, idx) => {
        const { products, id, title: title2, slug } = category;
        return /* @__PURE__ */ jsx(
          "section",
          {
            className: classNames({
              "ps-section--featured": true,
              "main-section": true,
              "alt-section": idx % 2 === 0
            }),
            children: /* @__PURE__ */ jsxs("div", { className: "container-fluid", children: [
              /* @__PURE__ */ jsx("h3", { className: "ps-section__title", children: title2 }),
              /* @__PURE__ */ jsxs("div", { className: "ps-section__content", children: [
                /* @__PURE__ */ jsx("div", { className: "row m-0", children: products.map((product2, idx2) => /* @__PURE__ */ jsx("div", { className: "col-md-3 p-0", children: /* @__PURE__ */ createElement(
                  ProductCard,
                  {
                    ...product2,
                    key: `${product2.id}-${idx2}`,
                    allowFullPage: product2.with_checkout === false,
                    onClickQuickView: (quickViewProduct) => setProduct2(quickViewProduct)
                  }
                ) })) }),
                /* @__PURE__ */ jsx("div", { className: "ps-shop__more", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/catalog/${slug}`,
                    style: { display: "block" },
                    className: "home_show_more",
                    children: "Show all"
                  }
                ) })
              ] })
            ] })
          }
        );
      })
    ] })
  ] });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const Login = ({}) => {
  const { data, setData, errors, processing, post, reset } = useForm$1({
    email: "",
    password: ""
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    post("/login", {
      onError: (error) => {
        toast(error.error, { type: "error" });
        reset("password");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: "Login" }),
    /* @__PURE__ */ jsx("div", { className: "ps-account", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", style: { justifyContent: "center" }, children: /* @__PURE__ */ jsx("div", { className: "col-12 col-md-8", children: /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
      /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Login" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: data.email,
          onChange: (e) => setData("email", e.target.value),
          type: "email",
          error: errors.email,
          disabled: processing,
          formType: "profile",
          label: "Email"
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: data.password,
          onChange: (e) => setData("password", e.target.value),
          type: "password",
          error: errors.password,
          disabled: processing,
          formType: "profile",
          label: "Password"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "ps-form__submit", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "ps-btn ps-btn--warning",
            disabled: processing,
            children: "Log in"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "form-check", children: /* @__PURE__ */ jsx(Link, { className: "ps-account__link", href: "/register", children: "Create account" }) })
      ] }),
      /* @__PURE__ */ jsx(Link, { className: "ps-account__link", href: "/forgot-password", children: "Lost your password?" })
    ] }) }) }) }) }) })
  ] });
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const Product = ({ product: productFromServer }) => {
  var _a;
  const dragAndDropRef = useRef(null);
  const dispatch = useAppDispatch();
  const { product, addons, selectedOption } = useAppSelector(
    (state2) => state2.product
  );
  const [state, setState] = useState({
    selectedAddons: [],
    selectedOption: void 0,
    typeSizeSelection: "custom",
    firstPriceLoaded: false,
    highlightErrors: false,
    disabled: false,
    width: {
      error: void 0,
      value: 1,
      showError: false
    },
    height: {
      error: void 0,
      value: 1,
      showError: false
    },
    customSize: {
      error: void 0,
      value: void 0
    },
    unit: "inches",
    price: 100,
    quantity: 1,
    calculatedPrice: void 0
  });
  const validationRules = {
    customSize: (selectedOption == null ? void 0 : selectedOption.type) !== "sqft" && state.typeSizeSelection === "default" ? state.customSize.value !== void 0 : true
  };
  useEffect(() => {
    dispatch(setProduct(productFromServer.data));
  }, []);
  useEffect(() => {
    const selectedAddons = addons.filter((a) => a.isSelected).map((selectedAddon) => {
      let error;
      if (selectedAddon.withQuantity) {
        if (selectedAddon.quantity > selectedAddon.validation["max-qty"]) {
          error = `Max value for addon is - ${selectedAddon.validation["max-qty"]}`;
        } else if (selectedAddon.quantity < selectedAddon.validation["min-qty"]) {
          error = `Min value for addon is - ${selectedAddon.validation["min-qty"]}`;
        } else {
          error = void 0;
        }
      }
      return {
        ...selectedAddon,
        error,
        showError: error ? true : false
      };
    });
    setState((state2) => ({ ...state2, selectedAddons }));
  }, [addons]);
  useEffect(() => {
    setState((state2) => ({ ...state2, selectedOption }));
  }, [selectedOption]);
  useDebounceEffect(() => {
    const fetchPriceViaCalculator = async () => {
      if (!product || !state.selectedOption) {
        return;
      }
      setState((state2) => ({ ...state2, disabled: true }));
      const { width, height, quantity, selectedAddons, selectedOption: selectedOption2, unit } = state;
      const { data } = await CartService.calculateSinglePrice(
        product == null ? void 0 : product.id,
        selectedOption2.id,
        selectedAddons,
        unit,
        width.value,
        height.value,
        quantity
      );
      setState((state2) => ({
        ...state2,
        disabled: false,
        calculatedPrice: data.price,
        firstPriceLoaded: true
      }));
    };
    fetchPriceViaCalculator();
  }, [
    state.width,
    state.height,
    state.selectedOption,
    state.selectedAddons,
    state.quantity,
    state.unit,
    state.customSize
    // product,
  ]);
  const submitAddToCart = async (files) => {
    const isValidForm = Object.values(validationRules).every((key) => key);
    if (!isValidForm) {
      setState((state2) => ({
        ...state2,
        highlightErrors: true,
        disabled: false
      }));
      toast("Please, fill all fields", { type: "error" });
      return;
    }
    setState((state2) => ({
      ...state2,
      disabled: true
    }));
    router.post(
      "/api/cart/add",
      {
        product_id: product.id,
        option_id: selectedOption.id,
        addons: state.selectedAddons,
        unit: state.unit,
        width: state.width.value,
        height: state.height.value,
        quantity: state.quantity,
        size_id: state.customSize.value,
        files
      },
      {
        forceFormData: true,
        onSuccess: () => {
          toast("Successfully added to cart", { type: "success" });
          setState((state2) => ({
            ...state2,
            disabled: false
          }));
        }
      }
    );
  };
  const renderWithCheckout = () => {
    return /* @__PURE__ */ jsx(Fragment, {});
  };
  const renderModalContent = () => {
    return /* @__PURE__ */ jsx("div", { className: "ps-product__meta", children: /* @__PURE__ */ jsx(ModalContentWithForm, { product }) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: productFromServer.data.seo_title,
        description: productFromServer.data.seo_desc,
        keywords: productFromServer.data.seo_keywords,
        children: /* @__PURE__ */ jsx(
          "script",
          {
            ...jsonLdScriptProps({
              "@context": "https://schema.org",
              "@type": "Product",
              name: productFromServer.data.title,
              brand: "Signs7",
              image: productFromServer.data.images.length > 0 ? `/storage/${productFromServer.data.images[0].path}` : void 0
            })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(ProductFormContext.Provider, { value: { state, setState, validationRules }, children: /* @__PURE__ */ jsx("div", { className: "ps-page--product-variable", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx("span", { children: "Shop" }) }),
        productFromServer.data.categories.length > 0 && /* @__PURE__ */ jsx(
          "li",
          {
            className: "ps-breadcrumb__item",
            children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/shop/category/${productFromServer.data.categories[0].slug}`,
                children: productFromServer.data.categories[0].title
              }
            )
          },
          `breadcumbs-${productFromServer.data.categories[0].slug}`
        ),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx("span", { children: productFromServer.data.title }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ps-page__content", style: { marginBottom: "20px" }, children: [
        /* @__PURE__ */ jsx("div", { className: "ps-product--detail", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6" }),
          /* @__PURE__ */ jsx("div", { className: "col-12 col-xl-6", children: /* @__PURE__ */ jsxs("div", { className: "ps-product__info", children: [
            /* @__PURE__ */ jsx("div", { className: "ps-product__branch", children: (_a = productFromServer.data.categories) == null ? void 0 : _a.map(
              (category) => /* @__PURE__ */ jsx(
                Link,
                {
                  href: `/shop/category/${category.slug}`,
                  children: category.title
                },
                `cat-${category.slug}`
              )
            ) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__title", children: /* @__PURE__ */ jsx("a", { children: productFromServer.data.title }) }),
            /* @__PURE__ */ jsx("div", { className: "ps-product__desc", children: /* @__PURE__ */ jsx(
              "p",
              {
                className: "product_modal_desc",
                dangerouslySetInnerHTML: {
                  __html: productFromServer.data.description
                }
              }
            ) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "ps-product__bundle", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "icon-wallet" }),
                "100% Money back"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "icon-bag2" }),
                "Non-contact shipping"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("i", { className: "icon-truck" }),
                "Free delivery for order over $200"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { children: productFromServer.data.with_checkout ? renderWithCheckout() : renderModalContent() })
          ] }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(
          SelectProductFile,
          {
            ref: dragAndDropRef,
            submitHandler: (files) => submitAddToCart(files)
          }
        )
      ] })
    ] }) }) })
  ] });
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Product
}, Symbol.toStringTag, { value: "Module" }));
const Profile = ({ auth, orders }) => {
  var _a;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: "My Profile" }),
    /* @__PURE__ */ jsx("div", { className: "ps-shopping", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxs("ul", { className: "ps-breadcrumb", children: [
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "ps-breadcrumb__item active", "aria-current": "page", children: "Profile" })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "ps-shopping__title", children: "Profile" }),
      /* @__PURE__ */ jsx("div", { className: "ps-shopping__content", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-7 col-lg-9", children: /* @__PURE__ */ jsx(
          OrdersList,
          {
            data: orders.data,
            pageCount: orders.meta.last_page,
            currentPage: orders.meta.current_page
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "col-12 col-md-5 col-lg-3", children: /* @__PURE__ */ jsxs("div", { className: "ps-shopping__box", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ps-shopping__row",
              style: { textAlign: "center" },
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: ((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.avatar) ? auth.user.avatar : "/default-profile.png",
                        width: 80,
                        style: { borderRadius: "50%" },
                        height: 80
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { style: { marginTop: 20, fontWeight: "bold" }, children: auth.user.name }),
                    /* @__PURE__ */ jsx("span", { style: { marginTop: 5 }, children: auth.user.email })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "ps-shopping__checkout", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                className: "ps-shopping__link",
                href: "/profile/edit",
                style: { marginBottom: 15 },
                children: "Edit Profile"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "ps-btn ps-btn--warning",
                onClick: () => router.post("logout"),
                style: { marginBottom: 0, marginTop: 15 },
                children: "Logout"
              }
            )
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile
}, Symbol.toStringTag, { value: "Module" }));
const Register = ({}) => {
  const { data, setData, errors, processing, post, reset } = useForm$1({
    name: "",
    email: "",
    password: ""
  });
  const onSubmit = (e) => {
    e.preventDefault();
    post("/register", {
      onError: (error) => {
        toast(error.error, { type: "error" });
        reset("password");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: "Register" }),
    /* @__PURE__ */ jsx("div", { className: "ps-account", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", style: { justifyContent: "center" }, children: /* @__PURE__ */ jsx("div", { className: "col-12 col-md-8", children: /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs("div", { className: "ps-form--review", children: [
      /* @__PURE__ */ jsx("h2", { className: "ps-form__title", children: "Create account" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: data.name,
          onChange: (e) => setData("name", e.target.value),
          type: "text",
          error: errors.name,
          disabled: processing,
          formType: "profile",
          label: "Name"
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: data.email,
          onChange: (e) => setData("email", e.target.value),
          type: "email",
          error: errors.email,
          disabled: processing,
          formType: "profile",
          label: "Email"
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: data.password,
          onChange: (e) => setData("password", e.target.value),
          type: "password",
          error: errors.password,
          disabled: processing,
          formType: "profile",
          label: "Password"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "ps-form__submit", children: /* @__PURE__ */ jsx("button", { className: "ps-btn ps-btn--warning", children: "Create account" }) }),
      /* @__PURE__ */ jsx(Link, { className: "ps-account__link", href: "/login", children: "Have an account? Login." })
    ] }) }) }) }) }) })
  ] });
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
const SuccessPayment = ({ payment_intent }) => {
  const [state, setState] = React__default.useState({
    loading: true,
    status: void 0,
    uuid: void 0,
    email: void 0
  });
  React__default.useEffect(() => {
    const fetchPI = async () => {
      try {
        const { data } = await PaymentService.getPaymentIntent(payment_intent);
        if (data.status === "completed") {
          setState({
            loading: false,
            status: "completed",
            uuid: data.uuid
          });
        } else if (data.status === "in proccess") {
          setState({
            loading: false,
            status: "in proccess",
            uuid: void 0,
            email: data.email
          });
        }
      } catch (error) {
        toast("Something went wrong, contact us to solve the problem", {
          type: "error"
        });
        console.log(error);
        router.visit("/");
      }
    };
    fetchPI();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: "Success" }),
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "cart-empty text-center title-with-icon-section", children: /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx("div", { className: "ps-cart__icon", style: { marginBottom: 10 }, children: state.loading ? /* @__PURE__ */ jsx(Skeleton, { width: 120, height: 120, borderRadius: 120 }) : /* @__PURE__ */ jsx(
        "i",
        {
          className: classNames({
            "fa fa-check-circle": state.status === "completed",
            "fa fa-clock-o": state.status === "in proccess"
          }),
          style: { color: "#5b6c8f", fontSize: 120 }
        }
      ) }),
      state.loading ? /* @__PURE__ */ jsx(Skeleton, { count: 2 }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "cart-title",
            style: { color: "#103178", marginTop: 20 },
            children: state.status === "completed" ? "Your order proccesed" : "Your payment in process"
          }
        ),
        state.status === "completed" ? /* @__PURE__ */ jsxs("p", { children: [
          "Order ID:",
          " ",
          /* @__PURE__ */ jsx(
            "strong",
            {
              style: {
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "monospace",
                fontSize: 16
              },
              children: state.uuid
            }
          ),
          ";"
        ] }) : /* @__PURE__ */ jsxs("p", { children: [
          "Your payment is being processed, once the payment is processed we will send you an email to",
          " ",
          /* @__PURE__ */ jsx("strong", { children: state.email })
        ] })
      ] })
    ] }) }) })
  ] });
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SuccessPayment
}, Symbol.toStringTag, { value: "Module" }));
const initialState = {
  homeCategories: []
};
const getCategoriesWithProducts = createAsyncThunk("app/homeCategories", async function(_, { rejectWithValue }) {
  try {
    const { data } = await CategoryService.getCategoriesWithProducts();
    return data.categories;
  } catch (error) {
    return rejectWithValue("Failed to get cart");
  }
});
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesWithProducts.fulfilled, (state, action) => {
      state.homeCategories = action.payload;
    });
  }
});
const appSliceReducer = appSlice.reducer;
const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    cart: cartReducer,
    app: appSliceReducer,
    product: singleProductSliceReducer
  }),
  middleware: []
});
const ReactToastify = "";
const DefaultLayout = ({ children }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "ps-page", children: [
      /* @__PURE__ */ jsx(Menu, {}),
      /* @__PURE__ */ jsx(MobileHeader, {}),
      /* @__PURE__ */ jsx(SocialFixedButtons, {}),
      /* @__PURE__ */ jsx("div", { className: "main", children }),
      /* @__PURE__ */ jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
};
const skeleton = "";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name2) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Cart.tsx": __vite_glob_0_0, "./Pages/Catalog.tsx": __vite_glob_0_1, "./Pages/Checkout.tsx": __vite_glob_0_2, "./Pages/EditProfile.tsx": __vite_glob_0_3, "./Pages/Home.tsx": __vite_glob_0_4, "./Pages/Login.tsx": __vite_glob_0_5, "./Pages/Product.tsx": __vite_glob_0_6, "./Pages/Profile.tsx": __vite_glob_0_7, "./Pages/Register.tsx": __vite_glob_0_8, "./Pages/SuccessPayment.tsx": __vite_glob_0_9 });
      let page2 = pages[`./Pages/${name2}.tsx`];
      page2.default.layout = page2.default.layout || ((page3) => /* @__PURE__ */ jsx(DefaultLayout, { children: page3 }));
      return pages[`./Pages/${name2}.tsx`];
    },
    setup({ el, App, props }) {
      global.route = (name2, params, absolute, config = Ziggy) => route(name2, params, absolute, config);
      return /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(App, { ...props }) });
    }
  })
);
