// ==UserScript==
// @name         Метание
// @description userscript для расчета метания кувалд
// @author Kombat
// @version 1.0
// @match       https://pernatsk.ru/*
// ==/UserScript==

(function() {
var addr = location.pathname; // алиас относительного пути
var regex = new RegExp('/crash/id/[0-9]{1,}(?![a-z])','i'); // для проверка пути URL
var g = new RegExp('g18_icons i-[0-9]{1,}(?![a-z])','i');  // для поска иконки напровления
var ws = 0; //    wind-speed переменная для расчета растояния №1
var bs = 0; //    bird-speed переменная для расчета растояния №2
var koord = [44,44,44,44]; //изначальная координата
//обнудение закрашеных секторов при нажатии кнопки ещё раз
              document.getElementById('link-more-game').onclick=function (){
                    for (var w1 = 11; w1 < 80; w1 = w1 + 10) {
	for (var w2 = 0; w2 < 7; w2++) {
	document.getElementById(w1 + w2).style.background='white';	}
	} }

  if (regex.test(addr)) {
      document.getElementById('link-start-game').onclick=function (){
          function func() {
      // скорость броска молота №1
      var wsped=document.getElementById('wind-speed').innerHTML; 
      // скорость броска молота №2
      var bsped=document.getElementById('bird-speed').innerHTML;
      // сила смещения из-за ветра №1
        if(wsped < 5){
            ws = [0,0,0,0];}
        else if  (wsped < 10){
            ws = [1,1,0,0];}
        else if  (wsped < 13){
            ws = [1,1,1,1];}
        else if  (wsped < 16){
            ws = [2,2,1,1];}
        else {
            ws = [2,2,2,2];}
     // alert(ws);
      // сила смещения из-за ветра №2
        if(bsped < 5){
            bs = [0,0,0,0];}
        else if  (bsped < 10){
            bs = [0,1,0,1];}
        else if  (bsped < 13){
            bs = [1,1,1,1];}
        else if  (bsped < 16){
            bs = [1,2,1,2];}
        else {
            bs = [2,2,2,2];}
      // направление броска молота №1
      var wd=document.getElementById('wind-direction'); 
      var wdir=wd.getElementsByTagName('b')[0].getAttribute('class');
      // направление броска молота №2
      var bd=document.getElementById('bird-direction'); 
      var bdir=bd.getElementsByTagName('b')[0].getAttribute('class');
//очень сложный кусок расчета направления метания кувалды в Зависимости от ветра
          if (ws === 0){
          koord = [44,44,44,44];}
          else if(wdir == ('g18_icons i-uarr')){
              for (var i = 0; i < ws.length; i++) {
                  ws[i] =  ws[i] * 1;
              }
              for (var z = 0; z < ws.length; z++) {
                  koord[z] =  koord[z] + ws[z];
         }
          }
      else if(wdir == ('g18_icons i-ruarr')){
              for (var i1 = 0; i1 < ws.length; i1++) {
                  ws[i1] =  ws[i1] * -9;
              }
              for (var z1 = 0; z1 < ws.length; z1++) {
                  koord[z1] =  koord[z1] + ws[z1];
         }
          }
      else if(wdir == ('g18_icons i-rarr')){
              for (var i2 = 0; i2 < ws.length; i2++) {
                  ws[i2] =  ws[i2] * -10;
              }
              for (var z2 = 0; z2 < ws.length; z2++) {
                  koord[z2] =  koord[z2] + ws[z2];
         }
          }

      else if(wdir == ('g18_icons i-rdarr')){
              for (var i3 = 0; i3 < ws.length; i3++) {
                  ws[i3] =  ws[i3] * -11;
              }
              for (var z3 = 0; z3 < ws.length; z3++) {
                  koord[z3] =  koord[z3] + ws[z3];
         }
          }
      
      else if(wdir == ('g18_icons i-darr')){
              for (var i4 = 0; i4 < ws.length; i4++) {
                  ws[i4] =  ws[i4] * -1;
              }
              for (var z4 = 0; z4 < ws.length; z4++) {
                  koord[z4] =  koord[z4] + ws[z4];
         }
          }
      
      else if(wdir == ('g18_icons i-ldarr')){
              for (var i5 = 0; i5 < ws.length; i5++) {
                  ws[i5] =  ws[i5] * 9;
              }
              for (var z5 = 0; z5 < ws.length; z5++) {
                  koord[z5] =  koord[z5] + ws[z5];
         }
          }
      
      else if(wdir == ('g18_icons i-larr')){
              for (var i6 = 0; i6 < ws.length; i6++) {
                  ws[i6] =  ws[i6] * 10;
              }
              for (var z6 = 0; z6 < ws.length; z6++) {
                  koord[z6] =  koord[z6] + ws[z6];
         }
          }
      
      else if(wdir == ('g18_icons i-luarr')){
              for (var i7 = 0; i7 < ws.length; i7++) {
                  ws[i7] =  ws[i7] * 11;
              }
              for (var z7 = 0; z7 < ws.length; z7++) {
                  koord[z7] =  koord[z7] + ws[z7];
         }
          }
      //тут  кусок расчета полета окончательный в Зависимости от ветра и ещё там от чего то
if (bs === 0){
     for (var i01 = 0; i01 < bs.length ; i01++) {
          koord[i01] = 44;}}
          else if(bdir == ('g18_icons i-uarr')){
              for (var i02 = 0; i02 < bs.length; i02++) {
                  bs[i02] =  bs[i02] * 1;
              }
              for (var z02 = 0; z02 < bs.length; z02++) {
                  koord[z02] =  koord[z02] + bs[z02];
         }
          }     
      
          else if(bdir == ('g18_icons i-ruarr')){
              for (var i03 = 0; i03 < bs.length; i03++) {
                  bs[i03] =  bs[i03] * -9;
              }
              for (var z03 = 0; z03 < bs.length; z03++) {
                  koord[z03] =  koord[z03] + bs[z03];
         }
          }      
      
          else if(bdir == ('g18_icons i-rarr')){
              for (var i04 = 0; i04 < bs.length; i04++) {
                  bs[i04] =  bs[i04] * -10;
              }
              for (var z04 = 0; z04 < bs.length; z04++) {
                  koord[z04] =  koord[z04] + bs[z04];
         }
          }       
      
          else if(bdir == ('g18_icons i-rdarr')){
              for (var i05 = 0; i05 < bs.length; i05++) {
                  bs[i05] =  bs[i05] * -11;
              }
              for (var z05 = 0; z05 < bs.length; z05++) {
                  koord[z05] =  koord[z05] + bs[z05];
         }
          }      
      
          else if(bdir == ('g18_icons i-darr')){
              for (var i06 = 0; i06 < bs.length; i06++) {
                  bs[i06] =  bs[i06] * -1;
              }
              for (var z06 = 0; z06 < bs.length; z06++) {
                  koord[z06] =  koord[z06] + bs[z06];
         }
          }      
      
          else if(bdir == ('g18_icons i-ldarr')){
              for (var i07 = 0; i07 < bs.length; i07++) {
                  bs[i07] =  bs[i07] * 9;
              }
              for (var z07 = 0; z07 < bs.length; z07++) {
                  koord[z07] =  koord[z07] + bs[z07];
         }
          }      
      
          else if(bdir == ('g18_icons i-larr')){
              for (var i08 = 0; i08 < bs.length; i08++) {
                  bs[i08] =  bs[i08] * 10;
              }
              for (var z08 = 0; z08 < bs.length; z08++) {
                  koord[z08] =  koord[z08] + bs[z08];
         }
          }      
      
          else if(bdir == ('g18_icons i-luarr')){
              for (var i09 = 0; i09 < bs.length; i09++) {
                  bs[i09] =  bs[i09] * 11;
              }
              for (var z09 = 0; z09 < bs.length; z09++) {
                  koord[z09] =  koord[z09] + bs[z09];
         }
          }      
// идёт подстановка координат и закрашивавание блоков
      for (var p = 0; p < koord.length; p++) {    
    document.getElementById(koord[p]).style.background='red';
}
          koord = [44,44,44,44]; //обнуление
          } 
       setTimeout(func,1000);  } }//таймер нужен для того чтобы расчет координат присходин не сразу а после секундной задержки


})();
