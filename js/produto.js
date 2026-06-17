const fotoPrincipal = document.querySelector("#fotoPrincipal");

const videoPrincipal = document.querySelector("#videoPrincipal");

const playOverlay = document.querySelector(".play-overlay");

const miniaturas = document.querySelectorAll(".miniaturas img");

const miniaturaVideo = document.querySelector(".miniatura-video");

const principal = document.querySelector(".principal");

const zoomBox = document.querySelector(".zoom-box");

const zoomLens = document.querySelector(".zoom-lens");

const lightbox = document.querySelector("#lightbox");

const lightboxImg = document.querySelector("#lightboxImg");

const lightboxVideo = document.querySelector("#lightboxVideo");

const fechar = document.querySelector(".fechar-lightbox");

const imagensGaleria = document.querySelectorAll(".foto-galeria");

const galeria = [];

const setaEsquerda = document.querySelector(".seta-esquerda");

const setaDireita = document.querySelector(".seta-direita");

const videoExpandBtn = document.querySelector(".video-expand-btn");


console.log(lightboxVideo);

let indiceAtual = 0;

let startX = 0;

let startY = 0;




if(miniaturas){
    miniaturas.forEach((foto) => {
        foto.addEventListener("click", () => {

            videoPrincipal.pause();
            videoPrincipal.currentTime = 0;
            
            videoPrincipal.style.display = "none";

            fotoPrincipal.style.display = "block";

            fotoPrincipal.src =foto.src;

            playOverlay.style.display = "none";

            videoExpandBtn.style.display = "none";
        });
    });
}

if(miniaturaVideo){
    miniaturaVideo.addEventListener("click", () => {


        fotoPrincipal.style.display = "none";

        videoPrincipal.style.display = "block";

        videoPrincipal.play();

        if(window.innerWidth <= 768){
            videoExpandBtn.style.display = "flex";
        }
        
        playOverlay.style.display = "none";

        zoomBox.style.display = "none";
        zoomLens.style.display = "none";
    });
}



function toggleVideo(){
    
    if(videoPrincipal.paused){

        videoPrincipal.play();
        playOverlay.style.display = "none";

    }else{
        
        videoPrincipal.pause();
        playOverlay.style.display = "flex";
    }
}

if(videoPrincipal){

    videoPrincipal.addEventListener("click", toggleVideo);

    videoPrincipal.addEventListener("touchend", (e) => {
        e.preventDefault();
        toggleVideo();
    })
}


if(fotoPrincipal && zoomBox){
    fotoPrincipal.addEventListener("mousemove", (e) => {
        const rect = fotoPrincipal.getBoundingClientRect();

        if(window.innerWidth <= 768){
            return;
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) *100;
        const percentY = (y / rect.height) *100;

        zoomBox.style.display = "block";
        zoomLens.style.display = "block";

        zoomBox.style.backgroundImage = `url(${fotoPrincipal.src})`;
        zoomBox.style.backgroundSize = "300%";
        zoomBox.style.backgroundPosition = `${percentX}% ${percentY}%`;

        zoomLens.style.left = `${x - zoomLens.offsetWidth / 2}px`;
        zoomLens.style.top = `${y - zoomLens.offsetHeight / 2}px`;

    });

    fotoPrincipal.addEventListener("mouseleave", () => {
        zoomBox.style.display = "none";

        zoomLens.style.display = "none";
    });
}

if(window.innerWidth <= 768){
    videoExpandBtn.style.display = "none";

    fotoPrincipal.addEventListener("click", () => {
        lightbox.style.display = "flex";
        
        lightboxImg.src = fotoPrincipal.src;

        imagensGaleria.forEach((img, index) => {
            if(img.src === fotoPrincipal.src){
                indiceAtual = index;
            }
        })

        mostrarMidiaAtual();

    })
}

lightbox.addEventListener("touchstart", (e) => {
    
    startY = e.touches[0].clientY;

    startX =e.touches[0].clientX;
})

lightbox.addEventListener("touchend", (e) => {

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const distanciaX = endX - startX;
    const distanciaY = endY - startY;

    /* Fechar ao arrastar para cima ou para baixo. */

    if(Math.abs(distanciaY) > Math.abs(distanciaX) && Math.abs(distanciaY) > 80){

        fecharLightbox();
        return;
    }

    /* Trocar foto */
    if(distanciaX < -50){

        proximaFoto();

    }else if(distanciaX > 50){

        fotoAnterior();

    }

});

if(lightboxVideo){

    lightboxVideo.addEventListener("click", () => {

        if(lightboxVideo.paused){

            lightboxVideo.play();

        }else{

            lightboxVideo.pause();

        }

    });

}

function proximaFoto(){

    console.log("antes", indiceAtual);

    if(indiceAtual < galeria.length - 1){
        indiceAtual++;
    }

    console.log("depois", indiceAtual);

    mostrarMidiaAtual();
}

function fotoAnterior(){

    if(indiceAtual > 0){
        indiceAtual--;
    }

    mostrarMidiaAtual();

}

imagensGaleria.forEach((img) => {

    galeria.push({
        tipo: "foto",
        src: img.src
    })
})

if(videoPrincipal){

    galeria.push({
        tipo: "video",
        src: videoPrincipal.querySelector("source").src
    })
}

function mostrarMidiaAtual(){

    console.log(galeria[indiceAtual]);

    const item = galeria[indiceAtual];

    console.log(item.tipo);

    if(item.tipo === "foto"){

        lightboxVideo.pause();

        lightboxVideo.currentTime =0;

        lightboxVideo.style.display = "none";

        lightboxImg.style.display = "block";

        lightboxImg.src = item.src;

    }else{

        lightboxImg.style.display = "none";

        lightboxVideo.style.display = "block";

        lightboxVideo.src = item.src;

        lightboxVideo.muted = true;

        lightboxVideo.loop = true;

        lightboxVideo.load();

        lightboxVideo.play();


    }
}

function fecharLightbox(){

    lightboxVideo.pause();

    lightboxVideo.currentTime = 0;

    lightboxVideo.style.display = "none";

    lightboxImg.style.display = "block";

    lightbox.style.display = "none";
}

fechar.addEventListener("click", fecharLightbox);

lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){
        fecharLightbox();
    }
});

setaDireita.addEventListener("click", () => {

    proximaFoto();

});

setaEsquerda.addEventListener("click", () => {

    fotoAnterior();

});

videoExpandBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    lightbox.style.display = "flex";
    
    indiceAtual = galeria.length -1;

    mostrarMidiaAtual();

})
