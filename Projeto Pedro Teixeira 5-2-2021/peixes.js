function mostraRegistos(registos) {
    let conteudo="";
    for (registo of registos) {
        
        conteudo+=`<tr><td >${registo.id}</td><td>${registo.nome}</td><td>${registo.descricao}</td><td>${registo.tamanho}</td><td>${registo.cardume}</td><td>${(registo.ameacada) ? "✔" : "✖"}</td><td><span class="saberMais" data-id="${registo.id}">Clique no Registo</span></td></tr>`;
    }
    document.querySelector("#tabeladados tbody").innerHTML=conteudo;
    document.querySelector("#totalRegistos").textContent=registos.length;
    

   
}

function todosRegistos() {
    fetch("http://localhost:3000/peixes") 
        .then(response => response.json())
        .then(registos => {
            mostraRegistos(registos);
        })
       
        .catch(erro => console.error("Ocorreu um erro - todosRegistos"+erro));
}

document.getElementById("btProcura").addEventListener("click",function() {
   
    let valorProcura=document.getElementById("procura").value;
    fetch("http://localhost:3000/peixes?nome_like="+valorProcura)
        .then(response => response.json())
        .then(registos => {
            console.log(registos);
            mostraRegistos(registos);
        })
        .catch(erro => alert("Ocorreu um erro - procura"));
});

document.getElementById("btLimpaProcura").addEventListener("click",function() {
    document.getElementById("procura").value="";
    todosRegistos();
});


document.querySelector("#tabeladados tbody").addEventListener("click", function(evento) {
    let elementoClicado=evento.target.tagName; 
    if (elementoClicado==="TD") {
      
        let id=evento.target.parentElement.getElementsByClassName("saberMais")[0].getAttribute("data-id");
        fetch("http://localhost:3000/peixes/"+id)  
            .then(response => response.json())
            .then(registo => {
                let conteudo=`<p><strong>Nome da Espécie</strong>: ${registo.nome}</p><p><strong>Descrição</strong>: ${registo.descricao}</strong></p><p><strong>Tamanho</strong>:${registo.tamanho}</p><p><strong>Cardume</strong>: ${registo.cardume}</strong></p><p><strong>Espécie Ameaçada?</strong> ${(registo.ameacada) ? "✔" : "✖"}</strong></p>`;
                document.getElementById("infoRegisto").innerHTML=conteudo;
            })
            .catch(erro => alert("Ocorreu um erro - registo único"));
    }
   
    evento.stopPropagation();
});

todosRegistos();