import{N as t}from"./client.6c6aa601.js";function o(o){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=a.delay,n=void 0===i?0:i,e=a.duration,r=void 0===e?400:e,c=a.easing,d=void 0===c?t:c,s=+getComputedStyle(o).opacity;return{delay:n,duration:r,easing:d,css:function(t){return"opacity: ".concat(t*s)}}}export{o as f};