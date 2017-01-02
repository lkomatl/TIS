// ==UserScript==
// @name         TIS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kombat
// @domain      https://pernatsk.ru/*
// @namespace   https://pernatsk.ru/*
// @include     https://pernatsk.ru/*
// @match       https://pernatsk.ru/*
// ==/UserScript==

(function() {
   
var addr = location.pathname; // алиас относительного пути
var vol = 1; //громкость по умолчанию
var link1 = "https://psv4.vk.me/c5039/u14643698/audios/677ba6fb2eaa.mp3"; //звук оповещения по умолчанию 
var t=document.getElementById('b-work').innerHTML; //достаём и коверкаем таймер
var th = t.substring(0, t.length - 6);
var tm = t.substring(3, t.length - 3);
var ts = t.substring(6);
    var poltaim = 5;
    if (ts < poltaim ){ts = 0;}
    else {ts = ts - poltaim;}
//создаём звук    
var   audio = new Audio();
    audio.volume= localStorage["pernatskTIS.vol"] / 10;// настриваем громкость 
audio.src = localStorage["pernatskTIS.link1"];
    
    //функция для кнопки сохранить
function applySetings(){
localStorage["pernatskTIS.vol"] = input.value;}
    
    //таймер
        th = th * 3600000;
    tm = tm * 60000;
    ts = ts * 1000;
var to = th + tm  + ts;
    //alert(to);
    setTimeout(function() {audio.play()}, to);
    
// Загружаем настройки
	if (supportsLocalStorage()) {
		if (typeof localStorage["pernatskTIS.vol"] == "undefined") {
			localStorage["pernatskTIS.vol"] = vol;
		}
		if (typeof localStorage["pernatskTIS.link1"] == "undefined") {
			localStorage["pernatskTIS.link1"] = link1;
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
		'			<b>Звук оповещения</b>:'+
		'			<input id="link1" name="link1" type="text" class="set-field set-field-2">'+
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
            
			console.log('Сохраняем настройки тем оформления.');
			localStorage["pernatskTIS.vol"] = vol;
            localStorage["pernatskTIS.link1"] = link1;
            console.log(link1);
			applySetings();
            location.reload();
		});
//подстановка адреса зука в инпут
        
        document.getElementById('link1').setAttribute('value', localStorage["pernatskTIS.link1"]);
        document.getElementById('vol').setAttribute('value', localStorage["pernatskTIS.vol"]);
       
//подстановка значения звука првее бегунка	
  var input = document.getElementById('vol');
  document.getElementById('result').innerHTML = localStorage["pernatskTIS.vol"];
  input.oninput = function() {
    document.getElementById('result').innerHTML = input.value;
  }; 
	}

})();
