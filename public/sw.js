if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>t(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1.jpg",revision:"edd0a07ca874f2652c0e6d0289e39bef"},{url:"/2.jpg",revision:"6a3c1688a51da6bdc6568bc6552c018a"},{url:"/2t.jpg",revision:"9102e175b1d38634a6ea54a174fe0c77"},{url:"/_next/app-build-manifest.json",revision:"94e56a9be4d63209f0b6a3c5f9e639f3"},{url:"/_next/static/UblSvAmWvL9pDtvFZR-X1/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/UblSvAmWvL9pDtvFZR-X1/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-7c2b7564c6196363.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/4-28f6b8a0d9b13755.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/537-f84c56e90cce80eb.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/972-c71ecefd12d1ab7e.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/Welcome/page-1d912f9d38c735c8.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/_not-found/page-5ba8a985fcac0e7b.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/dashboard/layout-94ce4e2b9573e84e.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/dashboard/lessons/page-1460cc0204c03c2e.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/dashboard/page-221504c1be5bfcbe.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/dashboard/profile/page-b87d55711644c015.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/layout-418473a401a791dd.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/login/page-ba058bb275eed841.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/page-cb7cbf8b88e43a03.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/app/signup/page-1e90ffe56ed171f7.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/fd9d1056-4d9d5b96a066b6af.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/main-19ec84d58ca9a51d.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/main-app-f895b6e910f3b069.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-616e068a201ad621.js",revision:"UblSvAmWvL9pDtvFZR-X1"},{url:"/_next/static/css/1a0faf59972fe4a2.css",revision:"1a0faf59972fe4a2"},{url:"/logo.png",revision:"4ff6786779e91d96c19ab492eb20589b"},{url:"/manifest.json",revision:"0e4425b458d4529ac25a0aa086f4b4b4"},{url:"/pic1.png",revision:"f97a4cec17885daa62247b92097db05d"},{url:"/pic2.png",revision:"654afb726fb417397be70641dbca0cfd"},{url:"/pic3.jpg",revision:"e3961a9bfef81104c8066bc43b11b536"},{url:"/service-worker.js",revision:"4c3c6bec6c86ca77a0b786f993be4fa6"},{url:"/test.png",revision:"5aa89d38fc6e1ed80b635fa310fe2491"},{url:"/tt.jpg",revision:"7687e1c3413d9497b46bf4a9c146dc8d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
