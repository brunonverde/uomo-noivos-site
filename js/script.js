const searchBtn = document.querySelector("#searchBtn");

const pesquisa = document.querySelector("#pesquisa");

const cards = document.querySelectorAll(".traje-card");

const semResultados = document.querySelector("#semResultados");

const filtros = document.querySelectorAll(".filtro-btn");

const btnTopo = document.querySelector("#btnTopo");

const catalogo = document.querySelector("#catalogo");

const menuBtn = document.querySelector("#menuBtn");

const nav = document.querySelector("nav");

const linksMenu = document.querySelectorAll("nav a");

let filtroAtual = "todos";

console.log(btnTopo);
console.log(filtros);
console.log(cards);
console.log(pesquisa);
console.log(cards);

if(pesquisa){

    pesquisa.addEventListener("input", () => {

        const termo = pesquisa.value.toLowerCase();

    let encontrados = 0;

        cards.forEach((card) => {

            const nome = card.querySelector("h3")
                .textContent
                .toLowerCase();

            const id = card.querySelector("p")
                .textContent
                .toLowerCase();

            const texto = nome + " " + id;


            const passaBusca = texto.includes(termo);

            const passaCategoria = 
                filtroAtual === "todos" ||
                card.dataset.categoria === filtroAtual;

            if(passaBusca && passaCategoria){
                card.style.display = "";
                encontrados++;
            }else{
                card.style.display = "none";
            }

            if(encontrados === 0){
                semResultados.style.display = "block";
            }else{
                semResultados.style.display = "none";
            }

        })
    })
}

if(searchBtn && pesquisa){

    searchBtn.addEventListener("click", () => {

        console.log("clicou");

        pesquisa.classList.toggle("ativo");

    });

}

filtros.forEach((botao) => {

    botao.addEventListener("click", () => {

        filtros.forEach((btn) => {
            btn.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        filtroAtual = botao.dataset.filtro;

        cards.forEach((card) => {

            const termo = pesquisa.value.toLowerCase();

        const nome = card.querySelector("h3")
            .textContent
            .toLowerCase();

        const id = card.querySelector("p")
            .textContent
            .toLowerCase();

        const texto = nome + " " + id;

        const passaBusca = texto.includes(termo);

        const passaCategoria =
            filtroAtual === "todos" ||
            card.dataset.categoria === filtroAtual;

        if(passaBusca && passaCategoria){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }

        });

    });

});


if(btnTopo){
    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){
            btnTopo.classList.add("ativo");
        }else{
            btnTopo.classList.remove("ativo");
        }
    })

    btnTopo.addEventListener("click", (e) => {
        
        e.preventDefault();

        catalogo.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })

}


if(menuBtn && nav){
    
    menuBtn.addEventListener("click", () => {
        
        nav.classList.toggle("ativo");

        menuBtn.classList.toggle("ativo");

    })
}

linksMenu.forEach((link) => {
    
    link.addEventListener("click", () => {
        
        nav.classList.remove("ativo");

        menuBtn.classList.remove("ativo");
    })
})