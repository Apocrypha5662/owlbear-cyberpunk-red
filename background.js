(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R2 = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R2 && typeof R2.apply === "function" ? R2.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R2 && typeof R2.ownKeys === "function") {
        ReflectOwnKeys = R2.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n2) {
        if (typeof n2 !== "number" || n2 < 0 || NumberIsNaN(n2)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n2 + ".");
        }
        this._maxListeners = n2;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i2 = 1; i2 < arguments.length; i2++) args.push(arguments[i2]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i2 = 0; i2 < len; ++i2)
            ReflectApply(listeners[i2], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m2;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m2 = _getMaxListeners(target);
          if (m2 > 0 && existing.length > m2 && !existing.warned) {
            existing.warned = true;
            var w2 = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w2.name = "MaxListenersExceededWarning";
            w2.emitter = target;
            w2.type = type;
            w2.count = existing.length;
            ProcessEmitWarning(w2);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i2, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i2 = list.length - 1; i2 >= 0; i2--) {
            if (list[i2] === listener || list[i2].listener === listener) {
              originalListener = list[i2].listener;
              position = i2;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i2;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i2 = 0; i2 < keys.length; ++i2) {
            key = keys[i2];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i2 = listeners.length - 1; i2 >= 0; i2--) {
            this.removeListener(type, listeners[i2]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n2) {
        var copy = new Array(n2);
        for (var i2 = 0; i2 < n2; ++i2)
          copy[i2] = arr[i2];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i2 = 0; i2 < ret.length; ++i2) {
          ret[i2] = arr[i2].listener || arr[i2];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/@owlbear-rodeo/sdk/lib/api/PlayerApi.js
  var __awaiter = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var PlayerApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    get id() {
      if (!this.messageBus.userId) {
        throw Error("Unable to get user ID: not ready");
      }
      return this.messageBus.userId;
    }
    getSelection() {
      return __awaiter(this, void 0, void 0, function* () {
        const { selection } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SELECTION", {});
        return selection;
      });
    }
    select(items, replace) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_PLAYER_SELECT", { items, replace });
      });
    }
    deselect(items) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_PLAYER_DESELECT", { items });
      });
    }
    getName() {
      return __awaiter(this, void 0, void 0, function* () {
        const { name } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_NAME", {});
        return name;
      });
    }
    setName(name) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_PLAYER_SET_NAME", { name });
      });
    }
    getColor() {
      return __awaiter(this, void 0, void 0, function* () {
        const { color } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_COLOR", {});
        return color;
      });
    }
    setColor(color) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_PLAYER_SET_COLOR", { color });
      });
    }
    getSyncView() {
      return __awaiter(this, void 0, void 0, function* () {
        const { syncView } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_SYNC_VIEW", {});
        return syncView;
      });
    }
    setSyncView(syncView) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_PLAYER_SET_SYNC_VIEW", { syncView });
      });
    }
    getId() {
      return __awaiter(this, void 0, void 0, function* () {
        const { id } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ID", {});
        return id;
      });
    }
    getRole() {
      return __awaiter(this, void 0, void 0, function* () {
        const { role } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_ROLE", {});
        return role;
      });
    }
    getMetadata() {
      return __awaiter(this, void 0, void 0, function* () {
        const { metadata } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_METADATA", {});
        return metadata;
      });
    }
    setMetadata(update) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_PLAYER_SET_METADATA", { update });
      });
    }
    hasPermission(permission) {
      return __awaiter(this, void 0, void 0, function* () {
        const role = yield this.getRole();
        if (role === "GM") {
          return true;
        }
        const { permissions } = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
        return permissions.indexOf(permission) > -1;
      });
    }
    getConnectionId() {
      return __awaiter(this, void 0, void 0, function* () {
        const { connectionId } = yield this.messageBus.sendAsync("OBR_PLAYER_GET_CONNECTION_ID", {});
        return connectionId;
      });
    }
    onChange(callback) {
      const handleChange = (data) => {
        callback(data.player);
      };
      this.messageBus.send("OBR_PLAYER_SUBSCRIBE", {});
      this.messageBus.on("OBR_PLAYER_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_PLAYER_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_PLAYER_EVENT_CHANGE", handleChange);
      };
    }
  };
  var PlayerApi_default = PlayerApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/ViewportApi.js
  var __awaiter2 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ViewportApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    reset() {
      return __awaiter2(this, void 0, void 0, function* () {
        const { transform } = yield this.messageBus.sendAsync("OBR_VIEWPORT_RESET", {});
        return transform;
      });
    }
    animateTo(transform) {
      return __awaiter2(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO", { transform });
      });
    }
    animateToBounds(bounds) {
      return __awaiter2(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO_BOUNDS", {
          bounds
        });
      });
    }
    getPosition() {
      return __awaiter2(this, void 0, void 0, function* () {
        const { position } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_POSITION", {});
        return position;
      });
    }
    setPosition(position) {
      return __awaiter2(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_POSITION", { position });
      });
    }
    getScale() {
      return __awaiter2(this, void 0, void 0, function* () {
        const { scale } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_SCALE", {});
        return scale;
      });
    }
    setScale(scale) {
      return __awaiter2(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_VIEWPORT_SET_SCALE", { scale });
      });
    }
    getWidth() {
      return __awaiter2(this, void 0, void 0, function* () {
        const { width } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_WIDTH", {});
        return width;
      });
    }
    getHeight() {
      return __awaiter2(this, void 0, void 0, function* () {
        const { height } = yield this.messageBus.sendAsync("OBR_VIEWPORT_GET_HEIGHT", {});
        return height;
      });
    }
    transformPoint(point) {
      return __awaiter2(this, void 0, void 0, function* () {
        const { point: transformed } = yield this.messageBus.sendAsync("OBR_VIEWPORT_TRANSFORM_POINT", { point });
        return transformed;
      });
    }
    inverseTransformPoint(point) {
      return __awaiter2(this, void 0, void 0, function* () {
        const { point: transformed } = yield this.messageBus.sendAsync("OBR_VIEWPORT_INVERSE_TRANSFORM_POINT", { point });
        return transformed;
      });
    }
  };
  var ViewportApi_default = ViewportApi;

  // node_modules/@owlbear-rodeo/sdk/lib/messages/Message.js
  function isMessage(message) {
    return typeof message.id === "string";
  }

  // node_modules/@owlbear-rodeo/sdk/lib/messages/MessageBus.js
  var import_events = __toESM(require_events());

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i2 = 0; i2 < 256; ++i2) {
    byteToHex.push((i2 + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = rnds[i2];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // node_modules/@owlbear-rodeo/sdk/lib/messages/MessageBus.js
  var MessageBus = class extends import_events.EventEmitter {
    constructor(origin, roomId) {
      super();
      this.ready = false;
      this.userId = null;
      this.ref = null;
      this.handleMessage = (event) => {
        const message = event.data;
        if (event.origin === this.targetOrigin && isMessage(message)) {
          if (message.id === "OBR_READY") {
            this.ready = true;
            const data = message.data;
            this.ref = data.ref;
            this.userId = data.userId;
          }
          this.emit(message.id, message.data);
        }
      };
      this.send = (id, data, nonce) => {
        var _a;
        if (!this.ref) {
          throw Error("Unable to send message: not ready");
        }
        (_a = window.parent) === null || _a === void 0 ? void 0 : _a.postMessage({
          id,
          data,
          ref: this.ref,
          nonce
        }, this.targetOrigin);
      };
      this.sendAsync = (id, data, timeout = 5e3) => {
        const nonce = `_${v4_default()}`;
        this.send(id, data, nonce);
        return Promise.race([
          new Promise((resolve, reject) => {
            const self = this;
            function onResponse(value) {
              self.off(`${id}_RESPONSE${nonce}`, onResponse);
              self.off(`${id}_ERROR${nonce}`, onError);
              resolve(value);
            }
            function onError(error) {
              self.off(`${id}_RESPONSE${nonce}`, onResponse);
              self.off(`${id}_ERROR${nonce}`, onError);
              reject(error);
            }
            this.on(`${id}_RESPONSE${nonce}`, onResponse);
            this.on(`${id}_ERROR${nonce}`, onError);
          }),
          ...timeout > 0 ? [
            new Promise((_2, reject) => window.setTimeout(() => reject(new Error(`Message ${id} took longer than ${timeout}ms to get a result`)), timeout))
          ] : []
        ]);
      };
      this.roomId = roomId;
      this.targetOrigin = origin;
      window.addEventListener("message", this.handleMessage);
      this.setMaxListeners(100);
    }
    destroy() {
      window.removeEventListener("message", this.handleMessage);
    }
  };
  var MessageBus_default = MessageBus;

  // node_modules/@owlbear-rodeo/sdk/lib/api/NotificationApi.js
  var __awaiter3 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var NotificationApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    show(message, variant) {
      return __awaiter3(this, void 0, void 0, function* () {
        const { id } = yield this.messageBus.sendAsync("OBR_NOTIFICATION_SHOW", { message, variant });
        return id;
      });
    }
    close(id) {
      return __awaiter3(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_NOTIFICATION_CLOSE", { id });
      });
    }
  };
  var NotificationApi_default = NotificationApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneFogApi.js
  var __awaiter4 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var SceneFogApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    getColor() {
      return __awaiter4(this, void 0, void 0, function* () {
        const { color } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_COLOR", {});
        return color;
      });
    }
    setColor(color) {
      return __awaiter4(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_COLOR", { color });
      });
    }
    getStrokeWidth() {
      return __awaiter4(this, void 0, void 0, function* () {
        const { strokeWidth } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_STROKE_WIDTH", {});
        return strokeWidth;
      });
    }
    setStrokeWidth(strokeWidth) {
      return __awaiter4(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_STROKE_WIDTH", {
          strokeWidth
        });
      });
    }
    getFilled() {
      return __awaiter4(this, void 0, void 0, function* () {
        const { filled } = yield this.messageBus.sendAsync("OBR_SCENE_FOG_GET_FILLED", {});
        return filled;
      });
    }
    setFilled(filled) {
      return __awaiter4(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_FOG_SET_FILLED", { filled });
      });
    }
    onChange(callback) {
      const handleChange = (data) => {
        callback(data.fog);
      };
      this.messageBus.send("OBR_SCENE_FOG_SUBSCRIBE", {});
      this.messageBus.on("OBR_SCENE_FOG_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_SCENE_FOG_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_SCENE_FOG_EVENT_CHANGE", handleChange);
      };
    }
  };
  var SceneFogApi_default = SceneFogApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneGridApi.js
  var __awaiter5 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var SceneGridApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    getDpi() {
      return __awaiter5(this, void 0, void 0, function* () {
        const { dpi } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DPI", {});
        return dpi;
      });
    }
    getScale() {
      return __awaiter5(this, void 0, void 0, function* () {
        const scale = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_SCALE", {});
        return scale;
      });
    }
    setScale(scale) {
      return __awaiter5(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_SCALE", { scale });
      });
    }
    getColor() {
      return __awaiter5(this, void 0, void 0, function* () {
        const { color } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_COLOR", {});
        return color;
      });
    }
    setColor(color) {
      return __awaiter5(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_COLOR", { color });
      });
    }
    getOpacity() {
      return __awaiter5(this, void 0, void 0, function* () {
        const { opacity } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_OPACITY", {});
        return opacity;
      });
    }
    setOpacity(opacity) {
      return __awaiter5(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_OPACITY", { opacity });
      });
    }
    getType() {
      return __awaiter5(this, void 0, void 0, function* () {
        const { type } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_TYPE", {});
        return type;
      });
    }
    setType(type) {
      return __awaiter5(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_TYPE", { type });
      });
    }
    getLineType() {
      return __awaiter5(this, void 0, void 0, function* () {
        const { lineType } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_TYPE", {});
        return lineType;
      });
    }
    setLineType(lineType) {
      return __awaiter5(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_TYPE", {
          lineType
        });
      });
    }
    getMeasurement() {
      return __awaiter5(this, void 0, void 0, function* () {
        const { measurement } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_MEASUREMENT", {});
        return measurement;
      });
    }
    setMeasurement(measurement) {
      return __awaiter5(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_GRID_SET_MEASUREMENT", {
          measurement
        });
      });
    }
    snapPosition(position, snappingSensitivity, useCorners, useCenter) {
      return __awaiter5(this, void 0, void 0, function* () {
        const { position: snapped } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_SNAP_POSITION", {
          position,
          snappingSensitivity,
          useCorners,
          useCenter
        });
        return snapped;
      });
    }
    getDistance(from, to) {
      return __awaiter5(this, void 0, void 0, function* () {
        const { distance } = yield this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DISTANCE", { from, to });
        return distance;
      });
    }
    onChange(callback) {
      const handleChange = (data) => {
        callback(data.grid);
      };
      this.messageBus.send("OBR_SCENE_GRID_SUBSCRIBE", {});
      this.messageBus.on("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_SCENE_GRID_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
      };
    }
  };
  var SceneGridApi_default = SceneGridApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneHistoryApi.js
  var __awaiter6 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var SceneHistoryApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    undo() {
      return __awaiter6(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_UNDO", {});
      });
    }
    redo() {
      return __awaiter6(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_REDO", {});
      });
    }
    canUndo() {
      return __awaiter6(this, void 0, void 0, function* () {
        const { canUndo } = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_UNDO", {});
        return canUndo;
      });
    }
    canRedo() {
      return __awaiter6(this, void 0, void 0, function* () {
        const { canRedo } = yield this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_REDO", {});
        return canRedo;
      });
    }
  };
  var SceneHistoryApi_default = SceneHistoryApi;

  // node_modules/immer/dist/immer.esm.mjs
  function n(n2) {
    for (var r2 = arguments.length, t2 = Array(r2 > 1 ? r2 - 1 : 0), e = 1; e < r2; e++) t2[e - 1] = arguments[e];
    if (false) {
      var i2 = Y[n2], o2 = i2 ? "function" == typeof i2 ? i2.apply(null, t2) : i2 : "unknown error nr: " + n2;
      throw Error("[Immer] " + o2);
    }
    throw Error("[Immer] minified error nr: " + n2 + (t2.length ? " " + t2.map(function(n3) {
      return "'" + n3 + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function r(n2) {
    return !!n2 && !!n2[Q];
  }
  function t(n2) {
    var r2;
    return !!n2 && (function(n3) {
      if (!n3 || "object" != typeof n3) return false;
      var r3 = Object.getPrototypeOf(n3);
      if (null === r3) return true;
      var t2 = Object.hasOwnProperty.call(r3, "constructor") && r3.constructor;
      return t2 === Object || "function" == typeof t2 && Function.toString.call(t2) === Z;
    }(n2) || Array.isArray(n2) || !!n2[L] || !!(null === (r2 = n2.constructor) || void 0 === r2 ? void 0 : r2[L]) || s(n2) || v(n2));
  }
  function i(n2, r2, t2) {
    void 0 === t2 && (t2 = false), 0 === o(n2) ? (t2 ? Object.keys : nn)(n2).forEach(function(e) {
      t2 && "symbol" == typeof e || r2(e, n2[e], n2);
    }) : n2.forEach(function(t3, e) {
      return r2(e, t3, n2);
    });
  }
  function o(n2) {
    var r2 = n2[Q];
    return r2 ? r2.i > 3 ? r2.i - 4 : r2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
  }
  function u(n2, r2) {
    return 2 === o(n2) ? n2.has(r2) : Object.prototype.hasOwnProperty.call(n2, r2);
  }
  function a(n2, r2) {
    return 2 === o(n2) ? n2.get(r2) : n2[r2];
  }
  function f(n2, r2, t2) {
    var e = o(n2);
    2 === e ? n2.set(r2, t2) : 3 === e ? n2.add(t2) : n2[r2] = t2;
  }
  function c(n2, r2) {
    return n2 === r2 ? 0 !== n2 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
  }
  function s(n2) {
    return X && n2 instanceof Map;
  }
  function v(n2) {
    return q && n2 instanceof Set;
  }
  function p(n2) {
    return n2.o || n2.t;
  }
  function l(n2) {
    if (Array.isArray(n2)) return Array.prototype.slice.call(n2);
    var r2 = rn(n2);
    delete r2[Q];
    for (var t2 = nn(r2), e = 0; e < t2.length; e++) {
      var i2 = t2[e], o2 = r2[i2];
      false === o2.writable && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (r2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
    }
    return Object.create(Object.getPrototypeOf(n2), r2);
  }
  function d(n2, e) {
    return void 0 === e && (e = false), y(n2) || r(n2) || !t(n2) || (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e && i(n2, function(n3, r2) {
      return d(r2, true);
    }, true)), n2;
  }
  function h() {
    n(2);
  }
  function y(n2) {
    return null == n2 || "object" != typeof n2 || Object.isFrozen(n2);
  }
  function b(r2) {
    var t2 = tn[r2];
    return t2 || n(18, r2), t2;
  }
  function m(n2, r2) {
    tn[n2] || (tn[n2] = r2);
  }
  function _() {
    return true, U;
  }
  function j(n2, r2) {
    r2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = r2);
  }
  function g(n2) {
    O(n2), n2.p.forEach(S), n2.p = null;
  }
  function O(n2) {
    n2 === U && (U = n2.l);
  }
  function w(n2) {
    return U = { p: [], l: U, h: n2, m: true, _: 0 };
  }
  function S(n2) {
    var r2 = n2[Q];
    0 === r2.i || 1 === r2.i ? r2.j() : r2.g = true;
  }
  function P(r2, e) {
    e._ = e.p.length;
    var i2 = e.p[0], o2 = void 0 !== r2 && r2 !== i2;
    return e.h.O || b("ES5").S(e, r2, o2), o2 ? (i2[Q].P && (g(e), n(4)), t(r2) && (r2 = M(e, r2), e.l || x(e, r2)), e.u && b("Patches").M(i2[Q].t, r2, e.u, e.s)) : r2 = M(e, i2, []), g(e), e.u && e.v(e.u, e.s), r2 !== H ? r2 : void 0;
  }
  function M(n2, r2, t2) {
    if (y(r2)) return r2;
    var e = r2[Q];
    if (!e) return i(r2, function(i2, o3) {
      return A(n2, e, r2, i2, o3, t2);
    }, true), r2;
    if (e.A !== n2) return r2;
    if (!e.P) return x(n2, e.t, true), e.t;
    if (!e.I) {
      e.I = true, e.A._--;
      var o2 = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o, u2 = o2, a2 = false;
      3 === e.i && (u2 = new Set(o2), o2.clear(), a2 = true), i(u2, function(r3, i2) {
        return A(n2, e, o2, r3, i2, t2, a2);
      }), x(n2, o2, false), t2 && n2.u && b("Patches").N(e, t2, n2.u, n2.s);
    }
    return e.o;
  }
  function A(e, i2, o2, a2, c2, s2, v2) {
    if (false, r(c2)) {
      var p2 = M(e, c2, s2 && i2 && 3 !== i2.i && !u(i2.R, a2) ? s2.concat(a2) : void 0);
      if (f(o2, a2, p2), !r(p2)) return;
      e.m = false;
    } else v2 && o2.add(c2);
    if (t(c2) && !y(c2)) {
      if (!e.h.D && e._ < 1) return;
      M(e, c2), i2 && i2.A.l || x(e, c2);
    }
  }
  function x(n2, r2, t2) {
    void 0 === t2 && (t2 = false), !n2.l && n2.h.D && n2.m && d(r2, t2);
  }
  function z(n2, r2) {
    var t2 = n2[Q];
    return (t2 ? p(t2) : n2)[r2];
  }
  function I(n2, r2) {
    if (r2 in n2) for (var t2 = Object.getPrototypeOf(n2); t2; ) {
      var e = Object.getOwnPropertyDescriptor(t2, r2);
      if (e) return e;
      t2 = Object.getPrototypeOf(t2);
    }
  }
  function k(n2) {
    n2.P || (n2.P = true, n2.l && k(n2.l));
  }
  function E(n2) {
    n2.o || (n2.o = l(n2.t));
  }
  function N(n2, r2, t2) {
    var e = s(r2) ? b("MapSet").F(r2, t2) : v(r2) ? b("MapSet").T(r2, t2) : n2.O ? function(n3, r3) {
      var t3 = Array.isArray(n3), e2 = { i: t3 ? 1 : 0, A: r3 ? r3.A : _(), P: false, I: false, R: {}, l: r3, t: n3, k: null, o: null, j: null, C: false }, i2 = e2, o2 = en;
      t3 && (i2 = [e2], o2 = on);
      var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
      return e2.k = f2, e2.j = a2, f2;
    }(r2, t2) : b("ES5").J(r2, t2);
    return (t2 ? t2.A : _()).p.push(e), e;
  }
  function R(e) {
    return r(e) || n(22, e), function n2(r2) {
      if (!t(r2)) return r2;
      var e2, u2 = r2[Q], c2 = o(r2);
      if (u2) {
        if (!u2.P && (u2.i < 4 || !b("ES5").K(u2))) return u2.t;
        u2.I = true, e2 = D(r2, c2), u2.I = false;
      } else e2 = D(r2, c2);
      return i(e2, function(r3, t2) {
        u2 && a(u2.t, r3) === t2 || f(e2, r3, n2(t2));
      }), 3 === c2 ? new Set(e2) : e2;
    }(e);
  }
  function D(n2, r2) {
    switch (r2) {
      case 2:
        return new Map(n2);
      case 3:
        return Array.from(n2);
    }
    return l(n2);
  }
  function T() {
    function e(n2) {
      if (!t(n2)) return n2;
      if (Array.isArray(n2)) return n2.map(e);
      if (s(n2)) return new Map(Array.from(n2.entries()).map(function(n3) {
        return [n3[0], e(n3[1])];
      }));
      if (v(n2)) return new Set(Array.from(n2).map(e));
      var r2 = Object.create(Object.getPrototypeOf(n2));
      for (var i2 in n2) r2[i2] = e(n2[i2]);
      return u(n2, L) && (r2[L] = n2[L]), r2;
    }
    function f2(n2) {
      return r(n2) ? e(n2) : n2;
    }
    var c2 = "add";
    m("Patches", { $: function(r2, t2) {
      return t2.forEach(function(t3) {
        for (var i2 = t3.path, u2 = t3.op, f3 = r2, s2 = 0; s2 < i2.length - 1; s2++) {
          var v2 = o(f3), p2 = i2[s2];
          "string" != typeof p2 && "number" != typeof p2 && (p2 = "" + p2), 0 !== v2 && 1 !== v2 || "__proto__" !== p2 && "constructor" !== p2 || n(24), "function" == typeof f3 && "prototype" === p2 && n(24), "object" != typeof (f3 = a(f3, p2)) && n(15, i2.join("/"));
        }
        var l2 = o(f3), d2 = e(t3.value), h2 = i2[i2.length - 1];
        switch (u2) {
          case "replace":
            switch (l2) {
              case 2:
                return f3.set(h2, d2);
              case 3:
                n(16);
              default:
                return f3[h2] = d2;
            }
          case c2:
            switch (l2) {
              case 1:
                return "-" === h2 ? f3.push(d2) : f3.splice(h2, 0, d2);
              case 2:
                return f3.set(h2, d2);
              case 3:
                return f3.add(d2);
              default:
                return f3[h2] = d2;
            }
          case "remove":
            switch (l2) {
              case 1:
                return f3.splice(h2, 1);
              case 2:
                return f3.delete(h2);
              case 3:
                return f3.delete(t3.value);
              default:
                return delete f3[h2];
            }
          default:
            n(17, u2);
        }
      }), r2;
    }, N: function(n2, r2, t2, e2) {
      switch (n2.i) {
        case 0:
        case 4:
        case 2:
          return function(n3, r3, t3, e3) {
            var o2 = n3.t, s2 = n3.o;
            i(n3.R, function(n4, i2) {
              var v2 = a(o2, n4), p2 = a(s2, n4), l2 = i2 ? u(o2, n4) ? "replace" : c2 : "remove";
              if (v2 !== p2 || "replace" !== l2) {
                var d2 = r3.concat(n4);
                t3.push("remove" === l2 ? { op: l2, path: d2 } : { op: l2, path: d2, value: p2 }), e3.push(l2 === c2 ? { op: "remove", path: d2 } : "remove" === l2 ? { op: c2, path: d2, value: f2(v2) } : { op: "replace", path: d2, value: f2(v2) });
              }
            });
          }(n2, r2, t2, e2);
        case 5:
        case 1:
          return function(n3, r3, t3, e3) {
            var i2 = n3.t, o2 = n3.R, u2 = n3.o;
            if (u2.length < i2.length) {
              var a2 = [u2, i2];
              i2 = a2[0], u2 = a2[1];
              var s2 = [e3, t3];
              t3 = s2[0], e3 = s2[1];
            }
            for (var v2 = 0; v2 < i2.length; v2++) if (o2[v2] && u2[v2] !== i2[v2]) {
              var p2 = r3.concat([v2]);
              t3.push({ op: "replace", path: p2, value: f2(u2[v2]) }), e3.push({ op: "replace", path: p2, value: f2(i2[v2]) });
            }
            for (var l2 = i2.length; l2 < u2.length; l2++) {
              var d2 = r3.concat([l2]);
              t3.push({ op: c2, path: d2, value: f2(u2[l2]) });
            }
            i2.length < u2.length && e3.push({ op: "replace", path: r3.concat(["length"]), value: i2.length });
          }(n2, r2, t2, e2);
        case 3:
          return function(n3, r3, t3, e3) {
            var i2 = n3.t, o2 = n3.o, u2 = 0;
            i2.forEach(function(n4) {
              if (!o2.has(n4)) {
                var i3 = r3.concat([u2]);
                t3.push({ op: "remove", path: i3, value: n4 }), e3.unshift({ op: c2, path: i3, value: n4 });
              }
              u2++;
            }), u2 = 0, o2.forEach(function(n4) {
              if (!i2.has(n4)) {
                var o3 = r3.concat([u2]);
                t3.push({ op: c2, path: o3, value: n4 }), e3.unshift({ op: "remove", path: o3, value: n4 });
              }
              u2++;
            });
          }(n2, r2, t2, e2);
      }
    }, M: function(n2, r2, t2, e2) {
      t2.push({ op: "replace", path: [], value: r2 === H ? void 0 : r2 }), e2.push({ op: "replace", path: [], value: n2 });
    } });
  }
  var G;
  var U;
  var W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x");
  var X = "undefined" != typeof Map;
  var q = "undefined" != typeof Set;
  var B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect;
  var H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
  var L = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
  var Q = W ? Symbol.for("immer-state") : "__$immer_state";
  var Z = "" + Object.prototype.constructor;
  var nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n2) {
    return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
  } : Object.getOwnPropertyNames;
  var rn = Object.getOwnPropertyDescriptors || function(n2) {
    var r2 = {};
    return nn(n2).forEach(function(t2) {
      r2[t2] = Object.getOwnPropertyDescriptor(n2, t2);
    }), r2;
  };
  var tn = {};
  var en = { get: function(n2, r2) {
    if (r2 === Q) return n2;
    var e = p(n2);
    if (!u(e, r2)) return function(n3, r3, t2) {
      var e2, i3 = I(r3, t2);
      return i3 ? "value" in i3 ? i3.value : null === (e2 = i3.get) || void 0 === e2 ? void 0 : e2.call(n3.k) : void 0;
    }(n2, e, r2);
    var i2 = e[r2];
    return n2.I || !t(i2) ? i2 : i2 === z(n2.t, r2) ? (E(n2), n2.o[r2] = N(n2.A.h, i2, n2)) : i2;
  }, has: function(n2, r2) {
    return r2 in p(n2);
  }, ownKeys: function(n2) {
    return Reflect.ownKeys(p(n2));
  }, set: function(n2, r2, t2) {
    var e = I(p(n2), r2);
    if (null == e ? void 0 : e.set) return e.set.call(n2.k, t2), true;
    if (!n2.P) {
      var i2 = z(p(n2), r2), o2 = null == i2 ? void 0 : i2[Q];
      if (o2 && o2.t === t2) return n2.o[r2] = t2, n2.R[r2] = false, true;
      if (c(t2, i2) && (void 0 !== t2 || u(n2.t, r2))) return true;
      E(n2), k(n2);
    }
    return n2.o[r2] === t2 && (void 0 !== t2 || r2 in n2.o) || Number.isNaN(t2) && Number.isNaN(n2.o[r2]) || (n2.o[r2] = t2, n2.R[r2] = true), true;
  }, deleteProperty: function(n2, r2) {
    return void 0 !== z(n2.t, r2) || r2 in n2.t ? (n2.R[r2] = false, E(n2), k(n2)) : delete n2.R[r2], n2.o && delete n2.o[r2], true;
  }, getOwnPropertyDescriptor: function(n2, r2) {
    var t2 = p(n2), e = Reflect.getOwnPropertyDescriptor(t2, r2);
    return e ? { writable: true, configurable: 1 !== n2.i || "length" !== r2, enumerable: e.enumerable, value: t2[r2] } : e;
  }, defineProperty: function() {
    n(11);
  }, getPrototypeOf: function(n2) {
    return Object.getPrototypeOf(n2.t);
  }, setPrototypeOf: function() {
    n(12);
  } };
  var on = {};
  i(en, function(n2, r2) {
    on[n2] = function() {
      return arguments[0] = arguments[0][0], r2.apply(this, arguments);
    };
  }), on.deleteProperty = function(r2, t2) {
    return false, on.set.call(this, r2, t2, void 0);
  }, on.set = function(r2, t2, e) {
    return false, en.set.call(this, r2[0], t2, e, r2[0]);
  };
  var un = function() {
    function e(r2) {
      var e2 = this;
      this.O = B, this.D = true, this.produce = function(r3, i3, o2) {
        if ("function" == typeof r3 && "function" != typeof i3) {
          var u2 = i3;
          i3 = r3;
          var a2 = e2;
          return function(n2) {
            var r4 = this;
            void 0 === n2 && (n2 = u2);
            for (var t2 = arguments.length, e3 = Array(t2 > 1 ? t2 - 1 : 0), o3 = 1; o3 < t2; o3++) e3[o3 - 1] = arguments[o3];
            return a2.produce(n2, function(n3) {
              var t3;
              return (t3 = i3).call.apply(t3, [r4, n3].concat(e3));
            });
          };
        }
        var f2;
        if ("function" != typeof i3 && n(6), void 0 !== o2 && "function" != typeof o2 && n(7), t(r3)) {
          var c2 = w(e2), s2 = N(e2, r3, void 0), v2 = true;
          try {
            f2 = i3(s2), v2 = false;
          } finally {
            v2 ? g(c2) : O(c2);
          }
          return "undefined" != typeof Promise && f2 instanceof Promise ? f2.then(function(n2) {
            return j(c2, o2), P(n2, c2);
          }, function(n2) {
            throw g(c2), n2;
          }) : (j(c2, o2), P(f2, c2));
        }
        if (!r3 || "object" != typeof r3) {
          if (void 0 === (f2 = i3(r3)) && (f2 = r3), f2 === H && (f2 = void 0), e2.D && d(f2, true), o2) {
            var p2 = [], l2 = [];
            b("Patches").M(r3, f2, p2, l2), o2(p2, l2);
          }
          return f2;
        }
        n(21, r3);
      }, this.produceWithPatches = function(n2, r3) {
        if ("function" == typeof n2) return function(r4) {
          for (var t3 = arguments.length, i4 = Array(t3 > 1 ? t3 - 1 : 0), o3 = 1; o3 < t3; o3++) i4[o3 - 1] = arguments[o3];
          return e2.produceWithPatches(r4, function(r5) {
            return n2.apply(void 0, [r5].concat(i4));
          });
        };
        var t2, i3, o2 = e2.produce(n2, r3, function(n3, r4) {
          t2 = n3, i3 = r4;
        });
        return "undefined" != typeof Promise && o2 instanceof Promise ? o2.then(function(n3) {
          return [n3, t2, i3];
        }) : [o2, t2, i3];
      }, "boolean" == typeof (null == r2 ? void 0 : r2.useProxies) && this.setUseProxies(r2.useProxies), "boolean" == typeof (null == r2 ? void 0 : r2.autoFreeze) && this.setAutoFreeze(r2.autoFreeze);
    }
    var i2 = e.prototype;
    return i2.createDraft = function(e2) {
      t(e2) || n(8), r(e2) && (e2 = R(e2));
      var i3 = w(this), o2 = N(this, e2, void 0);
      return o2[Q].C = true, O(i3), o2;
    }, i2.finishDraft = function(r2, t2) {
      var e2 = r2 && r2[Q];
      var i3 = e2.A;
      return j(i3, t2), P(void 0, i3);
    }, i2.setAutoFreeze = function(n2) {
      this.D = n2;
    }, i2.setUseProxies = function(r2) {
      r2 && !B && n(20), this.O = r2;
    }, i2.applyPatches = function(n2, t2) {
      var e2;
      for (e2 = t2.length - 1; e2 >= 0; e2--) {
        var i3 = t2[e2];
        if (0 === i3.path.length && "replace" === i3.op) {
          n2 = i3.value;
          break;
        }
      }
      e2 > -1 && (t2 = t2.slice(e2 + 1));
      var o2 = b("Patches").$;
      return r(n2) ? o2(n2, t2) : this.produce(n2, function(n3) {
        return o2(n3, t2);
      });
    }, e;
  }();
  var an = new un();
  var fn = an.produce;
  var cn = an.produceWithPatches.bind(an);
  var sn = an.setAutoFreeze.bind(an);
  var vn = an.setUseProxies.bind(an);
  var pn = an.applyPatches.bind(an);
  var ln = an.createDraft.bind(an);
  var dn = an.finishDraft.bind(an);

  // node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneItemsApi.js
  var __awaiter7 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  T();
  var SceneItemsApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    getItems(filter) {
      return __awaiter7(this, void 0, void 0, function* () {
        if (Array.isArray(filter)) {
          const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEMS", { ids: filter });
          return items;
        } else if (filter) {
          const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
          return items.filter(filter);
        } else {
          const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ALL_ITEMS", {});
          return items;
        }
      });
    }
    isItemArray(value) {
      return Array.isArray(value) && value.every((item) => typeof item !== "string");
    }
    updateItems(filterOrItems, update, updateAttachments = true) {
      return __awaiter7(this, void 0, void 0, function* () {
        let items;
        if (this.isItemArray(filterOrItems)) {
          items = filterOrItems;
        } else {
          items = yield this.getItems(filterOrItems);
        }
        const [nextState, patches] = cn(items, update);
        const nextUpdates = nextState.map((item) => ({
          id: item.id,
          type: item.type
        }));
        for (const patch of patches) {
          const [index, key] = patch.path;
          if (typeof index === "number" && typeof key === "string") {
            nextUpdates[index][key] = nextState[index][key];
          }
        }
        const updates = nextUpdates.filter(
          // Ensure that there are updates besides the default ID and type
          (update2) => Object.keys(update2).length > 2
        );
        if (updates.length === 0) {
          return;
        }
        yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_UPDATE_ITEMS", {
          updates,
          updateAttachments
        });
      });
    }
    addItems(items) {
      return __awaiter7(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_ADD_ITEMS", {
          items
        });
      });
    }
    deleteItems(ids) {
      return __awaiter7(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_DELETE_ITEMS", {
          ids
        });
      });
    }
    getItemAttachments(ids) {
      return __awaiter7(this, void 0, void 0, function* () {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_ATTACHMENTS", { ids });
        return items;
      });
    }
    getItemBounds(ids) {
      return __awaiter7(this, void 0, void 0, function* () {
        const { bounds } = yield this.messageBus.sendAsync("OBR_SCENE_ITEMS_GET_ITEM_BOUNDS", { ids });
        return bounds;
      });
    }
    onChange(callback) {
      const handleChange = (data) => {
        callback(data.items);
      };
      this.messageBus.send("OBR_SCENE_ITEMS_SUBSCRIBE", {});
      this.messageBus.on("OBR_SCENE_ITEMS_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_SCENE_ITEMS_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_SCENE_ITEMS_EVENT_CHANGE", handleChange);
      };
    }
  };
  var SceneItemsApi_default = SceneItemsApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneLocalApi.js
  var __awaiter8 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  T();
  var SceneLocalApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    getItems(filter) {
      return __awaiter8(this, void 0, void 0, function* () {
        if (Array.isArray(filter)) {
          const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEMS", { ids: filter });
          return items;
        } else if (filter) {
          const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
          return items.filter(filter);
        } else {
          const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
          return items;
        }
      });
    }
    isItemArray(value) {
      return Array.isArray(value) && value.every((item) => typeof item !== "string");
    }
    updateItems(filterOrItems, update, fastUpdate, updateAttachments = true) {
      return __awaiter8(this, void 0, void 0, function* () {
        let items;
        if (this.isItemArray(filterOrItems)) {
          items = filterOrItems;
        } else {
          items = yield this.getItems(filterOrItems);
        }
        const [nextState, patches] = cn(items, update);
        const nextUpdates = nextState.map((item) => ({
          id: item.id,
          type: item.type
        }));
        for (const patch of patches) {
          const [index, key] = patch.path;
          if (typeof index === "number" && typeof key === "string") {
            nextUpdates[index][key] = nextState[index][key];
          }
        }
        const updates = nextUpdates.filter(
          // Ensure that there are updates besides the default ID and type
          (update2) => Object.keys(update2).length > 2
        );
        if (updates.length === 0) {
          return;
        }
        yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_UPDATE_ITEMS", {
          updates,
          fastUpdate,
          updateAttachments
        });
      });
    }
    addItems(items) {
      return __awaiter8(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_ADD_ITEMS", {
          items
        });
      });
    }
    deleteItems(ids) {
      return __awaiter8(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_DELETE_ITEMS", {
          ids
        });
      });
    }
    getItemAttachments(ids) {
      return __awaiter8(this, void 0, void 0, function* () {
        const { items } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_ATTACHMENTS", { ids });
        return items;
      });
    }
    getItemBounds(ids) {
      return __awaiter8(this, void 0, void 0, function* () {
        const { bounds } = yield this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_BOUNDS", { ids });
        return bounds;
      });
    }
    onChange(callback) {
      const handleChange = (data) => {
        callback(data.items);
      };
      this.messageBus.send("OBR_SCENE_LOCAL_SUBSCRIBE", {});
      this.messageBus.on("OBR_SCENE_LOCAL_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_SCENE_LOCAL_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_SCENE_LOCAL_EVENT_CHANGE", handleChange);
      };
    }
  };
  var SceneLocalApi_default = SceneLocalApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/scene/SceneApi.js
  var __awaiter9 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var SceneApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
      this.grid = new SceneGridApi_default(messageBus2);
      this.fog = new SceneFogApi_default(messageBus2);
      this.history = new SceneHistoryApi_default(messageBus2);
      this.items = new SceneItemsApi_default(messageBus2);
      this.local = new SceneLocalApi_default(messageBus2);
    }
    isReady() {
      return __awaiter9(this, void 0, void 0, function* () {
        const { ready } = yield this.messageBus.sendAsync("OBR_SCENE_IS_READY", {});
        return ready;
      });
    }
    onReadyChange(callback) {
      const handleChange = (data) => {
        callback(data.ready);
      };
      this.messageBus.send("OBR_SCENE_READY_SUBSCRIBE", {});
      this.messageBus.on("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_SCENE_READY_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
      };
    }
    getMetadata() {
      return __awaiter9(this, void 0, void 0, function* () {
        const { metadata } = yield this.messageBus.sendAsync("OBR_SCENE_GET_METADATA", {});
        return metadata;
      });
    }
    setMetadata(update) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_SCENE_SET_METADATA", { update });
      });
    }
    onMetadataChange(callback) {
      const handleChange = (data) => {
        callback(data.metadata);
      };
      this.messageBus.send("OBR_SCENE_METADATA_SUBSCRIBE", {});
      this.messageBus.on("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_SCENE_METADATA_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
      };
    }
  };
  var SceneApi_default = SceneApi;

  // node_modules/@owlbear-rodeo/sdk/lib/common/normalize.js
  function normalizeUrl(url) {
    return url.startsWith("http") ? url : `${window.location.origin}${url}`;
  }
  function normalizeIconPaths(icons) {
    return icons.map((base) => Object.assign(Object.assign({}, base), { icon: normalizeUrl(base.icon) }));
  }
  function normalizeUrlObject(urlObject) {
    return Object.assign(Object.assign({}, urlObject), { url: normalizeUrl(urlObject.url) });
  }

  // node_modules/@owlbear-rodeo/sdk/lib/api/ContextMenuApi.js
  var __awaiter10 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ContextMenuApi = class {
    constructor(messageBus2) {
      this.contextMenus = {};
      this.handleClick = (event) => {
        var _a;
        const menu = this.contextMenus[event.id];
        if (menu) {
          (_a = menu.onClick) === null || _a === void 0 ? void 0 : _a.call(menu, event.context, event.elementId);
        }
      };
      this.messageBus = messageBus2;
      messageBus2.on("OBR_CONTEXT_MENU_EVENT_CLICK", this.handleClick);
    }
    create(contextMenu) {
      return __awaiter10(this, void 0, void 0, function* () {
        this.messageBus.sendAsync("OBR_CONTEXT_MENU_CREATE", {
          id: contextMenu.id,
          shortcut: contextMenu.shortcut,
          icons: normalizeIconPaths(contextMenu.icons),
          embed: contextMenu.embed && normalizeUrlObject(contextMenu.embed)
        });
        this.contextMenus[contextMenu.id] = contextMenu;
      });
    }
    remove(id) {
      return __awaiter10(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_CONTEXT_MENU_REMOVE", { id });
        delete this.contextMenus[id];
      });
    }
  };
  var ContextMenuApi_default = ContextMenuApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/ToolApi.js
  var __awaiter11 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ToolApi = class {
    constructor(messageBus2) {
      this.tools = {};
      this.toolActions = {};
      this.toolModes = {};
      this.handleToolClick = (event) => {
        const tool = this.tools[event.id];
        if (tool) {
          if (tool.onClick) {
            const result = tool.onClick(event.context, event.elementId);
            Promise.resolve(result).then((activate) => {
              if (activate) {
                this.messageBus.send("OBR_TOOL_ACTIVATE", {
                  id: event.id
                });
              }
            });
          } else {
            this.messageBus.send("OBR_TOOL_ACTIVATE", {
              id: event.id
            });
          }
        }
      };
      this.handleToolActionClick = (event) => {
        var _a;
        const action = this.toolActions[event.id];
        if (action) {
          (_a = action.onClick) === null || _a === void 0 ? void 0 : _a.call(action, event.context, event.elementId);
        }
      };
      this.handleToolModeClick = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
          if (mode.onClick) {
            const result = mode.onClick(event.context, event.elementId);
            Promise.resolve(result).then((activate) => {
              if (activate) {
                this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
                  toolId: event.context.activeTool,
                  modeId: event.id
                });
              }
            });
          } else {
            this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
              toolId: event.context.activeTool,
              modeId: event.id
            });
          }
        }
      };
      this.handleToolModeToolClick = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
          if (mode.onToolClick) {
            const result = mode.onToolClick(event.context, event.event);
            Promise.resolve(result).then((select) => {
              if (select && event.event.target && !event.event.target.locked) {
                this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                  items: [event.event.target.id]
                });
              }
            });
          } else {
            if (event.event.target && !event.event.target.locked) {
              this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                items: [event.event.target.id]
              });
            }
          }
        }
      };
      this.handleToolModeToolDoubleClick = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
          if (mode.onToolDoubleClick) {
            const result = mode.onToolDoubleClick(event.context, event.event);
            Promise.resolve(result).then((select) => {
              if (select && event.event.target) {
                this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                  items: [event.event.target.id]
                });
              }
            });
          } else {
            if (event.event.target) {
              this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                items: [event.event.target.id]
              });
            }
          }
        }
      };
      this.handleToolModeToolDown = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onToolDown) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeToolMove = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onToolMove) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeToolUp = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onToolUp) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeToolDragStart = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onToolDragStart) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeToolDragMove = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onToolDragMove) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeToolDragEnd = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onToolDragEnd) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeToolDragCancel = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onToolDragCancel) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeKeyDown = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeKeyUp = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onKeyUp) === null || _a === void 0 ? void 0 : _a.call(mode, event.context, event.event);
        }
      };
      this.handleToolModeActivate = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onActivate) === null || _a === void 0 ? void 0 : _a.call(mode, event.context);
        }
      };
      this.handleToolModeDeactivate = (event) => {
        var _a;
        const mode = this.toolModes[event.id];
        if (mode) {
          (_a = mode.onDeactivate) === null || _a === void 0 ? void 0 : _a.call(mode, event.context);
        }
      };
      this.messageBus = messageBus2;
      messageBus2.on("OBR_TOOL_EVENT_CLICK", this.handleToolClick);
      messageBus2.on("OBR_TOOL_ACTION_EVENT_CLICK", this.handleToolActionClick);
      messageBus2.on("OBR_TOOL_MODE_EVENT_CLICK", this.handleToolModeClick);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_CLICK", this.handleToolModeToolClick);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DOUBLE_CLICK", this.handleToolModeToolDoubleClick);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DOWN", this.handleToolModeToolDown);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_MOVE", this.handleToolModeToolMove);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_UP", this.handleToolModeToolUp);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_START", this.handleToolModeToolDragStart);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_MOVE", this.handleToolModeToolDragMove);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_END", this.handleToolModeToolDragEnd);
      messageBus2.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_CANCEL", this.handleToolModeToolDragCancel);
      messageBus2.on("OBR_TOOL_MODE_EVENT_KEY_DOWN", this.handleToolModeKeyDown);
      messageBus2.on("OBR_TOOL_MODE_EVENT_KEY_UP", this.handleToolModeKeyUp);
      messageBus2.on("OBR_TOOL_MODE_EVENT_ACTIVATE", this.handleToolModeActivate);
      messageBus2.on("OBR_TOOL_MODE_EVENT_DEACTIVATE", this.handleToolModeDeactivate);
    }
    create(tool) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_CREATE", {
          id: tool.id,
          shortcut: tool.shortcut,
          defaultMode: tool.defaultMode,
          defaultMetadata: tool.defaultMetadata,
          icons: normalizeIconPaths(tool.icons),
          disabled: tool.disabled
        });
        this.tools[tool.id] = tool;
      });
    }
    remove(id) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_REMOVE", { id });
        delete this.tools[id];
      });
    }
    activateTool(id) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_ACTIVATE", { id });
      });
    }
    getMetadata(id) {
      return __awaiter11(this, void 0, void 0, function* () {
        const { metadata } = yield this.messageBus.sendAsync("OBR_TOOL_GET_METADATA", { id });
        return metadata;
      });
    }
    setMetadata(toolId, update) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_SET_METADATA", {
          toolId,
          update
        });
      });
    }
    createAction(action) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_ACTION_CREATE", {
          id: action.id,
          shortcut: action.shortcut,
          icons: normalizeIconPaths(action.icons),
          disabled: action.disabled
        });
        this.toolActions[action.id] = action;
      });
    }
    removeAction(id) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_ACTION_REMOVE", { id });
        delete this.tools[id];
      });
    }
    createMode(mode) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_MODE_CREATE", {
          id: mode.id,
          shortcut: mode.shortcut,
          icons: normalizeIconPaths(mode.icons),
          preventDrag: mode.preventDrag,
          disabled: mode.disabled,
          cursors: mode.cursors
        });
        this.toolModes[mode.id] = mode;
      });
    }
    removeMode(id) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_MODE_REMOVE", { id });
        delete this.tools[id];
      });
    }
    activateMode(toolId, modeId) {
      return __awaiter11(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_TOOL_MODE_ACTIVATE", {
          toolId,
          modeId
        });
      });
    }
  };
  var ToolApi_default = ToolApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/PopoverApi.js
  var __awaiter12 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var PopoverApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    open(popover) {
      return __awaiter12(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_POPOVER_OPEN", Object.assign({}, normalizeUrlObject(popover)));
      });
    }
    close(id) {
      return __awaiter12(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_POPOVER_CLOSE", { id });
      });
    }
    getWidth(id) {
      return __awaiter12(this, void 0, void 0, function* () {
        const { width } = yield this.messageBus.sendAsync("OBR_POPOVER_GET_WIDTH", { id });
        return width;
      });
    }
    setWidth(id, width) {
      return __awaiter12(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_POPOVER_SET_WIDTH", { id, width });
      });
    }
    getHeight(id) {
      return __awaiter12(this, void 0, void 0, function* () {
        const { height } = yield this.messageBus.sendAsync("OBR_POPOVER_GET_HEIGHT", { id });
        return height;
      });
    }
    setHeight(id, height) {
      return __awaiter12(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_POPOVER_SET_HEIGHT", { id, height });
      });
    }
  };
  var PopoverApi_default = PopoverApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/ModalApi.js
  var __awaiter13 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ModalApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    open(modal) {
      return __awaiter13(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_MODAL_OPEN", Object.assign({}, normalizeUrlObject(modal)));
      });
    }
    close(id) {
      return __awaiter13(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_MODAL_CLOSE", { id });
      });
    }
  };
  var ModalApi_default = ModalApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/ActionApi.js
  var __awaiter14 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ActionApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    getWidth() {
      return __awaiter14(this, void 0, void 0, function* () {
        const { width } = yield this.messageBus.sendAsync("OBR_ACTION_GET_WIDTH", {});
        return width;
      });
    }
    setWidth(width) {
      return __awaiter14(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ACTION_SET_WIDTH", { width });
      });
    }
    getHeight() {
      return __awaiter14(this, void 0, void 0, function* () {
        const { height } = yield this.messageBus.sendAsync("OBR_ACTION_GET_HEIGHT", {});
        return height;
      });
    }
    setHeight(height) {
      return __awaiter14(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ACTION_SET_HEIGHT", { height });
      });
    }
    getBadgeText() {
      return __awaiter14(this, void 0, void 0, function* () {
        const { badgeText } = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_TEXT", {});
        return badgeText;
      });
    }
    setBadgeText(badgeText) {
      return __awaiter14(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_TEXT", { badgeText });
      });
    }
    getBadgeBackgroundColor() {
      return __awaiter14(this, void 0, void 0, function* () {
        const { badgeBackgroundColor } = yield this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_BACKGROUND_COLOR", {});
        return badgeBackgroundColor;
      });
    }
    setBadgeBackgroundColor(badgeBackgroundColor) {
      return __awaiter14(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_BACKGROUND_COLOR", {
          badgeBackgroundColor
        });
      });
    }
    getIcon() {
      return __awaiter14(this, void 0, void 0, function* () {
        const { icon } = yield this.messageBus.sendAsync("OBR_ACTION_GET_ICON", {});
        return icon;
      });
    }
    setIcon(icon) {
      return __awaiter14(this, void 0, void 0, function* () {
        const data = normalizeIconPaths([{ icon }]);
        yield this.messageBus.sendAsync("OBR_ACTION_SET_ICON", {
          icon: data[0].icon
        });
      });
    }
    getTitle() {
      return __awaiter14(this, void 0, void 0, function* () {
        const { title } = yield this.messageBus.sendAsync("OBR_ACTION_GET_TITLE", {});
        return title;
      });
    }
    setTitle(title) {
      return __awaiter14(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ACTION_SET_TITLE", { title });
      });
    }
    isOpen() {
      return __awaiter14(this, void 0, void 0, function* () {
        const { isOpen } = yield this.messageBus.sendAsync("OBR_ACTION_GET_IS_OPEN", {});
        return isOpen;
      });
    }
    open() {
      return __awaiter14(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ACTION_OPEN", {});
      });
    }
    close() {
      return __awaiter14(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ACTION_CLOSE", {});
      });
    }
    onOpenChange(callback) {
      const handleChange = (data) => {
        callback(data.isOpen);
      };
      this.messageBus.send("OBR_ACTION_IS_OPEN_SUBSCRIBE", {});
      this.messageBus.on("OBR_ACTION_IS_OPEN_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_IS_OPEN_ACTION_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_ACTION_IS_OPEN_EVENT_CHANGE", handleChange);
      };
    }
  };
  var ActionApi_default = ActionApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/InteractionApi.js
  var __awaiter15 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  T();
  var InteractionApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    startItemInteraction(baseState, updateAttachments = true) {
      return __awaiter15(this, void 0, void 0, function* () {
        const { id } = yield this.messageBus.sendAsync("OBR_INTERACTION_START_ITEM_INTERACTION", { baseState, updateAttachments });
        let prev = baseState;
        const dispatcher = (update) => {
          const [next, patches] = cn(prev, update);
          prev = next;
          this.messageBus.send("OBR_INTERACTION_UPDATE_ITEM_INTERACTION", {
            id,
            patches
          });
          return next;
        };
        const stop = () => {
          this.messageBus.send("OBR_INTERACTION_STOP_ITEM_INTERACTION", { id });
        };
        return [dispatcher, stop];
      });
    }
  };
  var InteractionApi_default = InteractionApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/PartyApi.js
  var __awaiter16 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var PartyApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    getPlayers() {
      return __awaiter16(this, void 0, void 0, function* () {
        const { players } = yield this.messageBus.sendAsync("OBR_PARTY_GET_PLAYERS", {});
        return players;
      });
    }
    onChange(callback) {
      const handleChange = (data) => {
        callback(data.players);
      };
      this.messageBus.send("OBR_PARTY_SUBSCRIBE", {});
      this.messageBus.on("OBR_PARTY_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_PARTY_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_PARTY_EVENT_CHANGE", handleChange);
      };
    }
  };
  var PartyApi_default = PartyApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/RoomApi.js
  var __awaiter17 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var RoomApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    get id() {
      return this.messageBus.roomId;
    }
    getPermissions() {
      return __awaiter17(this, void 0, void 0, function* () {
        const { permissions } = yield this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
        return permissions;
      });
    }
    getMetadata() {
      return __awaiter17(this, void 0, void 0, function* () {
        const { metadata } = yield this.messageBus.sendAsync("OBR_ROOM_GET_METADATA", {});
        return metadata;
      });
    }
    setMetadata(update) {
      return __awaiter17(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ROOM_SET_METADATA", { update });
      });
    }
    onMetadataChange(callback) {
      const handleChange = (data) => {
        callback(data.metadata);
      };
      this.messageBus.send("OBR_ROOM_METADATA_SUBSCRIBE", {});
      this.messageBus.on("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_METADATA_ROOM_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
      };
    }
    onPermissionsChange(callback) {
      const handleChange = (data) => {
        callback(data.permissions);
      };
      this.messageBus.send("OBR_ROOM_PERMISSIONS_SUBSCRIBE", {});
      this.messageBus.on("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_PERMISSIONS_ROOM_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
      };
    }
  };
  var RoomApi_default = RoomApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/ThemeApi.js
  var __awaiter18 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var ThemeApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    getTheme() {
      return __awaiter18(this, void 0, void 0, function* () {
        const { theme } = yield this.messageBus.sendAsync("OBR_THEME_GET_THEME", {});
        return theme;
      });
    }
    onChange(callback) {
      const handleChange = (data) => {
        callback(data.theme);
      };
      this.messageBus.send("OBR_THEME_SUBSCRIBE", {});
      this.messageBus.on("OBR_THEME_EVENT_CHANGE", handleChange);
      return () => {
        this.messageBus.send("OBR_THEME_UNSUBSCRIBE", {});
        this.messageBus.off("OBR_THEME_EVENT_CHANGE", handleChange);
      };
    }
  };
  var ThemeApi_default = ThemeApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/AssetsApi.js
  var __awaiter19 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var AssetsApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    uploadImages(images, typeHint) {
      return __awaiter19(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_IMAGES", {
          images,
          typeHint
        });
      });
    }
    uploadScenes(scenes, disableShowScenes) {
      return __awaiter19(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_SCENES", {
          scenes,
          disableShowScenes
        });
      });
    }
    downloadImages(multiple, defaultSearch, typeHint) {
      return __awaiter19(this, void 0, void 0, function* () {
        const { images } = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_IMAGES", { multiple, defaultSearch, typeHint }, -1);
        return images;
      });
    }
    downloadScenes(multiple, defaultSearch) {
      return __awaiter19(this, void 0, void 0, function* () {
        const { scenes } = yield this.messageBus.sendAsync("OBR_ASSETS_DOWNLOAD_SCENES", { multiple, defaultSearch }, -1);
        return scenes;
      });
    }
  };
  var AssetsApi_default = AssetsApi;

  // node_modules/@owlbear-rodeo/sdk/lib/api/BroadcastApi.js
  var __awaiter20 = function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var BroadcastApi = class {
    constructor(messageBus2) {
      this.messageBus = messageBus2;
    }
    sendMessage(channel, data, options) {
      return __awaiter20(this, void 0, void 0, function* () {
        yield this.messageBus.sendAsync("OBR_BROADCAST_SEND_MESSAGE", {
          channel,
          data,
          options
        });
      });
    }
    onMessage(channel, callback) {
      this.messageBus.send("OBR_BROADCAST_SUBSCRIBE", { channel });
      this.messageBus.on(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
      return () => {
        this.messageBus.send("OBR_BROADCAST_UNSUBSCRIBE", { channel });
        this.messageBus.off(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
      };
    }
  };
  var BroadcastApi_default = BroadcastApi;

  // node_modules/js-base64/base64.mjs
  var _TD = typeof TextDecoder === "function" ? new TextDecoder("utf-8", { ignoreBOM: true }) : void 0;
  var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
  var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var b64chs = Array.prototype.slice.call(b64ch);
  var b64tab = ((a2) => {
    let tab = {};
    a2.forEach((c2, i2) => tab[c2] = i2);
    return tab;
  })(b64chs);
  var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  var _fromCC = String.fromCharCode.bind(String);
  var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
  var _tidyB64 = (s2) => s2.replace(/[^A-Za-z0-9\+\/]/g, "");
  var btoaPolyfill = (bin) => {
    let u32, c0, c1, c2, asc = "";
    const pad = bin.length % 3;
    for (let i2 = 0; i2 < bin.length; ) {
      if ((c0 = bin.charCodeAt(i2++)) > 255 || (c1 = bin.charCodeAt(i2++)) > 255 || (c2 = bin.charCodeAt(i2++)) > 255)
        throw new TypeError("invalid character found");
      u32 = c0 << 16 | c1 << 8 | c2;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : btoaPolyfill;
  var _fromUint8Array = typeof Uint8Array.prototype.toBase64 === "function" ? (u8a) => u8a.toBase64() : (u8a) => {
    const maxargs = 4096;
    let strs = [];
    for (let i2 = 0, l2 = u8a.length; i2 < l2; i2 += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i2, i2 + maxargs)));
    }
    return _btoa(strs.join(""));
  };
  var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  var cb_btou = (cccc) => {
    switch (cccc.length) {
      case 4:
        var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
        return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
      case 3:
        return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
      default:
        return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
    }
  };
  var btou = (b2) => b2.replace(re_btou, cb_btou);
  var atobPolyfill = (asc) => {
    asc = asc.replace(/\s+/g, "");
    if (!b64re.test(asc))
      throw new TypeError("malformed base64.");
    asc += "==".slice(2 - (asc.length & 3));
    let u24, r1, r2;
    let binArray = [];
    for (let i2 = 0; i2 < asc.length; ) {
      u24 = b64tab[asc.charAt(i2++)] << 18 | b64tab[asc.charAt(i2++)] << 12 | (r1 = b64tab[asc.charAt(i2++)]) << 6 | (r2 = b64tab[asc.charAt(i2++)]);
      if (r1 === 64) {
        binArray.push(_fromCC(u24 >> 16 & 255));
      } else if (r2 === 64) {
        binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
      } else {
        binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
      }
    }
    return binArray.join("");
  };
  var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : atobPolyfill;
  var _toUint8Array = typeof Uint8Array.fromBase64 === "function" ? (a2) => Uint8Array.fromBase64(a2) : (a2) => _U8Afrom(_atob(a2).split("").map((c2) => c2.charCodeAt(0)));
  var _decode = _TD ? (a2) => _TD.decode(_toUint8Array(a2)) : (a2) => btou(_atob(a2));
  var _unURI = (a2) => _tidyB64(a2.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
  var decode = (src) => _decode(_unURI(src));

  // node_modules/@owlbear-rodeo/sdk/lib/common/getDetails.js
  function getDetails() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const ref = urlSearchParams.get("obrref");
    let origin = "";
    let roomId = "";
    if (ref) {
      const decodedRef = decode(ref);
      const parts = decodedRef.split(" ");
      if (parts.length === 2) {
        origin = parts[0];
        roomId = parts[1];
      }
    }
    return { origin, roomId };
  }

  // node_modules/@owlbear-rodeo/sdk/lib/types/items/Path.js
  var Command;
  (function(Command2) {
    Command2[Command2["MOVE"] = 0] = "MOVE";
    Command2[Command2["LINE"] = 1] = "LINE";
    Command2[Command2["QUAD"] = 2] = "QUAD";
    Command2[Command2["CONIC"] = 3] = "CONIC";
    Command2[Command2["CUBIC"] = 4] = "CUBIC";
    Command2[Command2["CLOSE"] = 5] = "CLOSE";
  })(Command || (Command = {}));

  // node_modules/@owlbear-rodeo/sdk/lib/index.js
  var details = getDetails();
  var messageBus = new MessageBus_default(details.origin, details.roomId);
  var viewportApi = new ViewportApi_default(messageBus);
  var playerApi = new PlayerApi_default(messageBus);
  var partyApi = new PartyApi_default(messageBus);
  var notificationApi = new NotificationApi_default(messageBus);
  var sceneApi = new SceneApi_default(messageBus);
  var contextMenuApi = new ContextMenuApi_default(messageBus);
  var toolApi = new ToolApi_default(messageBus);
  var popoverApi = new PopoverApi_default(messageBus);
  var modalApi = new ModalApi_default(messageBus);
  var actionApi = new ActionApi_default(messageBus);
  var interactionApi = new InteractionApi_default(messageBus);
  var roomApi = new RoomApi_default(messageBus);
  var themeApi = new ThemeApi_default(messageBus);
  var assetsApi = new AssetsApi_default(messageBus);
  var broadcastApi = new BroadcastApi_default(messageBus);
  var OBR = {
    onReady: (callback) => {
      if (messageBus.ready) {
        callback();
      } else {
        messageBus.once("OBR_READY", () => callback());
      }
    },
    get isReady() {
      return messageBus.ready;
    },
    viewport: viewportApi,
    player: playerApi,
    party: partyApi,
    notification: notificationApi,
    scene: sceneApi,
    contextMenu: contextMenuApi,
    tool: toolApi,
    popover: popoverApi,
    modal: modalApi,
    action: actionApi,
    interaction: interactionApi,
    room: roomApi,
    theme: themeApi,
    assets: assetsApi,
    broadcast: broadcastApi,
    /** True if the current site is embedded in an instance of Owlbear Rodeo */
    isAvailable: Boolean(details.origin)
  };
  var lib_default = OBR;

  // src/engine.js
  function rollDie(sides = 10) {
    return 1 + Math.floor(Math.random() * sides);
  }
  function skillRoll() {
    let total = 0, log = [], first = rollDie(10);
    total += first;
    log.push(first);
    if (first === 10) {
      const r2 = rollDie(10);
      total += r2;
      log.push("10\u2192\u518D\u63B7+" + r2);
    }
    if (first === 1) {
      const r2 = rollDie(10);
      total -= r2;
      log.push("1\u2192\u5931\u8BEF\u518D\u63B7-" + r2);
    }
    return { total, first, fumble: first === 1, crit: first === 10, log };
  }

  // src/state.js
  var CHANNEL = "cpr-toolbox";
  var META_KEY = "cpr-toolbox";
  async function getTokenData(tokenId) {
    const items = await lib_default.scene.items.getItems([tokenId]);
    if (!items.length) return null;
    const m2 = items[0].metadata || {};
    return { tokenId, name: items[0].name, ...m2[META_KEY] || {} };
  }
  async function broadcast(data) {
    await lib_default.broadcast.sendMessage(CHANNEL, data, { destination: "ROOM" });
  }

  // src/background.js
  lib_default.onReady(() => {
    lib_default.contextMenu.add([
      {
        id: "cpr-toolbox.state",
        icons: [{ icon: "/icon.svg", label: "CPR\u72B6\u6001" }],
        label: "CPR\u72B6\u6001",
        shortcut: null,
        filter: [{ key: "layer", value: ["CHARACTER", "MOUNT", "PROP"] }],
        onClick(context) {
          const id = context.items[0]?.id;
          if (id) lib_default.popover.open({ id: "cpr-state-" + id, url: `state.html?itemId=${id}`, height: 560, width: 380 });
        }
      },
      {
        id: "cpr-toolbox.initiative",
        icons: [{ icon: "/icon.svg", label: "CPR\u5148\u653B" }],
        label: "CPR\u5148\u653B",
        shortcut: null,
        filter: [{ key: "layer", value: ["CHARACTER", "MOUNT", "PROP"] }],
        async onClick(context) {
          const item = context.items[0];
          if (!item) return;
          const td = await getTokenData(item.id) || {};
          const ref = td.ref ?? 0;
          const mod = td.initMod ?? 0;
          const r2 = skillRoll();
          const total = r2.total + ref + mod;
          await broadcast({
            t: "roll",
            kind: "\u5148\u653B",
            who: item.name || "\u4EE4\u724C",
            total,
            detail: `1d10=${r2.log.join(" ")}+REF${ref}${mod ? "+" + mod : ""}`,
            initiative: { tokenId: item.id, name: item.name || "\u4EE4\u724C", total }
          });
        }
      }
    ]);
  });
})();
