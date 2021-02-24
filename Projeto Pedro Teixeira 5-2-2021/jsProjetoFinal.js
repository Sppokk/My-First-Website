


//navBar
function navBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


//login


let loginForm = document.getElementById("login-form");
let loginButton = document.getElementById("login-form-submit");

if (typeof (loginButton) != 'undefined' && loginButton != null) {
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (username === "Pedro" && password === "12345") {
            alert("Login feito com sucesso.");
            location.href = "peixesAdm.html"
        } else {
            alert("Login falhou!")
        }
    })
}

//fetch jsonPlaceHolder

$("#btPesquisa").on("click", function () {


    let valorPesquisa = document.querySelector("#pesquisa").value;
    let xhr3 = new XMLHttpRequest();
    xhr3.onload = function () {
        let cont = `<p>Palavra de pesquisa: ${valorPesquisa}</p>`;
        let dados2 = JSON.parse(xhr3.response);

        if (dados2.length !== 0) {

            for (let pos = 0; pos < dados2.length; pos++) {

                cont += `
            <div id="card">
              <h2 >Nome da Espécie:<span contentEditable="true"> ${dados2[pos].title}</span></h2>
              <img src="img/peixes.jpg" alt="Peixes sortidos"><br><br>
              <p > Descrição:<span contentEditable="true">${dados2[pos].id}</span></p>
              <p >Espécie ameaçada: <span contentEditable="true">${dados2[pos].completed}</span></p>
              <button class="remove" onclick ="removeParent(this.parentNode)">X</button>
              <span class="editar">(Clique nos textos para editar)</span>
          </div>
           `;
            }

        } else {
            cont += "Não existem resultados.";
        }
        document.getElementById("resultados").innerHTML = cont;
        document.getElementById("pesquisa").value = "";
    }
    xhr3.onerror = function () {
        console.log("Ocorreu um erro a carregar os dados.")
    }

    xhr3.open("GET", `https://jsonplaceholder.typicode.com/todos?q=${valorPesquisa}`);

    xhr3.send();

});

//apagar

function removeParent(parent) {
    parent.remove();
}

//carousel
var slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//widget tempo
window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = []; window.myWidgetParam.push({ id: 14, cityid: '2267057', appid: 'a5c40f76bfccfc321c2fec4df317cf2b', units: 'metric', containerid: 'openweathermap-widget-14', }); (function () { var script = document.createElement('script'); script.async = true; script.charset = "utf-8"; script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s); })();


//api tempo
let cidades = document.querySelectorAll("#listaCidades p")

for (cidade of cidades) {
    let valor = cidade.innerText;

    cidade.addEventListener("click", function () {


        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + valor + "&units=metric&appid=ace33b195f54f460a2513bb0b0f216ea")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })

            .then(dados => {
                console.log(dados);

                let icone = "http://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"

                let conteudo =
                    ` <p>Temperatura: ${dados.main.temp}</p>
            <p>Estado: ${dados.weather[0].main}</p>
            <p>Descrição: ${dados.weather[0].description}</p>
            <p id="icone">Icone:<img id="icone2" src="${icone}"></p>
           </p> `;

                document.getElementById("informacaoTempo").innerHTML = conteudo;
            })

            .catch((erro) => {
                console.log("Ocorreu o erro: " + erro);
            })

    })

}

let funchal = document.getElementById("funchal");

if (typeof (funchal) != 'undefined' && funchal != null) {
    funchal.addEventListener("click", function () {
        document.getElementById("funchal").classList.add("selected");
        document.getElementById("faro").classList.remove("selected");
        document.getElementById("porto").classList.remove("selected");
    })
}


let faro = document.getElementById("faro");

if (typeof (faro) != 'undefined' && faro != null) {
    faro.addEventListener("click", function () {
        document.getElementById("funchal").classList.remove("selected");
        document.getElementById("faro").classList.add("selected");
        document.getElementById("porto").classList.remove("selected");
    })
}

let porto = document.getElementById("porto");

if (typeof (porto) != 'undefined' && porto != null) {
    porto.addEventListener("click", function () {
        document.getElementById("funchal").classList.remove("selected");
        document.getElementById("faro").classList.remove("selected");
        document.getElementById("porto").classList.add("selected");
    });
}

//esconder imagem aquario
$('#toggle').click(function () {
    $('#colapse').toggle(1000);
});

