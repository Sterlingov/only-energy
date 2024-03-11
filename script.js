var dogeImage = document.getElementById("dogeImage"); // берем нужный элемент по айдишнику

function showDoge() { 
    var request = new XMLHttpRequest(); // создаем новый запрос
    request.open("GET", "https://random.dog/woof.json"); // открываем запрос, первый аргумент - метод GET, второй - адрес ресурса
    request.responseType = "json"; // даем понять что ждем в ответ json объект
    request.onload = function(){ // показываем че делать, когда придет ответ
        dogeImage.src = request.response.url; // устанавливаем атрибут src. Передаем туда ссылку на картинку. Ссылку мы получили от сервера
    }
    request.send(); // отправляем запрос, после получения ответа на него выполнится строчка 8
}

dogeImage.onload = showDoge() // вызов самой функции показа картинки, с 3 строчки по 11. Она вызовется, когда прогрузится элемент dogeimage у юзера
