/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "78501a8a0488ec921a5c53ea8ef3cf70"
  }, {
    "url": "pwa-512x512.png",
    "revision": "93575d9c0d6a3909059523f406f8434b"
  }, {
    "url": "pwa-192x192.png",
    "revision": "27050499c7f8bdab3ae2d1e380f1aedc"
  }, {
    "url": "index.html",
    "revision": "8bb958daec8bd2e9366bd10886f50c1a"
  }, {
    "url": "icon.svg",
    "revision": "9fcfef949b41676ddbb36d85cee27f17"
  }, {
    "url": "favicon.ico",
    "revision": "3cd5871cd2ec953c136de2565808d16a"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "d3012390a94d75798dda0b45f3915c18"
  }, {
    "url": "assets/workbox-window.prod.es5-BBnX5xw4.js",
    "revision": null
  }, {
    "url": "assets/mru-header.png",
    "revision": null
  }, {
    "url": "assets/mru-header-BKtGg3gB.png",
    "revision": null
  }, {
    "url": "assets/index-Dx3Ql1q7.css",
    "revision": null
  }, {
    "url": "assets/index-DAf2wbo4.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "d3012390a94d75798dda0b45f3915c18"
  }, {
    "url": "favicon.ico",
    "revision": "3cd5871cd2ec953c136de2565808d16a"
  }, {
    "url": "icon.svg",
    "revision": "9fcfef949b41676ddbb36d85cee27f17"
  }, {
    "url": "pwa-192x192.png",
    "revision": "27050499c7f8bdab3ae2d1e380f1aedc"
  }, {
    "url": "pwa-512x512.png",
    "revision": "93575d9c0d6a3909059523f406f8434b"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "78501a8a0488ec921a5c53ea8ef3cf70"
  }, {
    "url": "assets/mru-header.png",
    "revision": "10f5e18b1010ef789b587c05f9f839e7"
  }, {
    "url": "manifest.webmanifest",
    "revision": "73427965e215770684d9b40ce3db1fe2"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
