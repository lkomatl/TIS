// ==UserScript==
// @name         TIS
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       kombat
// @domain      https://pernatsk.ru/*
// @namespace   https://pernatsk.ru/*
// @include     https://pernatsk.ru/*
// @match       https://pernatsk.ru/*
// ==/UserScript==

(function() {
var zvukosnov = true;  //основное звуковое сопровождение, по умолчанию
var zvukSled = true;

var addr = location.pathname; // алиас относительного пути
var vol = 1; //громкость по умолчанию
var link1 = "https://p.nnm.su/assets/frog.mp3"; //звук оповещения по умолчанию
var link2 = "https://wav-library.net/sounds/0-0-1-11084-20"; //звук оповещения для новогодних инвентов по умолчанию
var poltaim = 5; // время до оповещения по умолчанию


//проверка запуск функции для стандартного опопвещения
    if (localStorage["pernatskTIS.zvukosnov"] == "1" ){
        if(document.getElementById('b-work') !== null){
var t=document.getElementById('b-work').innerHTML; //достаём и коверкаем таймер
var th = t.substring(0, t.length - 6);
var tm = t.substring(3, t.length - 3);
var ts = t.substring(6);
    if (ts < poltaim ){ts = 0;}
    else {ts = ts - poltaim;}
        //таймер
th = th * 3600000;
tm = tm * 60000;
 ts = ts * 1000;
var to = th + tm  + ts;
setTimeout(function() {audio.play()}, to);}}
    
    
   if (localStorage["pernatskTIS.zvukSled"] == "1" ){    
    //санколёт
if(document.getElementById('mini-content-timer-snowhill') !== null){
var sled=document.getElementById('mini-content-timer-snowhill'); 
var tSled=sled.innerHTML; //достаём и коверкаем таймер
var thSled = tSled.substring(0, tSled.length - 6);
var tmSled = tSled.substring(3, tSled.length - 3);
var tsSled = tSled.substring(6);
    if (tsSled < poltaim ){tsSled = 0;}
    else {tsSled = tsSled - poltaim;}
        //таймер
thSled = thSled * 3600000;
tmSled = tmSled * 60000;
 tsSled = tsSled * 1000;
var toSled = thSled + tmSled  + tsSled;
    setTimeout(function() {audioSled.play()}, toSled);
}}

   if (localStorage["pernatskTIS.zvukSled"] == "1" ){    
    //санколёт
if(document.getElementById('mini-content-timer-snowcleaner') !== null){
var snowcleaner=document.getElementById('mini-content-timer-snowcleaner'); 
var tsnowcleaner=snowcleaner.innerHTML; //достаём и коверкаем таймер
var thsnowcleaner = tsnowcleaner.substring(0, tsnowcleaner.length - 6);
var tmsnowcleaner = tsnowcleaner.substring(3, tsnowcleaner.length - 3);
var tssnowcleaner = tsnowcleaner.substring(6);
 
    if (tssnowcleaner < poltaim ){tssnowcleaner = 0;}
    else {tssnowcleaner = tssnowcleaner - poltaim;}
        //таймер
thsnowcleaner = thsnowcleaner * 3600000;
tmsnowcleaner = tmsnowcleaner * 60000;
 tssnowcleaner = tssnowcleaner * 1000;
var tosnowcleaner = thsnowcleaner + tmsnowcleaner  + tssnowcleaner;
  
    setTimeout(function() {audioSled.play()}, tosnowcleaner);
}}    
    
    
    
// Загружаем настройки
	if (supportsLocalStorage()) {
        //громкость
		if (typeof localStorage["pernatskTIS.vol"] == "undefined") {
			localStorage["pernatskTIS.vol"] = vol;
		}
        //ссылка на звук(основная)
		if (typeof localStorage["pernatskTIS.link1"] == "undefined") {
			localStorage["pernatskTIS.link1"] = link1;
		} 
        //пользовательское время(до пилика)
		if (typeof localStorage["pernatskTIS.poltaim"] == "undefined") {
			localStorage["pernatskTIS.poltaim"] = poltaim;
		}
        //галачка для основного звука
		if (typeof localStorage["pernatskTIS.zvukosnov"] == "undefined") {
			localStorage["pernatskTIS.zvukosnov"] = zvukosnov;
		}
        //сылка на звук(новогодний инвент)
		if (typeof localStorage["pernatskTIS.link2"] == "undefined") {
			localStorage["pernatskTIS.link2"] = link2;
		}
	}
	// Проверяет, можно ли пользоваться local storage
	function supportsLocalStorage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			console.log('localStorage не работает.');
			return false;
		}
	}
    
//создаём звук (основной)    
    var   audio = new Audio();
    audio.volume= localStorage["pernatskTIS.vol"] / 10;// настриваем громкость 
    audio.src = localStorage["pernatskTIS.link1"];
    
