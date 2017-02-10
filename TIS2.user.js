// ==UserScript==
// @name         TIS2
// @version      0.1
// @author       Kombat
// @match        https://pernatsk.ru/*
// ==/UserScript==

(function() {
//Переменные
    var addr = location.pathname; // алиас относительного пути
    var poltaim = 5; // время до оповещения по умолчанию
    var volume = 1;  //громкость
    var link = "https://wav-library.net/sounds/0-0-1-11084-20"; //звук стандартного оповещения по умолчанию
    var input = "true";  //галочки, по умолчанию включены

Notification.requestPermission(function(permission){});// Вроде как при первом запуске выдаёт запрос на получение оповещений
// Проверяет, можно ли пользоваться local storage
    function supportsLocalStorage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			console.log('localStorage не работает.');
			return false;
		}
	}

// Загружаем настройки
if (supportsLocalStorage()) {
        //громкость
		if (typeof localStorage["pernatskTIS.vol"] == "undefined") {
			localStorage["pernatskTIS.vol"] = volume;
		}
        //пользовательское время(до пилика)
		if (typeof localStorage["pernatskTIS.poltaim"] == "undefined") {
			localStorage["pernatskTIS.poltaim"] = poltaim;
		}
        //ссылка на звук(основная)
		if (typeof localStorage["pernatskTIS.link1"] == "undefined") {
			localStorage["pernatskTIS.link1"] = link;
		}
            //сылка на звук(дирижабль)
		if (typeof localStorage["pernatskTIS.link2"] == "undefined") {
			localStorage["pernatskTIS.link2"] = link;
		}
                //сылка на звук(Замбычь)
		if (typeof localStorage["pernatskTIS.link3"] == "undefined") {
			localStorage["pernatskTIS.link3"] = link;
		}
        //галачка для основного звука
		if (typeof localStorage["pernatskTIS.zvukosnov"] == "undefined") {
			localStorage["pernatskTIS.zvukosnov"] = input;
		}
    //галачка для основного оповещения
		if (typeof localStorage["pernatskTIS.mailOsnov"] == "undefined") {
			localStorage["pernatskTIS.mailOsnov"] = input;
		}
        //галачка для дирижабля (звук)
		if (typeof localStorage["pernatskTIS.zvukDoki"] == "undefined") {
			localStorage["pernatskTIS.zvukDoki"] = input;
		}
    //галачка для дирижабля (оповещение)
		if (typeof localStorage["pernatskTIS.mailDoki"] == "undefined") {
			localStorage["pernatskTIS.mailDoki"] = input;
		}
            //галачка для Зомбыча (звук)
		if (typeof localStorage["pernatskTIS.zvukZomb"] == "undefined") {
			localStorage["pernatskTIS.zvukZomb"] = input;
		}
    //галачка для Зомбыча (оповещение)
		if (typeof localStorage["pernatskTIS.mailZomb"] == "undefined") {
			localStorage["pernatskTIS.mailZomb"] = input;
		}
	}


//Функция для воспроизведения сообщения 
     function playAudio(URLsound) {
    var   audio = new Audio();//создаём звук (основной)
    audio.volume= volume / 10;// настриваем громкость
    audio.src = URLsound;
     audio.play();}


//Функция для вывода оповещениея
function ShowNotification(text, URL){
var  mailNotification = new Notification("TIS оповещение", {
    tag : "TIS-mail",
    body : text ,
    icon : URL
} );

    //Функция при клике на уведомление перекидывает на вкладку с ператском
     function clickFunc() { window.focus();}
  mailNotification.onclick = clickFunc;
}

    //функция для расчета времени полученого из таймера
function CalcTime(ElementId){
var t=document.getElementById(ElementId).innerHTML; //достаём и коверкаем таймер
    if (t.length > 7 ){
var th = t.substring(0, t.length - 6);
var tm = t.substring(3, t.length - 3);
var ts = t.substring(6);
    if (ts < poltaim ){ts = 0;}
    else {ts = ts - poltaim;}
//умножаем полученые реультаты на милисекунды
th = th * 3600000;
tm = tm * 60000;
ts = ts * 1000;
var to = th + tm  + ts;
        console.log(to);
   return to;   
}else{
var tmm = t.substring(0, t.length - 3);
var tsm = t.substring(3);
    if (tsm < poltaim ){t = 0;}
    else {tsm = tsm - poltaim;}
tmm = tmm * 60000;
tsm = tsm * 1000;
var to =  tmm  + tsm;
  return to; }
}

//Функция для проверки условий и запуска фукций 
function Start(inputSound, inputMail , linkSound , ElementId, message, URLimage){
if (inputSound == "true" ){
    if (inputMail == "true" ){
        if(document.getElementById(ElementId) !== null){
            setTimeout(function(){ShowNotification(message, URLimage); 
                                  playAudio(linkSound);} , CalcTime(ElementId));}
     }
    else{setTimeout(function(){playAudio();} , CalcTime(ElementId));} }
else if (inputMail == "true" ){ 
        if(document.getElementById(ElementId) !== null){
            setTimeout(function(){ShowNotification(message, URLimage );} , CalcTime(ElementId));
}}
}
    
    //функция для запуска основного оповещения
Start(localStorage["pernatskTIS.zvukosnov"], localStorage["pernatskTIS.mailOsnov"], localStorage["pernatskTIS.link1"],'b-work', 
        "Пернатый вот-вот осободится", "https://pernatsk.ru/themes/compressed/img/fav/apple-touch-icon-57x57.png");  
    //функция для запуска опвещения для доков
