// ==UserScript==
// @name         поле
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kombat
// @match        https://pernatsk.ru/nest/dump/field
// @grant        none
// ==/UserScript==

(function() {
   i=100;
      function func() {
          z = 47;
 while (z --) {
c = document.getElementsByClassName('wonderfield-cells')[0].children[z].children[0];
c.removeAttribute("style"); }
            if(i > 0){
    setTimeout(func, 50); 
       c--;
       }}
    func(); 
})();
