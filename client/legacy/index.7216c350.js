import{N as t}from"./client.d1f56cbb.js";function o(o){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=i.delay,a=void 0===n?0:n,e=i.duration,d=void 0===e?400:e,r=i.easing,c=void 0===r?t:r,s=+getComputedStyle(o).opacity;return{delay:a,duration:d,easing:c,css:function(t){return"opacity: ".concat(t*s)}}}export{o as f};
