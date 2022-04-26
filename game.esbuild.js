(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../node_modules/dat.gui/build/dat.gui.module.js
  function ___$insertStyle(css2) {
    if (!css2) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = css2;
    document.head.appendChild(style);
    return css2;
  }
  function colorToString(color, forceCSSHex) {
    var colorFormat = color.__state.conversionName.toString();
    var r = Math.round(color.r);
    var g = Math.round(color.g);
    var b = Math.round(color.b);
    var a = color.a;
    var h = Math.round(color.h);
    var s = color.s.toFixed(1);
    var v = color.v.toFixed(1);
    if (forceCSSHex || colorFormat === "THREE_CHAR_HEX" || colorFormat === "SIX_CHAR_HEX") {
      var str = color.hex.toString(16);
      while (str.length < 6) {
        str = "0" + str;
      }
      return "#" + str;
    } else if (colorFormat === "CSS_RGB") {
      return "rgb(" + r + "," + g + "," + b + ")";
    } else if (colorFormat === "CSS_RGBA") {
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else if (colorFormat === "HEX") {
      return "0x" + color.hex.toString(16);
    } else if (colorFormat === "RGB_ARRAY") {
      return "[" + r + "," + g + "," + b + "]";
    } else if (colorFormat === "RGBA_ARRAY") {
      return "[" + r + "," + g + "," + b + "," + a + "]";
    } else if (colorFormat === "RGB_OBJ") {
      return "{r:" + r + ",g:" + g + ",b:" + b + "}";
    } else if (colorFormat === "RGBA_OBJ") {
      return "{r:" + r + ",g:" + g + ",b:" + b + ",a:" + a + "}";
    } else if (colorFormat === "HSV_OBJ") {
      return "{h:" + h + ",s:" + s + ",v:" + v + "}";
    } else if (colorFormat === "HSVA_OBJ") {
      return "{h:" + h + ",s:" + s + ",v:" + v + ",a:" + a + "}";
    }
    return "unknown format";
  }
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;
  var Common = {
    BREAK: {},
    extend: function extend(target) {
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        var keys = this.isObject(obj) ? Object.keys(obj) : [];
        keys.forEach(function(key) {
          if (!this.isUndefined(obj[key])) {
            target[key] = obj[key];
          }
        }.bind(this));
      }, this);
      return target;
    },
    defaults: function defaults(target) {
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        var keys = this.isObject(obj) ? Object.keys(obj) : [];
        keys.forEach(function(key) {
          if (this.isUndefined(target[key])) {
            target[key] = obj[key];
          }
        }.bind(this));
      }, this);
      return target;
    },
    compose: function compose() {
      var toCall = ARR_SLICE.call(arguments);
      return function() {
        var args = ARR_SLICE.call(arguments);
        for (var i = toCall.length - 1; i >= 0; i--) {
          args = [toCall[i].apply(this, args)];
        }
        return args[0];
      };
    },
    each: function each(obj, itr, scope) {
      if (!obj) {
        return;
      }
      if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
        obj.forEach(itr, scope);
      } else if (obj.length === obj.length + 0) {
        var key = void 0;
        var l = void 0;
        for (key = 0, l = obj.length; key < l; key++) {
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
            return;
          }
        }
      } else {
        for (var _key in obj) {
          if (itr.call(scope, obj[_key], _key) === this.BREAK) {
            return;
          }
        }
      }
    },
    defer: function defer(fnc) {
      setTimeout(fnc, 0);
    },
    debounce: function debounce(func, threshold, callImmediately) {
      var timeout = void 0;
      return function() {
        var obj = this;
        var args = arguments;
        function delayed() {
          timeout = null;
          if (!callImmediately)
            func.apply(obj, args);
        }
        var callNow = callImmediately || !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(delayed, threshold);
        if (callNow) {
          func.apply(obj, args);
        }
      };
    },
    toArray: function toArray(obj) {
      if (obj.toArray)
        return obj.toArray();
      return ARR_SLICE.call(obj);
    },
    isUndefined: function isUndefined(obj) {
      return obj === void 0;
    },
    isNull: function isNull(obj) {
      return obj === null;
    },
    isNaN: function(_isNaN) {
      function isNaN2(_x) {
        return _isNaN.apply(this, arguments);
      }
      isNaN2.toString = function() {
        return _isNaN.toString();
      };
      return isNaN2;
    }(function(obj) {
      return isNaN(obj);
    }),
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    isObject: function isObject(obj) {
      return obj === Object(obj);
    },
    isNumber: function isNumber(obj) {
      return obj === obj + 0;
    },
    isString: function isString(obj) {
      return obj === obj + "";
    },
    isBoolean: function isBoolean(obj) {
      return obj === false || obj === true;
    },
    isFunction: function isFunction(obj) {
      return obj instanceof Function;
    }
  };
  var INTERPRETATIONS = [
    {
      litmus: Common.isString,
      conversions: {
        THREE_CHAR_HEX: {
          read: function read(original) {
            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) {
              return false;
            }
            return {
              space: "HEX",
              hex: parseInt("0x" + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
            };
          },
          write: colorToString
        },
        SIX_CHAR_HEX: {
          read: function read2(original) {
            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) {
              return false;
            }
            return {
              space: "HEX",
              hex: parseInt("0x" + test[1].toString(), 0)
            };
          },
          write: colorToString
        },
        CSS_RGB: {
          read: function read3(original) {
            var test = original.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
            if (test === null) {
              return false;
            }
            return {
              space: "RGB",
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };
          },
          write: colorToString
        },
        CSS_RGBA: {
          read: function read4(original) {
            var test = original.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
            if (test === null) {
              return false;
            }
            return {
              space: "RGB",
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };
          },
          write: colorToString
        }
      }
    },
    {
      litmus: Common.isNumber,
      conversions: {
        HEX: {
          read: function read5(original) {
            return {
              space: "HEX",
              hex: original,
              conversionName: "HEX"
            };
          },
          write: function write(color) {
            return color.hex;
          }
        }
      }
    },
    {
      litmus: Common.isArray,
      conversions: {
        RGB_ARRAY: {
          read: function read6(original) {
            if (original.length !== 3) {
              return false;
            }
            return {
              space: "RGB",
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },
          write: function write2(color) {
            return [color.r, color.g, color.b];
          }
        },
        RGBA_ARRAY: {
          read: function read7(original) {
            if (original.length !== 4)
              return false;
            return {
              space: "RGB",
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },
          write: function write3(color) {
            return [color.r, color.g, color.b, color.a];
          }
        }
      }
    },
    {
      litmus: Common.isObject,
      conversions: {
        RGBA_OBJ: {
          read: function read8(original) {
            if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
              return {
                space: "RGB",
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              };
            }
            return false;
          },
          write: function write4(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            };
          }
        },
        RGB_OBJ: {
          read: function read9(original) {
            if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
              return {
                space: "RGB",
                r: original.r,
                g: original.g,
                b: original.b
              };
            }
            return false;
          },
          write: function write5(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            };
          }
        },
        HSVA_OBJ: {
          read: function read10(original) {
            if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
              return {
                space: "HSV",
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              };
            }
            return false;
          },
          write: function write6(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            };
          }
        },
        HSV_OBJ: {
          read: function read11(original) {
            if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
              return {
                space: "HSV",
                h: original.h,
                s: original.s,
                v: original.v
              };
            }
            return false;
          },
          write: function write7(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            };
          }
        }
      }
    }
  ];
  var result = void 0;
  var toReturn = void 0;
  var interpret = function interpret2() {
    toReturn = false;
    var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
    Common.each(INTERPRETATIONS, function(family) {
      if (family.litmus(original)) {
        Common.each(family.conversions, function(conversion, conversionName) {
          result = conversion.read(original);
          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return Common.BREAK;
          }
        });
        return Common.BREAK;
      }
    });
    return toReturn;
  };
  var tmpComponent = void 0;
  var ColorMath = {
    hsv_to_rgb: function hsv_to_rgb(h, s, v) {
      var hi = Math.floor(h / 60) % 6;
      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };
    },
    rgb_to_hsv: function rgb_to_hsv(r, g, b) {
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h = void 0;
      var s = void 0;
      if (max !== 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }
      if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }
      return {
        h: h * 360,
        s,
        v: max / 255
      };
    },
    rgb_to_hex: function rgb_to_hex(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },
    component_from_hex: function component_from_hex(hex, componentIndex) {
      return hex >> componentIndex * 8 & 255;
    },
    hex_with_component: function hex_with_component(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | hex & ~(255 << tmpComponent);
    }
  };
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var get = function get2(object, property, receiver) {
    if (object === null)
      object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === void 0) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return void 0;
      } else {
        return get2(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === void 0) {
        return void 0;
      }
      return getter.call(receiver);
    }
  };
  var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  var possibleConstructorReturn = function(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
  var Color = function() {
    function Color2() {
      classCallCheck(this, Color2);
      this.__state = interpret.apply(this, arguments);
      if (this.__state === false) {
        throw new Error("Failed to interpret color arguments");
      }
      this.__state.a = this.__state.a || 1;
    }
    createClass(Color2, [{
      key: "toString",
      value: function toString() {
        return colorToString(this);
      }
    }, {
      key: "toHexString",
      value: function toHexString() {
        return colorToString(this, true);
      }
    }, {
      key: "toOriginal",
      value: function toOriginal() {
        return this.__state.conversion.write(this);
      }
    }]);
    return Color2;
  }();
  function defineRGBComponent(target, component, componentHexIndex) {
    Object.defineProperty(target, component, {
      get: function get$$13() {
        if (this.__state.space === "RGB") {
          return this.__state[component];
        }
        Color.recalculateRGB(this, component, componentHexIndex);
        return this.__state[component];
      },
      set: function set$$13(v) {
        if (this.__state.space !== "RGB") {
          Color.recalculateRGB(this, component, componentHexIndex);
          this.__state.space = "RGB";
        }
        this.__state[component] = v;
      }
    });
  }
  function defineHSVComponent(target, component) {
    Object.defineProperty(target, component, {
      get: function get$$13() {
        if (this.__state.space === "HSV") {
          return this.__state[component];
        }
        Color.recalculateHSV(this);
        return this.__state[component];
      },
      set: function set$$13(v) {
        if (this.__state.space !== "HSV") {
          Color.recalculateHSV(this);
          this.__state.space = "HSV";
        }
        this.__state[component] = v;
      }
    });
  }
  Color.recalculateRGB = function(color, component, componentHexIndex) {
    if (color.__state.space === "HEX") {
      color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
    } else if (color.__state.space === "HSV") {
      Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
    } else {
      throw new Error("Corrupted color state");
    }
  };
  Color.recalculateHSV = function(color) {
    var result2 = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
    Common.extend(color.__state, {
      s: result2.s,
      v: result2.v
    });
    if (!Common.isNaN(result2.h)) {
      color.__state.h = result2.h;
    } else if (Common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }
  };
  Color.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"];
  defineRGBComponent(Color.prototype, "r", 2);
  defineRGBComponent(Color.prototype, "g", 1);
  defineRGBComponent(Color.prototype, "b", 0);
  defineHSVComponent(Color.prototype, "h");
  defineHSVComponent(Color.prototype, "s");
  defineHSVComponent(Color.prototype, "v");
  Object.defineProperty(Color.prototype, "a", {
    get: function get$$1() {
      return this.__state.a;
    },
    set: function set$$1(v) {
      this.__state.a = v;
    }
  });
  Object.defineProperty(Color.prototype, "hex", {
    get: function get$$12() {
      if (this.__state.space !== "HEX") {
        this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
        this.__state.space = "HEX";
      }
      return this.__state.hex;
    },
    set: function set$$12(v) {
      this.__state.space = "HEX";
      this.__state.hex = v;
    }
  });
  var Controller = function() {
    function Controller2(object, property) {
      classCallCheck(this, Controller2);
      this.initialValue = object[property];
      this.domElement = document.createElement("div");
      this.object = object;
      this.property = property;
      this.__onChange = void 0;
      this.__onFinishChange = void 0;
    }
    createClass(Controller2, [{
      key: "onChange",
      value: function onChange(fnc) {
        this.__onChange = fnc;
        return this;
      }
    }, {
      key: "onFinishChange",
      value: function onFinishChange(fnc) {
        this.__onFinishChange = fnc;
        return this;
      }
    }, {
      key: "setValue",
      value: function setValue(newValue) {
        this.object[this.property] = newValue;
        if (this.__onChange) {
          this.__onChange.call(this, newValue);
        }
        this.updateDisplay();
        return this;
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.object[this.property];
      }
    }, {
      key: "updateDisplay",
      value: function updateDisplay2() {
        return this;
      }
    }, {
      key: "isModified",
      value: function isModified() {
        return this.initialValue !== this.getValue();
      }
    }]);
    return Controller2;
  }();
  var EVENT_MAP = {
    HTMLEvents: ["change"],
    MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
    KeyboardEvents: ["keydown"]
  };
  var EVENT_MAP_INV = {};
  Common.each(EVENT_MAP, function(v, k) {
    Common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });
  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
  function cssValueToPixels(val) {
    if (val === "0" || Common.isUndefined(val)) {
      return 0;
    }
    var match = val.match(CSS_VALUE_PIXELS);
    if (!Common.isNull(match)) {
      return parseFloat(match[1]);
    }
    return 0;
  }
  var dom = {
    makeSelectable: function makeSelectable(elem, selectable) {
      if (elem === void 0 || elem.style === void 0)
        return;
      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };
      elem.style.MozUserSelect = selectable ? "auto" : "none";
      elem.style.KhtmlUserSelect = selectable ? "auto" : "none";
      elem.unselectable = selectable ? "on" : "off";
    },
    makeFullscreen: function makeFullscreen(elem, hor, vert) {
      var vertical = vert;
      var horizontal = hor;
      if (Common.isUndefined(horizontal)) {
        horizontal = true;
      }
      if (Common.isUndefined(vertical)) {
        vertical = true;
      }
      elem.style.position = "absolute";
      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }
    },
    fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
      var params = pars || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error("Event type " + eventType + " not supported.");
      }
      var evt = document.createEvent(className);
      switch (className) {
        case "MouseEvents": {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
          break;
        }
        case "KeyboardEvents": {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: void 0,
            charCode: void 0
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
        default: {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
      }
      Common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },
    bind: function bind(elem, event, func, newBool) {
      var bool = newBool || false;
      if (elem.addEventListener) {
        elem.addEventListener(event, func, bool);
      } else if (elem.attachEvent) {
        elem.attachEvent("on" + event, func);
      }
      return dom;
    },
    unbind: function unbind(elem, event, func, newBool) {
      var bool = newBool || false;
      if (elem.removeEventListener) {
        elem.removeEventListener(event, func, bool);
      } else if (elem.detachEvent) {
        elem.detachEvent("on" + event, func);
      }
      return dom;
    },
    addClass: function addClass(elem, className) {
      if (elem.className === void 0) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) === -1) {
          classes.push(className);
          elem.className = classes.join(" ").replace(/^\s+/, "").replace(/\s+$/, "");
        }
      }
      return dom;
    },
    removeClass: function removeClass(elem, className) {
      if (className) {
        if (elem.className === className) {
          elem.removeAttribute("class");
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index !== -1) {
            classes.splice(index, 1);
            elem.className = classes.join(" ");
          }
        }
      } else {
        elem.className = void 0;
      }
      return dom;
    },
    hasClass: function hasClass(elem, className) {
      return new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)").test(elem.className) || false;
    },
    getWidth: function getWidth(elem) {
      var style = getComputedStyle(elem);
      return cssValueToPixels(style["border-left-width"]) + cssValueToPixels(style["border-right-width"]) + cssValueToPixels(style["padding-left"]) + cssValueToPixels(style["padding-right"]) + cssValueToPixels(style.width);
    },
    getHeight: function getHeight(elem) {
      var style = getComputedStyle(elem);
      return cssValueToPixels(style["border-top-width"]) + cssValueToPixels(style["border-bottom-width"]) + cssValueToPixels(style["padding-top"]) + cssValueToPixels(style["padding-bottom"]) + cssValueToPixels(style.height);
    },
    getOffset: function getOffset(el) {
      var elem = el;
      var offset = { left: 0, top: 0 };
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
          elem = elem.offsetParent;
        } while (elem);
      }
      return offset;
    },
    isActive: function isActive(elem) {
      return elem === document.activeElement && (elem.type || elem.href);
    }
  };
  var BooleanController = function(_Controller) {
    inherits(BooleanController2, _Controller);
    function BooleanController2(object, property) {
      classCallCheck(this, BooleanController2);
      var _this2 = possibleConstructorReturn(this, (BooleanController2.__proto__ || Object.getPrototypeOf(BooleanController2)).call(this, object, property));
      var _this = _this2;
      _this2.__prev = _this2.getValue();
      _this2.__checkbox = document.createElement("input");
      _this2.__checkbox.setAttribute("type", "checkbox");
      function onChange() {
        _this.setValue(!_this.__prev);
      }
      dom.bind(_this2.__checkbox, "change", onChange, false);
      _this2.domElement.appendChild(_this2.__checkbox);
      _this2.updateDisplay();
      return _this2;
    }
    createClass(BooleanController2, [{
      key: "setValue",
      value: function setValue(v) {
        var toReturn2 = get(BooleanController2.prototype.__proto__ || Object.getPrototypeOf(BooleanController2.prototype), "setValue", this).call(this, v);
        if (this.__onFinishChange) {
          this.__onFinishChange.call(this, this.getValue());
        }
        this.__prev = this.getValue();
        return toReturn2;
      }
    }, {
      key: "updateDisplay",
      value: function updateDisplay2() {
        if (this.getValue() === true) {
          this.__checkbox.setAttribute("checked", "checked");
          this.__checkbox.checked = true;
          this.__prev = true;
        } else {
          this.__checkbox.checked = false;
          this.__prev = false;
        }
        return get(BooleanController2.prototype.__proto__ || Object.getPrototypeOf(BooleanController2.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return BooleanController2;
  }(Controller);
  var OptionController = function(_Controller) {
    inherits(OptionController2, _Controller);
    function OptionController2(object, property, opts) {
      classCallCheck(this, OptionController2);
      var _this2 = possibleConstructorReturn(this, (OptionController2.__proto__ || Object.getPrototypeOf(OptionController2)).call(this, object, property));
      var options = opts;
      var _this = _this2;
      _this2.__select = document.createElement("select");
      if (Common.isArray(options)) {
        var map2 = {};
        Common.each(options, function(element) {
          map2[element] = element;
        });
        options = map2;
      }
      Common.each(options, function(value, key) {
        var opt = document.createElement("option");
        opt.innerHTML = key;
        opt.setAttribute("value", value);
        _this.__select.appendChild(opt);
      });
      _this2.updateDisplay();
      dom.bind(_this2.__select, "change", function() {
        var desiredValue = this.options[this.selectedIndex].value;
        _this.setValue(desiredValue);
      });
      _this2.domElement.appendChild(_this2.__select);
      return _this2;
    }
    createClass(OptionController2, [{
      key: "setValue",
      value: function setValue(v) {
        var toReturn2 = get(OptionController2.prototype.__proto__ || Object.getPrototypeOf(OptionController2.prototype), "setValue", this).call(this, v);
        if (this.__onFinishChange) {
          this.__onFinishChange.call(this, this.getValue());
        }
        return toReturn2;
      }
    }, {
      key: "updateDisplay",
      value: function updateDisplay2() {
        if (dom.isActive(this.__select))
          return this;
        this.__select.value = this.getValue();
        return get(OptionController2.prototype.__proto__ || Object.getPrototypeOf(OptionController2.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return OptionController2;
  }(Controller);
  var StringController = function(_Controller) {
    inherits(StringController2, _Controller);
    function StringController2(object, property) {
      classCallCheck(this, StringController2);
      var _this2 = possibleConstructorReturn(this, (StringController2.__proto__ || Object.getPrototypeOf(StringController2)).call(this, object, property));
      var _this = _this2;
      function onChange() {
        _this.setValue(_this.__input.value);
      }
      function onBlur() {
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }
      _this2.__input = document.createElement("input");
      _this2.__input.setAttribute("type", "text");
      dom.bind(_this2.__input, "keyup", onChange);
      dom.bind(_this2.__input, "change", onChange);
      dom.bind(_this2.__input, "blur", onBlur);
      dom.bind(_this2.__input, "keydown", function(e) {
        if (e.keyCode === 13) {
          this.blur();
        }
      });
      _this2.updateDisplay();
      _this2.domElement.appendChild(_this2.__input);
      return _this2;
    }
    createClass(StringController2, [{
      key: "updateDisplay",
      value: function updateDisplay2() {
        if (!dom.isActive(this.__input)) {
          this.__input.value = this.getValue();
        }
        return get(StringController2.prototype.__proto__ || Object.getPrototypeOf(StringController2.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return StringController2;
  }(Controller);
  function numDecimals(x) {
    var _x = x.toString();
    if (_x.indexOf(".") > -1) {
      return _x.length - _x.indexOf(".") - 1;
    }
    return 0;
  }
  var NumberController = function(_Controller) {
    inherits(NumberController2, _Controller);
    function NumberController2(object, property, params) {
      classCallCheck(this, NumberController2);
      var _this = possibleConstructorReturn(this, (NumberController2.__proto__ || Object.getPrototypeOf(NumberController2)).call(this, object, property));
      var _params = params || {};
      _this.__min = _params.min;
      _this.__max = _params.max;
      _this.__step = _params.step;
      if (Common.isUndefined(_this.__step)) {
        if (_this.initialValue === 0) {
          _this.__impliedStep = 1;
        } else {
          _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
        }
      } else {
        _this.__impliedStep = _this.__step;
      }
      _this.__precision = numDecimals(_this.__impliedStep);
      return _this;
    }
    createClass(NumberController2, [{
      key: "setValue",
      value: function setValue(v) {
        var _v = v;
        if (this.__min !== void 0 && _v < this.__min) {
          _v = this.__min;
        } else if (this.__max !== void 0 && _v > this.__max) {
          _v = this.__max;
        }
        if (this.__step !== void 0 && _v % this.__step !== 0) {
          _v = Math.round(_v / this.__step) * this.__step;
        }
        return get(NumberController2.prototype.__proto__ || Object.getPrototypeOf(NumberController2.prototype), "setValue", this).call(this, _v);
      }
    }, {
      key: "min",
      value: function min(minValue) {
        this.__min = minValue;
        return this;
      }
    }, {
      key: "max",
      value: function max(maxValue) {
        this.__max = maxValue;
        return this;
      }
    }, {
      key: "step",
      value: function step2(stepValue) {
        this.__step = stepValue;
        this.__impliedStep = stepValue;
        this.__precision = numDecimals(stepValue);
        return this;
      }
    }]);
    return NumberController2;
  }(Controller);
  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }
  var NumberControllerBox = function(_NumberController) {
    inherits(NumberControllerBox2, _NumberController);
    function NumberControllerBox2(object, property, params) {
      classCallCheck(this, NumberControllerBox2);
      var _this2 = possibleConstructorReturn(this, (NumberControllerBox2.__proto__ || Object.getPrototypeOf(NumberControllerBox2)).call(this, object, property, params));
      _this2.__truncationSuspended = false;
      var _this = _this2;
      var prevY = void 0;
      function onChange() {
        var attempted = parseFloat(_this.__input.value);
        if (!Common.isNaN(attempted)) {
          _this.setValue(attempted);
        }
      }
      function onFinish() {
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }
      function onBlur() {
        onFinish();
      }
      function onMouseDrag(e) {
        var diff = prevY - e.clientY;
        _this.setValue(_this.getValue() + diff * _this.__impliedStep);
        prevY = e.clientY;
      }
      function onMouseUp() {
        dom.unbind(window, "mousemove", onMouseDrag);
        dom.unbind(window, "mouseup", onMouseUp);
        onFinish();
      }
      function onMouseDown(e) {
        dom.bind(window, "mousemove", onMouseDrag);
        dom.bind(window, "mouseup", onMouseUp);
        prevY = e.clientY;
      }
      _this2.__input = document.createElement("input");
      _this2.__input.setAttribute("type", "text");
      dom.bind(_this2.__input, "change", onChange);
      dom.bind(_this2.__input, "blur", onBlur);
      dom.bind(_this2.__input, "mousedown", onMouseDown);
      dom.bind(_this2.__input, "keydown", function(e) {
        if (e.keyCode === 13) {
          _this.__truncationSuspended = true;
          this.blur();
          _this.__truncationSuspended = false;
          onFinish();
        }
      });
      _this2.updateDisplay();
      _this2.domElement.appendChild(_this2.__input);
      return _this2;
    }
    createClass(NumberControllerBox2, [{
      key: "updateDisplay",
      value: function updateDisplay2() {
        this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
        return get(NumberControllerBox2.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox2.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return NumberControllerBox2;
  }(NumberController);
  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }
  var NumberControllerSlider = function(_NumberController) {
    inherits(NumberControllerSlider2, _NumberController);
    function NumberControllerSlider2(object, property, min, max, step2) {
      classCallCheck(this, NumberControllerSlider2);
      var _this2 = possibleConstructorReturn(this, (NumberControllerSlider2.__proto__ || Object.getPrototypeOf(NumberControllerSlider2)).call(this, object, property, { min, max, step: step2 }));
      var _this = _this2;
      _this2.__background = document.createElement("div");
      _this2.__foreground = document.createElement("div");
      dom.bind(_this2.__background, "mousedown", onMouseDown);
      dom.bind(_this2.__background, "touchstart", onTouchStart);
      dom.addClass(_this2.__background, "slider");
      dom.addClass(_this2.__foreground, "slider-fg");
      function onMouseDown(e) {
        document.activeElement.blur();
        dom.bind(window, "mousemove", onMouseDrag);
        dom.bind(window, "mouseup", onMouseUp);
        onMouseDrag(e);
      }
      function onMouseDrag(e) {
        e.preventDefault();
        var bgRect = _this.__background.getBoundingClientRect();
        _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
        return false;
      }
      function onMouseUp() {
        dom.unbind(window, "mousemove", onMouseDrag);
        dom.unbind(window, "mouseup", onMouseUp);
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }
      function onTouchStart(e) {
        if (e.touches.length !== 1) {
          return;
        }
        dom.bind(window, "touchmove", onTouchMove);
        dom.bind(window, "touchend", onTouchEnd);
        onTouchMove(e);
      }
      function onTouchMove(e) {
        var clientX = e.touches[0].clientX;
        var bgRect = _this.__background.getBoundingClientRect();
        _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      }
      function onTouchEnd() {
        dom.unbind(window, "touchmove", onTouchMove);
        dom.unbind(window, "touchend", onTouchEnd);
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.getValue());
        }
      }
      _this2.updateDisplay();
      _this2.__background.appendChild(_this2.__foreground);
      _this2.domElement.appendChild(_this2.__background);
      return _this2;
    }
    createClass(NumberControllerSlider2, [{
      key: "updateDisplay",
      value: function updateDisplay2() {
        var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
        this.__foreground.style.width = pct * 100 + "%";
        return get(NumberControllerSlider2.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider2.prototype), "updateDisplay", this).call(this);
      }
    }]);
    return NumberControllerSlider2;
  }(NumberController);
  var FunctionController = function(_Controller) {
    inherits(FunctionController2, _Controller);
    function FunctionController2(object, property, text) {
      classCallCheck(this, FunctionController2);
      var _this2 = possibleConstructorReturn(this, (FunctionController2.__proto__ || Object.getPrototypeOf(FunctionController2)).call(this, object, property));
      var _this = _this2;
      _this2.__button = document.createElement("div");
      _this2.__button.innerHTML = text === void 0 ? "Fire" : text;
      dom.bind(_this2.__button, "click", function(e) {
        e.preventDefault();
        _this.fire();
        return false;
      });
      dom.addClass(_this2.__button, "button");
      _this2.domElement.appendChild(_this2.__button);
      return _this2;
    }
    createClass(FunctionController2, [{
      key: "fire",
      value: function fire() {
        if (this.__onChange) {
          this.__onChange.call(this);
        }
        this.getValue().call(this.object);
        if (this.__onFinishChange) {
          this.__onFinishChange.call(this, this.getValue());
        }
      }
    }]);
    return FunctionController2;
  }(Controller);
  var ColorController = function(_Controller) {
    inherits(ColorController2, _Controller);
    function ColorController2(object, property) {
      classCallCheck(this, ColorController2);
      var _this2 = possibleConstructorReturn(this, (ColorController2.__proto__ || Object.getPrototypeOf(ColorController2)).call(this, object, property));
      _this2.__color = new Color(_this2.getValue());
      _this2.__temp = new Color(0);
      var _this = _this2;
      _this2.domElement = document.createElement("div");
      dom.makeSelectable(_this2.domElement, false);
      _this2.__selector = document.createElement("div");
      _this2.__selector.className = "selector";
      _this2.__saturation_field = document.createElement("div");
      _this2.__saturation_field.className = "saturation-field";
      _this2.__field_knob = document.createElement("div");
      _this2.__field_knob.className = "field-knob";
      _this2.__field_knob_border = "2px solid ";
      _this2.__hue_knob = document.createElement("div");
      _this2.__hue_knob.className = "hue-knob";
      _this2.__hue_field = document.createElement("div");
      _this2.__hue_field.className = "hue-field";
      _this2.__input = document.createElement("input");
      _this2.__input.type = "text";
      _this2.__input_textShadow = "0 1px 1px ";
      dom.bind(_this2.__input, "keydown", function(e) {
        if (e.keyCode === 13) {
          onBlur.call(this);
        }
      });
      dom.bind(_this2.__input, "blur", onBlur);
      dom.bind(_this2.__selector, "mousedown", function() {
        dom.addClass(this, "drag").bind(window, "mouseup", function() {
          dom.removeClass(_this.__selector, "drag");
        });
      });
      dom.bind(_this2.__selector, "touchstart", function() {
        dom.addClass(this, "drag").bind(window, "touchend", function() {
          dom.removeClass(_this.__selector, "drag");
        });
      });
      var valueField = document.createElement("div");
      Common.extend(_this2.__selector.style, {
        width: "122px",
        height: "102px",
        padding: "3px",
        backgroundColor: "#222",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
      });
      Common.extend(_this2.__field_knob.style, {
        position: "absolute",
        width: "12px",
        height: "12px",
        border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? "#fff" : "#000"),
        boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
        borderRadius: "12px",
        zIndex: 1
      });
      Common.extend(_this2.__hue_knob.style, {
        position: "absolute",
        width: "15px",
        height: "2px",
        borderRight: "4px solid #fff",
        zIndex: 1
      });
      Common.extend(_this2.__saturation_field.style, {
        width: "100px",
        height: "100px",
        border: "1px solid #555",
        marginRight: "3px",
        display: "inline-block",
        cursor: "pointer"
      });
      Common.extend(valueField.style, {
        width: "100%",
        height: "100%",
        background: "none"
      });
      linearGradient(valueField, "top", "rgba(0,0,0,0)", "#000");
      Common.extend(_this2.__hue_field.style, {
        width: "15px",
        height: "100px",
        border: "1px solid #555",
        cursor: "ns-resize",
        position: "absolute",
        top: "3px",
        right: "3px"
      });
      hueGradient(_this2.__hue_field);
      Common.extend(_this2.__input.style, {
        outline: "none",
        textAlign: "center",
        color: "#fff",
        border: 0,
        fontWeight: "bold",
        textShadow: _this2.__input_textShadow + "rgba(0,0,0,0.7)"
      });
      dom.bind(_this2.__saturation_field, "mousedown", fieldDown);
      dom.bind(_this2.__saturation_field, "touchstart", fieldDown);
      dom.bind(_this2.__field_knob, "mousedown", fieldDown);
      dom.bind(_this2.__field_knob, "touchstart", fieldDown);
      dom.bind(_this2.__hue_field, "mousedown", fieldDownH);
      dom.bind(_this2.__hue_field, "touchstart", fieldDownH);
      function fieldDown(e) {
        setSV(e);
        dom.bind(window, "mousemove", setSV);
        dom.bind(window, "touchmove", setSV);
        dom.bind(window, "mouseup", fieldUpSV);
        dom.bind(window, "touchend", fieldUpSV);
      }
      function fieldDownH(e) {
        setH(e);
        dom.bind(window, "mousemove", setH);
        dom.bind(window, "touchmove", setH);
        dom.bind(window, "mouseup", fieldUpH);
        dom.bind(window, "touchend", fieldUpH);
      }
      function fieldUpSV() {
        dom.unbind(window, "mousemove", setSV);
        dom.unbind(window, "touchmove", setSV);
        dom.unbind(window, "mouseup", fieldUpSV);
        dom.unbind(window, "touchend", fieldUpSV);
        onFinish();
      }
      function fieldUpH() {
        dom.unbind(window, "mousemove", setH);
        dom.unbind(window, "touchmove", setH);
        dom.unbind(window, "mouseup", fieldUpH);
        dom.unbind(window, "touchend", fieldUpH);
        onFinish();
      }
      function onBlur() {
        var i = interpret(this.value);
        if (i !== false) {
          _this.__color.__state = i;
          _this.setValue(_this.__color.toOriginal());
        } else {
          this.value = _this.__color.toString();
        }
      }
      function onFinish() {
        if (_this.__onFinishChange) {
          _this.__onFinishChange.call(_this, _this.__color.toOriginal());
        }
      }
      _this2.__saturation_field.appendChild(valueField);
      _this2.__selector.appendChild(_this2.__field_knob);
      _this2.__selector.appendChild(_this2.__saturation_field);
      _this2.__selector.appendChild(_this2.__hue_field);
      _this2.__hue_field.appendChild(_this2.__hue_knob);
      _this2.domElement.appendChild(_this2.__input);
      _this2.domElement.appendChild(_this2.__selector);
      _this2.updateDisplay();
      function setSV(e) {
        if (e.type.indexOf("touch") === -1) {
          e.preventDefault();
        }
        var fieldRect = _this.__saturation_field.getBoundingClientRect();
        var _ref = e.touches && e.touches[0] || e, clientX = _ref.clientX, clientY = _ref.clientY;
        var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
        var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
        if (v > 1) {
          v = 1;
        } else if (v < 0) {
          v = 0;
        }
        if (s > 1) {
          s = 1;
        } else if (s < 0) {
          s = 0;
        }
        _this.__color.v = v;
        _this.__color.s = s;
        _this.setValue(_this.__color.toOriginal());
        return false;
      }
      function setH(e) {
        if (e.type.indexOf("touch") === -1) {
          e.preventDefault();
        }
        var fieldRect = _this.__hue_field.getBoundingClientRect();
        var _ref2 = e.touches && e.touches[0] || e, clientY = _ref2.clientY;
        var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
        if (h > 1) {
          h = 1;
        } else if (h < 0) {
          h = 0;
        }
        _this.__color.h = h * 360;
        _this.setValue(_this.__color.toOriginal());
        return false;
      }
      return _this2;
    }
    createClass(ColorController2, [{
      key: "updateDisplay",
      value: function updateDisplay2() {
        var i = interpret(this.getValue());
        if (i !== false) {
          var mismatch = false;
          Common.each(Color.COMPONENTS, function(component) {
            if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
              mismatch = true;
              return {};
            }
          }, this);
          if (mismatch) {
            Common.extend(this.__color.__state, i);
          }
        }
        Common.extend(this.__temp.__state, this.__color.__state);
        this.__temp.a = 1;
        var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
        var _flip = 255 - flip;
        Common.extend(this.__field_knob.style, {
          marginLeft: 100 * this.__color.s - 7 + "px",
          marginTop: 100 * (1 - this.__color.v) - 7 + "px",
          backgroundColor: this.__temp.toHexString(),
          border: this.__field_knob_border + "rgb(" + flip + "," + flip + "," + flip + ")"
        });
        this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + "px";
        this.__temp.s = 1;
        this.__temp.v = 1;
        linearGradient(this.__saturation_field, "left", "#fff", this.__temp.toHexString());
        this.__input.value = this.__color.toString();
        Common.extend(this.__input.style, {
          backgroundColor: this.__color.toHexString(),
          color: "rgb(" + flip + "," + flip + "," + flip + ")",
          textShadow: this.__input_textShadow + "rgba(" + _flip + "," + _flip + "," + _flip + ",.7)"
        });
      }
    }]);
    return ColorController2;
  }(Controller);
  var vendors = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
  function linearGradient(elem, x, a, b) {
    elem.style.background = "";
    Common.each(vendors, function(vendor) {
      elem.style.cssText += "background: " + vendor + "linear-gradient(" + x + ", " + a + " 0%, " + b + " 100%); ";
    });
  }
  function hueGradient(elem) {
    elem.style.background = "";
    elem.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
    elem.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
    elem.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
    elem.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
    elem.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
  }
  var css = {
    load: function load(url, indoc) {
      var doc = indoc || document;
      var link2 = doc.createElement("link");
      link2.type = "text/css";
      link2.rel = "stylesheet";
      link2.href = url;
      doc.getElementsByTagName("head")[0].appendChild(link2);
    },
    inject: function inject(cssContent, indoc) {
      var doc = indoc || document;
      var injected = document.createElement("style");
      injected.type = "text/css";
      injected.innerHTML = cssContent;
      var head = doc.getElementsByTagName("head")[0];
      try {
        head.appendChild(injected);
      } catch (e) {
      }
    }
  };
  var saveDialogContents = `<div id="dg-save" class="dg dialogue">

  Here's the new load parameter for your <code>GUI</code>'s constructor:

  <textarea id="dg-new-constructor"></textarea>

  <div id="dg-save-locally">

    <input id="dg-local-storage" type="checkbox"/> Automatically save
    values to <code>localStorage</code> on exit.

    <div id="dg-local-explain">The values saved to <code>localStorage</code> will
      override those passed to <code>dat.GUI</code>'s constructor. This makes it
      easier to work incrementally, but <code>localStorage</code> is fragile,
      and your friends may not see the same values you do.

    </div>

  </div>

</div>`;
  var ControllerFactory = function ControllerFactory2(object, property) {
    var initialValue = object[property];
    if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
      return new OptionController(object, property, arguments[2]);
    }
    if (Common.isNumber(initialValue)) {
      if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
        if (Common.isNumber(arguments[4])) {
          return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
        }
        return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
      }
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
      }
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
    }
    if (Common.isString(initialValue)) {
      return new StringController(object, property);
    }
    if (Common.isFunction(initialValue)) {
      return new FunctionController(object, property, "");
    }
    if (Common.isBoolean(initialValue)) {
      return new BooleanController(object, property);
    }
    return null;
  };
  function requestAnimationFrame2(callback) {
    setTimeout(callback, 1e3 / 60);
  }
  var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame2;
  var CenteredDiv = function() {
    function CenteredDiv2() {
      classCallCheck(this, CenteredDiv2);
      this.backgroundElement = document.createElement("div");
      Common.extend(this.backgroundElement.style, {
        backgroundColor: "rgba(0,0,0,0.8)",
        top: 0,
        left: 0,
        display: "none",
        zIndex: "1000",
        opacity: 0,
        WebkitTransition: "opacity 0.2s linear",
        transition: "opacity 0.2s linear"
      });
      dom.makeFullscreen(this.backgroundElement);
      this.backgroundElement.style.position = "fixed";
      this.domElement = document.createElement("div");
      Common.extend(this.domElement.style, {
        position: "fixed",
        display: "none",
        zIndex: "1001",
        opacity: 0,
        WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
        transition: "transform 0.2s ease-out, opacity 0.2s linear"
      });
      document.body.appendChild(this.backgroundElement);
      document.body.appendChild(this.domElement);
      var _this = this;
      dom.bind(this.backgroundElement, "click", function() {
        _this.hide();
      });
    }
    createClass(CenteredDiv2, [{
      key: "show",
      value: function show2() {
        var _this = this;
        this.backgroundElement.style.display = "block";
        this.domElement.style.display = "block";
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
        this.layout();
        Common.defer(function() {
          _this.backgroundElement.style.opacity = 1;
          _this.domElement.style.opacity = 1;
          _this.domElement.style.webkitTransform = "scale(1)";
        });
      }
    }, {
      key: "hide",
      value: function hide3() {
        var _this = this;
        var hide4 = function hide5() {
          _this.domElement.style.display = "none";
          _this.backgroundElement.style.display = "none";
          dom.unbind(_this.domElement, "webkitTransitionEnd", hide5);
          dom.unbind(_this.domElement, "transitionend", hide5);
          dom.unbind(_this.domElement, "oTransitionEnd", hide5);
        };
        dom.bind(this.domElement, "webkitTransitionEnd", hide4);
        dom.bind(this.domElement, "transitionend", hide4);
        dom.bind(this.domElement, "oTransitionEnd", hide4);
        this.backgroundElement.style.opacity = 0;
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
      }
    }, {
      key: "layout",
      value: function layout() {
        this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + "px";
        this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + "px";
      }
    }]);
    return CenteredDiv2;
  }();
  var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");
  css.inject(styleSheet);
  var CSS_NAMESPACE = "dg";
  var HIDE_KEY_CODE = 72;
  var CLOSE_BUTTON_HEIGHT = 20;
  var DEFAULT_DEFAULT_PRESET_NAME = "Default";
  var SUPPORTS_LOCAL_STORAGE = function() {
    try {
      return !!window.localStorage;
    } catch (e) {
      return false;
    }
  }();
  var SAVE_DIALOGUE = void 0;
  var autoPlaceVirgin = true;
  var autoPlaceContainer = void 0;
  var hide = false;
  var hideableGuis = [];
  var GUI = function GUI2(pars) {
    var _this = this;
    var params = pars || {};
    this.domElement = document.createElement("div");
    this.__ul = document.createElement("ul");
    this.domElement.appendChild(this.__ul);
    dom.addClass(this.domElement, CSS_NAMESPACE);
    this.__folders = {};
    this.__controllers = [];
    this.__rememberedObjects = [];
    this.__rememberedObjectIndecesToControllers = [];
    this.__listening = [];
    params = Common.defaults(params, {
      closeOnTop: false,
      autoPlace: true,
      width: GUI2.DEFAULT_WIDTH
    });
    params = Common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });
    if (!Common.isUndefined(params.load)) {
      if (params.preset) {
        params.load.preset = params.preset;
      }
    } else {
      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
    }
    if (Common.isUndefined(params.parent) && params.hideable) {
      hideableGuis.push(this);
    }
    params.resizable = Common.isUndefined(params.parent) && params.resizable;
    if (params.autoPlace && Common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
    var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, "isLocal")) === "true";
    var saveToLocalStorage = void 0;
    var titleRow = void 0;
    Object.defineProperties(this, {
      parent: {
        get: function get$$13() {
          return params.parent;
        }
      },
      scrollable: {
        get: function get$$13() {
          return params.scrollable;
        }
      },
      autoPlace: {
        get: function get$$13() {
          return params.autoPlace;
        }
      },
      closeOnTop: {
        get: function get$$13() {
          return params.closeOnTop;
        }
      },
      preset: {
        get: function get$$13() {
          if (_this.parent) {
            return _this.getRoot().preset;
          }
          return params.load.preset;
        },
        set: function set$$13(v) {
          if (_this.parent) {
            _this.getRoot().preset = v;
          } else {
            params.load.preset = v;
          }
          setPresetSelectIndex(this);
          _this.revert();
        }
      },
      width: {
        get: function get$$13() {
          return params.width;
        },
        set: function set$$13(v) {
          params.width = v;
          setWidth(_this, v);
        }
      },
      name: {
        get: function get$$13() {
          return params.name;
        },
        set: function set$$13(v) {
          params.name = v;
          if (titleRow) {
            titleRow.innerHTML = params.name;
          }
        }
      },
      closed: {
        get: function get$$13() {
          return params.closed;
        },
        set: function set$$13(v) {
          params.closed = v;
          if (params.closed) {
            dom.addClass(_this.__ul, GUI2.CLASS_CLOSED);
          } else {
            dom.removeClass(_this.__ul, GUI2.CLASS_CLOSED);
          }
          this.onResize();
          if (_this.__closeButton) {
            _this.__closeButton.innerHTML = v ? GUI2.TEXT_OPEN : GUI2.TEXT_CLOSED;
          }
        }
      },
      load: {
        get: function get$$13() {
          return params.load;
        }
      },
      useLocalStorage: {
        get: function get$$13() {
          return useLocalStorage;
        },
        set: function set$$13(bool) {
          if (SUPPORTS_LOCAL_STORAGE) {
            useLocalStorage = bool;
            if (bool) {
              dom.bind(window, "unload", saveToLocalStorage);
            } else {
              dom.unbind(window, "unload", saveToLocalStorage);
            }
            localStorage.setItem(getLocalStorageHash(_this, "isLocal"), bool);
          }
        }
      }
    });
    if (Common.isUndefined(params.parent)) {
      this.closed = params.closed || false;
      dom.addClass(this.domElement, GUI2.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);
      if (SUPPORTS_LOCAL_STORAGE) {
        if (useLocalStorage) {
          _this.useLocalStorage = true;
          var savedGui = localStorage.getItem(getLocalStorageHash(this, "gui"));
          if (savedGui) {
            params.load = JSON.parse(savedGui);
          }
        }
      }
      this.__closeButton = document.createElement("div");
      this.__closeButton.innerHTML = GUI2.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI2.CLASS_CLOSE_BUTTON);
      if (params.closeOnTop) {
        dom.addClass(this.__closeButton, GUI2.CLASS_CLOSE_TOP);
        this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
      } else {
        dom.addClass(this.__closeButton, GUI2.CLASS_CLOSE_BOTTOM);
        this.domElement.appendChild(this.__closeButton);
      }
      dom.bind(this.__closeButton, "click", function() {
        _this.closed = !_this.closed;
      });
    } else {
      if (params.closed === void 0) {
        params.closed = true;
      }
      var titleRowName = document.createTextNode(params.name);
      dom.addClass(titleRowName, "controller-name");
      titleRow = addRow(_this, titleRowName);
      var onClickTitle = function onClickTitle2(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };
      dom.addClass(this.__ul, GUI2.CLASS_CLOSED);
      dom.addClass(titleRow, "title");
      dom.bind(titleRow, "click", onClickTitle);
      if (!params.closed) {
        this.closed = false;
      }
    }
    if (params.autoPlace) {
      if (Common.isUndefined(params.parent)) {
        if (autoPlaceVirgin) {
          autoPlaceContainer = document.createElement("div");
          dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
          dom.addClass(autoPlaceContainer, GUI2.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(autoPlaceContainer);
          autoPlaceVirgin = false;
        }
        autoPlaceContainer.appendChild(this.domElement);
        dom.addClass(this.domElement, GUI2.CLASS_AUTO_PLACE);
      }
      if (!this.parent) {
        setWidth(_this, params.width);
      }
    }
    this.__resizeHandler = function() {
      _this.onResizeDebounced();
    };
    dom.bind(window, "resize", this.__resizeHandler);
    dom.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler);
    dom.bind(this.__ul, "transitionend", this.__resizeHandler);
    dom.bind(this.__ul, "oTransitionEnd", this.__resizeHandler);
    this.onResize();
    if (params.resizable) {
      addResizeHandle(this);
    }
    saveToLocalStorage = function saveToLocalStorage2() {
      if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, "isLocal")) === "true") {
        localStorage.setItem(getLocalStorageHash(_this, "gui"), JSON.stringify(_this.getSaveObject()));
      }
    };
    this.saveToLocalStorageIfPossible = saveToLocalStorage;
    function resetWidth() {
      var root = _this.getRoot();
      root.width += 1;
      Common.defer(function() {
        root.width -= 1;
      });
    }
    if (!params.parent) {
      resetWidth();
    }
  };
  GUI.toggleHide = function() {
    hide = !hide;
    Common.each(hideableGuis, function(gui) {
      gui.domElement.style.display = hide ? "none" : "";
    });
  };
  GUI.CLASS_AUTO_PLACE = "a";
  GUI.CLASS_AUTO_PLACE_CONTAINER = "ac";
  GUI.CLASS_MAIN = "main";
  GUI.CLASS_CONTROLLER_ROW = "cr";
  GUI.CLASS_TOO_TALL = "taller-than-window";
  GUI.CLASS_CLOSED = "closed";
  GUI.CLASS_CLOSE_BUTTON = "close-button";
  GUI.CLASS_CLOSE_TOP = "close-top";
  GUI.CLASS_CLOSE_BOTTOM = "close-bottom";
  GUI.CLASS_DRAG = "drag";
  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = "Close Controls";
  GUI.TEXT_OPEN = "Open Controls";
  GUI._keydownHandler = function(e) {
    if (document.activeElement.type !== "text" && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }
  };
  dom.bind(window, "keydown", GUI._keydownHandler, false);
  Common.extend(GUI.prototype, {
    add: function add(object, property) {
      return _add(this, object, property, {
        factoryArgs: Array.prototype.slice.call(arguments, 2)
      });
    },
    addColor: function addColor(object, property) {
      return _add(this, object, property, {
        color: true
      });
    },
    remove: function remove(controller) {
      this.__ul.removeChild(controller.__li);
      this.__controllers.splice(this.__controllers.indexOf(controller), 1);
      var _this = this;
      Common.defer(function() {
        _this.onResize();
      });
    },
    destroy: function destroy() {
      if (this.parent) {
        throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");
      }
      if (this.autoPlace) {
        autoPlaceContainer.removeChild(this.domElement);
      }
      var _this = this;
      Common.each(this.__folders, function(subfolder) {
        _this.removeFolder(subfolder);
      });
      dom.unbind(window, "keydown", GUI._keydownHandler, false);
      removeListeners(this);
    },
    addFolder: function addFolder(name) {
      if (this.__folders[name] !== void 0) {
        throw new Error('You already have a folder in this GUI by the name "' + name + '"');
      }
      var newGuiParams = { name, parent: this };
      newGuiParams.autoPlace = this.autoPlace;
      if (this.load && this.load.folders && this.load.folders[name]) {
        newGuiParams.closed = this.load.folders[name].closed;
        newGuiParams.load = this.load.folders[name];
      }
      var gui = new GUI(newGuiParams);
      this.__folders[name] = gui;
      var li = addRow(this, gui.domElement);
      dom.addClass(li, "folder");
      return gui;
    },
    removeFolder: function removeFolder(folder) {
      this.__ul.removeChild(folder.domElement.parentElement);
      delete this.__folders[folder.name];
      if (this.load && this.load.folders && this.load.folders[folder.name]) {
        delete this.load.folders[folder.name];
      }
      removeListeners(folder);
      var _this = this;
      Common.each(folder.__folders, function(subfolder) {
        folder.removeFolder(subfolder);
      });
      Common.defer(function() {
        _this.onResize();
      });
    },
    open: function open() {
      this.closed = false;
    },
    close: function close() {
      this.closed = true;
    },
    hide: function hide2() {
      this.domElement.style.display = "none";
    },
    show: function show() {
      this.domElement.style.display = "";
    },
    onResize: function onResize() {
      var root = this.getRoot();
      if (root.scrollable) {
        var top = dom.getOffset(root.__ul).top;
        var h = 0;
        Common.each(root.__ul.childNodes, function(node) {
          if (!(root.autoPlace && node === root.__save_row)) {
            h += dom.getHeight(node);
          }
        });
        if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
          dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
          root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + "px";
        } else {
          dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
          root.__ul.style.height = "auto";
        }
      }
      if (root.__resize_handle) {
        Common.defer(function() {
          root.__resize_handle.style.height = root.__ul.offsetHeight + "px";
        });
      }
      if (root.__closeButton) {
        root.__closeButton.style.width = root.width + "px";
      }
    },
    onResizeDebounced: Common.debounce(function() {
      this.onResize();
    }, 50),
    remember: function remember() {
      if (Common.isUndefined(SAVE_DIALOGUE)) {
        SAVE_DIALOGUE = new CenteredDiv();
        SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
      }
      if (this.parent) {
        throw new Error("You can only call remember on a top level GUI.");
      }
      var _this = this;
      Common.each(Array.prototype.slice.call(arguments), function(object) {
        if (_this.__rememberedObjects.length === 0) {
          addSaveMenu(_this);
        }
        if (_this.__rememberedObjects.indexOf(object) === -1) {
          _this.__rememberedObjects.push(object);
        }
      });
      if (this.autoPlace) {
        setWidth(this, this.width);
      }
    },
    getRoot: function getRoot() {
      var gui = this;
      while (gui.parent) {
        gui = gui.parent;
      }
      return gui;
    },
    getSaveObject: function getSaveObject() {
      var toReturn2 = this.load;
      toReturn2.closed = this.closed;
      if (this.__rememberedObjects.length > 0) {
        toReturn2.preset = this.preset;
        if (!toReturn2.remembered) {
          toReturn2.remembered = {};
        }
        toReturn2.remembered[this.preset] = getCurrentPreset(this);
      }
      toReturn2.folders = {};
      Common.each(this.__folders, function(element, key) {
        toReturn2.folders[key] = element.getSaveObject();
      });
      return toReturn2;
    },
    save: function save() {
      if (!this.load.remembered) {
        this.load.remembered = {};
      }
      this.load.remembered[this.preset] = getCurrentPreset(this);
      markPresetModified(this, false);
      this.saveToLocalStorageIfPossible();
    },
    saveAs: function saveAs(presetName) {
      if (!this.load.remembered) {
        this.load.remembered = {};
        this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
      }
      this.load.remembered[presetName] = getCurrentPreset(this);
      this.preset = presetName;
      addPresetOption(this, presetName, true);
      this.saveToLocalStorageIfPossible();
    },
    revert: function revert(gui) {
      Common.each(this.__controllers, function(controller) {
        if (!this.getRoot().load.remembered) {
          controller.setValue(controller.initialValue);
        } else {
          recallSavedValue(gui || this.getRoot(), controller);
        }
        if (controller.__onFinishChange) {
          controller.__onFinishChange.call(controller, controller.getValue());
        }
      }, this);
      Common.each(this.__folders, function(folder) {
        folder.revert(folder);
      });
      if (!gui) {
        markPresetModified(this.getRoot(), false);
      }
    },
    listen: function listen(controller) {
      var init = this.__listening.length === 0;
      this.__listening.push(controller);
      if (init) {
        updateDisplays(this.__listening);
      }
    },
    updateDisplay: function updateDisplay() {
      Common.each(this.__controllers, function(controller) {
        controller.updateDisplay();
      });
      Common.each(this.__folders, function(folder) {
        folder.updateDisplay();
      });
    }
  });
  function addRow(gui, newDom, liBefore) {
    var li = document.createElement("li");
    if (newDom) {
      li.appendChild(newDom);
    }
    if (liBefore) {
      gui.__ul.insertBefore(li, liBefore);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }
  function removeListeners(gui) {
    dom.unbind(window, "resize", gui.__resizeHandler);
    if (gui.saveToLocalStorageIfPossible) {
      dom.unbind(window, "unload", gui.saveToLocalStorageIfPossible);
    }
  }
  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }
  function augmentController(gui, li, controller) {
    controller.__li = li;
    controller.__gui = gui;
    Common.extend(controller, {
      options: function options(_options) {
        if (arguments.length > 1) {
          var nextSibling = controller.__li.nextElementSibling;
          controller.remove();
          return _add(gui, controller.object, controller.property, {
            before: nextSibling,
            factoryArgs: [Common.toArray(arguments)]
          });
        }
        if (Common.isArray(_options) || Common.isObject(_options)) {
          var _nextSibling = controller.__li.nextElementSibling;
          controller.remove();
          return _add(gui, controller.object, controller.property, {
            before: _nextSibling,
            factoryArgs: [_options]
          });
        }
      },
      name: function name(_name) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
        return controller;
      },
      listen: function listen2() {
        controller.__gui.listen(controller);
        return controller;
      },
      remove: function remove2() {
        controller.__gui.remove(controller);
        return controller;
      }
    });
    if (controller instanceof NumberControllerSlider) {
      var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
      Common.each(["updateDisplay", "onChange", "onFinishChange", "step", "min", "max"], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pb.apply(box, args);
          return pc.apply(controller, args);
        };
      });
      dom.addClass(li, "has-slider");
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
    } else if (controller instanceof NumberControllerBox) {
      var r = function r2(returned) {
        if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
          var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
          var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
          controller.remove();
          var newController = _add(gui, controller.object, controller.property, {
            before: controller.__li.nextElementSibling,
            factoryArgs: [controller.__min, controller.__max, controller.__step]
          });
          newController.name(oldName);
          if (wasListening)
            newController.listen();
          return newController;
        }
        return returned;
      };
      controller.min = Common.compose(r, controller.min);
      controller.max = Common.compose(r, controller.max);
    } else if (controller instanceof BooleanController) {
      dom.bind(li, "click", function() {
        dom.fakeEvent(controller.__checkbox, "click");
      });
      dom.bind(controller.__checkbox, "click", function(e) {
        e.stopPropagation();
      });
    } else if (controller instanceof FunctionController) {
      dom.bind(li, "click", function() {
        dom.fakeEvent(controller.__button, "click");
      });
      dom.bind(li, "mouseover", function() {
        dom.addClass(controller.__button, "hover");
      });
      dom.bind(li, "mouseout", function() {
        dom.removeClass(controller.__button, "hover");
      });
    } else if (controller instanceof ColorController) {
      dom.addClass(li, "color");
      controller.updateDisplay = Common.compose(function(val) {
        li.style.borderLeftColor = controller.__color.toString();
        return val;
      }, controller.updateDisplay);
      controller.updateDisplay();
    }
    controller.setValue = Common.compose(function(val) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return val;
    }, controller.setValue);
  }
  function recallSavedValue(gui, controller) {
    var root = gui.getRoot();
    var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
    if (matchedIndex !== -1) {
      var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
      if (controllerMap === void 0) {
        controllerMap = {};
        root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
      }
      controllerMap[controller.property] = controller;
      if (root.load && root.load.remembered) {
        var presetMap = root.load.remembered;
        var preset = void 0;
        if (presetMap[gui.preset]) {
          preset = presetMap[gui.preset];
        } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
          preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
        } else {
          return;
        }
        if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== void 0) {
          var value = preset[matchedIndex][controller.property];
          controller.initialValue = value;
          controller.setValue(value);
        }
      }
    }
  }
  function _add(gui, object, property, params) {
    if (object[property] === void 0) {
      throw new Error('Object "' + object + '" has no property "' + property + '"');
    }
    var controller = void 0;
    if (params.color) {
      controller = new ColorController(object, property);
    } else {
      var factoryArgs = [object, property].concat(params.factoryArgs);
      controller = ControllerFactory.apply(gui, factoryArgs);
    }
    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }
    recallSavedValue(gui, controller);
    dom.addClass(controller.domElement, "c");
    var name = document.createElement("span");
    dom.addClass(name, "property-name");
    name.innerHTML = controller.property;
    var container = document.createElement("div");
    container.appendChild(name);
    container.appendChild(controller.domElement);
    var li = addRow(gui, container, params.before);
    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    if (controller instanceof ColorController) {
      dom.addClass(li, "color");
    } else {
      dom.addClass(li, _typeof(controller.getValue()));
    }
    augmentController(gui, li, controller);
    gui.__controllers.push(controller);
    return controller;
  }
  function getLocalStorageHash(gui, key) {
    return document.location.href + "." + key;
  }
  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement("option");
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }
  function showHideExplain(gui, explain) {
    explain.style.display = gui.useLocalStorage ? "block" : "none";
  }
  function addSaveMenu(gui) {
    var div = gui.__save_row = document.createElement("li");
    dom.addClass(gui.domElement, "has-save");
    gui.__ul.insertBefore(div, gui.__ul.firstChild);
    dom.addClass(div, "save-row");
    var gears = document.createElement("span");
    gears.innerHTML = "&nbsp;";
    dom.addClass(gears, "button gears");
    var button = document.createElement("span");
    button.innerHTML = "Save";
    dom.addClass(button, "button");
    dom.addClass(button, "save");
    var button2 = document.createElement("span");
    button2.innerHTML = "New";
    dom.addClass(button2, "button");
    dom.addClass(button2, "save-as");
    var button3 = document.createElement("span");
    button3.innerHTML = "Revert";
    dom.addClass(button3, "button");
    dom.addClass(button3, "revert");
    var select = gui.__preset_select = document.createElement("select");
    if (gui.load && gui.load.remembered) {
      Common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key === gui.preset);
      });
    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }
    dom.bind(select, "change", function() {
      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }
      gui.preset = this.value;
    });
    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);
    if (SUPPORTS_LOCAL_STORAGE) {
      var explain = document.getElementById("dg-local-explain");
      var localStorageCheckBox = document.getElementById("dg-local-storage");
      var saveLocally = document.getElementById("dg-save-locally");
      saveLocally.style.display = "block";
      if (localStorage.getItem(getLocalStorageHash(gui, "isLocal")) === "true") {
        localStorageCheckBox.setAttribute("checked", "checked");
      }
      showHideExplain(gui, explain);
      dom.bind(localStorageCheckBox, "change", function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain(gui, explain);
      });
    }
    var newConstructorTextArea = document.getElementById("dg-new-constructor");
    dom.bind(newConstructorTextArea, "keydown", function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
        SAVE_DIALOGUE.hide();
      }
    });
    dom.bind(gears, "click", function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), void 0, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });
    dom.bind(button, "click", function() {
      gui.save();
    });
    dom.bind(button2, "click", function() {
      var presetName = prompt("Enter a new preset name.");
      if (presetName) {
        gui.saveAs(presetName);
      }
    });
    dom.bind(button3, "click", function() {
      gui.revert();
    });
  }
  function addResizeHandle(gui) {
    var pmouseX = void 0;
    gui.__resize_handle = document.createElement("div");
    Common.extend(gui.__resize_handle.style, {
      width: "6px",
      marginLeft: "-3px",
      height: "200px",
      cursor: "ew-resize",
      position: "absolute"
    });
    function drag(e) {
      e.preventDefault();
      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;
      return false;
    }
    function dragStop() {
      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, "mousemove", drag);
      dom.unbind(window, "mouseup", dragStop);
    }
    function dragStart(e) {
      e.preventDefault();
      pmouseX = e.clientX;
      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, "mousemove", drag);
      dom.bind(window, "mouseup", dragStop);
      return false;
    }
    dom.bind(gui.__resize_handle, "mousedown", dragStart);
    dom.bind(gui.__closeButton, "mousedown", dragStart);
    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
  }
  function setWidth(gui, w) {
    gui.domElement.style.width = w + "px";
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + "px";
    }
    if (gui.__closeButton) {
      gui.__closeButton.style.width = w + "px";
    }
  }
  function getCurrentPreset(gui, useInitialValues) {
    var toReturn2 = {};
    Common.each(gui.__rememberedObjects, function(val, index) {
      var savedValues = {};
      var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
      Common.each(controllerMap, function(controller, property) {
        savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });
      toReturn2[index] = savedValues;
    });
    return toReturn2;
  }
  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value === gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }
  function updateDisplays(controllerArray) {
    if (controllerArray.length !== 0) {
      requestAnimationFrame$1.call(window, function() {
        updateDisplays(controllerArray);
      });
    }
    Common.each(controllerArray, function(c) {
      c.updateDisplay();
    });
  }
  var GUI$1 = GUI;

  // ../common/webgl.ts
  var GL_DEPTH_BUFFER_BIT = 256;
  var GL_COLOR_BUFFER_BIT = 16384;
  var GL_TRIANGLE_STRIP = 5;
  var GL_SRC_ALPHA = 770;
  var GL_ONE_MINUS_SRC_ALPHA = 771;
  var GL_STATIC_DRAW = 35044;
  var GL_STREAM_DRAW = 35040;
  var GL_ARRAY_BUFFER = 34962;
  var GL_CULL_FACE = 2884;
  var GL_BLEND = 3042;
  var GL_DEPTH_TEST = 2929;
  var GL_RGBA = 6408;
  var GL_PIXEL_UNSIGNED_BYTE = 5121;
  var GL_FRAGMENT_SHADER = 35632;
  var GL_VERTEX_SHADER = 35633;
  var GL_NEAREST = 9728;
  var GL_TEXTURE_MAG_FILTER = 10240;
  var GL_TEXTURE_MIN_FILTER = 10241;
  var GL_TEXTURE_WRAP_S = 10242;
  var GL_TEXTURE_WRAP_T = 10243;
  var GL_TEXTURE_2D = 3553;
  var GL_TEXTURE0 = 33984;
  var GL_REPEAT = 10497;
  var GL_FRAMEBUFFER = 36160;
  var GL_UNPACK_FLIP_Y_WEBGL = 37440;
  var GL_FLOAT = 5126;

  // ../common/game.ts
  var update_span = document.getElementById("update");
  var delta_span = document.getElementById("delta");
  var fps_span = document.getElementById("fps");
  var step = 1 / 60;
  var GameImpl = class {
    constructor() {
      this.Running = 0;
      this.Now = 0;
      this.ViewportWidth = window.innerWidth;
      this.ViewportHeight = window.innerHeight;
      this.ViewportResized = true;
      this.InputState = {
        MouseX: 0,
        MouseY: 0
      };
      this.InputDelta = {
        MouseX: 0,
        MouseY: 0,
        WheelY: 0
      };
      this.InputDistance = {
        Mouse: 0,
        Mouse0: 0,
        Mouse1: 0,
        Mouse2: 0,
        Touch0: 0,
        Touch1: 0
      };
      this.InputTouches = {};
      this.Ui = document.querySelector("main");
      document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
      this.Ui.addEventListener("contextmenu", (evt) => evt.preventDefault());
      this.Ui.addEventListener("mousedown", (evt) => {
        this.InputState[`Mouse${evt.button}`] = 1;
        this.InputDelta[`Mouse${evt.button}`] = 1;
      });
      this.Ui.addEventListener("mouseup", (evt) => {
        this.InputState[`Mouse${evt.button}`] = 0;
        this.InputDelta[`Mouse${evt.button}`] = -1;
      });
      this.Ui.addEventListener("mousemove", (evt) => {
        this.InputDelta["MouseX"] = evt.clientX - this.InputState["MouseX"];
        this.InputDelta["MouseY"] = evt.clientY - this.InputState["MouseY"];
        this.InputState["MouseX"] = evt.clientX;
        this.InputState["MouseY"] = evt.clientY;
      });
      this.Ui.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        this.InputDelta["WheelY"] = evt.deltaY;
      });
      this.Ui.addEventListener("touchstart", (evt) => {
        if (evt.target === this.Ui) {
          evt.preventDefault();
        }
        if (evt.touches.length === 1) {
          this.InputTouches = {};
        }
        for (let i = 0; i < evt.touches.length; i++) {
          let touch = evt.touches[i];
          this.InputTouches[touch.identifier] = i;
        }
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputState[`Touch${index}`] = 1;
          this.InputState[`Touch${index}X`] = touch.clientX;
          this.InputState[`Touch${index}Y`] = touch.clientY;
          this.InputDelta[`Touch${index}`] = 1;
          this.InputDelta[`Touch${index}X`] = 0;
          this.InputDelta[`Touch${index}Y`] = 0;
        }
      });
      this.Ui.addEventListener("touchmove", (evt) => {
        if (evt.target === this.Ui) {
          evt.preventDefault();
        }
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputDelta[`Touch${index}X`] = touch.clientX - this.InputState[`Touch${index}X`];
          this.InputDelta[`Touch${index}Y`] = touch.clientY - this.InputState[`Touch${index}Y`];
          this.InputState[`Touch${index}X`] = touch.clientX;
          this.InputState[`Touch${index}Y`] = touch.clientY;
        }
      });
      this.Ui.addEventListener("touchend", (evt) => {
        if (evt.target === this.Ui) {
          evt.preventDefault();
        }
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputState[`Touch${index}`] = 0;
          this.InputDelta[`Touch${index}`] = -1;
        }
      });
      this.Ui.addEventListener("touchcancel", (evt) => {
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputState[`Touch${index}`] = 0;
          this.InputDelta[`Touch${index}`] = -1;
        }
      });
      window.addEventListener("keydown", (evt) => {
        if (!evt.repeat) {
          this.InputState[evt.code] = 1;
          this.InputDelta[evt.code] = 1;
        }
      });
      window.addEventListener("keyup", (evt) => {
        this.InputState[evt.code] = 0;
        this.InputDelta[evt.code] = -1;
      });
    }
    Start() {
      let accumulator = 0;
      let last = performance.now();
      let tick = (now) => {
        let delta = (now - last) / 1e3;
        last = now;
        this.Running = requestAnimationFrame(tick);
        this.FrameSetup(delta);
        accumulator += delta;
        while (accumulator >= step) {
          accumulator -= step;
          this.FixedUpdate(step);
          this.InputReset();
        }
        this.FrameUpdate(delta);
        this.FrameReset(delta);
      };
      this.Stop();
      tick(last);
    }
    Stop() {
      cancelAnimationFrame(this.Running);
      this.Running = 0;
    }
    FrameSetup(delta) {
      this.Now = performance.now();
      let mouse_distance = Math.abs(this.InputDelta["MouseX"]) + Math.abs(this.InputDelta["MouseY"]);
      this.InputDistance["Mouse"] += mouse_distance;
      if (this.InputState["Mouse0"] === 1) {
        this.InputDistance["Mouse0"] += mouse_distance;
      }
      if (this.InputState["Mouse1"] === 1) {
        this.InputDistance["Mouse1"] += mouse_distance;
      }
      if (this.InputState["Mouse2"] === 1) {
        this.InputDistance["Mouse2"] += mouse_distance;
      }
      if (this.InputState["Touch0"] === 1) {
        this.InputDistance["Touch0"] += Math.abs(this.InputDelta["Touch0X"]) + Math.abs(this.InputDelta["Touch0Y"]);
      }
      if (this.InputState["Touch1"] === 1) {
        this.InputDistance["Touch1"] += Math.abs(this.InputDelta["Touch1X"]) + Math.abs(this.InputDelta["Touch1Y"]);
      }
    }
    FixedUpdate(step2) {
    }
    FrameUpdate(delta) {
    }
    InputReset() {
      if (this.InputDelta["Mouse0"] === -1) {
        this.InputDistance["Mouse0"] = 0;
      }
      if (this.InputDelta["Mouse1"] === -1) {
        this.InputDistance["Mouse1"] = 0;
      }
      if (this.InputDelta["Mouse2"] === -1) {
        this.InputDistance["Mouse2"] = 0;
      }
      if (this.InputDelta["Touch0"] === -1) {
        this.InputDistance["Touch0"] = 0;
      }
      if (this.InputDelta["Touch1"] === -1) {
        this.InputDistance["Touch1"] = 0;
      }
      for (let name in this.InputDelta) {
        this.InputDelta[name] = 0;
      }
    }
    FrameReset(delta) {
      this.ViewportResized = false;
      let update11 = performance.now() - this.Now;
      if (update_span) {
        update_span.textContent = update11.toFixed(1);
      }
      if (delta_span) {
        delta_span.textContent = (delta * 1e3).toFixed(1);
      }
      if (fps_span) {
        fps_span.textContent = (1 / delta).toFixed();
      }
    }
  };
  var Game3D = class extends GameImpl {
    constructor() {
      super();
      this.Canvas2D = document.querySelector("#billboard");
      this.Context2D = this.Canvas2D.getContext("2d");
      this.Canvas3D = document.querySelector("#scene");
      this.Gl = this.Canvas3D.getContext("webgl2");
      this.Audio = new AudioContext();
      this.Cameras = [];
      this.Targets = {};
      this.Gl.enable(GL_DEPTH_TEST);
      this.Gl.enable(GL_CULL_FACE);
      this.Gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    }
  };
  function instantiate(game2, blueprint) {
    let entity = game2.World.CreateEntity();
    for (let mixin of blueprint) {
      mixin(game2, entity);
    }
    return entity;
  }

  // ../common/texture.ts
  function fetch_image(path) {
    return new Promise((resolve) => {
      let image = new Image();
      image.src = path;
      image.onload = () => resolve(image);
    });
  }
  function create_texture_from(gl, image) {
    let texture = gl.createTexture();
    gl.bindTexture(GL_TEXTURE_2D, texture);
    gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, GL_RGBA, GL_PIXEL_UNSIGNED_BYTE, image);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    return {
      Texture: texture,
      Width: image.width,
      Height: image.height
    };
  }

  // ../common/mat2d.ts
  function create() {
    return [1, 0, 0, 1, 0, 0];
  }
  function invert(out, a) {
    let aa = a[0], ab2 = a[1], ac2 = a[2], ad = a[3];
    let atx = a[4], aty = a[5];
    let det = aa * ad - ab2 * ac2;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = ad * det;
    out[1] = -ab2 * det;
    out[2] = -ac2 * det;
    out[3] = aa * det;
    out[4] = (ac2 * aty - ad * atx) * det;
    out[5] = (ab2 * atx - aa * aty) * det;
    return out;
  }
  function multiply(out, a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
  }
  function compose2(out, v, r, s) {
    let sin = Math.sin(r);
    let cos = Math.cos(r);
    out[0] = cos * s[0];
    out[1] = sin * s[0];
    out[2] = -sin * s[1];
    out[3] = cos * s[1];
    out[4] = v[0];
    out[5] = v[1];
    return out;
  }
  function get_translation(out, a) {
    out[0] = a[4];
    out[1] = a[5];
    return out;
  }
  function transform_point(out, a, m) {
    let x = a[0];
    let y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }

  // ../common/world.ts
  var WorldImpl = class {
    constructor(capacity = 1e4) {
      this.Signature = [];
      this.Graveyard = [];
      this.Capacity = capacity;
    }
    CreateEntity() {
      if (this.Graveyard.length > 0) {
        return this.Graveyard.pop();
      }
      if (false) {
        throw new Error("No more entities available.");
      }
      return this.Signature.push(0) - 1;
    }
    DestroyEntity(entity) {
      this.Signature[entity] = 0;
      if (false) {
        throw new Error("Entity already in graveyard.");
      }
      this.Graveyard.push(entity);
    }
  };

  // ../src/world.ts
  var World = class extends WorldImpl {
    constructor() {
      super(...arguments);
      this.AnimateSprite = [];
      this.Camera = [];
      this.CollideDynamic = [];
      this.CollideStatic = [];
      this.ControlAlways2D = [];
      this.ControlPlayer = [];
      this.ControlProcess = [];
      this.Children = [];
      this.Move2D = [];
      this.Render2D = [];
      this.RigidBody2D = [];
      this.Shake = [];
      this.Spawn = [];
      this.Transform2D = [];
    }
  };

  // ../src/components/com_children.ts
  function children(...blueprints) {
    return (game2, entity) => {
      if (game2.World.Signature[entity] & 128 /* Children */) {
      } else {
        game2.World.Signature[entity] |= 128 /* Children */;
        game2.World.Children[entity] = {
          Children: []
        };
      }
      let child_entities = game2.World.Children[entity].Children;
      for (let blueprint of blueprints) {
        let child = instantiate(game2, blueprint);
        child_entities.push(child);
      }
    };
  }
  function destroy_all(world, entity) {
    if (world.Signature[entity] & 128 /* Children */) {
      for (let child of world.Children[entity].Children) {
        destroy_all(world, child);
      }
    }
    world.DestroyEntity(entity);
  }

  // ../common/material.ts
  function link(gl, vertex2, fragment2) {
    let program = gl.createProgram();
    gl.attachShader(program, compile(gl, GL_VERTEX_SHADER, vertex2));
    gl.attachShader(program, compile(gl, GL_FRAGMENT_SHADER, fragment2));
    gl.linkProgram(program);
    if (false) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }
  function compile(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (false) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  // ../src/materials/mat_instanced2d.ts
  var vertex = `#version 300 es

    uniform mat4 pv;
    uniform vec2 sheet_size;

    // Vertex attributes
    in vec4 attr_position;
    in vec2 attr_texcoord;

    // Instance attributes
    in vec4 attr_rotation; // [a, b, c, d]
    in vec4 attr_translation; // [x, y, z, w: Has.Render]
    in vec4 attr_color;
    in vec4 attr_sprite;

    out vec2 vert_texcoord;
    out vec4 vert_color;
    out vec4 vert_sprite;

    void main() {
        mat4 world = mat4(
            attr_rotation.xy, 0, 0,
            attr_rotation.zw, 0, 0,
            0, 0, 1, 0,
            attr_translation.xyz, 1
        );

        vec4 world_position = world * attr_position;
        gl_Position = pv * world_position;
        if (attr_translation.w == 0.0) {
            gl_Position.z = 2.0;
        }


        // attr_texcoords are +Y=down for compatibility with spritesheet frame coordinates.
        vert_texcoord = (attr_sprite.xy + attr_sprite.zw * attr_texcoord) / sheet_size;
        vert_texcoord.y *= -1.0;
        vert_color = attr_color;
    }
`;
  var fragment = `#version 300 es

    precision mediump float;

    uniform sampler2D sheet_texture;

    in vec2 vert_texcoord;
    in vec4 vert_color;

    out vec4 frag_color;

    void main() {
        frag_color = vert_color * texture(sheet_texture, vert_texcoord);
        if (frag_color.a == 0.0) {
            discard;
        }
    }
`;
  function mat_instanced2d(gl) {
    let program = link(gl, vertex, fragment);
    return {
      Mode: GL_TRIANGLE_STRIP,
      Program: program,
      Locations: {
        Pv: gl.getUniformLocation(program, "pv"),
        World: gl.getUniformLocation(program, "world"),
        SheetTexture: gl.getUniformLocation(program, "sheet_texture"),
        SheetSize: gl.getUniformLocation(program, "sheet_size"),
        VertexPosition: gl.getAttribLocation(program, "attr_position"),
        VertexTexcoord: gl.getAttribLocation(program, "attr_texcoord"),
        InstanceRotation: gl.getAttribLocation(program, "attr_rotation"),
        InstanceTranslation: gl.getAttribLocation(program, "attr_translation"),
        InstanceColor: gl.getAttribLocation(program, "attr_color"),
        InstanceSprite: gl.getAttribLocation(program, "attr_sprite")
      }
    };
  }

  // ../common/number.ts
  function clamp(min, max, num) {
    return Math.max(min, Math.min(max, num));
  }
  function map_range(value, old_min, old_max, new_min, new_max) {
    return (value - old_min) / (old_max - old_min) * (new_max - new_min) + new_min;
  }

  // ../textures/spritesheet.json
  var spritesheet_exports = {};
  __export(spritesheet_exports, {
    "../assets/deska1.png": () => ___assets_deska1_png,
    "../assets/deska2.png": () => ___assets_deska2_png,
    "../assets/garnek21.png": () => ___assets_garnek21_png,
    "../assets/garnek22.png": () => ___assets_garnek22_png,
    "../assets/garnek23.png": () => ___assets_garnek23_png,
    "../assets/garnek24.png": () => ___assets_garnek24_png,
    "../assets/garnek2_front.png": () => ___assets_garnek2_front_png,
    "../assets/groszek_obrany.png": () => ___assets_groszek_obrany_png,
    "../assets/groszek_surowy.png": () => ___assets_groszek_surowy_png,
    "../assets/groszek_ugotowany.png": () => ___assets_groszek_ugotowany_png,
    "../assets/jablko_kawalek1.png": () => ___assets_jablko_kawalek1_png,
    "../assets/jablko_kawalek2.png": () => ___assets_jablko_kawalek2_png,
    "../assets/jablko_obrane.png": () => ___assets_jablko_obrane_png,
    "../assets/jablko_surowe.png": () => ___assets_jablko_surowe_png,
    "../assets/karton.png": () => ___assets_karton_png,
    "../assets/karton_front.png": () => ___assets_karton_front_png,
    "../assets/marchewka_kawalek1.png": () => ___assets_marchewka_kawalek1_png,
    "../assets/marchewka_kawalek2.png": () => ___assets_marchewka_kawalek2_png,
    "../assets/marchewka_obrana.png": () => ___assets_marchewka_obrana_png,
    "../assets/marchewka_obrana_ugotowana.png": () => ___assets_marchewka_obrana_ugotowana_png,
    "../assets/marchewka_surowa.png": () => ___assets_marchewka_surowa_png,
    "../assets/marchewka_ugotowana.png": () => ___assets_marchewka_ugotowana_png,
    "../assets/miska.png": () => ___assets_miska_png,
    "../assets/miska_front.png": () => ___assets_miska_front_png,
    "../assets/obieraczka.png": () => ___assets_obieraczka_png,
    "../assets/obieraczka_front.png": () => ___assets_obieraczka_front_png,
    "../assets/sloik.png": () => ___assets_sloik_png,
    "../assets/szatkownica.png": () => ___assets_szatkownica_png,
    "../assets/szatkownica_front.png": () => ___assets_szatkownica_front_png,
    "../assets/ziemniak_kawalek1.png": () => ___assets_ziemniak_kawalek1_png,
    "../assets/ziemniak_kawalek2.png": () => ___assets_ziemniak_kawalek2_png,
    "../assets/ziemniak_obrany.png": () => ___assets_ziemniak_obrany_png,
    "../assets/ziemniak_obrany_ugotowany.png": () => ___assets_ziemniak_obrany_ugotowany_png,
    "../assets/ziemniak_surowy.png": () => ___assets_ziemniak_surowy_png,
    "../assets/ziemniak_ugotowany.png": () => ___assets_ziemniak_ugotowany_png,
    default: () => spritesheet_default
  });
  var ___assets_deska1_png = {
    x: 384,
    y: 96,
    width: 128,
    height: 32
  };
  var ___assets_deska2_png = {
    x: 384,
    y: 128,
    width: 128,
    height: 32
  };
  var ___assets_garnek21_png = {
    x: 0,
    y: 0,
    width: 128,
    height: 96
  };
  var ___assets_garnek22_png = {
    x: 128,
    y: 0,
    width: 128,
    height: 96
  };
  var ___assets_garnek23_png = {
    x: 0,
    y: 96,
    width: 128,
    height: 96
  };
  var ___assets_garnek24_png = {
    x: 128,
    y: 96,
    width: 128,
    height: 96
  };
  var ___assets_garnek2_front_png = {
    x: 256,
    y: 0,
    width: 128,
    height: 96
  };
  var ___assets_groszek_obrany_png = {
    x: 384,
    y: 288,
    width: 16,
    height: 16
  };
  var ___assets_groszek_surowy_png = {
    x: 448,
    y: 160,
    width: 32,
    height: 32
  };
  var ___assets_groszek_ugotowany_png = {
    x: 480,
    y: 160,
    width: 32,
    height: 32
  };
  var ___assets_jablko_kawalek1_png = {
    x: 400,
    y: 288,
    width: 16,
    height: 16
  };
  var ___assets_jablko_kawalek2_png = {
    x: 416,
    y: 288,
    width: 16,
    height: 16
  };
  var ___assets_jablko_obrane_png = {
    x: 448,
    y: 192,
    width: 32,
    height: 32
  };
  var ___assets_jablko_surowe_png = {
    x: 480,
    y: 192,
    width: 32,
    height: 32
  };
  var ___assets_karton_png = {
    x: 256,
    y: 96,
    width: 128,
    height: 96
  };
  var ___assets_karton_front_png = {
    x: 0,
    y: 192,
    width: 128,
    height: 96
  };
  var ___assets_marchewka_kawalek1_png = {
    x: 432,
    y: 288,
    width: 16,
    height: 16
  };
  var ___assets_marchewka_kawalek2_png = {
    x: 448,
    y: 288,
    width: 16,
    height: 16
  };
  var ___assets_marchewka_obrana_png = {
    x: 384,
    y: 224,
    width: 32,
    height: 32
  };
  var ___assets_marchewka_obrana_ugotowana_png = {
    x: 416,
    y: 224,
    width: 32,
    height: 32
  };
  var ___assets_marchewka_surowa_png = {
    x: 448,
    y: 224,
    width: 32,
    height: 32
  };
  var ___assets_marchewka_ugotowana_png = {
    x: 480,
    y: 224,
    width: 32,
    height: 32
  };
  var ___assets_miska_png = {
    x: 128,
    y: 192,
    width: 128,
    height: 96
  };
  var ___assets_miska_front_png = {
    x: 256,
    y: 192,
    width: 128,
    height: 96
  };
  var ___assets_obieraczka_png = {
    x: 0,
    y: 288,
    width: 128,
    height: 96
  };
  var ___assets_obieraczka_front_png = {
    x: 128,
    y: 288,
    width: 128,
    height: 96
  };
  var ___assets_sloik_png = {
    x: 384,
    y: 160,
    width: 64,
    height: 64
  };
  var ___assets_szatkownica_png = {
    x: 256,
    y: 288,
    width: 128,
    height: 96
  };
  var ___assets_szatkownica_front_png = {
    x: 384,
    y: 0,
    width: 128,
    height: 96
  };
  var ___assets_ziemniak_kawalek1_png = {
    x: 464,
    y: 288,
    width: 16,
    height: 16
  };
  var ___assets_ziemniak_kawalek2_png = {
    x: 480,
    y: 288,
    width: 16,
    height: 16
  };
  var ___assets_ziemniak_obrany_png = {
    x: 384,
    y: 256,
    width: 32,
    height: 32
  };
  var ___assets_ziemniak_obrany_ugotowany_png = {
    x: 416,
    y: 256,
    width: 32,
    height: 32
  };
  var ___assets_ziemniak_surowy_png = {
    x: 448,
    y: 256,
    width: 32,
    height: 32
  };
  var ___assets_ziemniak_ugotowany_png = {
    x: 480,
    y: 256,
    width: 32,
    height: 32
  };
  var spritesheet_default = {
    "../assets/deska1.png": ___assets_deska1_png,
    "../assets/deska2.png": ___assets_deska2_png,
    "../assets/garnek21.png": ___assets_garnek21_png,
    "../assets/garnek22.png": ___assets_garnek22_png,
    "../assets/garnek23.png": ___assets_garnek23_png,
    "../assets/garnek24.png": ___assets_garnek24_png,
    "../assets/garnek2_front.png": ___assets_garnek2_front_png,
    "../assets/groszek_obrany.png": ___assets_groszek_obrany_png,
    "../assets/groszek_surowy.png": ___assets_groszek_surowy_png,
    "../assets/groszek_ugotowany.png": ___assets_groszek_ugotowany_png,
    "../assets/jablko_kawalek1.png": ___assets_jablko_kawalek1_png,
    "../assets/jablko_kawalek2.png": ___assets_jablko_kawalek2_png,
    "../assets/jablko_obrane.png": ___assets_jablko_obrane_png,
    "../assets/jablko_surowe.png": ___assets_jablko_surowe_png,
    "../assets/karton.png": ___assets_karton_png,
    "../assets/karton_front.png": ___assets_karton_front_png,
    "../assets/marchewka_kawalek1.png": ___assets_marchewka_kawalek1_png,
    "../assets/marchewka_kawalek2.png": ___assets_marchewka_kawalek2_png,
    "../assets/marchewka_obrana.png": ___assets_marchewka_obrana_png,
    "../assets/marchewka_obrana_ugotowana.png": ___assets_marchewka_obrana_ugotowana_png,
    "../assets/marchewka_surowa.png": ___assets_marchewka_surowa_png,
    "../assets/marchewka_ugotowana.png": ___assets_marchewka_ugotowana_png,
    "../assets/miska.png": ___assets_miska_png,
    "../assets/miska_front.png": ___assets_miska_front_png,
    "../assets/obieraczka.png": ___assets_obieraczka_png,
    "../assets/obieraczka_front.png": ___assets_obieraczka_front_png,
    "../assets/sloik.png": ___assets_sloik_png,
    "../assets/szatkownica.png": ___assets_szatkownica_png,
    "../assets/szatkownica_front.png": ___assets_szatkownica_front_png,
    "../assets/ziemniak_kawalek1.png": ___assets_ziemniak_kawalek1_png,
    "../assets/ziemniak_kawalek2.png": ___assets_ziemniak_kawalek2_png,
    "../assets/ziemniak_obrany.png": ___assets_ziemniak_obrany_png,
    "../assets/ziemniak_obrany_ugotowany.png": ___assets_ziemniak_obrany_ugotowany_png,
    "../assets/ziemniak_surowy.png": ___assets_ziemniak_surowy_png,
    "../assets/ziemniak_ugotowany.png": ___assets_ziemniak_ugotowany_png
  };

  // ../src/components/com_render2d.ts
  var spritesheet = spritesheet_exports;
  function render2d(sprite_name, color = [1, 1, 1, 1]) {
    let sprite_path = "../assets/" + sprite_name + ".png";
    return (game2, entity) => {
      let instance_offset = entity * FLOATS_PER_INSTANCE;
      game2.InstanceData[instance_offset + 6] = map_range(entity, 0, game2.World.Capacity, 1, 0);
      game2.InstanceData[instance_offset + 7] = 1;
      game2.InstanceData[instance_offset + 8] = color[0];
      game2.InstanceData[instance_offset + 9] = color[1];
      game2.InstanceData[instance_offset + 10] = color[2];
      game2.InstanceData[instance_offset + 11] = color[3];
      game2.InstanceData[instance_offset + 12] = spritesheet[sprite_path].x;
      game2.InstanceData[instance_offset + 13] = spritesheet[sprite_path].y;
      game2.InstanceData[instance_offset + 14] = spritesheet[sprite_path].width;
      game2.InstanceData[instance_offset + 15] = spritesheet[sprite_path].height;
      game2.World.Signature[entity] |= 2048 /* Render2D */;
      game2.World.Render2D[entity] = {
        Detail: game2.InstanceData.subarray(instance_offset + 6, instance_offset + 8),
        Color: game2.InstanceData.subarray(instance_offset + 8, instance_offset + 12),
        Sprite: game2.InstanceData.subarray(instance_offset + 12, instance_offset + 16)
      };
    };
  }
  function order(z) {
    return (game2, entity) => {
      let instance_offset = entity * FLOATS_PER_INSTANCE;
      game2.InstanceData[instance_offset + 6] = z;
    };
  }
  function set_sprite(game2, entity, sprite_name) {
    let sprite_path = "../assets/" + sprite_name + ".png";
    let instance_offset = entity * FLOATS_PER_INSTANCE;
    game2.InstanceData[instance_offset + 12] = spritesheet[sprite_path].x;
    game2.InstanceData[instance_offset + 13] = spritesheet[sprite_path].y;
    game2.InstanceData[instance_offset + 14] = spritesheet[sprite_path].width;
    game2.InstanceData[instance_offset + 15] = spritesheet[sprite_path].height;
  }
  function set_color(game2, entity, color) {
    let instance_offset = entity * FLOATS_PER_INSTANCE;
    game2.InstanceData[instance_offset + 8] = color[0];
    game2.InstanceData[instance_offset + 9] = color[1];
    game2.InstanceData[instance_offset + 10] = color[2];
    game2.InstanceData[instance_offset + 11] = color[3];
  }

  // ../src/systems/sys_animate_sprite.ts
  var QUERY = 1 /* AnimateSprite */ | 2048 /* Render2D */;
  function sys_animate_sprite(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY) === QUERY) {
        update(game2, i, delta);
      }
    }
  }
  function update(game2, entity, delta) {
    let animate = game2.World.AnimateSprite[entity];
    for (let frame_name in animate.Frames) {
      let frame_timestamp = animate.Frames[frame_name];
      if (animate.Time < frame_timestamp) {
        set_sprite(game2, entity, frame_name);
        break;
      }
    }
    animate.Time += delta;
    if (animate.Time >= animate.Duration) {
      animate.Time -= animate.Duration;
    }
  }

  // ../common/vec3.ts
  function transform_position(out, a, m) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15] || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }

  // ../common/mat4.ts
  function create2() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  function invert2(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function multiply2(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function from_ortho(out, top, right, bottom, left, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }

  // ../src/components/com_camera.ts
  function camera_canvas(projection, clear_color = [0.9, 0.9, 0.9, 1], clear_mask = GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 2 /* Camera */;
      game2.World.Camera[entity] = {
        Kind: 0 /* Canvas */,
        Projection: projection,
        View: create2(),
        Pv: create2(),
        Position: [0, 0, 0],
        FogColor: clear_color,
        FogDistance: projection.Far,
        ClearColor: clear_color,
        ClearMask: clear_mask
      };
    };
  }

  // ../src/systems/sys_camera2d.ts
  var QUERY2 = 32768 /* Transform2D */ | 2 /* Camera */;
  var CAMERA_Z = 2;
  function sys_camera2d(game2, delta) {
    game2.Cameras = [];
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY2) === QUERY2) {
        let camera = game2.World.Camera[i];
        if (camera.Kind !== 0 /* Canvas */) {
          throw new Error("Only canvas cameras are supported.");
        }
        let projection = camera.Projection;
        let transform2d2 = game2.World.Transform2D[i];
        camera.View[0] = transform2d2.Self[0];
        camera.View[1] = transform2d2.Self[1];
        camera.View[4] = transform2d2.Self[2];
        camera.View[5] = transform2d2.Self[3];
        camera.View[12] = transform2d2.Self[4];
        camera.View[13] = transform2d2.Self[5];
        camera.View[14] = -CAMERA_Z;
        multiply2(camera.Pv, projection.Projection, camera.View);
        camera.Position[0] = transform2d2.World[4];
        camera.Position[1] = transform2d2.World[5];
        camera.Position[2] = CAMERA_Z;
        game2.Cameras.push(i);
      }
    }
  }

  // ../common/vec2.ts
  function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  function add2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }
  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  }
  function normalize2(out, a) {
    let x = a[0];
    let y = a[1];
    let len = x * x + y * y;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function transform_direction(out, a, m) {
    let x = a[0];
    let y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }
  function length(a) {
    return Math.hypot(a[0], a[1]);
  }
  function distance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    return Math.hypot(x, y);
  }
  function distance_squared(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    return x * x + y * y;
  }

  // ../src/systems/sys_collide2d.ts
  var QUERY_DYNAMIC = 32768 /* Transform2D */ | 4 /* CollideDynamic */;
  var QUERY_STATIC = 32768 /* Transform2D */ | 8 /* CollideStatic */;
  var closest_point = [0, 0];
  function sys_collide2d(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY_DYNAMIC) === QUERY_DYNAMIC) {
        let transform = game2.World.Transform2D[ent];
        let collider = game2.World.CollideDynamic[ent];
        get_translation(collider.Center, transform.World);
        collider.ContactId = null;
      }
    }
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY_STATIC) === QUERY_STATIC) {
        let transform = game2.World.Transform2D[ent];
        let collider = game2.World.CollideStatic[ent];
        get_translation(collider.Center, transform.World);
        if (collider.Length > 0) {
          transform_point(collider.Base, [0, -collider.Length / 2], transform.World);
          transform_point(collider.Tip, [0, collider.Length / 2], transform.World);
        } else {
          transform_point(collider.Base, [collider.Length / 2, 0], transform.World);
          transform_point(collider.Tip, [-collider.Length / 2, 0], transform.World);
        }
        for (let oth = 0; oth < game2.World.Signature.length; oth++) {
          if ((game2.World.Signature[oth] & QUERY_DYNAMIC) === QUERY_DYNAMIC) {
            let other_collider = game2.World.CollideDynamic[oth];
            if (other_collider.Mask & collider.Layer) {
              closest_point_on_section(closest_point, collider.Base, collider.Tip, other_collider.Center);
              if (distance_squared(closest_point, other_collider.Center) < (collider.Radius + other_collider.Radius) ** 2) {
                other_collider.ContactId = ent;
                subtract(other_collider.ContactNormal, other_collider.Center, closest_point);
                normalize2(other_collider.ContactNormal, other_collider.ContactNormal);
                other_collider.ContactDepth = collider.Radius + other_collider.Radius - distance(closest_point, other_collider.Center);
              }
            }
          }
        }
      }
    }
  }
  var ab = [0, 0];
  var ac = [0, 0];
  var bc = [0, 0];
  function closest_point_on_section(out, base, tip, point) {
    subtract(ab, tip, base);
    subtract(ac, point, base);
    subtract(bc, point, tip);
    let t = dot(ac, ab);
    if (t <= 0) {
      t = 0;
      copy(out, base);
    } else {
      let denom = dot(ab, ab);
      if (t >= denom) {
        t = 1;
        copy(out, tip);
      } else {
        t = t / denom;
        scale(out, ab, t);
        add2(out, out, base);
      }
    }
    return t;
  }

  // ../src/systems/sys_control_always2d.ts
  var QUERY3 = 16 /* ControlAlways2D */ | 1024 /* Move2D */;
  function sys_control_always2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY3) === QUERY3) {
        update2(game2, i);
      }
    }
  }
  function update2(game2, entity) {
    let control = game2.World.ControlAlways2D[entity];
    let move = game2.World.Move2D[entity];
    if (control.Direction) {
      move.Direction[0] = control.Direction[0];
      move.Direction[1] = control.Direction[1];
      game2.World.Signature[entity] |= 256 /* Dirty */;
    }
    if (control.Rotation) {
      move.Rotation = control.Rotation;
      game2.World.Signature[entity] |= 256 /* Dirty */;
    }
  }

  // ../src/systems/sys_control_camera.ts
  var QUERY4 = 2 /* Camera */ | 32 /* ControlPlayer */;
  var wheel_y_clamped = 0;
  function sys_control_camera(game2, delta) {
    if (game2.HoverEntity === null && game2.InputDelta["WheelY"]) {
      wheel_y_clamped = clamp(-500, 500, wheel_y_clamped + game2.InputDelta["WheelY"]);
      let zoom = 4 ** (wheel_y_clamped / -500);
      if (0.9 < zoom && zoom < 1.1) {
        zoom = 1;
      }
      game2.UnitSize = BASE_UNIT_SIZE * zoom;
      game2.ViewportResized = true;
    }
    if (game2.ActiveEntity !== null) {
      return;
    }
    if (game2.InputDelta["Mouse0"] === 1) {
      document.body.classList.add("grabbing");
    } else if (game2.InputDelta["Mouse0"] === -1) {
      document.body.classList.remove("grabbing");
    }
    if (game2.InputDistance["Mouse0"] > 5) {
      for (let i = 0; i < game2.World.Signature.length; i++) {
        if ((game2.World.Signature[i] & QUERY4) === QUERY4) {
          update3(game2, i);
        }
      }
    }
  }
  function update3(game2, entity) {
    let entity_transform = game2.World.Transform2D[entity];
    if (game2.InputDistance["Mouse0"] > 5) {
      entity_transform.Translation[0] -= game2.InputDelta["MouseX"] / game2.UnitSize;
      entity_transform.Translation[1] += game2.InputDelta["MouseY"] / game2.UnitSize;
      game2.World.Signature[entity] |= 256 /* Dirty */;
    }
  }

  // ../src/systems/sys_control_grab.ts
  var QUERY5 = 512 /* Grabbable */ | 32768 /* Transform2D */;
  var pointer_position = [0, 0];
  var pointer_offset = [0, 0];
  function sys_control_grab(game2, delta) {
    let camera_entity = game2.Cameras[0];
    if (camera_entity === void 0) {
      return;
    }
    let camera = game2.World.Camera[camera_entity];
    if (camera.Kind === 2 /* Xr */) {
      throw new Error("XR not implemented");
    }
    let x_ndc = game2.InputState["MouseX"] / game2.ViewportWidth * 2 - 1;
    let y_ndc = -(game2.InputState["MouseY"] / game2.ViewportHeight) * 2 + 1;
    let pointer3d = [x_ndc, y_ndc, 0];
    transform_position(pointer3d, pointer3d, camera.Projection.Inverse);
    let camera_transform = game2.World.Transform2D[camera_entity];
    let pointer2d = [pointer3d[0], pointer3d[1]];
    transform_point(pointer_position, pointer2d, camera_transform.World);
    if (game2.ActiveEntity !== null) {
      if (game2.InputDelta["Mouse0"] === -1) {
        document.body.classList.remove("grabbing");
        game2.ActiveEntity = null;
        return;
      }
      let entity_transform = game2.World.Transform2D[game2.ActiveEntity];
      copy(entity_transform.Translation, pointer_position);
      subtract(entity_transform.Translation, entity_transform.Translation, pointer_offset);
      game2.World.Signature[game2.ActiveEntity] |= 256 /* Dirty */;
      return;
    }
    game2.HoverEntity = null;
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY5) === QUERY5) {
        let entity_transform = game2.World.Transform2D[ent];
        if (is_pointer_over(pointer_position, entity_transform)) {
          game2.HoverEntity = ent;
          document.body.classList.add("grab");
          if (game2.InputDelta["Mouse0"] === 1) {
            document.body.classList.add("grabbing");
            game2.ActiveEntity = ent;
            let dragged_transform = game2.World.Transform2D[ent];
            subtract(pointer_offset, pointer_position, dragged_transform.Translation);
          }
          if (game2.InputDelta["WheelY"]) {
            let transform = game2.World.Transform2D[ent];
            transform.Rotation -= game2.InputDelta["WheelY"] * 0.1;
            transform.Rotation %= 360;
            game2.World.Signature[ent] |= 256 /* Dirty */;
          }
          return;
        }
      }
    }
    document.body.classList.remove("grab");
  }
  var entity_world_position = [0, 0];
  function is_pointer_over(pointer_world_position, entity_transform) {
    get_translation(entity_world_position, entity_transform.World);
    return distance_squared(pointer_world_position, entity_world_position) < 2.9;
  }

  // ../common/random.ts
  function integer(min = 0, max = 1) {
    return ~~(Math.random() * (max - min + 1) + min);
  }
  function float(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }

  // ../src/components/com_control_process.ts
  function control_process(kind, needs) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 64 /* ControlProcess */;
      game2.World.ControlProcess[entity] = {
        Kind: kind,
        Needs: needs
      };
    };
  }

  // ../src/systems/sys_control_process.ts
  var QUERY6 = 64 /* ControlProcess */ | 4 /* CollideDynamic */;
  function sys_control_process(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY6) === QUERY6) {
        update4(game2, i);
      }
    }
  }
  function update4(game2, entity) {
    let control = game2.World.ControlProcess[entity];
    let collide = game2.World.CollideDynamic[entity];
    let rigid_body = game2.World.RigidBody2D[entity];
    let transform = game2.World.Transform2D[entity];
    if (collide.ContactId === null) {
      return;
    }
    let other = game2.World.CollideStatic[collide.ContactId];
    if (control.Needs & other.Layer) {
      control.Needs &= ~other.Layer;
      collide.Mask &= ~other.Layer;
      game2.World.Signature[entity] |= 256 /* Dirty */;
      rigid_body.VelocityResolved[0] = 0;
      rigid_body.VelocityResolved[1] = 0;
      if (other.Layer & 2 /* ProcessCook */) {
        set_color(game2, entity, [1, 1, 1, 1]);
        switch (control.Kind) {
          case 0 /* Potato */:
            if (control.Needs & 4 /* ProcessPeel */) {
              set_sprite(game2, entity, "ziemniak_ugotowany");
            } else {
              set_sprite(game2, entity, "ziemniak_obrany_ugotowany");
              control.Needs |= 8 /* ProcessCut */;
            }
            break;
          case 1 /* Carrot */:
            if (control.Needs & 4 /* ProcessPeel */) {
              set_sprite(game2, entity, "marchewka_ugotowana");
            } else {
              set_sprite(game2, entity, "marchewka_obrana_ugotowana");
              control.Needs |= 8 /* ProcessCut */;
            }
            break;
          case 2 /* GreenPea */:
            set_sprite(game2, entity, "groszek_ugotowany");
            control.Needs |= 4 /* ProcessPeel */;
            break;
          case 3 /* Apple */:
            break;
        }
        return;
      }
      if (other.Layer & 4 /* ProcessPeel */) {
        set_color(game2, entity, [1, 1, 1, 1]);
        switch (control.Kind) {
          case 0 /* Potato */:
            if (control.Needs & 2 /* ProcessCook */) {
              set_sprite(game2, entity, "ziemniak_obrany");
            } else {
              set_sprite(game2, entity, "ziemniak_obrany_ugotowany");
              control.Needs |= 8 /* ProcessCut */;
            }
            break;
          case 1 /* Carrot */:
            if (control.Needs & 2 /* ProcessCook */) {
              set_sprite(game2, entity, "marchewka_obrana");
            } else {
              set_sprite(game2, entity, "marchewka_obrana_ugotowana");
              control.Needs |= 8 /* ProcessCut */;
            }
            break;
          case 2 /* GreenPea */:
            set_sprite(game2, entity, "groszek_obrany");
            control.Needs |= 16 /* ProcessFinish */;
            transform.Scale[0] = 0.5;
            transform.Scale[1] = 0.5;
            break;
          case 3 /* Apple */:
            set_sprite(game2, entity, "jablko_obrane");
            control.Needs |= 8 /* ProcessCut */;
            break;
        }
        let other_transform = game2.World.Transform2D[other.EntityId];
        let parent_entity = other_transform.Parent;
        if (parent_entity !== void 0) {
          let exit_entity = game2.World.Children[parent_entity].Children[0];
          let exit_transform = game2.World.Transform2D[exit_entity];
          get_translation(transform.Translation, exit_transform.World);
        }
        rigid_body.Acceleration[0] = 300;
        return;
      }
      if (other.Layer & 8 /* ProcessCut */) {
        set_color(game2, entity, [1, 1, 1, 1]);
        switch (control.Kind) {
          case 0 /* Potato */:
            set_sprite(game2, entity, "ziemniak_kawalek" + integer(1, 2));
            control.Needs |= 16 /* ProcessFinish */;
            break;
          case 1 /* Carrot */:
            set_sprite(game2, entity, "marchewka_kawalek" + integer(1, 2));
            control.Needs |= 16 /* ProcessFinish */;
            break;
          case 3 /* Apple */:
            set_sprite(game2, entity, "jablko_kawalek" + integer(1, 2));
            control.Needs |= 16 /* ProcessFinish */;
            break;
        }
        let other_transform = game2.World.Transform2D[other.EntityId];
        let parent_entity = other_transform.Parent;
        if (parent_entity !== void 0) {
          let exit_entity = game2.World.Children[parent_entity].Children[0];
          let exit_transform = game2.World.Transform2D[exit_entity];
          get_translation(transform.Translation, exit_transform.World);
        }
        transform.Scale[0] = 0.5;
        transform.Scale[1] = 0.5;
        rigid_body.Acceleration[0] = float(-200, 200);
        collide.Radius = 0.5;
        return;
      }
      if (other.Layer & 16 /* ProcessFinish */) {
        game2.World.Signature[entity] &= ~4096 /* RigidBody2D */;
        game2.World.Signature[entity] &= ~4 /* CollideDynamic */;
      }
    } else if (other.Layer > 1 /* Obstacle */) {
      rigid_body.Acceleration[0] = float(-200, 200);
      rigid_body.Acceleration[1] = float(200, 300);
    }
  }

  // ../src/systems/sys_draw_background.ts
  function sys_draw_background(game2, delta) {
    let ctx = game2.Context2D;
    let camera_entity = game2.Cameras[0];
    let camera = game2.World.Camera[camera_entity];
    if (camera.Kind === 2 /* Xr */) {
      throw new Error("XR not implemented");
    }
    ctx.resetTransform();
    ctx.fillStyle = "#D7AAA9";
    ctx.fillRect(0, 0, game2.ViewportWidth, game2.ViewportHeight);
    let x = game2.ViewportWidth / 2 - camera.Position[0] * game2.UnitSize;
    let y = game2.ViewportHeight / 2 + camera.Position[1] * game2.UnitSize;
    let s = game2.UnitSize / BASE_UNIT_SIZE;
    let w = game2.ViewportWidth / 2;
    let h = game2.ViewportHeight / 2;
    ctx.fillStyle = "#FFD6D5";
    ctx.fillRect(x - w, y - h, w * 2, h * 2);
    ctx.setTransform(s, s * -0.2, s * -0.3, s, x, y);
    ctx.fillStyle = "#FFAA79";
    ctx.fillRect(0, 0, 400, 400);
    ctx.setTransform(s, s * 0.3, s * 0.2, s, x, y);
    ctx.fillStyle = "#D4FCA9";
    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, 2 * Math.PI);
    ctx.fill();
  }

  // ../src/systems/sys_move2d.ts
  var QUERY7 = 32768 /* Transform2D */ | 1024 /* Move2D */ | 256 /* Dirty */;
  function sys_move2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY7) === QUERY7) {
        update5(game2, i, delta);
      }
    }
  }
  var direction = [0, 0];
  function update5(game2, entity, delta) {
    let transform = game2.World.Transform2D[entity];
    let move = game2.World.Move2D[entity];
    if (move.Direction[0] || move.Direction[1]) {
      direction[0] = move.Direction[0];
      direction[1] = move.Direction[1];
      let amount = Math.min(1, length(direction));
      if (transform.Parent !== void 0) {
        let parent = game2.World.Transform2D[transform.Parent];
        transform_direction(direction, direction, parent.Self);
      } else {
        transform_direction(direction, direction, transform.World);
      }
      normalize2(direction, direction);
      scale(direction, direction, amount * move.MoveSpeed * delta);
      add2(transform.Translation, transform.Translation, direction);
      move.Direction[0] = 0;
      move.Direction[1] = 0;
    }
    if (move.Rotation) {
      transform.Rotation += move.Rotation * move.RotationSpeed * delta;
      move.Rotation = 0;
    }
  }

  // ../src/components/com_rigid_body2d.ts
  function rigid_body2d(kind, friction) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 4096 /* RigidBody2D */;
      game2.World.RigidBody2D[entity] = {
        Kind: kind,
        Friction: friction,
        Acceleration: [0, 0],
        VelocityIntegrated: [0, 0],
        VelocityResolved: [0, 0],
        VelocityAngular: float(-180, 180)
      };
    };
  }

  // ../src/systems/sys_physics2d_bounds.ts
  var QUERY8 = 32768 /* Transform2D */ | 4096 /* RigidBody2D */;
  function sys_physics2d_bounds(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY8) === QUERY8) {
        update6(game2, i, delta);
      }
    }
  }
  function update6(game2, entity, delta) {
    let transform = game2.World.Transform2D[entity];
    let rigid_body = game2.World.RigidBody2D[entity];
    if (rigid_body.Kind === 1 /* Dynamic */) {
      let bottom = -game2.ViewportHeight / game2.UnitSize / 2;
      let left = -game2.ViewportWidth / game2.UnitSize / 2;
      if (transform.Translation[1] < bottom) {
        transform.Translation[1] = bottom;
        rigid_body.VelocityResolved[0] = float(-3, 3);
        rigid_body.VelocityResolved[1] *= game2.physicsBounce * -1;
      }
      if (transform.Translation[0] < left) {
        transform.Translation[0] = left;
        rigid_body.VelocityResolved[0] *= -1;
      }
      if (transform.Translation[0] > -left) {
        transform.Translation[0] = -left;
        rigid_body.VelocityResolved[0] *= -1;
      }
    }
  }

  // ../src/systems/sys_physics2d_integrate.ts
  var QUERY9 = 32768 /* Transform2D */ | 4096 /* RigidBody2D */;
  function sys_physics2d_integrate(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY9) === QUERY9) {
        update7(game2, i, delta);
      }
    }
  }
  function update7(game2, entity, delta) {
    let transform = game2.World.Transform2D[entity];
    let rigid_body = game2.World.RigidBody2D[entity];
    if (rigid_body.Kind === 1 /* Dynamic */) {
      copy(rigid_body.VelocityIntegrated, rigid_body.VelocityResolved);
      rigid_body.VelocityIntegrated[1] -= game2.physicsGravity * delta;
      scale(rigid_body.Acceleration, rigid_body.Acceleration, delta);
      add2(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Acceleration);
      scale(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, 1 - game2.physicsFriction - rigid_body.Friction);
      let vel_delta = [0, 0];
      scale(vel_delta, rigid_body.VelocityIntegrated, delta);
      add2(transform.Translation, transform.Translation, vel_delta);
      transform.Rotation += rigid_body.VelocityAngular * delta;
      game2.World.Signature[entity] |= 256 /* Dirty */;
      set(rigid_body.Acceleration, 0, 0);
    }
  }

  // ../src/systems/sys_physics2d_resolve.ts
  var QUERY10 = 32768 /* Transform2D */ | 4 /* CollideDynamic */ | 4096 /* RigidBody2D */;
  function sys_physics2d_resolve(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY10) === QUERY10) {
        update8(game2, ent);
      }
    }
  }
  var response_translation = [0, 0];
  var response_velocity = [0, 0];
  function update8(game2, entity) {
    let transform = game2.World.Transform2D[entity];
    let rigid_body = game2.World.RigidBody2D[entity];
    let collide = game2.World.CollideDynamic[entity];
    if (rigid_body.Kind === 1 /* Dynamic */) {
      if (collide.ContactId !== null && game2.World.Signature[collide.ContactId] & 4096 /* RigidBody2D */) {
        scale(response_translation, collide.ContactNormal, collide.ContactDepth);
        add2(transform.Translation, transform.Translation, response_translation);
        game2.World.Signature[entity] |= 256 /* Dirty */;
        let response_magnitude = dot(rigid_body.VelocityIntegrated, collide.ContactNormal);
        scale(response_velocity, collide.ContactNormal, -response_magnitude * game2.physicsBounce);
        add2(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated, response_velocity);
      } else {
        copy(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
      }
    }
  }

  // ../src/systems/sys_render2d.ts
  function sys_render2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      let offset = i * FLOATS_PER_INSTANCE + 7;
      if (game2.World.Signature[i] & 2048 /* Render2D */) {
        if (game2.InstanceData[offset] == 0) {
          game2.InstanceData[offset] = 1;
        }
      } else if (game2.InstanceData[offset] == 1) {
        game2.InstanceData[offset] = 0;
      }
    }
    for (let camera_entity of game2.Cameras) {
      let camera = game2.World.Camera[camera_entity];
      switch (camera.Kind) {
        case 0 /* Canvas */:
          game2.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
          game2.Gl.viewport(0, 0, game2.ViewportWidth, game2.ViewportHeight);
          game2.Gl.clearColor(...camera.ClearColor);
          game2.Gl.clear(camera.ClearMask);
          render_all(game2, camera);
          break;
      }
    }
  }
  function render_all(game2, eye) {
    let material = game2.MaterialInstanced;
    let sheet = game2.Textures["spritesheet.png"];
    game2.Gl.useProgram(material.Program);
    game2.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
    game2.Gl.activeTexture(GL_TEXTURE0);
    game2.Gl.bindTexture(GL_TEXTURE_2D, sheet.Texture);
    game2.Gl.uniform1i(material.Locations.SheetTexture, 0);
    game2.Gl.uniform2f(material.Locations.SheetSize, sheet.Width, sheet.Height);
    game2.Gl.bindBuffer(GL_ARRAY_BUFFER, game2.InstanceBuffer);
    game2.Gl.bufferData(GL_ARRAY_BUFFER, game2.InstanceData, GL_STREAM_DRAW);
    game2.Gl.drawArraysInstanced(material.Mode, 0, 4, game2.World.Signature.length);
  }

  // ../common/projection.ts
  function orthographic(radius, near, far) {
    return {
      Kind: 1 /* Orthographic */,
      Radius: radius,
      Near: near,
      Far: far,
      Projection: create2(),
      Inverse: create2()
    };
  }
  function resize_ortho_constant(projection, aspect) {
    from_ortho(projection.Projection, projection.Radius, projection.Radius * aspect, -projection.Radius, -projection.Radius * aspect, projection.Near, projection.Far);
    invert2(projection.Inverse, projection.Projection);
  }

  // ../src/systems/sys_resize2d.ts
  var QUERY11 = 2 /* Camera */;
  function sys_resize2d(game2, delta) {
    if (game2.ViewportWidth != window.innerWidth || game2.ViewportHeight != window.innerHeight) {
      game2.ViewportResized = true;
    }
    if (game2.ViewportResized) {
      game2.ViewportWidth = game2.Canvas3D.width = game2.Canvas2D.width = window.innerWidth;
      game2.ViewportHeight = game2.Canvas3D.height = game2.Canvas2D.height = window.innerHeight;
      for (let i = 0; i < game2.World.Signature.length; i++) {
        if ((game2.World.Signature[i] & QUERY11) === QUERY11) {
          let camera = game2.World.Camera[i];
          if (camera.Kind == 0 /* Canvas */ && camera.Projection.Kind == 1 /* Orthographic */) {
            camera.Projection.Radius = game2.ViewportHeight / game2.UnitSize / 2;
            let aspect = game2.ViewportWidth / game2.ViewportHeight;
            resize_ortho_constant(camera.Projection, aspect);
            break;
          }
        }
      }
    }
  }

  // ../src/systems/sys_shake2d.ts
  var QUERY12 = 32768 /* Transform2D */ | 8192 /* Shake */;
  function sys_shake2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY12) == QUERY12) {
        update9(game2, i);
      }
    }
  }
  function update9(game2, entity) {
    let shake2 = game2.World.Shake[entity];
    let transform = game2.World.Transform2D[entity];
    transform.Translation[0] = (Math.random() - 0.5) * shake2.Magnitude[0] * 2;
    transform.Translation[1] = (Math.random() - 0.5) * shake2.Magnitude[1] * 2;
    game2.World.Signature[entity] |= 256 /* Dirty */;
  }

  // ../src/systems/sys_spawn2d.ts
  var QUERY13 = 32768 /* Transform2D */ | 16384 /* Spawn */;
  function sys_spawn2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY13) == QUERY13) {
        update10(game2, i, delta);
      }
    }
  }
  function update10(game2, entity, delta) {
    let spawn2 = game2.World.Spawn[entity];
    spawn2.SinceLast += delta;
    if (spawn2.Counter > game2.spawnCount) {
      return;
    }
    if (spawn2.SinceLast > game2.spawnInterval) {
      spawn2.SinceLast = 0;
      let entity_transform = game2.World.Transform2D[entity];
      let world_position2 = [0, 0];
      get_translation(world_position2, entity_transform.World);
      if (game2.World.Signature.length - game2.World.Graveyard.length < game2.World.Capacity) {
        instantiate(game2, [...spawn2.Creator(game2), transform2d(world_position2, 0)]);
      } else {
        alert(`The world is full! You've reached the maximum number of entities allowed in the game (${game2.World.Capacity}). Press OK to restart the simulation.`);
        game2.Restart();
      }
    }
  }

  // ../common/math.ts
  var DEG_TO_RAD = Math.PI / 180;
  var RAD_TO_DEG = 180 / Math.PI;

  // ../src/systems/sys_transform2d.ts
  var QUERY14 = 32768 /* Transform2D */ | 256 /* Dirty */;
  function sys_transform2d(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY14) === QUERY14) {
        let transform = game2.World.Transform2D[ent];
        update_transform(game2.World, ent, transform);
      }
    }
  }
  var world_position = [0, 0];
  function update_transform(world, entity, transform) {
    world.Signature[entity] &= ~256 /* Dirty */;
    compose2(transform.World, transform.Translation, transform.Rotation * DEG_TO_RAD, transform.Scale);
    if (transform.Parent !== void 0) {
      let parent_transform = world.Transform2D[transform.Parent];
      multiply(transform.World, parent_transform.World, transform.World);
      if (transform.Gyroscope) {
        get_translation(world_position, transform.World);
        compose2(transform.World, world_position, transform.Rotation * DEG_TO_RAD, transform.Scale);
      }
    }
    invert(transform.Self, transform.World);
    if (world.Signature[entity] & 128 /* Children */) {
      let children2 = world.Children[entity];
      for (let i = 0; i < children2.Children.length; i++) {
        let child = children2.Children[i];
        if (world.Signature[child] & 32768 /* Transform2D */) {
          let child_transform = world.Transform2D[child];
          child_transform.Parent = entity;
          update_transform(world, child, child_transform);
        }
      }
    }
  }

  // ../common/html.ts
  function shift(values) {
    let value = values.shift();
    if (typeof value === "boolean" || value == void 0) {
      return "";
    } else if (Array.isArray(value)) {
      return value.join("");
    } else {
      return value;
    }
  }
  function html(strings, ...values) {
    return strings.reduce((out, cur) => out + shift(values) + cur);
  }

  // ../src/ui.ts
  function App(game2) {
    if (game2.PlayState === "play") {
      return "";
    }
    return html` <div
        style="
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 5vmin;
            color: white;
            padding: 5vmin;
        "
    >
        <h1
            style="margin: 0;
            text-shadow:
                2px 2px 0 orange,
                4px 4px 0 green,
                6px 6px 0 indigo;
            "
        >
            Super Simple Salad Simulator
        </h1>
        <p style="text-shadow: 2px 2px 0 green;">
            Discover the recipe for the tasty springtime treat: the veggy salad! Cut the green peas
            and cook the apples — or is it the other way around? Experiment to find out!
        </p>
        <p style="text-shadow: 2px 2px 0 orange;">
            Move objects by grabbing them with the mouse, rotate them with the mouse wheel.
        </p>
        <h2 onclick="playNow();" style="text-shadow: 2px 2px 0 yellow;">Play Now!</h2>
    </div>`;
  }

  // ../src/systems/sys_ui.ts
  var prev;
  function sys_ui(game2, delta) {
    let next = App(game2);
    if (next !== prev) {
      game2.Ui.innerHTML = prev = next;
    }
  }

  // ../src/game.ts
  var WORLD_CAPACITY = 50100;
  var FLOATS_PER_INSTANCE = 16;
  var BYTES_PER_INSTANCE = FLOATS_PER_INSTANCE * 4;
  var BASE_UNIT_SIZE = 32;
  var Game6 = class extends Game3D {
    constructor() {
      super();
      this.World = new World(WORLD_CAPACITY);
      this.MaterialInstanced = mat_instanced2d(this.Gl);
      this.Textures = {};
      this.UnitSize = BASE_UNIT_SIZE;
      this.HoverEntity = null;
      this.ActiveEntity = null;
      this.spawnEnabled = false;
      this.spawnInterval = 1;
      this.spawnCount = 1;
      this.physicsGravity = 9.81;
      this.physicsFriction = 0;
      this.physicsBounce = 1.1;
      this.physicsCollisions = true;
      this.PlayState = "title";
      this.ItemCount = 0;
      this.InstanceData = new Float32Array(this.World.Capacity * FLOATS_PER_INSTANCE);
      this.InstanceBuffer = this.Gl.createBuffer();
      this.Gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, true);
      this.Gl.enable(GL_BLEND);
      let material = this.MaterialInstanced;
      let vertex_buf = this.Gl.createBuffer();
      this.Gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
      this.Gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);
      this.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
      this.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 4 * 5, 0);
      this.Gl.enableVertexAttribArray(material.Locations.VertexTexcoord);
      this.Gl.vertexAttribPointer(material.Locations.VertexTexcoord, 2, GL_FLOAT, false, 4 * 5, 4 * 3);
      this.Gl.bindBuffer(GL_ARRAY_BUFFER, this.InstanceBuffer);
      this.Gl.bufferData(GL_ARRAY_BUFFER, this.World.Capacity * BYTES_PER_INSTANCE, GL_STREAM_DRAW);
      this.Gl.enableVertexAttribArray(material.Locations.InstanceRotation);
      this.Gl.vertexAttribDivisor(material.Locations.InstanceRotation, 1);
      this.Gl.vertexAttribPointer(material.Locations.InstanceRotation, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 0);
      this.Gl.enableVertexAttribArray(material.Locations.InstanceTranslation);
      this.Gl.vertexAttribDivisor(material.Locations.InstanceTranslation, 1);
      this.Gl.vertexAttribPointer(material.Locations.InstanceTranslation, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 4);
      this.Gl.enableVertexAttribArray(material.Locations.InstanceColor);
      this.Gl.vertexAttribDivisor(material.Locations.InstanceColor, 1);
      this.Gl.vertexAttribPointer(material.Locations.InstanceColor, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 8);
      this.Gl.enableVertexAttribArray(material.Locations.InstanceSprite);
      this.Gl.vertexAttribDivisor(material.Locations.InstanceSprite, 1);
      this.Gl.vertexAttribPointer(material.Locations.InstanceSprite, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 12);
    }
    FixedUpdate(delta) {
      sys_control_grab(this, delta);
      sys_control_camera(this, delta);
      if (this.spawnEnabled) {
        sys_physics2d_bounds(this, delta);
        sys_physics2d_integrate(this, delta);
        sys_transform2d(this, delta);
        if (this.physicsCollisions) {
          sys_collide2d(this, delta);
        }
        sys_physics2d_resolve(this, delta);
      }
      sys_transform2d(this, delta);
      sys_control_process(this, delta);
    }
    FrameUpdate(delta) {
      sys_control_always2d(this, delta);
      if (this.spawnEnabled) {
        sys_animate_sprite(this, delta);
        sys_move2d(this, delta);
        sys_shake2d(this, delta);
        sys_spawn2d(this, delta);
      }
      sys_resize2d(this, delta);
      sys_camera2d(this, delta);
      sys_draw_background(this, delta);
      sys_render2d(this, delta);
      sys_ui(this, delta);
    }
    Restart() {
      this.ItemCount = 0;
      for (let ent = 0; ent < this.World.Signature.length; ent++) {
        if (this.World.Signature[ent] & 64 /* ControlProcess */) {
          destroy_all(this.World, ent);
        }
      }
    }
  };
  var vertex_arr = Float32Array.from([
    -0.5,
    -0.5,
    0,
    0,
    1,
    0.5,
    -0.5,
    0,
    1,
    1,
    -0.5,
    0.5,
    0,
    0,
    0,
    0.5,
    0.5,
    0,
    1,
    0
  ]);

  // ../src/components/com_transform2d.ts
  function transform2d(translation = [0, 0], rotation = 0, scale2 = [1, 1]) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 32768 /* Transform2D */ | 256 /* Dirty */;
      game2.World.Transform2D[entity] = {
        World: game2.InstanceData.subarray(entity * FLOATS_PER_INSTANCE, entity * FLOATS_PER_INSTANCE + 6),
        Self: create(),
        Translation: translation,
        Rotation: rotation,
        Scale: scale2,
        Gyroscope: false
      };
    };
  }

  // ../src/components/com_collide2d.ts
  function collide_dynamic(diameter, mask) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 4 /* CollideDynamic */;
      game2.World.CollideDynamic[entity] = {
        EntityId: entity,
        Mask: mask,
        Radius: diameter / 2,
        Center: [0, 0],
        ContactId: null,
        ContactNormal: [0, 0],
        ContactDepth: 0
      };
    };
  }
  function collide_static(layer, diameter, length2 = 0) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 8 /* CollideStatic */;
      game2.World.CollideStatic[entity] = {
        EntityId: entity,
        Layer: layer,
        Radius: diameter / 2,
        Length: length2,
        Center: [0, 0],
        Tip: [0, 0],
        Base: [0, 0]
      };
    };
  }

  // ../src/components/com_grabbable.ts
  function grabbable() {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 512 /* Grabbable */;
    };
  }

  // ../src/scenes/blu_board1.ts
  function blueprint_board1(game2) {
    return [
      render2d("deska1"),
      collide_static(1 /* Obstacle */, 1, -0.65),
      rigid_body2d(0 /* Static */, 1),
      grabbable()
    ];
  }

  // ../src/components/com_control_player.ts
  function control_player() {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 32 /* ControlPlayer */;
      game2.World.ControlPlayer[entity] = {};
    };
  }

  // ../src/components/com_shake.ts
  function shake(magnitude) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 8192 /* Shake */;
      game2.World.Shake[entity] = {
        Magnitude: magnitude
      };
    };
  }

  // ../src/components/com_spawn.ts
  function spawn(creator, counter) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 16384 /* Spawn */;
      game2.World.Spawn[entity] = {
        Creator: creator,
        Counter: counter,
        SinceLast: 0
      };
    };
  }

  // ../src/scenes/blu_apple.ts
  function blueprint_apple(game2) {
    game2.ItemCount++;
    return [
      render2d("jablko_surowe"),
      control_process(3 /* Apple */, 4 /* ProcessPeel */),
      collide_dynamic(1, 1 /* Obstacle */ | 2 /* ProcessCook */ | 4 /* ProcessPeel */ | 8 /* ProcessCut */ | 16 /* ProcessFinish */),
      rigid_body2d(1 /* Dynamic */, float(0.01, 1e-3))
    ];
  }

  // ../src/scenes/blu_bowl.ts
  function blueprint_bowl(game2) {
    return [
      grabbable(),
      children([transform2d(), render2d("miska"), order(0)], [transform2d(), render2d("miska_front"), order(1)], [
        transform2d([-0.4, 0]),
        collide_static(1 /* Obstacle */, 0.2, 0.4),
        rigid_body2d(0 /* Static */, 1)
      ], [
        transform2d([0.4, 0]),
        collide_static(1 /* Obstacle */, 0.2, 0.4),
        rigid_body2d(0 /* Static */, 1)
      ], [transform2d([0, -0.1]), collide_static(16 /* ProcessFinish */, 0.5, -0.5)])
    ];
  }

  // ../src/scenes/blu_carrot.ts
  function blueprint_carrot(game2) {
    game2.ItemCount++;
    return [
      render2d("marchewka_surowa"),
      control_process(1 /* Carrot */, 2 /* ProcessCook */ | 4 /* ProcessPeel */),
      collide_dynamic(1, 1 /* Obstacle */ | 2 /* ProcessCook */ | 4 /* ProcessPeel */ | 8 /* ProcessCut */ | 16 /* ProcessFinish */),
      rigid_body2d(1 /* Dynamic */, float(0.01, 1e-3))
    ];
  }

  // ../src/components/com_animate_sprite.ts
  function animate_sprite(frames) {
    let duration = 0;
    for (let frame_name in frames) {
      let frame_duration = frames[frame_name];
      duration = frames[frame_name] = duration + frame_duration;
    }
    return (game2, entity) => {
      game2.World.Signature[entity] |= 1 /* AnimateSprite */;
      game2.World.AnimateSprite[entity] = {
        Frames: frames,
        Duration: duration,
        Time: 0
      };
    };
  }

  // ../src/scenes/blu_cooker.ts
  function blueprint_cooker(game2) {
    return [
      render2d("garnek2_front"),
      order(1),
      grabbable(),
      children([
        transform2d(),
        render2d("garnek21"),
        order(0),
        animate_sprite({
          garnek21: 0.1,
          garnek22: 0.1,
          garnek23: 0.1,
          garnek24: 0.1
        })
      ], [
        transform2d([-0.4, 0]),
        collide_static(1 /* Obstacle */, 0.2, 0.4),
        rigid_body2d(0 /* Static */, 1)
      ], [
        transform2d([0.4, 0]),
        collide_static(1 /* Obstacle */, 0.2, 0.4),
        rigid_body2d(0 /* Static */, 1)
      ], [transform2d([0, -0.2]), collide_static(2 /* ProcessCook */, 0.5, -0.5)])
    ];
  }

  // ../src/scenes/blu_cutter.ts
  function blueprint_cutter(game2) {
    return [
      grabbable(),
      children([transform2d([0, -0.4]), shake([0.25, 0.1])], [transform2d(), shake([0.01, 0.01]), render2d("szatkownica"), order(0)], [transform2d(), shake([0.01, 0.01]), render2d("szatkownica_front"), order(1)], [transform2d([0, -0.2]), collide_static(8 /* ProcessCut */, 1)], [
        transform2d([-0.3, 0], -30),
        collide_static(1 /* Obstacle */, 0.2, 0.3),
        rigid_body2d(0 /* Static */, 1)
      ], [
        transform2d([0.3, 0], 30),
        collide_static(1 /* Obstacle */, 0.2, 0.3),
        rigid_body2d(0 /* Static */, 1)
      ])
    ];
  }

  // ../src/scenes/blu_greenpea.ts
  function blueprint_greenpea(game2) {
    game2.ItemCount++;
    return [
      render2d("groszek_surowy"),
      control_process(2 /* GreenPea */, 2 /* ProcessCook */),
      collide_dynamic(1, 1 /* Obstacle */ | 2 /* ProcessCook */ | 4 /* ProcessPeel */ | 8 /* ProcessCut */ | 16 /* ProcessFinish */),
      rigid_body2d(1 /* Dynamic */, float(0.01, 1e-3))
    ];
  }

  // ../src/scenes/blu_peeler.ts
  function blueprint_peeler(game2) {
    return [
      grabbable(),
      children([transform2d([0.25, -0.25])], [transform2d(), shake([1e-3, 0.01]), render2d("obieraczka"), order(0)], [transform2d(), shake([1e-3, 0.01]), render2d("obieraczka_front"), order(1)], [transform2d([0, -0.2]), collide_static(4 /* ProcessPeel */, 1)], [
        transform2d([-0.2, 0]),
        collide_static(1 /* Obstacle */, 0.3, 0.5),
        rigid_body2d(0 /* Static */, 1)
      ], [
        transform2d([0.2, 0.1]),
        collide_static(1 /* Obstacle */, 0.3, 0.3),
        rigid_body2d(0 /* Static */, 1)
      ])
    ];
  }

  // ../common/color.ts
  function hsva_to_vec4(h, s, v, a) {
    let i = ~~(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        return [v, t, p, a];
      case 1:
        return [q, v, p, a];
      case 2:
        return [p, v, t, a];
      case 3:
        return [p, q, v, a];
      case 4:
        return [t, p, v, a];
      default:
        return [v, p, q, a];
    }
  }

  // ../src/scenes/blu_potato.ts
  function blueprint_potato(game2) {
    game2.ItemCount++;
    return [
      render2d("ziemniak_surowy", hsva_to_vec4(float(0.1, 0.15), float(0, 0.5), float(0.5, 1), 1)),
      control_process(0 /* Potato */, 2 /* ProcessCook */ | 4 /* ProcessPeel */),
      collide_dynamic(1, 1 /* Obstacle */ | 2 /* ProcessCook */ | 4 /* ProcessPeel */ | 8 /* ProcessCut */ | 16 /* ProcessFinish */),
      rigid_body2d(1 /* Dynamic */, float(0.01, 1e-3))
    ];
  }

  // ../src/scenes/sce_stage.ts
  function scene_stage(game2) {
    game2.World = new World(WORLD_CAPACITY);
    game2.ViewportResized = true;
    game2.spawnEnabled = false;
    instantiate(game2, [
      transform2d([0, 0]),
      camera_canvas(orthographic(5, 1, 3), [0, 0, 0, 0]),
      control_player()
    ]);
    instantiate(game2, [
      transform2d([-7.5, 5]),
      grabbable(),
      children([transform2d([-1, 0.5], 180), render2d("ziemniak_surowy"), order(1)], [transform2d(void 0, 0, [4, 3]), render2d("karton"), order(0)], [transform2d(void 0, 0, [4, 3]), render2d("karton_front"), order(1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 2)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 3)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 4)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 5)])
    ]);
    instantiate(game2, [
      transform2d([-2.5, 5]),
      grabbable(),
      children([transform2d([-1, 0.5], 180), render2d("marchewka_surowa"), order(1)], [transform2d(void 0, 0, [4, 3]), render2d("karton"), order(0)], [transform2d(void 0, 0, [4, 3]), render2d("karton_front"), order(1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 2)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 3)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 4)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_carrot, 5)])
    ]);
    instantiate(game2, [
      transform2d([2.5, 5]),
      grabbable(),
      children([transform2d([-1, 0.5], 180), render2d("groszek_surowy"), order(1)], [transform2d(void 0, 0, [4, 3]), render2d("karton"), order(0)], [transform2d(void 0, 0, [4, 3]), render2d("karton_front"), order(1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 2)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 3)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 4)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_greenpea, 5)])
    ]);
    instantiate(game2, [
      transform2d([7.5, 5]),
      grabbable(),
      children([transform2d([-1, 0.5], 180), render2d("jablko_surowe"), order(1)], [transform2d(void 0, 0, [4, 3]), render2d("karton"), order(0)], [transform2d(void 0, 0, [4, 3]), render2d("karton_front"), order(1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 2)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 3)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 4)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_apple, 5)])
    ]);
    instantiate(game2, [transform2d([-3, 0], -45, [4, 1]), ...blueprint_board1(game2)]);
    instantiate(game2, [transform2d([3, 0], -45, [4, 1]), ...blueprint_board1(game2)]);
    instantiate(game2, [...blueprint_cooker(game2), transform2d([-5, -5], 0, [4, 3])]);
    instantiate(game2, [...blueprint_peeler(game2), transform2d([0, -5], 0, [4, 3])]);
    instantiate(game2, [...blueprint_cutter(game2), transform2d([5, -5], 0, [4, 3])]);
    instantiate(game2, [...blueprint_cooker(game2), transform2d([-5, -10], 0, [4, 3])]);
    instantiate(game2, [...blueprint_peeler(game2), transform2d([0, -10], 0, [4, 3])]);
    instantiate(game2, [...blueprint_bowl(game2), transform2d([5, -10], 0, [4, 3])]);
  }

  // ../src/scenes/sce_title.ts
  function scene_title(game2) {
    game2.World = new World(WORLD_CAPACITY);
    game2.ViewportResized = true;
    game2.spawnEnabled = true;
    instantiate(game2, [
      transform2d([0, 0]),
      camera_canvas(orthographic(5, 1, 3), [0, 0, 0, 0]),
      control_player()
    ]);
    instantiate(game2, [
      transform2d([4, 5]),
      grabbable(),
      children([transform2d([-1, 0.5], 180), render2d("ziemniak_surowy"), order(1)], [transform2d(void 0, 0, [4, 3]), render2d("karton"), order(0)], [transform2d(void 0, 0, [4, 3]), render2d("karton_front"), order(1)], [transform2d(), shake([1.3, 0.8]), spawn(blueprint_potato, 1)])
    ]);
    instantiate(game2, [transform2d([3.5, -1], -45, [4, 1]), ...blueprint_board1(game2)]);
    instantiate(game2, [transform2d([8, -5], 45, [4, 1]), ...blueprint_board1(game2)]);
    instantiate(game2, [...blueprint_bowl(game2), transform2d([4, -10], 0, [4, 3])]);
  }

  // ../src/index.ts
  var game = new Game6();
  window.game = game;
  Promise.all([load_texture(game, "spritesheet.png")]).then(() => {
    scene_title(game);
    game.Start();
  });
  async function load_texture(game2, name) {
    let image = await fetch_image("../textures/" + name + ".webp");
    game2.Textures[name] = create_texture_from(game2.Gl, image);
  }
  window.playNow = function() {
    game.PlayState = "play";
    scene_stage(game);
    document.querySelector("audio").play();
    let sim = {
      pauseLoop() {
        game.Stop();
      },
      resumeLoop() {
        game.Start();
      },
      start() {
        game.spawnEnabled = !game.spawnEnabled;
        if (game.spawnEnabled) {
          run.name("Pause");
        } else {
          run.name("Resume");
        }
      },
      restart() {
        game.Restart();
        game.spawnEnabled = true;
        run.name("Pause");
      },
      physicsReset() {
        game.physicsGravity = 9.81;
        game.physicsFriction = 0;
        game.physicsBounce = 1.1;
      },
      addPlank() {
        instantiate(game, [transform2d([0, 0], -45, [4, 1]), ...blueprint_board1(game)]);
      },
      toggleMusic() {
        let audio = document.querySelector("audio");
        if (audio.paused) {
          toggleMusic.name("Pause Music");
          audio.play();
        } else {
          toggleMusic.name("Play Music");
          audio.pause();
        }
      }
    };
    let gui = new GUI$1();
    let gui_sim = gui.addFolder("Simulation");
    var run = gui_sim.add(sim, "start").name("Run!");
    gui_sim.add(sim, "restart").name("Restart");
    gui_sim.open();
    let gui_audio = gui.addFolder("Settings");
    var toggleMusic = gui_audio.add(sim, "toggleMusic").name("Pause Music");
    gui_audio.open();
    let gui_objects = gui.addFolder("Utensils");
    gui_objects.add(sim, "addPlank").name("Add a Wooden Board");
    gui_objects.open();
    let gui_spawn = gui.addFolder("Ingredients");
    gui_spawn.add(game, "spawnInterval", 0, 1).step(0.01).name("Interval (s)");
    gui_spawn.add(game, "spawnCount", 1, 5).step(1).name("Multiplier");
    let gui_physics = gui.addFolder("Physics");
    gui_physics.add(game, "physicsCollisions").name("Enable Collisions");
    gui_physics.add(game, "physicsGravity", 0, 20).step(0.01).listen().name("Gravity");
    gui_physics.add(game, "physicsFriction", 0, 1).step(0.01).listen().name("Friction");
    gui_physics.add(game, "physicsBounce", 0, 3).step(0.01).listen().name("Bounciness");
    gui_physics.add(sim, "physicsReset").name("Reset");
    let gui_loop = gui.addFolder("Game Loop");
    gui_loop.add(sim, "pauseLoop").name("Pause");
    gui_loop.add(sim, "resumeLoop").name("Resume");
  };
})();