// проба звука для инвентов    
    var   audioSled = new Audio();
    audioSled.volume= localStorage["pernatskTIS.vol"] / 10;// настриваем громкость 
    audioSled.src = localStorage["pernatskTIS.link2"];    
// настройки
	if (addr == '/nest/bird/settings') {
		// форма с настройками юзерскрипта
		var settingsFormThemes = 
		'<div id="settingsFormThemes">'+
		'	<div class="stat-ct">Настрокий TIS</div>'+
		'	<div class="set-3">'+
		'		<div class="set-action">'+
		'			<b>Громкость</b>:'+
		'			<br>'+
		'			<input id="vol"  name="vol" type="range" min="1" max="10" step="1" > '+
		'			<span id="result"> </span> '+
        '		</div>'+
		'		<div class="set-action">'+
		'			<b>Врмя оповещения</b>:'+
		'			<input  type="text" id="poltaim" name="poltaim" class="flea-searching-input">'+
        '		сек. '+   
		'		</div>'+
		'		</div>'+
		'		<div class="set-action">'+
        '			<input id="zvukosnov" name="zvukosnov" type="checkbox" >'+
		'			<b>Звук оповещения окончание работы </b>:'+
		'			<input id="link1" name="link1" type="text" class="set-field set-field-2">'+
		'		</div>'+
 		'		<div class="set-action">'+
        '			<input id="zvukSled" name="zvukSled" type="checkbox" >'+
		'			<b>Звук оповещения для зимних инвентов </b>:'+
		'			<input id="link2" name="link2" type="text" class="set-field set-field-2">'+
		'		</div>'+
		'		Можно указывать ссылки ведущие только с https '+
		'		<div class="separator"></div>'+
		'		<div class="set-action">'+
		'			<button class="butt_action butt_mid butt_save_themes_config"   >Сохранить</button>'+
		'		</div>'+
		'	</div>'+
		'	</div>'+
		'</div>';

		//$('#settingsFormThemes').remove();
		$('.pl-sub-cont > .pl-sub-ct table tr:first td:first').prepend(settingsFormThemes);

        //малопонятный кусок с настройками для кнопки сохранить
		$('.butt_save_themes_config').unbind('click').click(function() {
			if (!supportsLocalStorage()) { return false; }
			vol = $('#vol').val();
            link1 = $('#link1').val();
            poltaim = $('#poltaim').val();
			console.log('Сохраняем');
			localStorage["pernatskTIS.vol"] = vol;
            localStorage["pernatskTIS.link1"] = link1;
            localStorage["pernatskTIS.poltaim"] = poltaim;
            //сохраниние чекбокса для основного
            localStorage["pernatskTIS.zvukosnov"] = zvukosnov;   
                    if (zvukosnov=== true){
            localStorage["pernatskTIS.zvukosnov"] = 1;}
             else if (zvukosnov == "true"){
             localStorage["pernatskTIS.zvukosnov"] = 2;}
             else  {localStorage["pernatskTIS.zvukosnov"] = 0;}    
            //соханение чекбокса для зимниз инвентов
            localStorage["pernatskTIS.zvukSled"] = zvukSled;   
                    if (zvukSled=== true){
            localStorage["pernatskTIS.zvukSled"] = 1;}
             else if (zvukSled == "true"){
             localStorage["pernatskTIS.zvukSled"] = 2;}
             else  {localStorage["pernatskTIS.zvukSled"] = 0;}            
            console.log(vol);
            console.log(link1);
            console.log(poltaim);
            console.log(zvukosnov);
			
            location.reload();
		});
//подстановка значений в инпут
        document.getElementById('zvukosnov').checked =  +localStorage["pernatskTIS.zvukosnov"];  
        document.getElementById('link1').setAttribute('value', localStorage["pernatskTIS.link1"]);
        document.getElementById('link2').setAttribute('value', localStorage["pernatskTIS.link2"]);
        document.getElementById('vol').setAttribute('value', localStorage["pernatskTIS.vol"]);
        document.getElementById('poltaim').setAttribute('value', localStorage["pernatskTIS.poltaim"]);
        document.getElementById('zvukSled').checked =  +localStorage["pernatskTIS.zvukSled"];  
       
//подстановка значения звука првее бегунка	
  var input = document.getElementById('vol');
  document.getElementById('result').innerHTML = localStorage["pernatskTIS.vol"];
  input.oninput = function() {
    document.getElementById('result').innerHTML = input.value;
  }; 
	
   //подстановка значений в чекбоксы
  var checkbox = document.getElementById('zvukosnov');
    checkbox.onchange = function() {
        zvukosnov =  checkbox.checked ;    
    };     
  var checkboxSled = document.getElementById('zvukSled');
    checkboxSled.onchange = function() {
        zvukSled =  checkboxSled.checked ;    
    }; 
    }
 

})();
