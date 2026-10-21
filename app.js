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
          var listeners2 = arrayClone(handler, len);
          for (var i2 = 0; i2 < len; ++i2)
            ReflectApply(listeners2[i2], this, args);
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
        var state2 = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state2);
        wrapped.listener = listener;
        state2.wrapFn = wrapped;
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
        var listeners2, events, i2;
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
        listeners2 = events[type];
        if (typeof listeners2 === "function") {
          this.removeListener(type, listeners2);
        } else if (listeners2 !== void 0) {
          for (i2 = listeners2.length - 1; i2 >= 0; i2--) {
            this.removeListener(type, listeners2[i2]);
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
      EventEmitter2.prototype.listeners = function listeners2(type) {
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
  var packs = [];
  var listeners = [];
  function registerRuleset(pack) {
    if (packs.some((p2) => p2.id === pack.id)) return;
    packs.push(pack);
    packs.sort((a2, b2) => {
      if (b2.dependsOn?.includes(a2.id)) return -1;
      if (a2.dependsOn?.includes(b2.id)) return 1;
      return 0;
    });
    listeners.forEach((fn2) => fn2(packs));
  }
  function getPacks() {
    return [...packs];
  }
  function mergeRuleset(enabledIds) {
    const order = packs.filter((p2) => enabledIds.includes(p2.id));
    const merged = {};
    for (const p2 of order) {
      for (const [k2, v2] of Object.entries(p2)) {
        if (k2 === "id" || k2 === "name" || k2 === "version" || k2 === "dependsOn") continue;
        if (k2 === "quickref") {
          merged.quickref = [...merged.quickref || [], ...v2];
        } else if (v2 && typeof v2 === "object" && !Array.isArray(v2) && merged[k2] && typeof merged[k2] === "object" && !Array.isArray(merged[k2])) {
          merged[k2] = { ...merged[k2], ...v2 };
        } else {
          merged[k2] = v2;
        }
      }
    }
    merged.enabledPacks = order.map((p2) => ({ id: p2.id, name: p2.name, version: p2.version }));
    return merged;
  }
  function dvFor(ruleset2, weaponType, distance, autofire = false) {
    const dvObj = autofire && ruleset2.autofireDV ? ruleset2.autofireDV : ruleset2.rangedDV;
    if (!dvObj) return null;
    const row = (autofire ? dvObj.table[weaponType + "\uFF08\u81EA\u52A8\uFF09"] : null) || dvObj.table[weaponType];
    if (!row) return null;
    const bands = dvObj.bands;
    let idx = -1;
    for (let i2 = 0; i2 < bands.length; i2++) {
      const m2 = bands[i2].match(/^(\d+)-?(\d+)?m?/);
      if (!m2) continue;
      const lo = parseInt(m2[1]), hi = m2[2] ? parseInt(m2[2]) : i2 === bands.length - 1 ? Infinity : null;
      if (distance >= lo && (hi === null || hi === void 0 || distance <= hi)) {
        idx = i2;
        break;
      }
    }
    if (idx < 0) idx = bands.length - 1;
    const dv = row[idx];
    return { dv, band: bands[idx] ?? null };
  }
  function hitLocation(ruleset2, roll) {
    const t2 = ruleset2.hitLocationTable || [];
    for (const e of t2) {
      if (typeof e.roll === "number" && e.roll === roll) return e;
      if (typeof e.roll === "string" && e.roll.includes("-")) {
        const [a2, b2] = e.roll.split("-").map(Number);
        if (roll >= a2 && roll <= b2) return e;
      }
    }
    return null;
  }
  function armorTier(ruleset2, sp) {
    const tiers = ruleset2.armorTiers || [];
    for (const t2 of tiers) if (sp >= t2.min && sp <= t2.max) return t2.name;
    return null;
  }
  function armorVsAmmo(ruleset2, ammoClass, sp) {
    const av = ruleset2.armorVsAmmo;
    if (!av) return { level: "\u5168\u7A7F", factor: 1 };
    const tierName = armorTier(ruleset2, sp);
    const ti = av.tiers.indexOf(tierName);
    const row = av.table[ammoClass];
    if (ti < 0 || !row) return { level: "\u5168\u7A7F", factor: 1 };
    const level = row[ti];
    const p2 = av.penetration[level];
    const factor = typeof p2 === "number" ? p2 : level === "\u5FAE\u7A7F" ? "1" : 0;
    return { level, factor };
  }
  function damageFactor(ruleset2, ammoClass, sp) {
    const { level } = armorVsAmmo(ruleset2, ammoClass, sp);
    if (level === "\u5168\u7A7F") return { mult: 1, level, leftover: null };
    if (level === "\u534A\u7A7F") return { mult: 0.5, level, leftover: null };
    if (level === "\u5FAE\u7A7F") return { mult: 0, level, fixed: 1 };
    return { mult: 0, level, fixed: 0 };
  }
  function bodyMod(ruleset2, body) {
    const mods = ruleset2.bodyMods || [];
    for (const m2 of mods) if (body >= m2.min && body <= m2.max) return m2;
    return { melee: 0, thrown: 0, effect: "" };
  }
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
  function rollDamage(expr) {
    const m2 = String(expr).toUpperCase().replace(/×/g, "*").match(/(\d+)\s*D\s*(\d+)\s*([+-]\s*\d+)?/);
    if (!m2) {
      const n2 = parseInt(expr) || 0;
      return { rolls: [n2], total: n2, expr: String(expr) };
    }
    const num = parseInt(m2[1]), sides = parseInt(m2[2]), bonus = m2[3] ? parseInt(m2[3].replace(/\s/g, "")) : 0;
    const rolls = [];
    for (let i2 = 0; i2 < num; i2++) rolls.push(rollDie(sides));
    const sum = rolls.reduce((a2, b2) => a2 + b2, 0) + bonus;
    return { rolls, total: sum, bonus, expr };
  }
  function rollExpr(expr) {
    return rollDamage(expr);
  }

  // src/data/core.js
  var core_default = {
    id: "cpr-core",
    name: "\u8D5B\u535A\u670B\u514BRED \u672C\u4F53",
    version: "1.0.0",
    dependsOn: [],
    description: "\u5B98\u65B9\u6838\u5FC3\u89C4\u5219\uFF08\u542B\u672C\u5730\u6574\u7406\u7684\u6218\u6597\u901F\u67E5/\u6742\u9879\u8868\u6570\u503C\uFF09\uFF0C\u4F5C\u4E3A\u9CA8\u9C7C\u5305\u7684\u5E95\u5C42\u4F9D\u8D56\u3002",
    attributes: [
      { id: "INT", name: "\u667A\u529B", source: "core" },
      { id: "REF", name: "\u53CD\u5E94", source: "core" },
      { id: "DEX", name: "\u654F\u6377", source: "core" },
      { id: "TECH", name: "\u6280\u672F", source: "core" },
      { id: "COOL", name: "\u9177", source: "core" },
      { id: "WILL", name: "\u610F\u5FD7", source: "core" },
      { id: "LUCK", name: "\u8FD0\u6C14", source: "core" },
      { id: "MOV", name: "\u79FB\u901F", source: "core" },
      { id: "BODY", name: "\u4F53\u683C", source: "core" },
      { id: "EMP", name: "\u5171\u60C5", source: "core" }
    ],
    hp: { formula: "10 + ceil((BODY+WILL)/2) * 5", source: "shark", note: "\u4EBA\u7269\u5361O30\u516C\u5F0F\uFF1A10+ROUNDUP((K20+K14)/2,0)*5" },
    humanity: { maxFormula: "10 * EMP - \u4E0A\u9650\u635F\u5931", currentFormula: "min(10*EMP - \u4EBA\u6027\u635F\u5931 + \u4E34\u65F6\u6062\u590D, \u4E0A\u9650)", source: "shark", note: "\u4EBA\u7269\u5361O32/K32\uFF1B\u4E49\u4F53\u5361I\u5217=\u4EBA\u6027\u635F\u5931\uFF0CJ\u5217=\u4EBA\u6027\u4E0A\u9650\u635F\u5931\uFF0C\u4E24\u8005\u4E0D\u540C" },
    deathSave: { rule: "\u6BCF\u56DE\u5408\u5F00\u59CB\u63B7 1d10 + \u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A\uFF1B\u51FA\u76EE+\u60E9\u7F5A \u2265 10 \u5373\u6B7B\u4EA1", dv: 10, source: "core", errata: "\u60E9\u7F5A\u4E3A\u52A0\u7B97\uFF08\u65AD\u81C2+1 \u7B49\uFF09\uFF0C\u4E0E\u9CA8\u5305\u91CD\u4F24\u8868\u300E\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+N\u300F\u4E00\u81F4" },
    evRule: { rule: "\u5168\u8EAB\u88C5\u5907\u7684 EV \u59A8\u788D\u503C\u53D6\u6700\u5927\u503C\uFF0C\u540C\u65F6\u6263\u51CF \u53CD\u5E94/\u654F\u6377/\u79FB\u901F \u4E09\u9879", source: "shark", note: "\u4EBA\u7269\u5361 BB20=MAX(EV)\uFF0CP6/P8/P18 \u5747\u51CF BB20" },
    woundStates: [
      { id: "healthy", name: "\u5065\u5EB7", effect: "\u65E0" },
      { id: "light", name: "\u8F7B\u4F24", threshold: "HP < \u4E0A\u9650", effect: "\u65E0\u81EA\u52A8\u60E9\u7F5A" },
      { id: "serious", name: "\u91CD\u4F24", threshold: "HP < \u4E0A\u9650/2", effect: "\u6240\u6709\u52A8\u4F5C\u68C0\u5B9A -2" },
      { id: "critical", name: "\u81F4\u547D\u4F24", threshold: "HP = 0", effect: "\u6240\u6709\u52A8\u4F5C\u68C0\u5B9A -4\uFF0C\u79FB\u901F -6\uFF08\u6700\u4F4E1\uFF09\uFF0C\u6BCF\u56DE\u5408\u6B7B\u4EA1\u8C41\u514D", source: "shark", note: "\u4EBA\u7269\u5361J36/J39\u516C\u5F0F" }
    ],
    hitLocationTable: [
      { roll: 1, loc: "head", name: "\u5934\u90E8", source: "core" },
      { roll: "2-6", loc: "body", name: "\u8EAF\u5E72", source: "core" },
      { roll: 7, loc: "rarm", name: "\u53F3\u81C2", source: "core" },
      { roll: 8, loc: "larm", name: "\u5DE6\u81C2", source: "core" },
      { roll: 9, loc: "rleg", name: "\u53F3\u817F", source: "core" },
      { roll: 10, loc: "lleg", name: "\u5DE6\u817F", source: "core" }
    ],
    aimLocations: [
      { loc: "head", name: "\u5934\u90E8", mod: -8, effect: "\u7A7F\u900F\u5934\u90E8\u62A4\u7532\u540E\u7684\u4F24\u5BB3\u7FFB\u500D", source: "core" },
      { loc: "hand", name: "\u624B\u91CC\u62FF\u7740\u7684\u7269\u54C1", mod: -8, effect: "\u22651\u70B9\u4F24\u5BB3\u7A7F\u900F\u5373\u51FB\u843D\u624B\u4E2D\u7269\u54C1", source: "core" },
      { loc: "arm", name: "\u624B\u81C2", mod: -6, effect: "\u7A7F\u900F\u540E\u4F24\u5BB3>5 \u7ACB\u523B\u624B\u81C2\u9AA8\u6298\uFF1B\u4F24\u5BB3\u9AB0\u91CD\u4F24\u5219\u6539\u4E3A\u65AD\u81C2", source: "shark" },
      { loc: "leg", name: "\u817F\u90E8", mod: -4, effect: "\u7A7F\u900F\u540E\u4F24\u5BB3>5 \u7ACB\u523B\u817F\u90E8\u9AA8\u6298\uFF1B\u4F24\u5BB3\u9AB0\u91CD\u4F24\u5219\u6539\u4E3A\u65AD\u817F", source: "shark" },
      { loc: "groin", name: "\u88C6\u90E8", mod: -10, effect: "\u7A7F\u900F\u540E\u4F24\u5BB3>5 \u56E0\u5267\u75DB\u5012\u5730 1d4 \u8F6E\uFF08\u8D5B\u535A\u683C\u514D\u75AB\uFF09\uFF1B\u53D7\u817F\u90E8\u62A4\u7532\u4FDD\u62A4", source: "shark" }
    ],
    rangedDV: {
      bands: ["0-6m", "7-12m", "13-25m", "26-50m", "50-100m", "101-200m", "201-400m", "401-800m"],
      table: {
        "\u624B\u67AA": [13, 15, 20, 25, 30, 30, null, null],
        "\u51B2\u950B\u67AA": [15, 13, 15, 20, 25, 25, 30, null],
        "\u9730\u5F39\u67AA": [13, 15, 20, 25, 30, 35, null, null],
        "\u7A81\u51FB\u6B65\u67AA": [17, 16, 15, 13, 15, 20, 25, 30],
        "\u72D9\u51FB\u6B65\u67AA": [30, 25, 25, 20, 15, 16, 17, 20],
        "\u5F13\u5F29": [15, 13, 15, 17, 20, 22, null, null],
        "\u69B4\u5F39\u53D1\u5C04\u5668": [16, 15, 15, 17, 20, 22, 25, null],
        "\u706B\u7BAD\u7B52": [17, 16, 15, 15, 20, 20, 25, 30]
      },
      source: "core"
    },
    autofire: { rule: "\u6BCF\u6BD4\u7B2C\u4E00\u53D1\u591A\u6253 1 \u53D1\uFF0CDV +2\uFF1B\u547D\u4E2D\u5F39\u6570 = floor((\u7ED3\u679C-DV)/2)\uFF0C\u4E0A\u9650\u4E3A\u5BA3\u5E03\u5F39\u6570\uFF1B\u6BCF\u6B21\u653B\u51FB\u6D88\u8017\u81F3\u5C11 10 \u53D1", shotsBonusPerShot: 2, source: "core", errata: "\u5177\u4F53\u5F39\u6570\u4E0A\u9650\u6309\u6B66\u5668\u300E\u5168\u81EA\u52A8\u5F39\u5E55\u300F\u5B57\u6BB5\uFF08\u9CA8\u5305\u53E3\u5F84\uFF0C\u5982 4x8 \u8868\u793A\u6700\u591A4\u53D1/\u6563\u5E038m\uFF09" },
    suppressive: { dv: 15, cost: "1 \u52A8\u4F5C + 10 \u53D1", rule: "25m \u5185\u7AD9\u7ACB\u65E0\u63A9\u4F53\u76EE\u6807\u88AB\u538B\u5236\uFF1A\u8981\u4E48\u627F\u53D7\u538B\u5236\uFF0C\u8981\u4E48\u7528\u79FB\u52A8\u529B\u6251\u5411\u63A9\u4F53\uFF1B\u88AB\u538B\u5236\u8005\u4E0B\u8F6E\u53D7 1d10 \u76F4\u63A5\u4F24\u5BB3\uFF08\u7B80\u5316\u5B9E\u73B0\uFF1A\u7531 GM/\u73A9\u5BB6\u6309\u63D0\u793A\u88C1\u5B9A\uFF09", source: "core" },
    aiming: { quick: "+1\uFF08\u666E\u901A\u653B\u51FB\u4E2D\u989D\u5916\u82B1 1 \u52A8\u4F5C\u7784\u51C6\uFF09", full: "+3\uFF08\u727A\u7272\u6574\u8F6E\u884C\u52A8\u7CBE\u786E\u7784\u51C6\uFF0C\u53EF\u6307\u5B9A\u90E8\u4F4D\uFF09", aimedMod: -8, source: "core" },
    armorTiers: [
      { min: 4, max: 9, name: "\u8F7B\u7532" },
      { min: 10, max: 14, name: "\u4E2D\u7532" },
      { min: 15, max: 19, name: "\u91CD\u7532" },
      { min: 20, max: 25, name: "\u8D85\u91CD\u7532" },
      { min: 26, max: 32, name: "\u6218\u8F66\u7532" },
      { min: 33, max: 40, name: "\u5766\u514B" },
      { min: 41, max: 999, name: "\u5DE5\u4E8B" }
    ],
    armorVsAmmo: {
      ammoClasses: ["\u624B\u67AA", "\u91CD\u624B\u67AA", "\u4E2D\u5A01\u529B", "\u5168\u5A01\u529B", "\u8F7B\u53CD\u5668", "\u91CD\u53CD\u5668", "\u53CD\u5766\u514B"],
      tiers: ["\u8F7B\u7532", "\u4E2D\u7532", "\u91CD\u7532", "\u8D85\u91CD\u7532", "\u6218\u8F66\u7532", "\u5766\u514B", "\u5DE5\u4E8B"],
      table: {
        "\u624B\u67AA": ["\u534A\u7A7F", "\u5FAE\u7A7F", "\u4E0D\u53EF", "\u4E0D\u53EF", "\u4E0D\u53EF", "\u4E0D\u53EF", "\u4E0D\u53EF"],
        "\u91CD\u624B\u67AA": ["\u5168\u7A7F", "\u534A\u7A7F", "\u5FAE\u7A7F", "\u4E0D\u53EF", "\u4E0D\u53EF", "\u4E0D\u53EF", "\u4E0D\u53EF"],
        "\u4E2D\u5A01\u529B": ["\u5168\u7A7F", "\u5168\u7A7F", "\u534A\u7A7F", "\u5FAE\u7A7F", "\u4E0D\u53EF", "\u4E0D\u53EF", "\u4E0D\u53EF"],
        "\u5168\u5A01\u529B": ["\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u534A\u7A7F", "\u5FAE\u7A7F", "\u4E0D\u53EF", "\u4E0D\u53EF"],
        "\u8F7B\u53CD\u5668": ["\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u534A\u7A7F", "\u5FAE\u7A7F", "\u4E0D\u53EF"],
        "\u91CD\u53CD\u5668": ["\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u534A\u7A7F", "\u5FAE\u7A7F"],
        "\u53CD\u5766\u514B": ["\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u5168\u7A7F", "\u534A\u7A7F"]
      },
      penetration: { "\u5168\u7A7F": 1, "\u534A\u7A7F": 0.5, "\u5FAE\u7A7F": "1\u70B9", "\u4E0D\u53EF": 0 },
      source: "shark",
      note: "\u9CA8\u5305\u901F\u67E5 V1.91\uFF1A\u7532\u5F39\u5BF9\u6297\u8868\u3002\u9730\u5F39\u901A\u5E38\u7B97\u91CD\u624B\u67AA\u7EA7\uFF0C\u72EC\u5934\u5F39\u7B97\u4E2D\u5A01\u529B\u7EA7\uFF1B\u8FD1\u6218\u65E0\u7279\u522B\u6807\u6CE8\u5747\u6309\u5168\u5A01\u529B\u7EA7\u3002\u300E\u4E0D\u53EF\u300F\u65E0\u6CD5\u9020\u6210\u4EFB\u4F55\u62A4\u7532/\u751F\u547D\u635F\u4F24\u3002"
    },
    ablation: { base: 1, apAmmo: 2, rule: "\u4F24\u5BB3\u6210\u529F\u7A7F\u900F\u62A4\u7532\u65F6\u8BE5\u90E8\u4F4D SP -1\uFF1B\u7A7F\u7532\u5F39\u65F6 -2", source: "core", errata: "\u5B98\u65B9\u7A7F\u7532\u5F39\u89C4\u5219\uFF1A\u300E\u62A4\u7532\u88AB\u7A7F\u900F\u65F6\uFF0CSP\u51CF\u503C\u4ECE1\u589E\u52A0\u4E3A2\u300F\uFF08\u6742\u9879-\u5B50\u5F39\u8868\uFF09\u3002\u8BA1\u5212\u4E66\u4E2D\u300E-2 SP\u300F\u53E3\u5F84\u5DF2\u6309\u5B98\u65B9\u4FEE\u6B63\u3002" },
    bodyMods: [
      { min: 0, max: 3, melee: -1, thrown: 0, effect: "\u5F92\u624B/\u6295\u63B7/\u8FD1\u6218\u4F24\u5BB3\u9AB0 -1\uFF08\u6700\u4F4E1\uFF09" },
      { min: 4, max: 7, melee: 0, thrown: 0, effect: "\u65E0" },
      { min: 8, max: 11, melee: 1, thrown: 2, effect: "\u8FD1\u6218\u4F24\u5BB3\u9AB0+1\uFF0C\u6295\u63B7\u4F24\u5BB3+2" },
      { min: 12, max: 15, melee: 2, thrown: 4, effect: "\u8FD1\u6218\u4F24\u5BB3\u9AB0+2\uFF0C\u6295\u63B7\u4F24\u5BB3+4" },
      { min: 16, max: 19, melee: 3, thrown: 6, effect: "\u8FD1\u6218\u4F24\u5BB3\u9AB0+3\uFF0C\u6295\u63B7\u4F24\u5BB3+6" },
      { min: 20, max: 99, melee: 4, thrown: 8, effect: "\u8FD1\u6218\u4F24\u5BB3\u9AB0+4\uFF0C\u6295\u63B7\u4F24\u5BB3+8" }
    ],
    bodyModsSource: "shark",
    unarmedByBody: [{ max: 4, dmg: "1d6" }, { min: 5, max: 6, dmg: "2d6" }, { min: 7, max: 10, dmg: "3d6" }, { min: 11, dmg: "4d6" }],
    weapons: [
      { id: "mpistol", name: "\u4E2D\u578B\u624B\u67AA", skill: "\u624B\u67AA", damage: "2d6", ammoClass: "\u624B\u67AA", rof: 2, hands: 1, mag: "12\uFF08\u4E2D\u578B\u624B\u67AA\u5F39\uFF09", cost: 50, source: "core" },
      { id: "hpistol", name: "\u91CD\u578B\u624B\u67AA", skill: "\u624B\u67AA", damage: "3d6", ammoClass: "\u91CD\u624B\u67AA", rof: 2, hands: 1, mag: "8\uFF08\u91CD\u578B\u624B\u67AA\u5F39\uFF09", cost: 100, source: "core" },
      { id: "vhpistol", name: "\u8D85\u91CD\u578B\u624B\u67AA", skill: "\u624B\u67AA", damage: "4d6", ammoClass: "\u91CD\u624B\u67AA", rof: 1, hands: 1, mag: "8\uFF08\u8D85\u91CD\u578B\u624B\u67AA\u5F39\uFF09", cost: 100, source: "core" },
      { id: "smg", name: "\u51B2\u950B\u67AA", skill: "\u624B\u67AA", skillAuto: "[x2]\u81EA\u52A8\u6B66\u5668", damage: "2d6", ammoClass: "\u624B\u67AA", rof: 1, autoShots: 3, suppressive: true, mag: "30\uFF08\u4E2D\u578B\u624B\u67AA\u5F39\uFF09", cost: 100, source: "core" },
      { id: "hsmg", name: "\u91CD\u578B\u51B2\u950B\u67AA", skill: "\u624B\u67AA", skillAuto: "[x2]\u81EA\u52A8\u6B66\u5668", damage: "3d6", ammoClass: "\u91CD\u624B\u67AA", rof: 1, autoShots: 3, suppressive: true, mag: "40\uFF08\u91CD\u578B\u624B\u67AA\u5F39\uFF09", cost: 100, source: "core" },
      { id: "shotgun", name: "\u9730\u5F39\u67AA", skill: "\u957F\u7BA1\u6B66\u5668", damage: "5d6", ammoClass: "\u91CD\u624B\u67AA", rof: 1, hands: 2, mag: "4\uFF08\u72EC\u5934\u5F39\uFF09", cost: 500, source: "core", note: "\u9CA8\u5305\u6CE8\uFF1A\u9730\u5F39=\u91CD\u624B\u67AA\u7EA7\u7A7F\u7532\uFF0C\u72EC\u5934\u5F39=\u4E2D\u5A01\u529B\u7EA7" },
      { id: "ar", name: "\u7A81\u51FB\u6B65\u67AA", skill: "\u957F\u7BA1\u6B66\u5668", skillAuto: "[x2]\u81EA\u52A8\u6B66\u5668", damage: "5d6", ammoClass: "\u4E2D\u5A01\u529B", rof: 1, autoShots: 4, suppressive: true, mag: "25\uFF08\u6B65\u67AA\u5F39\uFF09", cost: 500, source: "core" },
      { id: "sr", name: "\u72D9\u51FB\u6B65\u67AA", skill: "\u957F\u7BA1\u6B66\u5668", damage: "5d6", ammoClass: "\u4E2D\u5A01\u529B", rof: 1, hands: 2, mag: "4\uFF08\u6B65\u67AA\u5F39\uFF09", cost: 500, source: "core" },
      { id: "bow", name: "\u5F13&\u5341\u5B57\u5F29", skill: "\u5F13\u672F", damage: "4d6", ammoClass: "\u91CD\u624B\u67AA", rof: 1, hands: 2, cost: 100, source: "core", note: "\u62C9\u5F13\u642D\u7BAD\u4E0D\u9700\u91CD\u88C5\u586B" },
      { id: "gl", name: "\u69B4\u5F39\u53D1\u5C04\u5668", skill: "[x2]\u91CD\u6B66\u5668", damage: "6d6", ammoClass: "\u8F7B\u53CD\u5668", rof: 1, hands: 2, mag: "2\uFF08\u69B4\u5F39\uFF09", cost: 500, source: "core", note: "\u9AD8\u7206\uFF1A10m\xD710m \u8303\u56F4\u4F24\u5BB3" },
      { id: "rl", name: "\u706B\u7BAD\u7B52", skill: "[x2]\u91CD\u6B66\u5668", damage: "8d6", ammoClass: "\u91CD\u53CD\u5668", rof: 1, hands: 2, mag: "1\uFF08\u706B\u7BAD\u5F39\uFF09", cost: 500, source: "core", errata: "\u4E24\u4EFD\u672C\u5730\u6574\u7406\u8868\u5206\u522B\u8BB0 6d6 \u4E0E 8d6\uFF0C\u53D6\u6742\u9879\u8868 8d6\uFF1B\u5F85\u7528\u6237\u786E\u8BA4" },
      { id: "mlight", name: "\u8F7B\u578B\u8FD1\u6218\u6B66\u5668", skill: "\u8FD1\u6218\u6B66\u5668", damage: "1d6", ammoClass: "\u5168\u5A01\u529B", rof: 2, melee: true, cost: 50, source: "core" },
      { id: "mmed", name: "\u4E2D\u578B\u8FD1\u6218\u6B66\u5668", skill: "\u8FD1\u6218\u6B66\u5668", damage: "2d6", ammoClass: "\u5168\u5A01\u529B", rof: 2, melee: true, cost: 50, source: "core" },
      { id: "mheavy", name: "\u91CD\u578B\u8FD1\u6218\u6B66\u5668", skill: "\u8FD1\u6218\u6B66\u5668", damage: "3d6", ammoClass: "\u5168\u5A01\u529B", rof: 2, melee: true, cost: 100, source: "core" },
      { id: "mvheavy", name: "\u8D85\u91CD\u578B\u8FD1\u6218\u6B66\u5668", skill: "\u8FD1\u6218\u6B66\u5668", damage: "4d6", ammoClass: "\u5168\u5A01\u529B", rof: 1, melee: true, cost: 500, source: "core" }
    ],
    ammo: [
      { id: "basic", name: "\u57FA\u7840\u5F39\u836F", price: 10, effect: "\u6807\u51C6\u5F39\u836F\uFF0C\u65E0\u7279\u6548", source: "core" },
      { id: "ap", name: "\u7A7F\u7532\u5F39", price: 100, ablation: 2, effect: "\u62A4\u7532\u88AB\u7A7F\u900F\u65F6 SP \u524A\u51CF\u4ECE 1 \u589E\u4E3A 2\uFF08\u4E0D\u53EF\u4E0E\u69B4\u5F39/\u706B\u7BAD\u5E76\u7528\uFF09", source: "core" },
      { id: "incendiary", name: "\u71C3\u70E7\u5F39", price: 100, effect: "\u7A7F\u900F\u9020\u6210\u4F24\u5BB3\u540E\u70B9\u71C3\u76EE\u6807\uFF1A\u6BCF\u56DE\u5408\u7ED3\u675F 2 \u70B9\u76F4\u63A5\u4F24\u5BB3\uFF0C\u76F4\u5230\u7528\u52A8\u4F5C\u6251\u706D", source: "core" },
      { id: "bio toxin", name: "\u751F\u7269\u6BD2\u7D20\u5F39", price: 500, effect: "\u4E0D\u9020\u6210\u4F24\u5BB3\uFF1B\u76EE\u6807 DV15 \u5FCD\u8010\u68C0\u5B9A\u5931\u8D25\u53D7 3d6\uFF08\u62A4\u7532\u4E0D\u635F\uFF09", source: "core" },
      { id: "emp", name: "EMP\u5F39", price: 500, effect: "\u4E0D\u9020\u6210\u4F24\u5BB3\uFF1B\u76EE\u6807 DV15 \u8D5B\u535A\u6280\u672F\u68C0\u5B9A\uFF0C\u5931\u8D25 2 \u4EF6\u4E49\u4F53/\u8BBE\u5907 1 \u5206\u949F\u4E0D\u53EF\u7528", source: "core" },
      { id: "rubber", name: "\u6A61\u80F6\u5F39", price: 10, effect: "\u4E0D\u9020\u6210\u91CD\u4F24\u3001\u4E0D\u524A\u7532\uFF1BHP \u6700\u4F4E\u964D\u81F3 1", source: "core" },
      { id: "smart", name: "\u667A\u80FD\u5F39\u836F", price: 500, effect: "\u9700\u7784\u51C6\u76EE\u955C\u4E49\u4F53\uFF1B\u547D\u4E2D\u68C0\u5B9A +2", source: "core" }
    ],
    armorCatalog: [
      { name: "\u76AE\u8863", sp: 4, ev: 0, coverage: ["body"], cost: 20, source: "core" },
      { name: "\u51EF\u592B\u62C9\u6750\u6599", sp: 7, ev: 0, coverage: ["body"], cost: 50, source: "core" },
      { name: "\u8F7B\u578B\u88C5\u7532\u5939\u514B", sp: 11, ev: 0, coverage: ["body", "arm"], cost: 100, source: "core" },
      { name: "\u4E2D\u578B\u88C5\u7532\u5939\u514B", sp: 12, ev: 2, coverage: ["body", "arm"], cost: 100, source: "core", note: "EV \u4EE5\u9CA8\u5305\u53E3\u5F84\u53D6\u6700\u5927\u59A8\u788D\u5E76\u6263 REF/DEX/MOV" },
      { name: "\u91CD\u578B\u88C5\u7532\u5939\u514B", sp: 13, ev: 2, coverage: ["body", "arm"], cost: 500, source: "core" },
      { name: "\u9632\u5F39\u80CC\u5FC3", sp: 15, ev: 4, coverage: ["body"], cost: 500, source: "core" },
      { name: "\u5408\u91D1\u88C5\u5907", sp: 18, ev: 4, coverage: ["body", "arm", "leg"], cost: 5e3, source: "core" },
      { name: "\u9632\u5F39\u76FE\u724C", sp: 10, ev: 0, coverage: ["shield"], cost: 100, source: "core", note: "\u9700\u4E00\u53EA\u624B\u6301\u7528" }
    ],
    cyberware: [
      { name: "\u795E\u7ECF\u94FE\u8DEF", cost: 500, humanity: 7, note: "\u4F7F\u7528\u795E\u7ECF\u7EC4\u4EF6\u524D\u63D0\uFF0C5 \u4E2A\u9009\u9879\u63D2\u69FD", source: "core" },
      { name: "\u4EA4\u4E92\u63A5\u53E3", cost: 500, humanity: 7, note: "\u8FDE\u63A5\u8BBE\u5907/\u667A\u80FD\u67AA\u68B0", source: "core" },
      { name: "\u82AF\u7247\u63D2\u69FD", cost: 500, humanity: 7, note: "\u540E\u9888\u5355\u82AF\u7247\u69FD", source: "core" },
      { name: "\u514B\u4F26\u9F50\u79D1\u592B", cost: 500, humanity: 14, note: "\u65F6\u95F4\u52A0\u901F\u7EC4\u4EF6\uFF0C+3 \u5148\u653B\uFF081\u5206\u949F\uFF09", source: "core" },
      { name: "\u65AF\u5B89\u5A01\u65AF\u5766", cost: 500, humanity: 7, note: "\u65F6\u95F4\u52A0\u901F\u7EC4\u4EF6\uFF0C+3 \u5148\u653B\uFF081\u5206\u949F\uFF0C\u51B7\u53741\u5C0F\u65F6\uFF09", source: "core" },
      { name: "\u75DB\u89C9\u7F16\u8F91\u5668", cost: 1e3, humanity: 14, note: "\u5148\u653B+2 \u6052\u5B9A\uFF08\u55C5\u89C9\u589E\u5F3A\u7C7B\u52A0\u901F\u7EC4\u4EF6\uFF09", source: "core" },
      { name: "\u8D5B\u535A\u4E49\u773C", cost: 100, humanity: 7, note: "\u6BCF\u9897 3 \u63D2\u69FD\uFF0C\u6210\u5BF9\u6548\u679C\u9700\u8D2D\u4E70\u4E24\u6B21", source: "core" },
      { name: "\u8D5B\u535A\u97F3\u9891\u5957\u88C5", cost: 500, humanity: 7, note: "3 \u4E2A\u97F3\u9891\u9009\u9879\u63D2\u69FD", source: "core" },
      { name: "\u7F16\u7EC7\u76AE\u80A4", cost: 500, humanity: 7, note: "\u8EAB\u4F53+\u5934\u90E8 SP7", source: "core" },
      { name: "\u76AE\u4E0B\u62A4\u7532", cost: 1e3, humanity: 14, note: "\u8EAB\u4F53+\u5934\u90E8 SP11\uFF0C\u4E0E\u7F16\u7EC7\u76AE\u80A4 SP \u53D6\u6700\u9AD8", source: "core" },
      { name: "\u8D5B\u535A\u81C2", cost: 500, humanity: 7, note: "\u6BCF\u81C2 4 \u69FD\u4F4D\uFF0C\u4E0D\u5FC5\u6210\u5BF9", source: "core" },
      { name: "\u8D5B\u535A\u817F", cost: 500, humanity: 7, note: "\u6BCF\u817F 3 \u69FD\u4F4D\uFF0C\u591A\u6570\u817F\u6539\u9020\u9700\u6210\u5BF9", source: "core" },
      { name: "\u9AA8\u8089\u7EC7\u7ED5", cost: 1e3, humanity: 14, note: "\u4F53\u683C +2", source: "core" },
      { name: "\u76AE\u4E0B\u63E1\u628A", cost: 100, humanity: 3, note: "\u667A\u80FD\u67AA\u68B0\u66FF\u4EE3\u54C1", source: "core" },
      { name: "\u751F\u7269\u76D1\u6D4B\u5668", cost: 100, humanity: 0, note: "\u65F6\u5C1A\u88C5\u7F6E", source: "core" }
    ],
    netrunning: {
      intro: "\u672C\u4F53\u57FA\u7840\u7248\u7F51\u884C\uFF1A\u63A5\u53E3\u68C0\u5B9A 1d10+\u667A\u529B+\u63A5\u53E3\uFF1B\u7F51\u884C\u8005\u7528\u300E\u5229\u5203\u300F\u7B49\u7A0B\u5E8F\u653B\u9632\uFF08ATK/DEF\uFF09\uFF0C\u6BCF\u7A0B\u5E8F\u5360\u7B97\u529B\u3002\u5B8C\u6574\u7A0B\u5E8F\u5E93\u7559\u6570\u636E\u5305\u63A5\u53E3\u3002",
      interfaceRoll: "1d10 + INT + \u63A5\u53E3\u6280\u80FD",
      programs: [
        { name: "\u5229\u5203", atk: 1, def: 0, cost: "\u514D\u8D39", note: "\u51FB\u7A7F\u654C\u65B9\u9632\u5FA1\u7A0B\u5E8F\u540E ATK+1", source: "shark" },
        { name: "\u7EC8\u7AEF\u5B9A\u4F4D", cost: "\u514D\u8D39", note: "\u9501\u5B9A\u76EE\u6807\u7EC8\u7AEF\u4F4D\u7F6E\uFF0C\u5360\u7B97\u529B1\uFF0C\u6D88\u80171\u52A8\u4F5C", source: "shark" }
      ],
      source: "shark"
    },
    skills: {
      combat: ["\u640F\u51FB", "\u95EA\u907F", "\u8FD1\u6218\u6B66\u5668", "\u5F13\u672F", "[x2]\u81EA\u52A8\u6B66\u5668", "\u624B\u67AA", "[x2]\u91CD\u6B66\u5668", "\u957F\u7BA1\u6B66\u5668"],
      social: ["\u8D3F\u8D42", "\u4EA4\u8C08", "\u5BDF\u8A00\u89C2\u8272", "\u5BA1\u8BAF", "\u8BF4\u670D", "\u8857\u5934\u667A\u6167", "\u4E2A\u4EBA\u88C5\u626E", "\u4EA4\u6613", "\u670D\u9970\u4E0E\u98CE\u683C"],
      note: "[x2] \u6280\u80FD\u52A0\u70B9\u6298\u534A\u8BA1\u5165\u57FA\u51C6\uFF08\u9CA8\u5305\u4EBA\u7269\u5361 ROUNDDOWN(\u52A0\u70B9/2)\uFF09"
    },
    quickref: []
  };

  // src/data/shark.js
  var shark_default = {
    id: "shark-pack",
    name: "\u9CA8\u9C7C\u5305\uFF08RED\u4F53\u9A8C\u6539\u826F\u6574\u5408\u5305\uFF09",
    version: "1.92.0",
    dependsOn: ["cpr-core"],
    description: "\u4EE5\u9CA8\u5305\u901F\u67E5V1.91\u5C04\u8868/\u7532\u5F39\u5BF9\u6297/\u91CD\u4F24\u8868\u8986\u76D6\u672C\u4F53\u6570\u503C\uFF0C\u9644\u5E26\u4E09\u8272\u53CD\u5E94\u52A8\u4F5C\u4F53\u7CFB\uFF08\u53EF\u9009\u5F00\u5173\uFF09\u4E0E\u89C4\u5219\u901F\u67E5\u9762\u677F\u6570\u636E\u3002",
    rangedDV: {
      bands: ["0-12m", "13-25m", "26-50m", "51-100m", "101-250m", "251-500m", "501m-1km"],
      table: {
        "\u624B\u67AA": [8, 14, 20, 26, 30, null, null],
        "\u51B2\u950B\u67AA": [10, 12, 16, 20, 25, 30, null],
        "\u9730\u5F39\uFF08\u72EC\uFF09": [11, 13, 16, 18, 23, null, null],
        "\u7A81\u51FB\u6B65\u67AA": [12, 13, 14, 16, 20, 24, 28],
        "\u5F13\u5F29": [14, 10, 13, 17, 21, null, null],
        "\u72D9\u51FB\u6B65\u67AA": [16, 14, 12, 14, 16, 18, 22],
        "\u69B4\u5F39": [14, 15, 17, 19, 21, 25, 28],
        "\u706B\u7BAD": [null, 14, 16, 18, 18, 24, 30]
      },
      source: "shark",
      note: "\u9CA8\u5305\u65B0\u5C04\u8868\uFF1A\u8DDD\u79BB\u6863\u4F4D\u4E0EDV\u5747\u4E0E\u672C\u4F53\u4E0D\u540C\uFF0C\u8FD1\u8DDD\u66F4\u6613\u547D\u4E2D"
    },
    autofireDV: {
      bands: ["0-12m", "13-25m", "26-50m", "51-100m", "101-250m", "251-500m", "501m-1km"],
      table: {
        "\u51B2\u950B\u67AA": [12, 15, 20, 25, 30, null, null],
        "\u7A81\u51FB\u6B65\u67AA": [14, 16, 18, 20, 24, 28, 32]
      },
      source: "shark"
    },
    threeColor: {
      id: "three-color",
      name: "\u4E09\u8272\u53CD\u5E94\u52A8\u4F5C\u4F53\u7CFB",
      version: "0.7",
      source: "ext",
      enabledByDefault: false,
      resources: [
        { id: "blue", name: "\u84DD\u53CD", desc: "\u6218\u6597\u5F00\u59CB1\u70B9\uFF0C\u4E0E\u7EFF\u53CD\u5171\u7528\u603B\u4E0A\u9650\uFF08\u9ED8\u8BA42\uFF09\u3002\u672C\u4EBA\u56DE\u5408\u5F00\u59CB\u6062\u590D\u81F3\u57FA\u7840\u503C\u3002", source: "ext" },
        { id: "green", name: "\u7EFF\u53CD", desc: "\u9ED8\u8BA40\uFF0C\u4E0D\u81EA\u52A8\u6062\u590D\uFF0C\u53EF\u8DE8\u56DE\u5408\u4FDD\u7559\uFF0C\u53D7\u603B\u4E0A\u9650\u9650\u5236\u3002", source: "ext" },
        { id: "red", name: "\u7EA2\u53CD", desc: "\u9ED8\u8BA40\uFF0C\u4E0D\u8BA1\u5165\u4E0A\u9650\uFF0C\u53EA\u80FD\u7531\u517C\u5BB9\u9AD8\u70C8\u6027\u836F\u7269\u4EA7\u751F\uFF0C\u53EA\u6709\u9002\u914D\u8D5B\u535A\u683C\u4E49\u4F53\u8005\u53EF\u7528\u3002", source: "ext" }
      ],
      consumptionOrder: "\u7EA2\u53CD \u2192 \u84DD\u53CD \u2192 \u7EFF\u53CD\uFF08\u5F3A\u5236\u987A\u5E8F\uFF09",
      caps: { total: 2, totalMax: 3, blueRegen: 1, blueRegenMax: 2, redHardCap: 3 },
      dodgeManeuver: "\u81EA\u5DF1\u56DE\u5408\u82B11\u4E2A\u666E\u901A\u52A8\u4F5C\u6062\u590D1\u84DD\u53CD\uFF08\u4E0D\u8D85\u603B\u4E0A\u9650\uFF09\u3002",
      reactionActions: [
        { name: "\u8FDC\u7A0B\u9632\u5FA1", trigger: "\u88AB\u5BA3\u5E03\u8FDC\u7A0B\u653B\u51FB\u540E\u3001\u653B\u51FB\u9AB0\u63B7\u51FA\u524D", cost: "1\u53CD\u5E94", note: "\u9700\u8FDC\u7A0B\u95EA\u907F\u8D44\u683C\uFF08REF8+\u6216\u53CD\u5C04\u534F\u5904\u7406\u5668\uFF09\uFF1B\u7528\u95EA\u907F\u4EE3\u66FF\u8DDD\u79BBDV\uFF0C\u4E00\u6B21\u8D39\u7528\u8986\u76D6\u8BE5\u653B\u51FB\u8005\u672C\u6B21\u653B\u51FB\u52A8\u4F5C\u7684\u5168\u90E8\u653B\u51FB", source: "ext" },
        { name: "\u7D27\u6025\u673A\u52A8", trigger: "\u53E6\u4E00\u89D2\u8272\u5B8C\u6574\u52A8\u4F5C\u7ED3\u7B97\u540E", cost: "1\u53CD\u5E94", note: "\u7ACB\u5373\u79FB\u52A8\u6700\u591A\u81EA\u8EAB\u79FB\u901F\u4E00\u534A", source: "ext" },
        { name: "\u7D27\u6025\u5F03\u76FE", trigger: "\u81EA\u5DF1\u56DE\u5408\u5F00\u59CB\u6216\u4EFB\u610F\u5B8C\u6574\u52A8\u4F5C\u540E", cost: "1\u53CD\u5E94", note: "\u7ACB\u5373\u653E\u4E0B\u624B\u6301\u76FE\u724C", source: "ext" },
        { name: "\u53CD\u5E94\u88C5\u586B", trigger: "\u5B8C\u6574\u52A8\u4F5C\u7ED3\u7B97\u540E", cost: "2\u53CD\u5E94", note: "\u9700\u808C\u7535\u88C5\u586B\u8054\u52A8\u5668\uFF1B\u7528\u5F39\u5323\u67B6\u9884\u7F6E\u5F39\u5323\u7ACB\u5373\u88C5\u586B\uFF1B\u4EA7\u751F2\u70ED\u91CF", source: "ext" },
        { name: "\u9884\u5224\u8FDC\u7A0B\u9632\u5FA1", trigger: "\u9488\u5BF9\u81EA\u5DF1\u7684\u8FDC\u7A0B\u653B\u51FB\u9AB0\u5DF2\u63B7\u51FA\u4F46\u672A\u5224\u5B9A", cost: "2\u53CD\u5E94", note: "\u9700\u9884\u5224\u53CD\u5C04\u5904\u7406\u5668\uFF1B\u540E\u7F6E\u58F0\u660E\u95EA\u907F\uFF1B\u4EA7\u751F2\u70ED\u91CF", source: "ext" },
        { name: "\u7EA2\u7EBF\u8D85\u9891", trigger: "\u672C\u4EBA\u56DE\u5408", cost: "3\u7EA2\u53CD", note: "\u6362\u53D6\u4E00\u4E2A\u989D\u5916\u666E\u901A\u52A8\u4F5C\uFF08\u53EF\u653B\u51FB/\u6362\u5F39/\u6025\u6551\u7B49\uFF09\uFF1B1\u7EA2\u53CD\u4E5F\u53EF\u652F\u4ED8\u4E00\u6B21\u53CD\u5E94\u6216\u989D\u5916\u79FB\u52A8\u2264\u79FB\u901F\u4E00\u534A", source: "ext" }
      ],
      cyberware: [
        { name: "\u53CD\u5E94\u7F13\u5B58\u5668", cost: 1e3, humanity: 7, note: "\u53CD\u5E94\u603B\u4E0A\u9650+1\uFF08\u6700\u9AD83\uFF09" },
        { name: "\u601D\u7EF4\u52A0\u901F\u5668", cost: 5e3, humanity: 14, note: "\u84DD\u53CD\u6062\u590D\u503C+1\uFF08\u6700\u9AD82\uFF09" },
        { name: "\u9884\u5224\u53CD\u5C04\u5904\u7406\u5668", cost: 1e3, humanity: 7, note: "\u89E3\u9501\u9884\u5224\u8FDC\u7A0B\u9632\u5FA1\uFF08\u70ED\u91CF\u7EC4\u4EF6\uFF09" },
        { name: "\u808C\u7535\u88C5\u586B\u8054\u52A8\u5668", cost: 1e3, humanity: 7, note: "\u89E3\u9501\u53CD\u5E94\u88C5\u586B\uFF08\u70ED\u91CF\u7EC4\u4EF6\uFF09" },
        { name: "\u795E\u7ECF\u52A8\u4F5C\u5E76\u884C\u5668", cost: 1e3, humanity: 7, note: "\u9700WILL6\uFF1B\u7D27\u6025\u8BBE\u5907\u542F\u52A8\u65F6\u9644\u5E26\u7B80\u77ED\u514D\u68C0\u5B9A\u64CD\u4F5C" },
        { name: "\u514B\u4F26\u9F50\u79D1\u592B\u53CD\u5E94\u5206\u6D41\u5668", cost: 1e3, humanity: 7, note: "\u53CD\u5E94\u603B\u4E0A\u9650+1\uFF08\u6700\u9AD83\uFF09" },
        { name: "\u65AF\u5B89\u5A01\u65AF\u5766\u518D\u751F\u6865", cost: 1e3, humanity: 7, note: "\u542F\u52A8\u65AF\u5B89\u5A01\u65AF\u5766\u65F6\u6062\u590D1\u84DD\u53CD" }
      ],
      heat: { max: 3, overheat: "\u8FBE3\u70ED\u91CF\u5373\u8FC7\u70ED\uFF0C\u964D\u81F32\u4EE5\u4E0B\u624D\u53EF\u518D\u542F\u52A8\uFF1B\u672C\u4EBA\u56DE\u5408\u5F00\u59CB\u5404\u7EC4\u4EF6-1\u70ED\u91CF", zeroHeat: "\u6807\u300E\u96F6\u70ED\u542F\u52A8\u300F\u7EC4\u4EF6\u987B\u70ED\u91CF\u4E3A0\u624D\u53EF\u542F\u52A8" },
      note: "\u4EF7\u683C\u4E3A\u6D4B\u8BD5\u7528\u4F30\u503C\uFF08ext\u539F\u6587\u53E3\u5F84\uFF09\uFF1B\u975E\u5B98\u65B9\u81EA\u5236\u89C4\u5219\uFF0C\u9ED8\u8BA4\u5173\u95ED\uFF0C\u53EF\u5728\u8BBE\u7F6E\u4E2D\u5F00\u542F\u3002"
    },
    quickref: [
      { category: "\u4F24\u52BF", title: "\u4F24\u52BF\u72B6\u6001\u673A", content: "\u5065\u5EB7 \u2192 \u8F7B\u4F24\uFF08HP<\u4E0A\u9650\uFF09\u2192 \u91CD\u4F24\uFF08HP<\u4E0A\u9650/2\uFF0C\u6240\u6709\u52A8\u4F5C-2\uFF09\u2192 \u81F4\u547D\u4F24\uFF08HP=0\uFF0C\u6240\u6709\u52A8\u4F5C-4\u3001\u79FB\u901F-6\u6700\u4F4E1\u3001\u6BCF\u56DE\u5408\u6B7B\u4EA1\u8C41\u514D\uFF09\u3002", source: "shark" },
      { category: "\u4F24\u52BF", title: "\u6B7B\u4EA1\u8C41\u514D", content: "\u6BCF\u56DE\u5408\u63B7 1d10 + \u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A\uFF1B\u51FA\u76EE+\u60E9\u7F5A \u2265 10 \u5373\u6B7B\u4EA1\u3002\u91CD\u4F24\u8868\u4E2D\u7684\u300E\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1\u300F\u5373\u4E3A\u6B64\u60E9\u7F5A\u3002", source: "core" },
      { category: "\u4F24\u52BF", title: "\u7A33\u5B9A\u4E0E\u6551\u6CBB", content: "\u81F4\u547D\u4F24\u9700\u6BCF\u56DE\u5408\u6B7B\u4EA1\u8C41\u514D\uFF1B\u4ED6\u4EBA\u53EF\u7528\u6025\u6551/\u5F3A\u5316\u6025\u6551\u8FDB\u884C\u7A33\u5B9A\uFF08\u6551\u6CBB\u96BE\u5EA6\u968F\u4F24\u52BF\u4E0A\u5347\uFF0C\u5177\u4F53DV\u89C1GM\u88C1\u5B9A/\u9CA8\u5305\u6574\u5408\u5305\uFF09\u3002", source: "core" },
      { category: "\u5C04\u51FB", title: "\u7784\u51C6", content: "\u666E\u901A\u7784\u51C6 +1\uFF08\u989D\u5916\u82B11\u52A8\u4F5C\uFF09\uFF1B\u7CBE\u786E\u7784\u51C6 +3 \u4F46\u727A\u7272\u6574\u8F6E\u884C\u52A8\uFF0C\u4E14\u53EF\u6307\u5B9A\u90E8\u4F4D\uFF08\u90E8\u4F4D\u7784\u51C6\u51CF\u503C\u89C1\u4E0B\uFF09\u3002", source: "core" },
      { category: "\u5C04\u51FB", title: "\u90E8\u4F4D\u7784\u51C6\u8868", content: "\u5934\u90E8 -8\uFF08\u7A7F\u900F\u540E\u4F24\u5BB3\u7FFB\u500D\uFF09\uFF1B\u624B\u81C2 -6\uFF08\u7A7F\u900F\u540E>5\u5373\u9AA8\u6298\uFF09\uFF1B\u817F\u90E8 -4\uFF08\u7A7F\u900F\u540E>5\u5373\u9AA8\u6298\uFF09\uFF1B\u88C6\u90E8 -10\uFF08\u7A7F\u900F\u540E>5\u5012\u57301d4\u8F6E\uFF0C\u8D5B\u535A\u683C\u514D\u75AB\uFF09\u3002", source: "shark" },
      { category: "\u5C04\u51FB", title: "\u5168\u81EA\u52A8\u5C04\u51FB", content: "\u6BCF\u591A\u62531\u53D1 DV+2\uFF1B\u547D\u4E2D\u5F39\u6570=floor((\u7ED3\u679C-DV)/2)\uFF0C\u4E0A\u9650=\u5BA3\u5E03\u5F39\u6570\uFF1B\u6BCF\u6B21\u653B\u51FB\u6D88\u8017\u81F3\u5C1110\u53D1\uFF1BDV \u67E5\u9CA8\u5305\u5168\u81EA\u52A8\u5C04\u8868\u3002", source: "shark" },
      { category: "\u5C04\u51FB", title: "\u706B\u529B\u538B\u5236", content: "1\u52A8\u4F5C+10\u53D1\uFF1BDV15\uFF1B25m\u5185\u7AD9\u7ACB\u65E0\u63A9\u4F53\u76EE\u6807\u88AB\u538B\u5236\uFF1A\u627F\u53D7\u538B\u5236\u6216\u7528\u79FB\u52A8\u529B\u6251\u5411\u63A9\u4F53\u3002", source: "core" },
      { category: "\u9632\u5177", title: "\u7532\u5F39\u5BF9\u6297\u901F\u8BB0", content: "\u5168\u7A7F=\u5168\u989D\u4F24\u5BB3\uFF1B\u534A\u7A7F=\u6298\u534A\uFF08\u5411\u4E0B\uFF09\uFF1B\u5FAE\u7A7F=\u53EA\u9020\u62101\u70B9\uFF1B\u4E0D\u53EF=\u5B8C\u5168\u65E0\u6548\u3002\u62A4\u7532\u6570\u503C\u4E0B\u964D\u65F6\u5176\u6240\u5C5E\u7B49\u7EA7\u540C\u6B65\u4E0B\u964D\u3002", source: "shark" },
      { category: "\u9632\u5177", title: "\u524A\u7532\uFF08ABLATION\uFF09", content: "\u4F24\u5BB3\u6210\u529F\u7A7F\u900F\u62A4\u7532\u65F6\uFF0C\u8BE5\u90E8\u4F4D SP-1\uFF08\u7A7F\u7532\u5F39-2\uFF09\u3002SP\u964D\u52300\u4EE5\u4E0B\u62A4\u7532\u635F\u574F\u3002\u5168\u81EA\u52A8\u547D\u4E2D\u5E76\u7A7F\u900F\u65F6\uFF0C\u62A4\u7532\u4E0B\u964D\u91CF=\u672C\u6B21\u547D\u4E2D\u5F39\u6570\u3002", source: "shark" },
      { category: "\u9632\u5177", title: "EV \u59A8\u788D", content: "\u5168\u8EABEV\u53D6\u6700\u5927\u503C\uFF0C\u540C\u65F6\u6263\u51CF\u53CD\u5E94/\u654F\u6377/\u79FB\u901F\u3002EV\u540C\u65F6\u4F5C\u4E3A\u95EA\u907F/\u8FD0\u52A8\u7B49\u68C0\u5B9A\u7684\u8D1F\u4FEE\u6B63\u3002", source: "shark" },
      { category: "\u7F51\u884C", title: "\u57FA\u7840\u7F51\u884C", content: "\u63A5\u53E3\u68C0\u5B9A 1d10+\u667A\u529B+\u63A5\u53E3\uFF1B\u5229\u5203 ATK+1/DEF0\uFF1B\u7EC8\u7AEF\u5B9A\u4F4D\u53601\u7B97\u529B\u3002\u5B8C\u6574\u7A0B\u5E8F\u5E93\u5F85\u6269\u5C55\u6570\u636E\u5305\u3002", source: "shark" },
      { category: "\u66B4\u51FB", title: "\u4F24\u5BB3\u9AB0\u66B4\u51FB\u8868\uFF08\u9CA8\u5305\uFF09", content: "D4=\u51FA\u76EE4\u4E2A4\uFF1BD6=\u51FA\u76EE\u53CC6\uFF1BD8=\u51FA\u76EE\u53CC7+\uFF1BD10=\u51FA\u76EE\u53CC9+/\u535510\uFF1BD12=\u51FA\u76EE\u535511/\u535512\uFF1BD20=\u51FA\u76EE\u535516~20\u3002\uFF08\u4F24\u5BB3\u9AB0\u6EE1\u503C\u8FDE\u51FA\u65F6\u89E6\u53D1\u66B4\u51FB\u6548\u679C\uFF0C\u5177\u4F53\u6548\u679C\u89C1\u9CA8\u5305\u6574\u5408\u5305\uFF09", source: "shark" }
    ],
    seriousInjuries: {
      torso: [
        { roll: 2, name: "\u65AD\u81C2", effect: "\u5931\u53BB\u65AD\u6389\u7684\u90A3\u53EA\u624B\u81C2\uFF0C\u624B\u4E2D\u7269\u54C1\u7ACB\u523B\u6389\u843D\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1", stabilise: "/", treat: "\u9700\u80A2\u4F53\u79FB\u690D" },
        { roll: 3, name: "\u80A0\u80C3\u6495\u88C2", effect: "\u6BCF\u56DE\u5408\u635F\u59311\u4F53\u683C\uFF08\u4E0B\u96502\uFF09\uFF0C\u5F71\u54CD\u751F\u547D\u4E0A\u9650\u548C\u76F8\u5173\u8C41\u514D\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1\u300230\u5206\u949F\u672A\u5904\u7406\u5373\u6B7B\u4EA1", stabilise: "\u5F3A\u531617", treat: "\u9700\u5668\u5B98\u79FB\u690D" },
        { roll: 4, name: "\u6C14\u80F8", effect: "\u6BCF\u56DE\u5408\u635F\u59311\u654F\u6377\uFF08\u4E0B\u96502\uFF09\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1\u300230\u5206\u949F\u672A\u5904\u7406\u5373\u6B7B\u4EA1", stabilise: "\u5F3A\u531615", treat: "\u9700\u5668\u5B98\u79FB\u690D" },
        { roll: 5, name: "\u65AD\u624B", effect: "\u5931\u53BB\u65AD\u6389\u7684\u90A3\u53EA\u624B\uFF0C\u624B\u4E2D\u7269\u54C1\u7ACB\u523B\u6389\u843D\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1", stabilise: "/", treat: "\u9700\u80A2\u4F53\u79FB\u690D" },
        { roll: 6, name: "\u624B\u81C2\u9AA8\u6298", effect: "\u9AA8\u6298\u7684\u624B\u81C2\u65E0\u6CD5\u518D\u5E72\u522B\u7684\u4E8B\uFF0C\u624B\u4E2D\u7269\u54C1\u7ACB\u523B\u6389\u843D", stabilise: "\u6025\u655113", treat: "\u5F3A\u531612/\u624B\u672F8" },
        { roll: 7, name: "\u4F53\u5185\u5F02\u7269", effect: "\u6BCF\u5F92\u6B65\u884C\u8FDB\u8D85\u8FC74m\u7684\u56DE\u5408\uFF0C\u91CD\u65B0\u53D7\u5230\u8BE5\u4F24\u52BF\u7684\u989D\u5916\u4F24\u5BB3\uFF08\u76F4\u63A5\u6263HP\uFF09", stabilise: "\u5F3A\u531613", treat: "\u7D27\u6025\u5904\u7406\u5373\u53EF\u6C38\u4E45\u79FB\u9664" },
        { roll: 8, name: "\u817F\u9AA8\u6298", effect: "-4 \u79FB\u52A8\u548C\u95EA\u907F\uFF08\u6700\u4F4E1\uFF09", stabilise: "\u6025\u655110", treat: "\u5F3A\u531612/\u624B\u672F8" },
        { roll: 9, name: "\u52A8\u8109\u7834\u635F", effect: "\u6BCF\u56DE\u5408\u635F\u5931\u76F8\u5F53\u4E8E\u4F53\u683C\u7684\u751F\u547D\u503C", stabilise: "\u6025\u655110", treat: "\u7D27\u6025\u5904\u7406\u5373\u53EF\u6C38\u4E45\u79FB\u9664" },
        { roll: 10, name: "\u810A\u67F1\u53D7\u4F24", effect: "\u8DCC\u5012\u5728\u5730\uFF0C\u4E4B\u540E\u4E24\u56DE\u5408\u88AB\u8FEB\u8DB4\u4E0B\u65E0\u6CD5\u8D77\u8EAB\uFF0C\u4E00\u5207\u52A8\u4F5C-2\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1", stabilise: "\u5F3A\u531615", treat: "\u624B\u672F15" },
        { roll: 11, name: "\u80BE/\u809D\u7206\u788E", effect: "\u56E0\u5267\u75DB\u8DF3\u8FC7\u4E00\u56DE\u5408\uFF0C\u4E4B\u540E\u6240\u6709\u52A8\u4F5C-2\u76F4\u5230\u88AB\u79FB\u9664\u300230\u5206\u949F\u672A\u5904\u7406\u5373\u6B7B\u4EA1", stabilise: "\u5F3A\u531617", treat: "\u9700\u5668\u5B98\u79FB\u690D" },
        { roll: 12, name: "\u65AD\u817F", effect: "\u5931\u53BB\u65AD\u6389\u7684\u90A3\u6761\u817F\uFF1A-6\u79FB\u52A8\uFF08\u6700\u4F4E1\uFF09\uFF0C\u65E0\u6CD5\u95EA\u907F\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1", stabilise: "/", treat: "\u9700\u80A2\u4F53\u79FB\u690D" }
      ],
      head: [
        { roll: 2, name: "\u76EE\u76F2", effect: "\u53CC\u773C\u6682\u65F6\u5931\u660E\uFF1A-10 \u6218\u6597\u6280\u80FD\u3001\u95EA\u907F\u548C\u6240\u6709\u9700\u89C6\u89C9\u7684\u611F\u77E5\u68C0\u5B9A", stabilise: "/", treat: "\u624B\u672F17" },
        { roll: 3, name: "\u8111\u635F\u4F24", effect: "-2 \u6240\u6709\u884C\u52A8\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1", stabilise: "\u5F3A\u531615", treat: "\u624B\u672F17" },
        { roll: 4, name: "\u8111\u9707\u8361", effect: "\u8DF3\u8FC7\u4E00\u56DE\u5408\uFF0C\u4E0B\u6B21\u5927\u5931\u8D25\u65F6\u91CD\u590D\u89E6\u53D1", stabilise: "/", treat: "\u624B\u672F13" },
        { roll: 5, name: "\u4E0B\u988C\u7C89\u788E", effect: "\u4E13\u6CE8\u548C\u95EA\u907F\u51CF\u534A\uFF0C\u65E0\u6CD5\u8BF4\u8BDD\uFF0CCOOL-4", stabilise: "/", treat: "\u624B\u672F17" },
        { roll: 6, name: "\u989D\u53F6\u635F\u4F24", effect: "\u88AB\u79FB\u9664\u524D\u83B7\u5F97\u4E00\u4E2A\u8D5B\u535A\u7CBE\u795E\u75C5\u300E\u5E94\u6FC0\u75C7\u72B6\u300F\uFF0C\u6BCF\u6B21\u5927\u5931\u8D25\u89E6\u53D1", stabilise: "\u5F3A\u531615", treat: "\u5F3A\u5316/\u624B\u672F13" },
        { roll: 7, name: "\u5934\u90E8\u5F02\u7269", effect: "\u6BCF\u5F92\u6B65\u884C\u8FDB\u8D85\u8FC74m\u7684\u56DE\u5408\u91CD\u65B0\u53D7\u5230\u989D\u5916\u4F24\u5BB3\uFF08\u76F4\u63A5\u6263HP\uFF09", stabilise: "\u6025\u6551/", treat: "\u7D27\u6025\u5904\u7406\u5373\u53EF\u6C38\u4E45\u79FB\u9664" },
        { roll: 8, name: "\u5931\u53BB\u773C\u775B", effect: "\u5931\u53BB\u4E00\u53EA\u773C\u775B\uFF1A-4 \u653B\u51FB\u3001\u95EA\u907F\u548C\u6240\u6709\u9700\u89C6\u89C9\u7684\u611F\u77E5\u68C0\u5B9A", stabilise: "/", treat: "\u9700\u5668\u5B98\u79FB\u690D" },
        { roll: 9, name: "\u9885\u9AA8\u9AA8\u88C2", effect: "\u7784\u51C6\u5934\u90E8\u7684\u7CBE\u786E\u5C04\u51FB\u4F24\u5BB3\uFF08\u51CF\u7532\u540E\uFF09\u500D\u6570\u53D8\u4E3A3\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1", stabilise: "\u5F3A\u531615", treat: "\u7D27\u6025\u5904\u7406\u5373\u53EF\u6C38\u4E45\u79FB\u9664" },
        { roll: 10, name: "\u8033\u804B", effect: "\u6240\u6709\u9700\u542C\u529B\u7684\u611F\u77E5\u68C0\u5B9A\u548C\u95EA\u907F-4\uFF1B\u6BCF\u6B21\u627F\u53D7\u8D85\u8FC75\u4F24\u5BB3\u5373\u8DCC\u5012\u3002\u57FA\u7840\u6B7B\u4EA1\u8C41\u514D\u60E9\u7F5A+1", stabilise: "/", treat: "\u624B\u672F13" },
        { roll: 11, name: "\u52A8\u8109\u7834\u635F", effect: "\u6BCF\u56DE\u5408\u635F\u5931\u76F8\u5F53\u4E8E\u81EA\u8EAB\u4F53\u683C\u7684\u751F\u547D\u503C", stabilise: "\u6025\u655110", treat: "\u7D27\u6025\u5904\u7406\u5373\u53EF\u6C38\u4E45\u79FB\u9664" },
        { roll: 12, name: "\u5F00\u653E\u6027\u8111\u635F\u4F24", effect: "\u88AB\u79FB\u9664\u524D\u83B7\u5F97\u4E00\u4E2A\u8D5B\u535A\u7CBE\u795E\u75C5\u300E\u957F\u671F\u75C7\u72B6\u300F\uFF1A\u667A\u529B\u548C\u610F\u5FD7-2\uFF08\u6700\u4F4E1\uFF09\u300230\u5206\u949F\u672A\u5904\u7406\u5373\u6B7B\u4EA1", stabilise: "\u5F3A\u531617", treat: "\u624B\u672F17" }
      ],
      source: "shark"
    },
    acpa: {
      dvTable: {
        bands: ["0-12m", "13-25m", "26-100m", "101-500m", "501m-1km", "1km-2km", "2km-4km"],
        rows: {
          "\u91CD\u673A\u67AA": [16, 14, 12, 16, 20, 25, null],
          "\u673A\u70AE": [18, 16, 12, 14, 18, 22, null],
          "\u901F\u5C04\u70AE": [20, 18, 14, 12, 13, 16, 20],
          "\u52A0\u519C\u70AE": [null, 22, 18, 13, 12, 14, 18],
          "\u65E0\u540E\u5EA7": [28, 18, 12, 14, 18, 22, 25],
          "\u706B\u7BAD": [null, 22, 18, 14, 18, 24, 30]
        }
      },
      mortar: { bands: ["0-100m", "101-300m", "301-500m", "501m-1km", "1km-2km", "2km-5km", "5km-10km"], rows: { "\u8FEB\u51FB": [null, 20, 18, 15, 13, 18, 24] } },
      damage: [
        { roll: "1-11", loc: "\u8EAF\u5E72", effect: "ACPA\u62A5\u5E9F\uFF1B\u9664\u975E\u82B13\u4E2A\u52A8\u4F5C\u8131\u4E0B\uFF0C\u5426\u5219\u8BE5\u88C5\u7532EV\u4E3A8" },
        { roll: "12-13", loc: "\u5DE6\u624B", effect: "\u624B\u81C2\u635F\u574F\uFF1A-2\u654F\u6377-2\u4F53\u683C-1\u53CD\u5E94\uFF0C\u91CD\u6B66\u5668\u9700\u90E8\u7F72\uFF0C\u624B\u90E8\u7CFB\u7EDF\u5931\u6548" },
        { roll: "14-15", loc: "\u53F3\u624B", effect: "\u540C\u5DE6\u624B" },
        { roll: "16-17", loc: "\u5DE6\u817F", effect: "\u817F\u90E8\u635F\u574F\uFF1A-2\u901F\u5EA6-2\u4F53\u683C\uFF0C\u4E0D\u80FD\u95EA\u907F\uFF0C\u817F\u90E8\u7CFB\u7EDF\u5931\u6548" },
        { roll: "18-19", loc: "\u53F3\u817F", effect: "\u540C\u5DE6\u817F" },
        { roll: "20", loc: "\u5934\u90E8", effect: "\u65E0\u53CD\u5E94\u52A0\u6210\uFF0C\u73B0\u5B9E\u4EA4\u4E92\u754C\u9762\u4E0E\u5934\u90E8\u7CFB\u7EDF\u5931\u6548" }
      ],
      source: "shark"
    }
  };

  // src/state.js
  var CHANNEL = "cpr-toolbox";
  var META_KEY = "cpr-toolbox";
  async function getInitData() {
    const meta = await lib_default.scene.getMetadata();
    return meta && meta[META_KEY] && meta[META_KEY].initiative || { round: 0, list: [] };
  }
  async function setInitData(init) {
    await lib_default.scene.setMetadata({ [META_KEY]: { ...(await lib_default.scene.getMetadata())[META_KEY], initiative: init } });
  }
  async function addInitEntry(entry) {
    const init = await getInitData();
    const list = init.list.filter((e) => e.tokenId !== entry.tokenId);
    list.push(entry);
    list.sort((a2, b2) => b2.total - a2.total);
    await setInitData({ round: init.round || 1, list });
    return list;
  }
  async function removeInitEntry(tokenId) {
    const init = await getInitData();
    await setInitData({ round: init.round || 1, list: init.list.filter((e) => e.tokenId !== tokenId) });
  }
  async function nextRound() {
    const init = await getInitData();
    const list = init.list.map((e) => ({ ...e, acted: false }));
    await setInitData({ round: (init.round || 0) + 1, list });
  }
  async function getTokenData(tokenId) {
    const items = await lib_default.scene.items.getItems([tokenId]);
    if (!items.length) return null;
    const m2 = items[0].metadata || {};
    return { tokenId, name: items[0].name, ...m2[META_KEY] || {} };
  }
  async function updateTokenData(tokenId, patch) {
    await lib_default.scene.items.updateItems([tokenId], (items) => {
      for (const item of items) {
        const meta = { ...item.metadata || {} };
        meta[META_KEY] = { ...meta[META_KEY] || {}, ...patch };
        item.metadata = meta;
      }
    });
  }
  async function broadcast(data) {
    await lib_default.broadcast.sendMessage(CHANNEL, data, { destination: "ROOM" });
  }
  function onBroadcast(handler) {
    lib_default.broadcast.onMessage(CHANNEL, (msg) => {
      handler(msg.data, msg.connectionId);
    });
  }
  async function listTokens() {
    const items = await lib_default.scene.items.getItems(
      (items2) => items2.filter((i2) => i2.layer === "CHARACTER" || i2.layer === "MOUNT" || i2.layer === "PROP")
    );
    return items.map((i2) => ({ id: i2.id, name: i2.name, layer: i2.layer }));
  }

  // src/money.js
  var NS = "cpr-money";
  function roomKey() {
    return location.search;
  }
  function moneyKey(playerId2, roomId) {
    return `${NS}:${playerId2 || "me"}:${roomId || roomKey()}`;
  }
  function loadLedger(playerId2, roomId) {
    try {
      const raw = localStorage.getItem(moneyKey(playerId2, roomId));
      if (raw) return JSON.parse(raw);
    } catch (e) {
    }
    return { balance: 0, entries: [], gmConsent: false };
  }
  function saveLedger(playerId2, roomId, ledger) {
    localStorage.setItem(moneyKey(playerId2, roomId), JSON.stringify(ledger));
  }
  function addEntry(playerId2, roomId, { label, amount }) {
    const ledger = loadLedger(playerId2, roomId);
    ledger.balance = Math.round((ledger.balance + amount) * 100) / 100;
    ledger.entries.unshift({ t: (/* @__PURE__ */ new Date()).toISOString(), label, amount });
    ledger.entries = ledger.entries.slice(0, 200);
    saveLedger(playerId2, roomId, ledger);
    return ledger;
  }
  function setBalance(playerId2, roomId, balance) {
    const ledger = loadLedger(playerId2, roomId);
    ledger.balance = Math.round(balance * 100) / 100;
    saveLedger(playerId2, roomId, ledger);
    return ledger;
  }
  function setGmConsent(playerId2, roomId, consent) {
    const ledger = loadLedger(playerId2, roomId);
    ledger.gmConsent = !!consent;
    saveLedger(playerId2, roomId, ledger);
    return ledger;
  }
  function exportLedgerText(ledger, name) {
    const lines = [`\u3010${name || "\u89D2\u8272"}\u3011\u8D44\u91D1\u6D41\u6C34\uFF08\u4EC5\u672C\u673A\u6570\u636E\u5BFC\u51FA\uFF09`, `\u4F59\u989D: ${ledger.balance} eb`, "---"];
    for (const e of ledger.entries) lines.push(`${e.t}  ${e.amount > 0 ? "+" : ""}${e.amount}  ${e.label}`);
    return lines.join("\n");
  }

  // src/importer.js
  var SHEETMAP = {
    info: { player: "C16", name: "C17", nickname: "C18", age: "C19", gender: "E19", homeland: "C20", level: "C21", reputation: "E21", family: "C22", note: "C47" },
    careers: { primary: ["C27", "E27"], secondary: [["C29", "E29"], ["C31", "E31"], ["C33", "E33"], ["C35", "E35"], ["C37", "E37"], ["C39", "E39"], ["C41", "E41"], ["C43", "E43"], ["C45", "E45"]] },
    attrs: { INT: "K4", REF: "K6", DEX: "K8", TECH: "K10", COOL: "K12", WILL: "K14", LUCK: "K16", MOV: "K18", BODY: "K20", EMP: "K22" },
    attrPoints: "K24",
    hpMax: "O30",
    hpNow: "K30",
    humanityNow: "K32",
    humanityMax: "O32",
    initiativeMod: "O24",
    deathSaveMod: "J53",
    skillSensory: { nameCol: "T", ptsCol: "W", adjCol: "V", rows: [5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 18, 19, 20, 21, 23, 25, 26, 27, 28, 29] },
    skillEdu: { nameCol: "Z", subCol: "AA", ptsCol: "AC", adjCol: "AB", rows: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 27, 28, 29] },
    skillCombat: { nameCol: "AF", subCol: "AG", ptsCol: "AI", adjCol: "AH", rows: [3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14] },
    skillSocial: { nameCol: "AF", subCol: "AG", ptsCol: "AI", adjCol: "AH", rows: [16, 17, 18, 19, 20, 21, 22, 23, 24] },
    skillTech: { nameCol: "AF", subCol: "AG", ptsCol: "AI", adjCol: "AH", rows: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
    money: { sponsor: "\u8D2D\u7269\u52A9\u624B!J53", starting: "\u8D2D\u7269\u52A9\u624B!J54", incomeCol: "M", expenseCol: "N", ledgerSheet: "\u5F80\u6765\u8BB0\u5F55", ledgerRows: [5, 60] }
  };
  function importCharacterJson(json) {
    const errors = [];
    const required = ["name", "attributes"];
    for (const k2 of required) if (!json || json[k2] === void 0) errors.push(`\u7F3A\u5C11\u5B57\u6BB5: ${k2}`);
    const c2 = json || {};
    return {
      errors,
      character: {
        name: c2.name || "\u65E0\u540D\u8005",
        nickname: c2.nickname || "",
        player: c2.player || "",
        age: c2.age || "",
        gender: c2.gender || "",
        homeland: c2.homeland || "",
        level: c2.level || 1,
        reputation: c2.reputation || 0,
        family: c2.family || "",
        note: c2.note || "",
        attributes: c2.attributes || {},
        attrPoints: c2.attrPoints ?? null,
        careers: c2.careers || [],
        skills: c2.skills || [],
        weapons: c2.weapons || [],
        armor: c2.armor || [],
        cyberware: c2.cyberware || [],
        money: c2.money?.starting ?? 0,
        initiativeMod: c2.initiativeMod ?? 0,
        deathSaveMod: c2.deathSaveMod ?? 0,
        source: "json"
      }
    };
  }
  function parseXlsx(data) {
    const errors = [], warnings = [];
    const wb = XLSX.read(data, { type: "array" });
    const sh = (name) => wb.Sheets[name];
    const g2 = (sheet, cell) => {
      const ws = sh(sheet);
      if (!ws) {
        return void 0;
      }
      const v2 = ws[cell];
      return v2 ? v2.v : void 0;
    };
    const num = (v2) => {
      const n2 = parseFloat(v2);
      return isNaN(n2) ? void 0 : n2;
    };
    if (!sh("\u4EBA\u7269\u5361")) {
      errors.push("\u627E\u4E0D\u5230\u300C\u4EBA\u7269\u5361\u300D\u5DE5\u4F5C\u8868\uFF0C\u4E0D\u662F\u9CA8\u9C7C\u5305\u5168\u81EA\u52A8\u5361\u6587\u4EF6");
      return { errors, warnings, character: null };
    }
    const info = {};
    for (const [k2, cell] of Object.entries(SHEETMAP.info)) info[k2] = g2("\u4EBA\u7269\u5361", cell) ?? "";
    const attributes = {};
    for (const [k2, cell] of Object.entries(SHEETMAP.attrs)) {
      const v2 = num(g2("\u4EBA\u7269\u5361", cell));
      if (v2 === void 0) warnings.push(`\u5C5E\u6027 ${k2}\uFF08${cell}\uFF09\u4E3A\u7A7A\uFF0C\u6309 0 \u5904\u7406`);
      attributes[k2] = v2 ?? 0;
    }
    const hpMax = num(g2("\u4EBA\u7269\u5361", SHEETMAP.hpMax));
    const hpNow = num(g2("\u4EBA\u7269\u5361", SHEETMAP.hpNow)) ?? hpMax;
    const humanityNow = num(g2("\u4EBA\u7269\u5361", SHEETMAP.humanityNow));
    const humanityMax = num(g2("\u4EBA\u7269\u5361", SHEETMAP.humanityMax));
    const skills = [];
    const readSkills = (spec, category) => {
      for (const r2 of spec.rows) {
        const name = g2("\u4EBA\u7269\u5361", `${spec.nameCol}${r2}`);
        if (!name || String(name).startsWith("[x2]") === false && !name) continue;
        const pts = num(g2("\u4EBA\u7269\u5361", `${spec.ptsCol}${r2}`)) ?? 0;
        const adj = num(g2("\u4EBA\u7269\u5361", `${spec.adjCol}${r2}`)) ?? 0;
        const sub = spec.subCol ? g2("\u4EBA\u7269\u5361", `${spec.subCol}${r2}`) || "" : "";
        const fullName = String(name) + (sub ? `(${sub})` : "");
        if (!String(name).trim()) continue;
        skills.push({ name: fullName.replace(/\[x2\]/, "").replace(/（|）/g, "("), category, points: pts, adjust: adj, halved: String(name).includes("[x2]") });
      }
    };
    readSkills(SHEETMAP.skillSensory, "\u611F\u5B98");
    readSkills(SHEETMAP.skillEdu, "\u6559\u80B2/\u77E5\u8BC6");
    readSkills(SHEETMAP.skillCombat, "\u6218\u6597");
    readSkills(SHEETMAP.skillSocial, "\u793E\u4EA4");
    readSkills(SHEETMAP.skillTech, "\u6280\u672F");
    const careers = [];
    const pName = g2("\u4EBA\u7269\u5361", SHEETMAP.careers.primary[0]), pLv = num(g2("\u4EBA\u7269\u5361", SHEETMAP.careers.primary[1]));
    if (pName) careers.push({ name: String(pName), level: pLv ?? 1, primary: true });
    for (const [nameCell, lvCell] of SHEETMAP.careers.secondary) {
      const n2 = g2("\u4EBA\u7269\u5361", nameCell);
      if (n2) careers.push({ name: String(n2), level: num(g2("\u4EBA\u7269\u5361", lvCell)) ?? 1, primary: false });
    }
    const weapons = [];
    for (const base of [5, 15, 25, 35]) {
      const name = g2("\u6B66\u5668\u5361", `C${base}`);
      if (!name) continue;
      weapons.push({
        name: String(name),
        reliability: g2("\u6B66\u5668\u5361", `D${base}`) || "",
        type: g2("\u6B66\u5668\u5361", `E${base}`) || "",
        rof: g2("\u6B66\u5668\u5361", `F${base}`) ?? 1,
        mag: g2("\u6B66\u5668\u5361", `G${base}`) || "",
        precision: num(g2("\u6B66\u5668\u5361", `H${base}`)) ?? 0,
        hands: g2("\u6B66\u5668\u5361", `I${base}`) === "\u53CC" ? 2 : 1,
        autofire: g2("\u6B66\u5668\u5361", `K${base}`) || "",
        damage: String(g2("\u6B66\u5668\u5361", `L${base}`) || "1d6"),
        ammoClass: g2("\u6B66\u5668\u5361", `M${base}`) || "\u624B\u67AA",
        hidden: g2("\u6B66\u5668\u5361", `N${base}`) === "\u662F"
      });
    }
    const armor = [];
    for (let r2 = 5; r2 <= 12; r2++) {
      const name = g2("\u9632\u5177\u5361", `D${r2}`);
      if (!name) continue;
      armor.push({
        slot: g2("\u9632\u5177\u5361", `C${r2}`) || "",
        name: String(name),
        rarity: g2("\u9632\u5177\u5361", `E${r2}`) || "",
        sp: num(g2("\u9632\u5177\u5361", `G${r2}`)) ?? 0,
        ev: num(g2("\u9632\u5177\u5361", `H${r2}`)) ?? 0
      });
    }
    const cyberware = [];
    for (let r2 = 7; r2 <= 55; r2++) {
      const name = g2("\u4E49\u4F53\u5361", `G${r2}`);
      if (!name) continue;
      cyberware.push({
        name: String(name),
        slot: g2("\u4E49\u4F53\u5361", `D${r2}`) || "",
        plug: g2("\u4E49\u4F53\u5361", `E${r2}`) || "",
        humanityLoss: num(g2("\u4E49\u4F53\u5361", `I${r2}`)) ?? 0,
        capLoss: num(g2("\u4E49\u4F53\u5361", `J${r2}`)) ?? 0
      });
    }
    let money = 0;
    const starting = num(g2("\u8D2D\u7269\u52A9\u624B", "J54"));
    const sponsor = num(g2("\u8D2D\u7269\u52A9\u624B", "J53"));
    if (starting !== void 0) money += starting;
    else warnings.push("\u8D2D\u7269\u52A9\u624B!J54\uFF08\u521D\u59CB\u8D44\u91D1\uFF09\u4E3A\u7A7A");
    if (sponsor !== void 0) money += sponsor;
    const ledgerWs = sh("\u5F80\u6765\u8BB0\u5F55");
    if (ledgerWs) {
      for (let r2 = 5; r2 <= 60; r2++) {
        const inc = num(ledgerWs[`M${r2}`]?.v), exp = num(ledgerWs[`N${r2}`]?.v);
        if (inc !== void 0) money += inc;
        if (exp !== void 0) money -= exp;
      }
    } else warnings.push("\u627E\u4E0D\u5230\u300C\u5F80\u6765\u8BB0\u5F55\u300D\u5DE5\u4F5C\u8868\uFF0C\u8DF3\u8FC7\u6536\u652F\u6C47\u603B");
    const character = {
      name: String(info.name || "\u65E0\u540D\u8005"),
      nickname: String(info.nickname || ""),
      player: String(info.player || ""),
      age: info.age ?? "",
      gender: info.gender ?? "",
      homeland: String(info.homeland || ""),
      level: num(info.level) ?? 1,
      reputation: num(info.reputation) ?? 0,
      family: String(info.family || ""),
      note: String(info.note || ""),
      attributes,
      attrPoints: num(g2("\u4EBA\u7269\u5361", SHEETMAP.attrPoints)),
      careers,
      skills,
      weapons,
      armor,
      cyberware,
      hp: { now: hpNow, max: hpMax },
      humanity: { now: humanityNow, max: humanityMax },
      money: Math.round(money * 100) / 100,
      initiativeMod: num(g2("\u4EBA\u7269\u5361", SHEETMAP.initiativeMod)) ?? 0,
      deathSaveMod: num(g2("\u4EBA\u7269\u5361", SHEETMAP.deathSaveMod)) ?? 0,
      source: "xlsx"
    };
    if (!character.name || character.name === "\u65E0\u540D\u8005") warnings.push("\u672A\u8BFB\u5230\u59D3\u540D\uFF08\u4EBA\u7269\u5361!C17\uFF09");
    return { errors, warnings, character };
  }

  // src/stateui.js
  async function renderStatePopover(root, itemId2) {
    lib_default.theme.getTheme().then((t2) => document.documentElement.dataset.theme = t2);
    lib_default.theme.onThemeChange((t2) => document.documentElement.dataset.theme = t2);
    let data = await getTokenData(itemId2);
    if (!data) {
      root.innerHTML = "<div class='panel'>\u672A\u627E\u5230\u8BE5\u4EE4\u724C\uFF08\u53EF\u80FD\u5DF2\u88AB\u5220\u9664\uFF09</div>";
      return;
    }
    function hpState(now, max) {
      if (!max) return "\u672A\u77E5";
      if (now <= 0) return "\u81F4\u547D\u4F24\uFF08\u52A8\u4F5C-4\uFF0C\u79FB\u901F-6\uFF0C\u6B7B\u4EA1\u8C41\u514D\u4E2D\uFF09";
      if (now < max / 2) return "\u91CD\u4F24\uFF08\u52A8\u4F5C-2\uFF09";
      if (now < max) return "\u8F7B\u4F24";
      return "\u5065\u5EB7";
    }
    async function render() {
      data = await getTokenData(itemId2) || data;
      const m2 = data;
      const hpNow = m2.hpNow ?? 0, hpMax = m2.hpMax ?? 0;
      const armor = m2.armor || {};
      const locs = [["head", "\u5934\u90E8"], ["body", "\u8EAF\u5E72"], ["rarm", "\u53F3\u81C2"], ["larm", "\u5DE6\u81C2"], ["rleg", "\u53F3\u817F"], ["lleg", "\u5DE6\u817F"]];
      root.innerHTML = `
      <h2>${m2.name || "\u672A\u547D\u540D\u4EE4\u724C"} <span class="muted">CPR \u72B6\u6001</span></h2>
      <div class="panel">
        <div class="row"><label>HP\u4E0A\u9650</label><input id="hpMax" type="number" value="${hpMax || ""}" style="width:80px" />
          <label>\u5F53\u524D</label><input id="hpNow" type="number" value="${hpNow || ""}" style="width:80px" />
          <button id="saveHp" class="small primary">\u4FDD\u5B58</button></div>
        <div class="hpbar"><div style="width:${hpMax ? Math.max(0, Math.min(100, hpNow / hpMax * 100)) : 0}%"></div></div>
        <div class="muted">\u72B6\u6001\uFF1A${hpState(hpNow, hpMax)}</div>
        <div class="row"><label>\u4F24\u52BF\u6548\u679C</label><span>${m2.injuries?.map((i2) => i2.name).join("\u3001") || "\u65E0"}</span></div>
        <div class="row">
          <button id="deathSave" class="small">\u63B7\u6B7B\u4EA1\u8C41\u514D</button>
          <label>\u8C41\u514D\u60E9\u7F5A</label><input id="dsMod" type="number" value="${m2.deathSaveMod ?? 0}" style="width:60px" />
        </div>
      </div>
      <div class="panel">
        <h3>\u9632\u5177 SP\uFF08\u524A\u7532\u540E\u81EA\u52A8\u4FDD\u5B58\uFF09</h3>
        <table><tr><th>\u90E8\u4F4D</th><th>SP</th><th>\u540D\u79F0</th><th>\u64CD\u4F5C</th></tr>
        ${locs.map(([k2, n2]) => {
        const a2 = armor[k2] || {};
        return `<tr><td>${n2}</td><td><input class="sp" data-loc="${k2}" type="number" value="${a2.sp ?? 0}" style="width:60px"/></td>
            <td><input class="spname" data-loc="${k2}" value="${a2.name || ""}" style="width:110px"/></td>
            <td><button class="small ablate" data-loc="${k2}">\u524A1</button></td></tr>`;
      }).join("")}
        </table>
        <div class="row"><button id="saveArmor" class="small primary">\u4FDD\u5B58\u9632\u5177</button>
          <label>\u5148\u653BREF</label><input id="ref" type="number" value="${m2.ref ?? ""}" style="width:60px"/>
          <label>\u5148\u653B\u8C03\u6574</label><input id="initMod" type="number" value="${m2.initMod ?? 0}" style="width:60px"/>
          <button id="rollInit" class="small">\u63B7\u5148\u653B</button></div>
      </div>
      <div class="panel">
        <h3>\u91CD\u521B/\u4E25\u91CD\u4F24\u52BF\u767B\u8BB0</h3>
        <div class="row"><input id="injName" placeholder="\u4F24\u52BF\u540D\u79F0\uFF0C\u5982 \u65AD\u81C2" style="flex:1"/><button id="addInj" class="small">\u6DFB\u52A0</button></div>
        ${(m2.injuries || []).map((i2, idx) => `<div class="row"><span class="chip">${i2.name}</span><span class="muted">${i2.effect || ""}</span><button class="small rminj" data-i="${idx}">\u79FB\u9664</button></div>`).join("") || "<div class='muted'>\u6682\u65E0</div>"}
      </div>
      <div class="muted">\u6570\u636E\u4FDD\u5B58\u5728\u4EE4\u724C metadata\uFF0C\u623F\u95F4\u5185\u6240\u6709\u73A9\u5BB6\u53EF\u89C1\u540C\u6B65\u3002</div>`;
      root.querySelector("#saveHp").onclick = async () => {
        const hpMax2 = parseFloat(root.querySelector("#hpMax").value) || 0;
        const hpNow2 = parseFloat(root.querySelector("#hpNow").value) || 0;
        await updateTokenData(itemId2, { hpMax: hpMax2, hpNow: hpNow2, wound: hpState(hpNow2, hpMax2) });
        await broadcast({ t: "status", who: m2.name, text: `HP \u66F4\u65B0\u4E3A ${hpNow2}/${hpMax2}\uFF08${hpState(hpNow2, hpMax2)}\uFF09` });
        render();
      };
      root.querySelector("#deathSave").onclick = async () => {
        const mod = parseFloat(root.querySelector("#dsMod").value) || 0;
        const r2 = skillRoll();
        const total = r2.total + mod;
        const died = total >= 10;
        await broadcast({ t: "roll", kind: "\u6B7B\u4EA1\u8C41\u514D", who: m2.name, total, detail: `1d10=${r2.log.join(" ")}${mod ? "+" + mod : ""}`, crit: r2.crit, fumble: r2.fumble });
        await broadcast({ t: "status", who: m2.name, text: died ? "\u{1F480} \u6B7B\u4EA1\u8C41\u514D\u5931\u8D25\uFF01" : "\u6B7B\u4EA1\u8C41\u514D\u901A\u8FC7" });
        alert(died ? "\u6B7B\u4EA1\u8C41\u514D\u5931\u8D25\uFF08\u226510\uFF09" : "\u6B7B\u4EA1\u8C41\u514D\u901A\u8FC7");
      };
      root.querySelector("#saveArmor").onclick = async () => {
        const armor2 = {};
        root.querySelectorAll(".sp").forEach((inp) => {
          const k2 = inp.dataset.loc;
          armor2[k2] = { sp: parseFloat(inp.value) || 0, name: root.querySelector(`.spname[data-loc="${k2}"]`).value };
        });
        await updateTokenData(itemId2, { armor: armor2 });
        render();
      };
      root.querySelectorAll(".ablate").forEach((btn) => btn.onclick = async () => {
        const k2 = btn.dataset.loc;
        const armor2 = { ...data.armor || {} };
        const a2 = { ...armor2[k2] || {} };
        a2.sp = (a2.sp || 0) - 1;
        armor2[k2] = a2;
        await updateTokenData(itemId2, { armor: armor2 });
        await broadcast({ t: "status", who: m2.name, text: `${k2} \u90E8\u4F4D\u62A4\u7532\u524A\u7532 -1\uFF08\u73B0SP ${a2.sp}\uFF09${a2.sp < 0 ? "\uFF0C\u62A4\u7532\u635F\u574F\uFF01" : ""}` });
        render();
      });
      root.querySelector("#rollInit").onclick = async () => {
        const ref = parseFloat(root.querySelector("#ref").value) || 0;
        const mod = parseFloat(root.querySelector("#initMod").value) || 0;
        const r2 = skillRoll();
        const total = r2.total + ref + mod;
        await updateTokenData(itemId2, { ref, initMod: mod });
        await broadcast({ t: "roll", kind: "\u5148\u653B", who: m2.name, total, detail: `1d10=${r2.log.join(" ")}+REF${ref}${mod ? "+" + mod : ""}`, crit: r2.crit, fumble: r2.fumble, initiative: { tokenId: itemId2, name: m2.name, total } });
        render();
      };
      root.querySelector("#addInj").onclick = async () => {
        const name = root.querySelector("#injName").value.trim();
        if (!name) return;
        const injuries = [...data.injuries || [], { name, effect: "" }];
        await updateTokenData(itemId2, { injuries });
        await broadcast({ t: "status", who: m2.name, text: `\u65B0\u589E\u4E25\u91CD\u4F24\u52BF\uFF1A${name}` });
        render();
      };
      root.querySelectorAll(".rminj").forEach((btn) => btn.onclick = async () => {
        const injuries = [...data.injuries || []];
        injuries.splice(parseInt(btn.dataset.i), 1);
        await updateTokenData(itemId2, { injuries });
        render();
      });
    }
    await render();
  }

  // src/app.js
  var state = { character: null, settings: { packs: ["cpr-core", "shark-pack"], threeColor: false, gmView: false, allowGmView: false }, feed: [] };
  registerRuleset(core_default);
  registerRuleset(shark_default);
  function ruleset() {
    return mergeRuleset(state.settings.packs);
  }
  function storeKey(suffix) {
    return `cpr-toolbox:${suffix}`;
  }
  async function playerId() {
    try {
      return await lib_default.player.getId();
    } catch {
      return "me";
    }
  }
  async function playerName() {
    try {
      return await lib_default.player.getName();
    } catch {
      return "\u73A9\u5BB6";
    }
  }
  async function loadSettings() {
    try {
      const s2 = await lib_default.room.getMetadata();
      Object.assign(state.settings, (s2["cpr-toolbox"] || {}).settings || {});
    } catch {
    }
  }
  async function saveSettings() {
    try {
      const s2 = await lib_default.room.getMetadata();
      await lib_default.room.setMetadata({ "cpr-toolbox": { ...s2["cpr-toolbox"] || {}, settings: state.settings } });
    } catch {
    }
  }
  function loadChar() {
    try {
      return JSON.parse(localStorage.getItem(storeKey("char")) || "null");
    } catch {
      return null;
    }
  }
  function saveChar() {
    localStorage.setItem(storeKey("char"), JSON.stringify(state.character));
  }
  function subscribeFeed() {
    onBroadcast(async (data, connId) => {
      if (data.t === "roll") {
        state.feed.unshift({ html: `<span class="who">${esc(data.who || "?")}</span> ${esc(data.kind || "")}\uFF1A<b>${data.total}</b> <span class="muted">${esc(data.detail || "")}</span>${data.crit ? '<span class="tag crit">\u91CD\u51FB</span>' : ""}${data.fumble ? '<span class="tag fumble">\u5931\u8BEF</span>' : ""}` });
        if (data.initiative) addInitEntry({ tokenId: data.initiative.tokenId, name: data.initiative.name, total: data.initiative.total, acted: false }).catch(() => {
        });
      } else if (data.t === "status") {
        state.feed.unshift({ html: `\u{1F4E2} <span class="who">${esc(data.who || "?")}</span> ${esc(data.text || "")}` });
      } else if (data.t === "hack-req") {
        const me = await playerId();
        if (data.targetId === me) handleHackRequest(data);
      } else if (data.t === "hack-res") {
        const me = await playerId();
        if (data.initiatorId === me) {
          state.feed.unshift({ html: `\u{1F513} <span class="who">\u9ED1\u5165\u67E5\u8D26</span> \u76EE\u6807 ${esc(data.targetName)}\uFF1A\u4F59\u989D <b>${data.balance} eb</b>\uFF08\u4EC5\u4F60\u53EF\u89C1\uFF09`, private: true });
        }
      } else if (data.t === "money-alert") {
        state.feed.unshift({ html: `\u26A0\uFE0F ${esc(data.text)}`, private: true });
      } else if (data.t === "gm-money") {
        const me = await playerId();
        if (state.settings.gmView) {
          state.feed.unshift({ html: `\u{1F441} <span class="who">GM\u67E5\u770B</span> ${esc(data.playerName)} \u4F59\u989D <b>${data.balance} eb</b>` });
        }
      }
      state.feed = state.feed.slice(0, 30);
      const feedEl = document.querySelector("#feed");
      if (feedEl) renderFeed(feedEl);
    });
  }
  async function handleHackRequest(data) {
    const mySkill = state.character ? skillBase("\u7535\u5B50/\u5B89\u5168\u6280\u672F") : 0;
    const def = skillRoll();
    const defTotal = def.total + Math.floor(mySkill / 2);
    const success = data.atkTotal > defTotal;
    if (!success) {
      await broadcast({ t: "money-alert", text: `\u26A0\uFE0F \u6709\u4EBA\u8BD5\u56FE\u9ED1\u5165\u4F60\u7684\u8D26\u6237\uFF01\uFF08\u5BF9\u6297 ${data.atkTotal} vs ${defTotal}\uFF0C\u672A\u6210\u529F\uFF09` });
    } else {
      const ledger = loadLedger(await playerId(), "");
      await broadcast({ t: "hack-res", initiatorId: data.initiatorId, targetName: await playerName(), balance: ledger.balance });
    }
    await broadcast({ t: "roll", kind: "\u5B89\u9632\u5BF9\u6297", who: await playerName(), total: defTotal, detail: `\u5BF9\u6297\u9ED1\u5165\uFF08\u5BF9\u65B9 ${data.atkTotal}\uFF09` });
  }
  function skillBase(name) {
    if (!state.character) return 0;
    const s2 = (state.character.skills || []).find((x2) => x2.name.includes(name));
    if (!s2) return 0;
    const base = s2.halved ? Math.floor(s2.points / 2) : s2.points;
    return base + (s2.adjust || 0);
  }
  function esc(s2) {
    return String(s2 ?? "").replace(/[&<>"]/g, (c2) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c2]);
  }
  function renderFeed(el) {
    el.innerHTML = state.feed.map((m2) => `<div class="msg${m2.private ? "" : ""}">${m2.html}</div>`).join("") || "<div class='muted'>\u6682\u65E0\u63B7\u9AB0\u8BB0\u5F55\uFF08\u63B7\u9AB0\u5C06\u5E7F\u64AD\u7ED9\u5168\u623F\u95F4\uFF09</div>";
  }
  async function main() {
    await lib_default.onReady();
    const theme = await lib_default.theme.getTheme();
    document.documentElement.dataset.theme = theme;
    lib_default.theme.onThemeChange((t2) => document.documentElement.dataset.theme = t2);
    await loadSettings();
    state.character = loadChar();
    subscribeFeed();
    const root = document.getElementById("app");
    root.innerHTML = `
    <div class="tabs" id="tabs"></div>
    <div id="tabBody"></div>
    <div class="panel" style="margin-top:8px"><h3>\u623F\u95F4\u52A8\u6001</h3><div class="feed" id="feed"></div></div>`;
    renderFeed(root.querySelector("#feed"));
    const tabs = [
      ["dice", "\u9AB0\u76D8", renderDice],
      ["combat", "\u6218\u6597", renderCombat],
      ["init", "\u5148\u653B", renderInit],
      ["token", "\u72B6\u6001", renderTokens],
      ["money", "\u91D1\u94B1", renderMoney],
      ["import", "\u5BFC\u5165", renderImport],
      ["quick", "\u901F\u67E5", renderQuick],
      ["settings", "\u8BBE\u7F6E", renderSettings]
    ];
    const tabParam = params.get("tab");
    const onlyList = (params.get("only") || "").split(",").filter(Boolean);
    const visible = onlyList.length ? tabs.filter((t2) => onlyList.includes(t2[0])) : tabs;
    let active = visible.some((t2) => t2[0] === tabParam) ? tabParam : visible[0][0];
    const tabsEl = root.querySelector("#tabs");
    const body = root.querySelector("#tabBody");
    function renderTabs() {
      tabsEl.innerHTML = "";
      for (const [id, label] of visible) {
        if (visible.length <= 1) {
          tabsEl.style.display = "none";
          break;
        }
        const b2 = document.createElement("button");
        b2.textContent = label;
        b2.className = id === active ? "active" : "";
        b2.onclick = () => {
          active = id;
          renderTabs();
          renderTab();
        };
        tabsEl.appendChild(b2);
      }
    }
    function renderTab() {
      const fn2 = visible.find((t2) => t2[0] === active)[2];
      body.innerHTML = "";
      fn2(body);
    }
    renderTabs();
    renderTab();
    setInterval(renderTab, 15e3);
  }
  function renderDice(root) {
    const rs = ruleset();
    const common = [
      ["\u5C04\u51FB\uFF08REF+\u6280\u80FD\uFF09", "REF"],
      ["\u95EA\u907F\uFF08DEX+\u95EA\u907F\uFF09", "DEX:\u95EA\u907F"],
      ["\u5BDF\u89C9\uFF08INT\uFF09", "INT:\u5BDF\u89C9"],
      ["\u8FD0\u52A8\uFF08DEX\uFF09", "DEX:\u8FD0\u52A8"],
      ["\u5FCD\u8010\uFF08WILL\uFF09", "WILL:\u5FCD\u8010"],
      ["\u6025\u6551\uFF08TECH\uFF09", "TECH:\u6025\u6551"],
      ["\u8BF4\u670D\uFF08COOL\uFF09", "COOL:\u8BF4\u670D"],
      ["\u7535\u5B50/\u5B89\u9632\uFF08TECH\uFF09", "TECH:\u7535\u5B50/\u5B89\u5168\u6280\u672F"],
      ["\u63A5\u53E3\uFF08INT\uFF09", "INT:\u63A5\u53E3"]
    ];
    root.innerHTML = `
    <div class="panel">
      <h3>\u5FEB\u901F\u68C0\u5B9A</h3>
      <div class="row">${common.map((c2, i2) => `<span class="chip" data-i="${i2}">${c2[0]}</span>`).join("")}</div>
      <div class="row"><label>\u4FEE\u9970</label><input id="mod" type="number" value="0" style="width:70px" /><label>DV</label><input id="dv" type="number" placeholder="\u65E0" style="width:70px" /></div>
    </div>
    <div class="panel">
      <h3>\u81EA\u5B9A\u4E49\u63B7\u9AB0</h3>
      <div class="row"><input id="expr" placeholder="\u5982 3d6+2 \u6216 1d10" style="flex:1"/><button id="rollExprBtn" class="primary">\u63B7\u9AB0</button></div>
    </div>
    <div class="panel">
      <h3>\u68C0\u5B9A\u516C\u5F0F</h3>
      <div class="muted">\u6280\u80FD\u68C0\u5B9A = 1d10 + \u5C5E\u6027 + \u6280\u80FD\u52A0\u70B9 + \u8C03\u6574 + \u4FEE\u9970\u3002\u81EA\u713610\u518D\u63B7\u52A0\u7B97\uFF08\u91CD\u51FB\uFF09\uFF0C\u81EA\u71361\u518D\u63B7\u51CF\u7B97\uFF08\u5931\u8BEF\uFF09\u3002${rs.enabledPacks?.map((p2) => esc(p2.name)).join(" + ") || ""}</div>
    </div>`;
    const rollCheck = async (label, spec) => {
      const mod = parseFloat(root.querySelector("#mod").value) || 0;
      const dv = root.querySelector("#dv").value ? parseFloat(root.querySelector("#dv").value) : null;
      let total = 0, detail = [];
      const r2 = skillRoll();
      total = r2.total;
      detail.push(`1d10=${r2.log.join(" ")}`);
      const [attrId, skillName] = spec.split(":");
      const attrs = state.character?.attributes || {};
      const attrVal = attrs[attrId] ?? 0;
      total += attrVal;
      detail.push(`${attrId}=${attrVal}`);
      if (skillName) {
        const sv = skillBase(skillName);
        total += sv;
        detail.push(`${skillName}=${sv}`);
      }
      total += mod;
      if (mod) detail.push(`\u4FEE\u9970${mod}`);
      const pass = dv != null ? total >= dv ? "\u2714 \u8FBE\u6807" : "\u2718 \u672A\u8FBE\u6807" : "";
      await broadcast({ t: "roll", kind: label, who: await playerName(), total, detail: detail.join(" ") + (dv != null ? ` vs DV${dv} ${pass}` : ""), crit: r2.crit, fumble: r2.fumble });
    };
    root.querySelectorAll(".chip").forEach((chip) => chip.onclick = () => rollCheck(common[chip.dataset.i][0], common[chip.dataset.i][1]));
    root.querySelector("#rollExprBtn").onclick = async () => {
      const expr = root.querySelector("#expr").value.trim();
      if (!expr) return;
      const r2 = rollExpr(expr);
      await broadcast({ t: "roll", kind: `\u63B7\u9AB0 ${expr}`, who: await playerName(), total: r2.total, detail: `\u660E\u7EC6 ${r2.rolls.join(",")}${r2.bonus ? "+" + r2.bonus : ""}` });
    };
  }
  function renderCombat(root) {
    const rs = ruleset();
    const char = state.character;
    const weapons = [...char?.weapons || [], ...rs.weapons.map((w2) => ({ name: w2.name, damage: w2.damage, ammoClass: w2.ammoClass, skill: w2.skill, skillAuto: w2.skillAuto, autoShots: w2.autoShots, catalog: true, rof: w2.rof }))];
    root.innerHTML = `
    <div class="panel">
      <h3>\u6B66\u5668</h3>
      <select id="weapon">${weapons.map((w2, i2) => `<option value="${i2}">${esc(w2.name)}\uFF08${esc(w2.damage)}\xB7${esc(w2.ammoClass || "?")}\uFF09</option>`).join("")}</select>
      <div class="grid3">
        <div class="row"><label>\u8DDD\u79BBm</label><input id="dist" type="number" value="10" style="width:70px"/></div>
        <div class="row"><label>\u76EE\u6807\u90E8\u4F4D</label><select id="aimLoc"><option value="">\u968F\u673A</option>${(rs.aimLocations || []).map((a2) => `<option value="${a2.loc}">${esc(a2.name)} ${a2.mod}</option>`).join("")}</select></div>
        <div class="row"><label>\u5F39\u836F</label><select id="ammo"><option value="">\u57FA\u7840</option>${(rs.ammo || []).filter((a2) => a2.id !== "basic").map((a2) => `<option value="${a2.id}">${esc(a2.name)}</option>`).join("")}</select></div>
      </div>
      <div class="row">
        <span class="chip" id="aimQuick">\u5FEB\u901F\u7784\u51C6+1</span>
        <span class="chip" id="aimFull">\u7CBE\u786E\u7784\u51C6+3</span>
        <span class="chip" id="auto">\u5168\u81EA\u52A8</span>
        <span class="chip" id="supp">\u706B\u529B\u538B\u5236</span>
        <span class="chip" id="custom">\u81EA\u5B9A\u4E49\u4FEE\u9970</span>
        <input id="mod" type="number" value="0" style="width:60px" placeholder="\u4FEE\u9970"/>
      </div>
      <div class="row" id="autoRow" style="display:none"><label>\u5F39\u6570</label><input id="shots" type="number" value="3" min="1" max="10" style="width:60px"/></div>
      <div class="row"><label>\u76EE\u6807SP</label><input id="sp" type="number" placeholder="\u9009\u4E2D\u4EE4\u724C\u81EA\u52A8\u8BFB\u53D6" style="width:110px"/><button id="readToken" class="small">\u8BFB\u53D6\u9009\u4E2D\u4EE4\u724C</button></div>
      <div class="row"><button id="attack" class="primary">\u5F00\u706B / \u653B\u51FB</button><button id="dmgOnly" class="small">\u4EC5\u63B7\u4F24\u5BB3</button></div>
    </div>
    <div id="combatResult"></div>
    ${state.settings.threeColor ? `<div id="tcPanel"></div>` : ""}
    <div class="panel"><h3>\u91CD\u521B\u8868\u67E5\u8BE2</h3>
      <div class="row"><select id="injTable"><option value="torso">\u8EAF\u5E72\u4E25\u91CD\u4F24\u52BF\u8868</option><option value="head">\u5934\u90E8\u4E25\u91CD\u4F24\u52BF\u8868</option></select><button id="rollInj" class="small">\u63B7 d10</button></div>
      <div id="injResult" class="muted"></div>
    </div>`;
    const chips = {};
    ["aimQuick", "aimFull", "auto", "supp", "custom"].forEach((id) => chips[id] = false);
    root.querySelectorAll(".chip").forEach((chip) => {
      if (chips[chip.id] === void 0) return;
      chip.onclick = () => {
        chips[chip.id] = !chips[chip.id];
        chip.classList.toggle("on");
        root.querySelector("#autoRow").style.display = chips.auto ? "flex" : "none";
      };
    });
    root.querySelector("#readToken").onclick = async () => {
      const sel = await lib_default.scene.getSelectedItems().catch(() => null);
      const items = sel && sel.length ? sel : [];
      if (!items.length) {
        alert("\u8BF7\u5148\u5728\u753B\u5E03\u4E2D\u9009\u4E2D\u4E00\u4E2A\u4EE4\u724C");
        return;
      }
      const d2 = await getTokenData(items[0].id);
      const loc = root.querySelector("#aimLoc").value || "body";
      const sp = d2?.armor?.[loc]?.sp ?? d2?.armor?.body?.sp ?? 0;
      root.querySelector("#sp").value = sp;
      root.dataset.targetId = items[0].id;
      root.dataset.targetName = items[0].name || "";
    };
    root.querySelector("#attack").onclick = async () => doAttack(root, rs, weapons, chips);
    root.querySelector("#dmgOnly").onclick = async () => {
      const w2 = weapons[parseInt(root.querySelector("#weapon").value)];
      const r2 = rollDamage(w2.damage);
      await broadcast({ t: "roll", kind: `\u4F24\u5BB3 ${w2.name}`, who: await playerName(), total: r2.total, detail: `\u660E\u7EC6 ${r2.rolls.join(",")}` });
      root.querySelector("#combatResult").innerHTML = `<div class="result-box">\u4F24\u5BB3\uFF1A${r2.total}\uFF08${r2.rolls.join(", ")}\uFF09</div>`;
    };
    root.querySelector("#rollInj").onclick = async () => {
      const table = root.querySelector("#injTable").value === "head" ? rs.seriousInjuries?.head || [] : rs.seriousInjuries?.torso || [];
      const roll = rollExpr("1d10").total;
      const row = table.find((e) => {
        const [a2, b2] = String(e.roll).split("-").map(Number);
        return roll >= (a2 || 12) && roll <= (b2 || 12);
      }) || table[0];
      const injEl = root.querySelector("#injResult");
      injEl.innerHTML = row ? `<div class="result-box">d10=${roll} \u2192 <b>${esc(row.name)}</b>
${esc(row.effect)}
\u7D27\u6025\u5904\u7406\uFF1A${esc(row.stabilise)}\uFF5C\u533B\u6CBB\uFF1A${esc(row.treat)} <span class="src">shark</span></div>` : `d10=${roll}\uFF1A\u65E0\u5BF9\u5E94\u6761\u76EE`;
      if (row) broadcast({ t: "roll", kind: "\u4E25\u91CD\u4F24\u52BF", who: await playerName(), total: roll, detail: `${row.name}\uFF1A${row.effect}` });
    };
    if (state.settings.threeColor && rs.threeColor) renderThreeColor(root.querySelector("#tcPanel"), rs.threeColor);
  }
  function renderThreeColor(el, tc) {
    const key = storeKey("three-color");
    let tcState = { blue: 1, green: 0, red: 0 };
    try {
      tcState = { ...tcState, ...JSON.parse(localStorage.getItem(key) || "{}") };
    } catch {
    }
    function save() {
      localStorage.setItem(key, JSON.stringify(tcState));
    }
    function draw() {
      el.innerHTML = `
      <div class="panel">
        <h3>\u4E09\u8272\u53CD\u5E94 <span class="muted">${esc(tc.consumptionOrder)}</span></h3>
        <div class="row">
          <span class="chip">\u84DD\u53CD ${tcState.blue}</span><button class="small" data-k="blue" data-d="1">+1</button><button class="small" data-k="blue" data-d="-1">-1</button>
          <span class="chip">\u7EFF\u53CD ${tcState.green}</span><button class="small" data-k="green" data-d="1">+1</button><button class="small" data-k="green" data-d="-1">-1</button>
          <span class="chip">\u7EA2\u53CD ${tcState.red}</span><button class="small" data-k="red" data-d="1">+1</button><button class="small" data-k="red" data-d="-1">-1</button>
          <button class="small" id="tcRound">\u65B0\u56DE\u5408\uFF08\u84DD\u53CD\u6062\u590D\u81F3${tc.caps.blueRegen}\uFF09</button>
        </div>
        <div class="muted">\u4E0A\u9650\uFF1A\u5E38\u89C4\u53CD\u5E94\u603B\u4E0A\u9650 ${tc.caps.total}\uFF08\u5F3A\u5316\u540E ${tc.caps.totalMax}\uFF09\uFF5C\u7EA2\u53CD\u786C\u4E0A\u9650 ${tc.caps.redHardCap}\uFF5C\u95EA\u907F\u673A\u52A8\uFF1A\u56DE\u5408\u82B11\u666E\u901A\u52A8\u4F5C\u6062\u590D1\u84DD\u53CD</div>
        <div style="margin-top:6px">${tc.reactionActions.map((a2) => `<div class="row" style="align-items:flex-start"><div style="flex:1"><b>${esc(a2.name)}</b>\uFF08${esc(a2.cost)}\uFF09<div class="muted">${esc(a2.trigger)}\uFF5C${esc(a2.note)}</div></div></div>`).join("")}</div>
        <div class="muted">src: ext\uFF08\u4E09\u8272\u53CD\u5E94\u52A8\u4F5C\u4F53\u7CFB v0.7\uFF0C\u975E\u5B98\u65B9\u81EA\u5236\u89C4\u5219\uFF09</div>
      </div>`;
      el.querySelectorAll("[data-k]").forEach((b2) => b2.onclick = () => {
        const k2 = b2.dataset.k, d2 = parseInt(b2.dataset.d);
        tcState[k2] = Math.max(0, (tcState[k2] || 0) + d2);
        save();
        draw();
      });
      el.querySelector("#tcRound").onclick = () => {
        tcState.blue = tc.caps.blueRegen;
        save();
        draw();
      };
    }
    draw();
  }
  async function doAttack(root, rs, weapons, chips) {
    const w2 = weapons[parseInt(root.querySelector("#weapon").value)];
    const dist = parseFloat(root.querySelector("#dist").value) || 0;
    const aimLoc = root.querySelector("#aimLoc").value;
    const ammoId = root.querySelector("#ammo").value;
    const mod = parseFloat(root.querySelector("#mod").value) || 0;
    const spInput = root.querySelector("#sp").value;
    const out = [];
    const who = await playerName();
    let dvInfo = null, dv = 0;
    if (chips.supp) {
      dv = rs.suppressive?.dv ?? 15;
      dvInfo = { band: "\u706B\u529B\u538B\u5236" };
    } else {
      const type = rs.rangedDV?.table[w2.name] ? w2.name : rs.rangedDV?.table[w2.type] ? w2.type : guessDvKey(rs, w2);
      dvInfo = dvFor(rs, type || w2.name || w2.type, dist, chips.auto);
      dv = dvInfo?.dv ?? 15;
    }
    let mods = [];
    let atkAttr = 0, atkSkill = 0, atkSkillName = "";
    const attrs = state.character?.attributes || {};
    const isMelee = !!w2.melee || /近战|搏击/.test(w2.skill || "");
    atkAttr = attrs[isMelee ? "DEX" : "REF"] ?? 0;
    if (state.character) {
      atkSkillName = chips.auto && w2.skillAuto ? w2.skillAuto : w2.skill || "";
      atkSkill = skillBase(atkSkillName);
    }
    let modTotal = mod;
    if (chips.aimQuick) {
      modTotal += 1;
      mods.push("\u5FEB\u901F\u7784\u51C6+1");
    }
    if (chips.aimFull) {
      modTotal += 3;
      mods.push("\u7CBE\u786E\u7784\u51C6+3");
    }
    if (aimLoc) {
      const loc = (rs.aimLocations || []).find((a2) => a2.loc === aimLoc);
      if (loc) {
        modTotal += loc.mod;
        mods.push(`\u90E8\u4F4D${loc.name}${loc.mod}`);
      }
    }
    if (chips.auto) {
      const shots2 = Math.max(1, parseInt(root.querySelector("#shots").value) || 1);
      modTotal += (shots2 - 1) * (rs.autofire?.shotsBonusPerShot ?? 2);
      mods.push(`\u5168\u81EA\u52A8${shots2}\u53D1`);
      w2.__shots = shots2;
    }
    const r2 = skillRoll();
    const atkTotal = r2.total + atkAttr + atkSkill + modTotal;
    const hit = atkTotal >= dv;
    out.push(`\u3010\u653B\u51FB\u30111d10=${r2.log.join(" ")} + ${isMelee ? "DEX" : "REF"}${atkAttr}${atkSkillName ? ` + ${atkSkillName}${atkSkill}` : ""}${mods.length ? " + " + mods.join("+") : ""} = ${atkTotal} vs DV${dv}\uFF08${dvInfo?.band || "?"}\uFF09`);
    out.push(hit ? r2.fumble ? "\u26A1 \u81EA\u71361\u5931\u8BEF\uFF01" : "\u2714 \u547D\u4E2D" : "\u2718 \u672A\u547D\u4E2D\uFF08\u4E0D\u80FD\u9020\u6210\u4F24\u5BB3\uFF0C\u4F46\u4ECD\u53EF\u80FD\u524A\u75321\u70B9\u2014\u2014\u5B98\u65B9\u89C4\u5219\uFF1A\u672A\u547D\u4E2D\u4E5F\u524A\u7532\uFF1F\u5426\uFF0C\u672A\u547D\u4E2D\u4E0D\u524A\u7532\uFF09");
    if (!hit) {
      await broadcast({ t: "roll", kind: `\u653B\u51FB ${w2.name}`, who, total: atkTotal, detail: `vs DV${dv} \u672A\u547D\u4E2D`, crit: r2.crit, fumble: r2.fumble });
      root.querySelector("#combatResult").innerHTML = `<div class="result-box">${out.join("\n")}</div>`;
      return;
    }
    await broadcast({ t: "roll", kind: `\u653B\u51FB ${w2.name}`, who, total: atkTotal, detail: `vs DV${dv} \u547D\u4E2D`, crit: r2.crit, fumble: r2.fumble });
    let locName = "\u8EAF\u5E72", locKey = "body";
    if (aimLoc) {
      const loc = (rs.aimLocations || []).find((a2) => a2.loc === aimLoc);
      if (loc) {
        locName = loc.name;
        locKey = loc.loc === "head" ? "head" : loc.loc;
      }
    } else {
      const roll = rollExpr("1d10").total;
      const loc = hitLocation(rs, roll);
      if (loc) {
        locName = loc.name;
        locKey = loc.loc === "head" ? "head" : loc.loc.includes("arm") ? "arm" : loc.loc.includes("leg") ? "leg" : loc.loc;
      }
      out.push(`\u3010\u90E8\u4F4D\u3011d10=${roll} \u2192 ${locName}`);
    }
    if (aimLoc) out.push(`\u3010\u90E8\u4F4D\u3011\u7CBE\u786E\u7784\u51C6 \u2192 ${locName}`);
    const sp = spInput ? parseFloat(spInput) : 0;
    const ammo = (rs.ammo || []).find((a2) => a2.id === ammoId);
    const ammoClass = ammo?.ammoClass || w2.ammoClass || "\u624B\u67AA";
    const pen = damageFactor(rs, ammoClass, sp);
    const bodyB = bodyMod(rs, attrs.BODY ?? 0);
    const shots = chips.auto ? w2.__shots || 1 : 1;
    const hitsCount = chips.auto ? Math.min(shots, Math.max(1, Math.floor((atkTotal - dv) / 2))) : 1;
    const results = [];
    let anyDmg = 0;
    for (let i2 = 0; i2 < Math.min(hitsCount, 4); i2++) {
      let dr = rollDamage(w2.damage);
      let meleeBonus = isMelee ? bodyB.melee || 0 : 0;
      let raw = dr.total + meleeBonus;
      let final = 0;
      if (pen.level === "\u5168\u7A7F") final = raw;
      else if (pen.level === "\u534A\u7A7F") final = Math.floor(raw * 0.5);
      else if (pen.level === "\u5FAE\u7A7F") final = 1;
      results.push(`\u4F24\u5BB3\u9AB0${dr.rolls.join(",")}${meleeBonus ? "+" + meleeBonus + "(\u4F53\u683C)" : ""} = ${raw} \u2192 ${pen.level} \u2192 ${final}`);
      anyDmg += final;
    }
    if (hitsCount > 4) out.push(`\uFF08\u5168\u81EA\u52A8\u547D\u4E2D ${hitsCount} \u53D1\uFF0C\u4EC5\u5C55\u793A\u524D4\u53D1\u660E\u7EC6\uFF0C\u7D2F\u8BA1\u4F24\u5B9E\u73B0\u7531 GM \u6309\u540C\u8868\u7ED3\u7B97\uFF09`);
    const ablate = (rs.ablation?.base ?? 1) + (ammoId === "ap" ? 1 : 0);
    out.push(`\u3010\u9632\u5177\u3011${locName} SP=${sp}\uFF08${armorTier(rs, sp) || "\u65E0\u7532"}\uFF09\xD7 \u5F39\u836F\u300C${ammoClass}\u300D= ${pen.level}`);
    out.push(results.join("\n"));
    out.push(`\u5408\u8BA1\u9020\u6210 ${anyDmg} \u70B9\u4F24\u5BB3${anyDmg > 0 ? `\uFF1B${locName}\u62A4\u7532\u524A\u7532 -${ablate}\uFF08\u65B0SP ${sp - ablate}${sp - ablate < 0 ? "\uFF0C\u62A4\u7532\u635F\u574F" : ""}\uFF09` : "\uFF1B\u62A4\u7532\u672A\u88AB\u7A7F\u900F"}`);
    const targetId = root.dataset.targetId;
    if (targetId) {
      const td = await getTokenData(targetId);
      if (td) {
        const apply = window.confirm(`\u5C06 ${anyDmg} \u70B9\u4F24\u5BB3\u4E0E\u524A\u7532\u5E94\u7528\u5230\u300C${td.name}\u300D\uFF1F\uFF08\u786E\u5B9A=\u5E94\u7528\uFF09`);
        if (apply) {
          const hpNow = Math.max(0, (td.hpNow ?? 0) - anyDmg);
          const armor = { ...td.armor || {} };
          const a2 = { ...armor[locKey] || {} };
          if (anyDmg > 0) a2.sp = (a2.sp ?? 0) - ablate;
          armor[locKey] = a2;
          const patch = { hpNow, armor, wound: hpNow <= 0 ? "\u81F4\u547D\u4F24" : hpNow < (td.hpMax || 1) / 2 ? "\u91CD\u4F24" : "\u8F7B\u4F24" };
          if (hpNow <= 0 && !(td.injuries || []).some((i2) => i2.hpZero)) {
            const table = locKey === "head" ? rs.seriousInjuries?.head || [] : rs.seriousInjuries?.torso || [];
            const roll = rollExpr("1d10").total;
            const inj = table.find((e) => {
              const [x2, y2] = String(e.roll).split("-").map(Number);
              return roll >= (x2 || 12) && roll <= (y2 || 12);
            });
            if (inj) {
              patch.injuries = [...td.injuries || [], { name: inj.name, effect: inj.effect, hpZero: true }];
              out.push(`
\u{1F480} HP\u5F52\u96F6 \u2192 \u91CD\u521B\u8868 d10=${roll}\uFF1A${inj.name}\uFF08${inj.effect}\uFF09`);
            }
          }
          await updateTokenData(targetId, patch);
          await broadcast({ t: "status", who: td.name, text: `\u53D7\u51FB\uFF1A-${anyDmg} HP\uFF08${hpNow}/${td.hpMax ?? "?"}\uFF09` });
        }
      }
    } else {
      out.push("\n\uFF08\u672A\u9009\u4E2D\u4EE4\u724C\uFF1A\u5982\u9700\u81EA\u52A8\u6263\u8840/\u524A\u7532\uFF0C\u8BF7\u5148\u5728\u753B\u5E03\u9009\u4E2D\u76EE\u6807\u4EE4\u724C\u5E76\u70B9\u300C\u8BFB\u53D6\u9009\u4E2D\u4EE4\u724C\u300D\uFF09");
    }
    root.querySelector("#combatResult").innerHTML = `<div class="result-box">${out.join("\n")}</div>`;
  }
  function guessDvKey(rs, w2) {
    const map = { "\u4E2D\u578B\u624B\u67AA": "\u624B\u67AA", "\u91CD\u578B\u624B\u67AA": "\u624B\u67AA", "\u8D85\u91CD\u578B\u624B\u67AA": "\u624B\u67AA", "\u51B2\u950B\u67AA": "\u51B2\u950B\u67AA", "\u91CD\u578B\u51B2\u950B\u67AA": "\u51B2\u950B\u67AA", "\u9730\u5F39\u67AA": "\u9730\u5F39\uFF08\u72EC\uFF09", "\u7A81\u51FB\u6B65\u67AA": "\u7A81\u51FB\u6B65\u67AA", "\u72D9\u51FB\u6B65\u67AA": "\u72D9\u51FB\u6B65\u67AA", "\u5F13&\u5341\u5B57\u5F29": "\u5F13\u5F29", "\u5F13\u672F": "\u5F13\u5F29", "\u69B4\u5F39\u53D1\u5C04\u5668": "\u69B4\u5F39", "\u706B\u7BAD\u7B52": "\u706B\u7BAD" };
    return map[w2.name] || map[w2.type] || w2.name;
  }
  async function renderInit(root) {
    const init = await getInitData();
    root.innerHTML = `
    <div class="panel">
      <h3>\u5148\u653B\u9762\u677F <span class="muted">\u8F6E\u6B21 ${init.round || 0}</span></h3>
      <div class="row"><button id="rollMine" class="primary">\u6211\u7684\u4EE4\u724C\u63B7\u5148\u653B</button><button id="next" class="small">\u4E0B\u4E00\u8F6E</button><button id="clear" class="small">\u6E05\u7A7A</button></div>
      <table><tr><th>\u5148\u653B</th><th>\u4EE4\u724C</th><th>\u72B6\u6001</th><th></th></tr>
      ${(init.list || []).map((e) => `<tr><td><b>${e.total}</b></td><td>${esc(e.name)}</td><td>${e.acted ? "\u5DF2\u884C\u52A8" : "\u5F85\u884C\u52A8"}</td>
        <td><button class="small act" data-id="${e.tokenId}">${e.acted ? "\u91CD\u7F6E" : "\u5B8C\u6210"}</button>
        <button class="small rm" data-id="${e.tokenId}">\u79FB\u9664</button></td></tr>`).join("") || "<tr><td colspan='4' class='muted'>\u6682\u65E0\u6761\u76EE\uFF1A\u7528\u4EE4\u724C\u53F3\u952E\u300CCPR\u5148\u653B\u300D\u6216\u5728\u4E0B\u65B9\u4EE4\u724C\u5217\u8868\u63B7\u5148\u653B</td></tr>"}
      </table>
    </div>
    <div class="panel">
      <h3>\u753B\u5E03\u4EE4\u724C</h3>
      <div id="tokens">${(await listTokens()).map((t2) => `<div class="row"><span style="flex:1">${esc(t2.name || t2.id.slice(0, 8))}</span><button class="small tinit" data-id="${t2.id}">\u63B7\u5148\u653B</button><button class="small tstate" data-id="${t2.id}">\u72B6\u6001</button></div>`).join("") || "<div class='muted'>\u753B\u5E03\u4E0A\u6CA1\u6709\u4EE4\u724C</div>"}</div>
    </div>`;
    root.querySelector("#next").onclick = async () => {
      await nextRound();
      renderInit(root);
    };
    root.querySelector("#clear").onclick = async () => {
      await setInitData({ round: 0, list: [] });
      renderInit(root);
    };
    root.querySelector("#rollMine").onclick = async () => {
      const sel = await lib_default.scene.getSelectedItems().catch(() => []);
      if (sel && sel.length) {
        await rollInitForToken(sel[0]);
        renderInit(root);
        return;
      }
      const r2 = skillRoll();
      const ref = state.character?.attributes?.REF ?? 0;
      const mod = state.character?.initiativeMod ?? 0;
      const total = r2.total + ref + mod;
      await broadcast({ t: "roll", kind: "\u5148\u653B", who: await playerName(), total, detail: `1d10=${r2.log.join(" ")}+REF${ref}${mod ? "+" + mod : ""}\uFF08\u672A\u6302\u63A5\u4EE4\u724C\uFF09`, initiative: { tokenId: "player:" + await playerId(), name: await playerName(), total } });
      renderInit(root);
    };
    root.querySelectorAll(".rm").forEach((b2) => b2.onclick = async () => {
      await removeInitEntry(b2.dataset.id);
      renderInit(root);
    });
    root.querySelectorAll(".act").forEach((b2) => b2.onclick = async () => {
      const init2 = await getInitData();
      const list = init2.list.map((e) => e.tokenId === b2.dataset.id ? { ...e, acted: !e.acted } : e);
      await setInitData({ round: init2.round, list });
      renderInit(root);
    });
    root.querySelectorAll(".tinit").forEach((b2) => b2.onclick = async () => {
      await rollInitForToken({ id: b2.dataset.id, name: b2.parentElement.querySelector("span").textContent });
      renderInit(root);
    });
    root.querySelectorAll(".tstate").forEach((b2) => b2.onclick = async () => {
      await lib_default.popover.open({ id: "cpr-state-" + b2.dataset.id, url: `state.html?itemId=${b2.dataset.id}`, height: 560, width: 380 });
    });
  }
  async function rollInitForToken(item) {
    const td = await getTokenData(item.id) || {};
    const ref = td.ref ?? state.character?.attributes?.REF ?? 0;
    const mod = td.initMod ?? 0;
    const r2 = skillRoll();
    const total = r2.total + ref + mod;
    await broadcast({ t: "roll", kind: "\u5148\u653B", who: item.name || "\u4EE4\u724C", total, detail: `1d10=${r2.log.join(" ")}+REF${ref}${mod ? "+" + mod : ""}`, initiative: { tokenId: item.id, name: item.name || "\u4EE4\u724C", total } });
  }
  async function renderTokens(root) {
    const tokens = await listTokens();
    root.innerHTML = `
    <div class="panel">
      <h3>\u4EE4\u724C\u72B6\u6001\u7BA1\u7406</h3>
      <div class="muted" style="margin-bottom:6px">\u9009\u4E2D\u753B\u5E03\u4EE4\u724C\u540E\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\uFF1B\u4E5F\u53EF\u4EE5\u5728\u753B\u5E03\u53F3\u952E\u4EE4\u724C\u4F7F\u7528 CPR \u83DC\u5355\u3002</div>
      <div class="row"><button id="openSel" class="primary">\u6253\u5F00\u9009\u4E2D\u4EE4\u724C\u72B6\u6001</button></div>
      ${tokens.map((t2) => `<div class="row"><span style="flex:1">${esc(t2.name || t2.id.slice(0, 8))}</span><button class="small st" data-id="${t2.id}">\u72B6\u6001</button></div>`).join("") || "<div class='muted'>\u753B\u5E03\u4E0A\u6CA1\u6709\u4EE4\u724C</div>"}
    </div>`;
    root.querySelector("#openSel").onclick = async () => {
      const sel = await lib_default.scene.getSelectedItems().catch(() => []);
      if (!sel || !sel.length) {
        alert("\u8BF7\u5148\u9009\u4E2D\u4E00\u4E2A\u4EE4\u724C");
        return;
      }
      openState(sel[0].id);
    };
    root.querySelectorAll(".st").forEach((b2) => b2.onclick = () => openState(b2.dataset.id));
  }
  function openState(itemId2) {
    lib_default.popover.open({ id: "cpr-state-" + itemId2, url: `state.html?itemId=${itemId2}`, height: 560, width: 380 });
  }
  async function renderMoney(root) {
    const me = await playerId();
    const myName = await playerName();
    const ledger = loadLedger(me, "");
    const party = await lib_default.party.getPlayers().catch(() => []);
    root.innerHTML = `
    <div class="panel">
      <h3>\u6211\u7684\u94B1\u5305\uFF08\u4EC5\u672C\u673A\uFF09</h3>
      <div style="font-size:20px"><b>${ledger.balance}</b> eb</div>
      <div class="row"><input id="label" placeholder="\u4E8B\u7531\uFF0C\u5982 \u8D2D\u4E70\u624B\u67AA" style="flex:1"/><input id="amt" type="number" style="width:80px" placeholder="\xB1\u91D1\u989D"/><button id="add" class="primary">\u8BB0\u8D26</button></div>
      <div class="row"><button id="setB" class="small">\u76F4\u63A5\u8BBE\u7F6E\u4F59\u989D</button><input id="setAmt" type="number" style="width:90px" placeholder="\u65B0\u4F59\u989D"/></div>
      <div class="row"><label>GM\u67E5\u770B\u6211</label><input id="gmConsent" type="checkbox" ${ledger.gmConsent ? "checked" : ""}/><button id="pushGm" class="small">\u5411GM\u4E0A\u62A5\u4F59\u989D</button><button id="exportL" class="small">\u5BFC\u51FA\u6D41\u6C34</button></div>
      <div class="feed" style="max-height:140px">${ledger.entries.map((e) => `<div class="msg">${e.t.slice(5, 16)} ${e.amount > 0 ? "+" : ""}${e.amount} ${esc(e.label)}</div>`).join("") || "<div class='muted'>\u6682\u65E0\u6D41\u6C34</div>"}</div>
    </div>
    <div class="panel">
      <h3>\u9ED1\u5165\u67E5\u8D26</h3>
      <div class="muted" style="margin-bottom:4px">\u5BF9\u6297\u68C0\u5B9A\uFF1A\u4F60\u7684 1d10+\u6280\u672F+\u7535\u5B50/\u5B89\u5168\u6280\u672F vs \u76EE\u6807\u88AB\u52A8\u9632\u5FA1\uFF08\u51761d10+\u6280\u80FD/2\uFF09\u3002\u6210\u529F\u540E\u4F59\u989D\u53EA\u663E\u793A\u5728\u4F60\u7684\u754C\u9762\u4E0A\u3002\u5931\u8D25\u65F6\u76EE\u6807\u4F1A\u6536\u5230\u8B66\u544A\u3002</div>
      <div class="row"><select id="hackTarget">${party.filter((p2) => p2.connectionId !== me).map((p2) => `<option value="${p2.connectionId}">${esc(p2.name)}</option>`).join("") || "<option value=''>\uFF08\u623F\u95F4\u5185\u6682\u65E0\u5176\u4ED6\u73A9\u5BB6\uFF09</option>"}</select><button id="hack" class="primary">\u53D1\u8D77\u9ED1\u5165</button></div>
      ${state.settings.gmView ? `<div class="panel" style="background:var(--chip)"><h4>GM \u8D44\u91D1\u89C6\u56FE</h4><div class="muted">\u5DF2\u5F00\u542F GM \u89C6\u89D2\u5F00\u5173\uFF08\u4EC5\u4F60\u8FD9\u8FB9\u5C55\u793A\u4E0A\u62A5\u7684\u6570\u636E\uFF09\u3002</div></div>` : ""}
    </div>`;
    root.querySelector("#add").onclick = async () => {
      const label = root.querySelector("#label").value.trim() || "\u8BB0\u8D26";
      const amt = parseFloat(root.querySelector("#amt").value) || 0;
      addEntry(me, "", { label, amount: amt });
      renderMoney(root);
    };
    root.querySelector("#setB").onclick = async () => {
      const v2 = parseFloat(root.querySelector("#setAmt").value) || 0;
      setBalance(me, "", v2);
      renderMoney(root);
    };
    root.querySelector("#gmConsent").onchange = (e) => {
      setGmConsent(me, "", e.target.checked);
    };
    root.querySelector("#pushGm").onclick = async () => {
      const l2 = loadLedger(me, "");
      await broadcast({ t: "gm-money", playerName: myName, balance: l2.balance });
    };
    root.querySelector("#exportL").onclick = () => {
      const text = exportLedgerText(loadLedger(me, ""), state.character?.name || myName);
      navigator.clipboard?.writeText(text).catch(() => {
      });
      alert("\u6D41\u6C34\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\uFF08\u79C1\u5BC6\u6570\u636E\uFF0C\u672A\u8FDB\u623F\u95F4\uFF09");
    };
    root.querySelector("#hack").onclick = async () => {
      const targetId = root.querySelector("#hackTarget").value;
      if (!targetId) {
        alert("\u6CA1\u6709\u53EF\u7528\u7684\u76EE\u6807\u73A9\u5BB6");
        return;
      }
      const r2 = skillRoll();
      const atkSkill = skillBase("\u7535\u5B50/\u5B89\u5168\u6280\u672F");
      const atkTotal = r2.total + (state.character?.attributes?.TECH ?? 0) + atkSkill;
      await broadcast({ t: "roll", kind: "\u9ED1\u5165\u67E5\u8D26", who: myName, total: atkTotal, detail: `1d10=${r2.log.join(" ")}+TECH+\u7535\u5B50/\u5B89\u9632` });
      await broadcast({ t: "hack-req", initiatorId: me, targetId, atkTotal });
    };
  }
  function renderImport(root) {
    root.innerHTML = `
    <div class="panel">
      <h3>\u901A\u9053\u4E00\uFF1A\u89D2\u8272\u6570\u636E JSON\uFF08\u5199\u5361\u7F51\u9875\u5BFC\u51FA\uFF09</h3>
      <textarea id="jsonArea" placeholder="\u7C98\u8D34\u89D2\u8272\u6570\u636E JSON\uFF0C\u6216\u9009\u62E9\u4E0B\u65B9\u6587\u4EF6"></textarea>
      <div class="row"><input type="file" id="jsonFile" accept=".json"/><button id="loadJson" class="primary">\u5BFC\u5165 JSON</button></div>
    </div>
    <div class="panel">
      <h3>\u901A\u9053\u4E8C\uFF1A\u9CA8\u9C7C\u5305\u5168\u81EA\u52A8\u5361 xlsx \u4E0A\u4F20</h3>
      <div class="muted" style="margin-bottom:4px">\u76F4\u63A5\u4E0A\u4F20\u586B\u597D\u7684\u300A\u9CA8\u9C7C\u5305\u5168\u81EA\u52A8\u5361\u300Bxlsx\uFF0C\u672C\u63D2\u4EF6\u7528 SheetJS \u9006\u5411\u89E3\u6790\uFF08\u5C5E\u6027/\u6280\u80FD/\u804C\u4E1A/\u6B66\u5668/\u9632\u5177/\u4E49\u4F53/\u91D1\u94B1\u521D\u59CB\u503C\uFF09\u3002\u7F3A\u683C\u5B57\u6BB5\u4F1A\u5217\u51FA\u63D0\u793A\u3002</div>
      <div class="row"><input type="file" id="xlsxFile" accept=".xlsx,.xls"/><button id="loadXlsx" class="primary">\u89E3\u6790 xlsx</button></div>
    </div>
    <div id="importResult"></div>
    ${state.character ? `<div class="panel"><h3>\u5F53\u524D\u89D2\u8272</h3><div>${esc(state.character.name)}\uFF5C${Object.entries(state.character.attributes || {}).map(([k2, v2]) => `${k2}${v2}`).join(" ")}\uFF5C\u6B66\u5668${state.character.weapons?.length || 0}\uFF5C\u4E49\u4F53${state.character.cyberware?.length || 0}</div>
      <div class="row"><button id="delChar" class="small">\u6E05\u9664\u672C\u5730\u89D2\u8272</button></div></div>` : ""}`;
    async function applyChar(jsonStr) {
      try {
        const obj = JSON.parse(jsonStr);
        const { errors, character } = importCharacterJson(obj);
        if (errors.length) {
          alert(errors.join("\n"));
          return;
        }
        state.character = character;
        saveChar();
        if (character.money) setBalance(await playerId(), "", character.money);
        root.querySelector("#importResult").innerHTML = `<div class="result-box">\u5DF2\u5BFC\u5165\uFF1A${esc(character.name)}\uFF08\u6765\u6E90 ${character.source}\uFF09</div>`;
      } catch (e) {
        alert("JSON \u89E3\u6790\u5931\u8D25\uFF1A" + e.message);
      }
    }
    root.querySelector("#loadJson").onclick = () => applyChar(root.querySelector("#jsonArea").value);
    root.querySelector("#jsonFile").onchange = (e) => {
      const f2 = e.target.files[0];
      if (!f2) return;
      const rd = new FileReader();
      rd.onload = () => applyChar(rd.result);
      rd.readAsText(f2);
    };
    root.querySelector("#loadXlsx").onclick = () => root.querySelector("#xlsxFile").click();
    root.querySelector("#xlsxFile").onchange = (e) => {
      const f2 = e.target.files[0];
      if (!f2) return;
      const rd = new FileReader();
      rd.onload = async () => {
        const { errors, warnings, character } = parseXlsx(rd.result);
        let msg = "";
        if (errors.length) {
          alert("\u89E3\u6790\u5931\u8D25\uFF1A\n" + errors.join("\n"));
          return;
        }
        state.character = character;
        saveChar();
        if (character.money) setBalance(await playerId(), "", character.money);
        msg += `<div class="result-box">\u5DF2\u5BFC\u5165\uFF1A${esc(character.name)}\uFF08\u6765\u6E90 xlsx\uFF09
HP ${character.hp?.now ?? "?"}/${character.hp?.max ?? "?"}\uFF5C\u4EBA\u6027 ${character.humanity?.now ?? "?"}/${character.humanity?.max ?? "?"}\uFF5C\u91D1\u94B1 ${character.money} eb\uFF08\u5DF2\u8FDB\u79C1\u5BC6\u8D26\u672C\uFF09
\u6280\u80FD ${character.skills.length} \u6761\uFF5C\u6B66\u5668 ${character.weapons.length}\uFF5C\u9632\u5177 ${character.armor.length}\uFF5C\u4E49\u4F53 ${character.cyberware.length}`;
        if (warnings.length) msg += `

\u5BB9\u9519\u63D0\u793A\uFF1A
- ${warnings.map(esc).join("\n- ")}`;
        msg += "</div>";
        root.querySelector("#importResult").innerHTML = msg;
      };
      rd.readAsArrayBuffer(f2);
    };
    const del = root.querySelector("#delChar");
    if (del) del.onclick = () => {
      state.character = null;
      saveChar();
      renderImport(root);
    };
  }
  function renderQuick(root) {
    const rs = ruleset();
    const entries = rs.quickref || [];
    root.innerHTML = `
    <div class="panel">
      <h3>\u9CA8\u5305\u89C4\u5219\u901F\u67E5</h3>
      <input id="q" placeholder="\u5173\u952E\u8BCD\u641C\u7D22\uFF1A\u5C04\u8868 / \u91CD\u4F24 / \u7532\u5F39 / \u90E8\u4F4D / \u6B7B\u4EA1\u2026" oninput="window.__qrFilter && window.__qrFilter()"/>
      <div id="qrList" style="margin-top:6px"></div>
    </div>`;
    const cats = [...new Set(entries.map((e) => e.category))];
    function list(filter) {
      const el = root.querySelector("#qrList");
      const f2 = (filter || "").toLowerCase();
      el.innerHTML = cats.map((cat) => {
        const items = entries.filter((e) => e.category === cat && (!f2 || (e.title + e.content).toLowerCase().includes(f2)));
        if (!items.length) return "";
        return `<h3>${esc(cat)}</h3>` + items.map((e) => `<div class="row" style="align-items:flex-start"><div style="flex:1"><b>${esc(e.title)}</b> <span class="src">${esc(e.source || "")}</span><div class="muted">${esc(e.content)}</div></div></div>`).join("");
      }).join("") || "<div class='muted'>\u65E0\u5339\u914D\u6761\u76EE</div>";
    }
    window.__qrFilter = () => list(root.querySelector("#q").value);
    list("");
    const extra = document.createElement("div");
    extra.className = "panel";
    const tableHtml = (bands, rows) => `<table><tr><th></th>${bands.map((b2) => `<th>${b2}</th>`).join("")}</tr>` + Object.entries(rows).map(([k2, arr]) => `<tr><th>${esc(k2)}</th>${arr.map((v2) => `<td>${v2 ?? "/"}</td>`).join("")}</tr>`).join("") + "</table>";
    extra.innerHTML = `<h3>\u9CA8\u5305\u65B0\u5C04\u8868 <span class="src">shark</span></h3>${tableHtml(rs.rangedDV.bands, rs.rangedDV.table)}
    <h3 style="margin-top:8px">\u5168\u81EA\u52A8\u5C04\u8868 <span class="src">shark</span></h3>${rs.autofireDV ? tableHtml(rs.autofireDV.bands, rs.autofireDV.table) : ""}
    <h3 style="margin-top:8px">\u7532\u5F39\u5BF9\u6297 <span class="src">shark</span></h3>${tableHtml(rs.armorVsAmmo.tiers, rs.armorVsAmmo.table)}`;
    root.appendChild(extra);
  }
  function renderSettings(root) {
    root.innerHTML = `
    <div class="panel">
      <h3>\u89C4\u5219\u5305</h3>
      ${getPacks().map((p2) => `<div class="row"><input type="checkbox" data-pack="${p2.id}" ${state.settings.packs.includes(p2.id) ? "checked" : ""}/><span style="flex:1">${esc(p2.name)} <span class="src">${esc(p2.id)} v${p2.version}</span><div class="muted">${esc(p2.description || "")}</div></span></div>`).join("")}
      <div class="row"><input type="checkbox" id="tc" ${state.settings.threeColor ? "checked" : ""}/><span style="flex:1">\u4E09\u8272\u53CD\u5E94\u52A8\u4F5C\u4F53\u7CFB\uFF08\u84DD/\u7EFF/\u7EA2\u53CD\uFF0C\u7B2C\u4E09\u65B9\u6269\u5C55\u539F\u6587\uFF0C\u9ED8\u8BA4\u5173\uFF09</span></div>
    </div>
    <div class="panel">
      <h3>GM \u8BBE\u7F6E</h3>
      <div class="row"><input type="checkbox" id="gmView" ${state.settings.gmView ? "checked" : ""}/><span style="flex:1">GM \u89C6\u89D2\uFF1A\u663E\u793A\u73A9\u5BB6\u4E3B\u52A8\u4E0A\u62A5\u7684\u4F59\u989D\uFF08\u9ED8\u8BA4\u5173\uFF1B\u73A9\u5BB6\u4E0D\u70B9\u300C\u5411GM\u4E0A\u62A5\u300D\u5219\u6C38\u8FDC\u770B\u4E0D\u5230\uFF09</span></div>
      <div class="muted">\u79C1\u5BC6\u6027\u8BF4\u660E\uFF1A\u8D44\u91D1\u53EA\u5B58\u5404\u73A9\u5BB6\u672C\u673A localStorage\uFF0C\u4ECE\u4E0D\u5199\u5165\u623F\u95F4\u6570\u636E\u6216\u5E7F\u64AD\u4FE1\u9053\u3002\u9ED1\u5165\u67E5\u8D26\u7684\u4F59\u989D\u56DE\u4F20\u6D88\u606F\u6280\u672F\u4E0A\u5168\u623F\u95F4\u53EF\u8FBE\uFF0C\u4F46\u53EA\u5728\u53D1\u8D77\u65B9\u754C\u9762\u6E32\u67D3\uFF08\u65E0\u7AEF\u5230\u7AEF\u79C1\u5BC6\uFF0C\u8BE6\u89C1 README\uFF09\u3002</div>
    </div>
    <div class="panel">
      <h3>\u4E3B\u9898</h3>
      <div class="muted">\u81EA\u52A8\u8DDF\u968F\u67AD\u718A\u660E\u6697\u4E3B\u9898\uFF08OBR.theme\uFF09\u3002</div>
    </div>`;
    root.querySelectorAll("[data-pack]").forEach((cb) => cb.onchange = async () => {
      const id = cb.dataset.pack;
      if (cb.checked) {
        if (!state.settings.packs.includes(id)) state.settings.packs.push(id);
      } else state.settings.packs = state.settings.packs.filter((x2) => x2 !== id);
      await saveSettings();
    });
    root.querySelector("#tc").onchange = async (e) => {
      state.settings.threeColor = e.target.checked;
      await saveSettings();
    };
    root.querySelector("#gmView").onchange = async (e) => {
      state.settings.gmView = e.target.checked;
      await saveSettings();
    };
  }
  var params = new URLSearchParams(location.search);
  var itemId = params.get("itemId");
  var appEl = document.getElementById("app");
  if (itemId) {
    lib_default.onReady().then(() => renderStatePopover(appEl, itemId));
  } else {
    main();
  }
})();
