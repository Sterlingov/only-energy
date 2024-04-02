var dogeImage = document.getElementById("dogeImage"); // берем нужный элемент по айдишнику
var text = document.getElementById("papaotdaymnedevstvennost");
var visitCount = document.getElementById("hello")


function showDoge() { 
    var request = new XMLHttpRequest(); // создаем новый запрос
    request.open("GET", "https://yesno.wtf/api?force=yes"); // открываем запрос, первый аргумент - метод GET, второй - адрес ресурса
    request.responseType = "json"; // даем понять что ждем в ответ json объект
    request.onload = function(){ // показываем че делать, когда придет ответ
        dogeImage.src = request.response.image; // устанавливаем атрибут src. Передаем туда ссылку на картинку. Ссылку мы получили от сервера
    }
    request.send(); // отправляем запрос, после получения ответа на него выполнится строчка 8
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


function setCookie(cname, cvalue, exdays = 3000) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function countVisits(){
    let count = getCookie("visitcount")
    count = Number(count)
    if (count == 0){
        visitCount.innerHTML = "Добро пожаловать!"
        setCookie("visitcount", 1)
        return
    }
    if (count == 1) {
        visitCount.innerHTML = "Добро пожаловать, снова!"
    }
    else if (count == 2) {
        visitCount.innerHTML = "I always come back..."
    }
    else if (count == 3){
        visitCount.innerHTML = "Ха-ха, ты снова тут?"
    }
    else if (count == 4) {
        visitCount.innerHTML = "Ты очень любишь энергетики, так?"
    }
    else if (count == 5) {
        visitCount.innerHTML = "100% кофеина, 0% осуждения"
    }
    else if (count % 100 == 0) {
        visitCount.innerHTML = "Все в порядке? Эти " + count + " посещений меня пугают..."
    }
    else if (count % 10 == 0) {
        visitCount.innerHTML = "Поздравляем, уже " + count + " посещений"
    }
    else{
        visitCount.innerHTML = "Привет, фанат энергетиков " + count + " уровня"
    }
    setCookie("visitcount", count + 1)
}


document.onload = countVisits()
dogeImage.onload = showDoge() // вызов самой функции показа картинки, с 3 строчки по 11. Она вызовется, когда прогрузится элемент dogeimage у юзера
