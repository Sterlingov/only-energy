document.body.onload = createPosts;
var postsContainer = document.getElementsByClassName("posts")[0]
var postCount = document.getElementsByClassName("count-p")[0]
var searchForm = document.getElementsByClassName("search-form")[0]
const apiUrl = "http://176.53.160.183"
const SSH = "SuperSecretHeader"
const token = "1h4v34b4d1m461n4710n"


function createPosts() {
    var request = new XMLHttpRequest();
    var url = apiUrl + "/posts"
    request.open("GET", url)
    request.responseType = "json"; 
    request.setRequestHeader(SSH, token)
    request.onload = function(){ 
        postCount.innerHTML = "Кол-во постов: " + request.response.length
        request.response.forEach(element => {
           createPost(element)
        });
    }
    request.send();
}


function createPost(element){
    var newPost = document.createElement("div")
    newPost.classList.add("post")

    var postName = document.createElement("h3")
    postName.innerHTML = element.name 
    newPost.appendChild(postName)

    var postImage = document.createElement("img")
    postImage.classList.add("post-image")
    postImage.alt = "Картинка" + element.name
    postImage.src = element.imageUrl
    newPost.appendChild(postImage)

    var postDesc = document.createElement("p")
    postDesc.classList.add("post-desc")
    postDesc.innerHTML = element.description
    newPost.appendChild(postDesc)

    var postPrice = document.createElement("p")
    postPrice.classList.add("post-field")
    postPrice.innerHTML = "Оценка: " + element.mark + "/10"
    newPost.appendChild(postPrice)

    var postPrice = document.createElement("p")
    postPrice.classList.add("post-field")
    postPrice.innerHTML = "Цена: " + element.price + "₽"
    newPost.appendChild(postPrice)

    postsContainer.appendChild(newPost)
}

function getPostSearch(query) {
    var url = apiUrl + "/posts?search=" + query
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.responseType = "json"; 
    request.setRequestHeader(SSH, token)
    request.onload = function(){
        searchForm.reset()
        postsContainer.innerHTML = null
        postCount.innerHTML = "Кол-во постов: " + request.response.length
        if (request.response.length != 0){
            request.response.forEach(element => {
            createPost(element)
            });
        }else{
            var notFound = document.createElement("p")
            var notFoundCont = document.createElement("div")
            notFoundCont.classList.add("not-found-container")
            notFound.innerHTML = "Ничего не найдено("
            notFound.classList.add("not-found")
            var notFoundCat = document.createElement("img")
            notFoundCat.classList.add("not-found-cat")
            notFoundCat.src = "https://http.cat/404"
            notFoundCat.alt = "Я кощечка, сори"
            notFoundCont.appendChild(notFound)
            notFoundCont.appendChild(notFoundCat)
            document.body.appendChild(notFoundCont)
        }
    }
    request.send();
}

function searchHandler(event){
    event.preventDefault()
    let formData = new FormData(searchForm)
    query = formData.get("search")
    getPostSearch(query)
}

searchForm.addEventListener("submit", searchHandler)

