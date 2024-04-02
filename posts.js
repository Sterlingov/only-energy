document.body.onload = createPosts;
var postsContainer = document.getElementsByClassName("posts")[0]
var postCount = document.getElementsByClassName("count-p")[0]


function createPosts() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://176.53.160.183/posts"); 
    request.responseType = "json"; 
    request.setRequestHeader('SuperSecretHeader', '1h4v34b4d1m461n4710n')
    request.onload = function(){ 
        postCount.innerHTML += request.response.length
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