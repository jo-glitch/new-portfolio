// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/leap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leap = void 0;
var controller = new Leap.Controller();
controller.connect();
controller.on('frame', function (frame) {
  exports.leap = leap = frame;
});
var leap;
exports.leap = leap;
},{}],"js/coord.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoords = getCoords;

function getCoords(leapPoint, frame, canvas) {
  var iBox = frame.interactionBox;
  var normalizedPoint = iBox.normalizePoint(leapPoint, true);
  return {
    x: normalizedPoint[0] * canvas.width,
    y: (1 - normalizedPoint[1]) * canvas.height
  };
}
},{}],"js/scrip.js":[function(require,module,exports) {
"use strict";

var _leap = require("./leap.js");

var _coord = require("./coord.js");

// import ventwav from '../sound/fire.mp3';
// import ambiancemp3 from '../sound/ambiance.mp3';
// import metalaigue from '../sound/metalLight.mp3';
var c = document.getElementById('c');
var ctx = c.getContext('2d');
var rayon = 75;
var position;
var red = 'rgb(200,100,50)';
var white = 'rgb(255,255,255)'; // let vent = new Pizzicato.Sound(ventwav);
// let ambiance = new Pizzicato.Sound(ambiancemp3);
// let metalLight = new Pizzicato.Sound(metalaigue);

/**
 * Loop
 */

var w = window.innerWidth;
var h = window.innerHeight; //largeur et hauteur du canvas

c.width = w;
c.height = h; //largeur hauteur du canvas

var mouse = {
  x: w / 1.2,
  y: h / 1.2
}; //position souris

var particles = [];

for (var x = 0; x < c.width / 20; x++) {
  for (var y = 0; y < c.height / 20; y++) {
    particles.push(new particle(x * 20, y * 20));
  }
}

console.log(mouse); //fonction particules

function particle(x, y, particles) {
  this.x = x + 1;
  this.y = y + 1;
  this.xo = x + 10;
  this.yo = y + 10;
  this.r = 10; // couleur mits dans des variables et dans un tableau
  // let one = 'rgba(10, 255, 255, 0.7)';
  // let two = 'rgba(255, 255, 255, 0.7)';
  // let three = 'rgba(10, 255, 255, 0.9)';
  // let four = 'rgba(255, 255, 255, 0.9)';
  // let five = 'rgba(10, 255, 255, 0.5)';
  // let six = 'rgba(255, 255, 255, 0.5)';
  // let colors = [one, two, three, four, five, six];

  this.color = white; //couleurs random des variables
} // 


var keyboard = {};
keyboard.up = false;
keyboard.down = false;
keyboard.left = false;
keyboard.right = false;
keyboard.restard = false;
document.addEventListener('keydown', function (_event) {
  console.log(_event.code);

  switch (_event.code) {
    case 'keyQ':
    case 'ArrowUp':
      keyboard.up = true;
      break;

    case 'keyD':
    case 'ArrowRight':
      keyboard.right = true;
      break;

    case 'keyS':
    case 'ArrowDown':
      keyboard.down = true;
      break;

    case 'keyA':
    case 'ArrowLeft':
      keyboard.left = true;
      break;

    case 'KeyR':
      keyboard.restart = true;
      break;
  }
});
document.addEventListener('keyup', function (_event) {
  console.log(_event.code);

  switch (_event.code) {
    case 'keyQ':
    case 'ArrowUp':
      console.log('up');
      keyboard.up = false;
      break;

    case 'keyD':
    case 'ArrowRight':
      console.log('right');
      keyboard.right = false;
      break;

    case 'keyS':
    case 'ArrowDown':
      console.log('down');
      keyboard.down = false;
      break;

    case 'keyA':
    case 'ArrowLeft':
      console.log('left');
      keyboard.left = false;
      break;

    case 'KeyR':
      keyboard.restart = false;
      break;
  }

  console.log(_event.code);
});

var draw = function draw() {
  ctx.fillStyle = 'rgba(52, 52, 53, 0.75)';
  ctx.fillRect(0, 0, c.width, c.height);

  for (var i = 0; i < particles.length; i++) {
    position = particles[i];
    ctx.beginPath();
    ctx.fillStyle = position.color;
    ctx.arc(position.x, position.y, position.r, Math.PI * 0.4, Math.PI * 0.5, false);
    ctx.fill(); //context de particules

    var distorsionRayon = void 0,
        distorsionX = mouse.x - position.x,
        distorsionY = mouse.y - position.y;
    distorsionRayon = Math.sqrt(distorsionX * distorsionX + distorsionY * distorsionY);

    if (distorsionRayon <= rayon) {
      var Speedx = distorsionX,
          Speedy = distorsionY;
      position.x -= Speedx / 10;
      position.y -= Speedy / 10;
    }

    var disto = void 0,
        distoXo = position.x - position.xo,
        distoYo = position.y - position.yo;
    disto = Math.sqrt(distoXo * distoXo + distoYo * distoYo);
    position.x -= distoXo / 10;
    position.y -= distoYo / 10; // animation des particules
    // touche haut

    if (keyboard.up === true) {
      position.y += Math.random(0.1 + position.x * c.width) * c.height;
    } // touche gauche


    if (keyboard.left === true) {
      position.x += Math.random(0.1 + position.x * c.height) * c.width;
    } // touche droite


    if (keyboard.right === true) {
      position.x -= Math.random(0.1 + position.x * c.height) * c.width;
    } // touche bas


    if (keyboard.down === true) {
      position.y -= Math.random(0.1 + position.x * c.width) * c.height;
    }

    if (distorsionRayon <= rayon) {
      position.color = red;
    } else {
      position.color = white;
    } // remet les particules a leur place d'origine
    // if (disto != 0) {
    //     position.r = (disto / 4) + 15;
    // }
    // collision canvas


    if (mouse.x + rayon > c.width) {
      mouse.x = c.width - rayon; // soundOn = true;
    }

    if (mouse.x - rayon < 0) {
      mouse.x = rayon;
    }

    if (mouse.y + rayon > c.height) {
      mouse.y = c.height - rayon;
    } else if (mouse.y - rayon < 0) {
      mouse.y = rayon;
    }
  }
}; // Interaction avec la souris


var mouseDown = false;
var animation = false; // mouvement de la souris

document.addEventListener('mousemove', function (e) {
  mouse.x = e.clientX || e.pageX;
  mouse.y = e.clientY || e.pageY;
}); // si la souris reste presser

document.addEventListener('mousedown', function () {
  mouseDown = true;
});
document.addEventListener('mouseup', function () {
  mouseDown = false;
  animation = true;
});

var loop = function loop() {
  window.requestAnimationFrame(loop);
  draw();

  if (mouseDown === true) {
    rayon += 3; // vent.play();

    if (rayon >= 425) {
      rayon = 425;
    }
  }

  if (mouseDown === false) {
    rayon = 75; // vent.stop();
  }

  if (_leap.leap && _leap.leap.hands && _leap.leap.hands.length > 0) {
    // Si j'ai une main ...
    var _getCoords = (0, _coord.getCoords)(_leap.leap.hands[0].palmPosition, _leap.leap, c),
        _x = _getCoords.x,
        _y = _getCoords.y;

    mouse.x = _x;
    mouse.y = _y;

    if (_leap.leap.hands[0].pinchStrength >= 0.90) {
      // let indexFinger = getCoords(hand.indexFinger.tipPosition, frame, canvas);
      // console.log(mouse);
      mouseDown = true;

      if (mouseDown === true) {
        rayon += 3;

        if (rayon >= 525) {
          rayon = 525;
        }
      }
    } else {
      mouseDown = false;

      if (mouseDown === false) {
        rayon = 75;
      }
    }
  }
};

loop();
},{"./leap.js":"js/leap.js","./coord.js":"js/coord.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51138" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/scrip.js"], null)
//# sourceMappingURL=/scrip.5044850a.js.map