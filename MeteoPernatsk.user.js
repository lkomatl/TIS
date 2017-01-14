// ==UserScript==
// @name MeteoPernatsk
// @description userscript для погодки
// @author Kombat
// @license MIT
// @version 1.0
// @domain      https://pernatsk.ru/*
// @namespace   https://pernatsk.ru/*
// @include     https://pernatsk.ru/*
// @match       https://pernatsk.ru/*
// ==/UserScript==
(function(window, undefined ) {
    var addr = location.pathname; // алиас относительного пути
if (addr == '/world/weather') {
   var i = 0;
   while (i < 20) {
       ///перекраиваем див и смещаем иконку погоды в левую часть
       var met=document.getElementsByClassName('meteo-raw active')[i]; //переменная с div приобретённым прогнозом
       met.style.width = '700px' ; //устанавливаем ширину
       met.style.textAlign = 'left' ; //по левому краю
       met.style.minHeight='100px' ; //минимальная высота 100 пикселей
       met.style.height='100%' ; // высота по содержанию
       ///   получаем инф из атрибута span
       var inf=met.getElementsByTagName('span')[0].getAttribute('onmouseover');
       var prognoz = inf.substring(6, inf.length - 9);  //удалаяем лишнее
       /// создаем див с погодкой
       d = document.createElement('div');
       d.style.float='right';
       d.style.width='600px';
       d.innerHTML = prognoz;
       document.getElementsByClassName('meteo-raw active')[i].appendChild(d);
       i++;
   }
}
})(window);