Start(localStorage["pernatskTIS.zvukDoki"], localStorage["pernatskTIS.mailDoki"], localStorage["pernatskTIS.link2"], 'mini-content-timer-airship-fly', 
        "Дирижабль готов к запуску", "https://pernatsk.ru/assets/25532/compressed/img/posters/airship-4.png");  
//Функция для запуска опвещения у Зомбыча
Start(localStorage["pernatskTIS.zvukZomb"], localStorage["pernatskTIS.mailZomb"], localStorage["pernatskTIS.link3"], 'sidebar_beaver_attack', 
        "Можно навалять Зомбычу", "https://pernatsk.ru/assets/25532/compressed/img/themes/winter/avatar-999.png");  


    
//настройки скрипта
	if (addr == '/nest/bird/settings') {
		// форма с настройками юзерскрипта
		var settingsTIS =
		'<div id="settingsTIS">'+
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
		'		<div class="set-3">'+
		'			<b>Оповещения окончания работы </b>:'+
        '			<input id="zvukosnov" name="zvukosnov" type="checkbox" >'+
		'			<b>Звук  </b>'+
        '			<input id="mailOsnov" name="mailOsnov" type="checkbox" >'+
		'			<b>Сообщение  </b>'+
		'			<input id="link1" name="link1" type="text" class="set-field set-field-2">'+
		'		</div>'+
 		'		<div class="set-3">'+
		'			<b>Оповещения для  дирижабля</b>:'+
        '			<input id="zvukDoki" name="zvukDoki" type="checkbox" >'+
		'			<b>Звук  </b>'+
        '			<input id="mailDoki" name="mailDoki" type="checkbox" >'+
		'			<b>Сообщение  </b>'+
		'			<input id="link2" name="link2" type="text" class="set-field set-field-2">'+
		'		</div>'+
             		'		<div class="set-3">'+
		'			<b>Оповещения для  Зомбыча</b>:'+
        '			<input id="zvukZomb" name="zvukZomb" type="checkbox" >'+
		'			<b>Звук  </b>'+
        '			<input id="mailZomb" name="mailZomb" type="checkbox" >'+
		'			<b>Сообщение  </b>'+
		'			<input id="link3" name="link3" type="text" class="set-field set-field-2">'+
		'		</div>'+
		'		<div class="set-3">'+
		'		Можно указывать ссылки ведущие только с https '+
		'		</div>'+
		'		<div class="separator"></div>'+
		'		<div class="set-action">'+
		'			<button class="butt_action butt_mid butt_save_themes_config"   >Сохранить</button>'+
		'		</div>'+
		'	</div>'+
		'	</div>'+
		'</div>';

		//$('#settingsTIS').remove();
		$('.pl-sub-cont > .pl-sub-ct table tr:first td:first').prepend(settingsTIS);

        //кнопка сохранить
		$('.butt_save_themes_config').unbind('click').click(function() {
			if (!supportsLocalStorage()) { return false; }

            localStorage["pernatskTIS.vol"] = $('#vol').val();
            localStorage["pernatskTIS.link1"] = $('#link1').val();
            localStorage["pernatskTIS.poltaim"] = $('#poltaim').val();
            localStorage["pernatskTIS.link2"] = $('#link2').val();
            localStorage["pernatskTIS.link3"] = $('#link3').val();

            localStorage["pernatskTIS.zvukosnov"] = document.getElementById('zvukosnov').checked;
            localStorage["pernatskTIS.mailOsnov"] = document.getElementById('mailOsnov').checked;

            localStorage["pernatskTIS.zvukDoki"] = document.getElementById('zvukDoki').checked;
            localStorage["pernatskTIS.mailDoki"] = document.getElementById('mailDoki').checked;

            localStorage["pernatskTIS.zvukZomb"] = document.getElementById('zvukZomb').checked;
            localStorage["pernatskTIS.mailZomb"] = document.getElementById('mailZomb').checked;
            
            console.log('Сохраняем');
            console.log(volume);
            console.log(link);
            console.log(poltaim);

            location.reload();
		});

        //подстановка значений в инпут
        //основное оповещение
        if (localStorage["pernatskTIS.zvukosnov"] == "true"){
            document.getElementById('zvukosnov').checked = true ;  }        
        if (localStorage["pernatskTIS.mailOsnov"] == "true"){
            document.getElementById('mailOsnov').checked = true ;  }

        //Дирижабль
        if (localStorage["pernatskTIS.zvukDoki"] == "true"){
            document.getElementById('zvukDoki').checked = true ;  }        
        if (localStorage["pernatskTIS.mailDoki"] == "true"){
            document.getElementById('mailDoki').checked = true ;  }

        //Зомбычь
        if (localStorage["pernatskTIS.zvukZomb"] == "true"){
            document.getElementById('zvukZomb').checked = true ;  }        
        if (localStorage["pernatskTIS.mailZomb"] == "true"){
            document.getElementById('mailZomb').checked = true ;  }

        document.getElementById('link1').setAttribute('value', localStorage["pernatskTIS.link1"]);
        document.getElementById('link2').setAttribute('value', localStorage["pernatskTIS.link2"]);
        document.getElementById('link3').setAttribute('value', localStorage["pernatskTIS.link3"]);
        document.getElementById('vol').setAttribute('value', localStorage["pernatskTIS.vol"]);
        document.getElementById('poltaim').setAttribute('value', localStorage["pernatskTIS.poltaim"]);

//подстановка значения звука првее бегунка
  var inputVolume = document.getElementById('vol');
  document.getElementById('result').innerHTML = localStorage["pernatskTIS.vol"];
  inputVolume.oninput = function() {
    document.getElementById('result').innerHTML = inputVolume.value;
  };
    }
})();
