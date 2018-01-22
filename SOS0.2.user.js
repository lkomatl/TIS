// ==UserScript==
// @name         SOS0.2
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://pernatsk.ru/*
// @grant        none
// ==/UserScript==

(function() {
Notification.requestPermission(function(permission){});// Вроде как при первом запуске выдаёт запрос на получение оповещений
    //создайм звук
    var   audio = new Audio();
    audio.src =  'https://wav-library.net/sounds/0-0-1-2277-20';

    var ps = $('.count').text();//полуаем прочность солиевиков

 function ShowNotification(){
var  mailNotification = new Notification("Ироды!", {
    tag : "Ироды!",
    body : 'Ломают солиевик!!!' ,
    icon : 'https://pernatsk.ru/themes/pernatsk/img/icons/tastic-sidebar.png'
} );

    //Функция при клике на уведомление перекидывает на вкладку с ператском
    function clickFunc() { window.focus();}
    mailNotification.onclick = clickFunc;
}


    function func() {
        var ps1 = $('.count').text();//получаем для сравнения прочность солиевика с каждым прогоном
        if(ps !== ps1)
                  {            audio.play();
                   console.log('метнули');
                   ShowNotification();
                   ps = $('.count').text();}

        //console.log('перезапускается нормально');
        setTimeout(func, 1500);
}

func();
})();
