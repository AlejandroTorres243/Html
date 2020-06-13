window.addEventListener("load", function(){
    var template = document.getElementById("article-template")
    var article = document.getElementById("article")

    for(cont = 0; cont < 5; cont++){
        var clone = template.cloneNode(true)
        clone.removeAttribute("id")
        var h2 = clone.getElementsByTagName("h2")[0]
        h2.innerHTML = h2.textContent + ' ' + cont
        article.appendChild(clone)
    }
})
