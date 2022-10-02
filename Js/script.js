let palabras = ["HTML", "ORACLE", "ALURA", "CSS", "JAVA", "PHYTON", "DEVOPS"];
let tablero = document.getElementById('letras').getContext("2d");
let palabraSecreta = "";
let letras = [];
let errores = 7;

function escogerPalabra(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra;
    console.log(palabraSecreta);

}

function comprobacion(key){
    let estado =  false;
    if(key >= 65 && letras.indexOf(key) || key <= 90 && letras.indexOf(key)){
        letras.push(key)
        console.log(key)
        return estado
    } 
    else{
        estado = true
        console.log(key)
        return estado
    }

}

function dibujar(){
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#FFFFFF";
    tablero.strokeStyle = "#FFFFFF";

    let anchura = 600/palabraSecreta.length;
    for (let i = 0; i < palabraSecreta.length; i++){
        tablero.moveTo(80 + (anchura*i), 60)
        tablero.lineTo(140 + (anchura*i), 60)
    }
    tablero.stroke();
    tablero.closePath();
}

function escribirLetraCorrecta(index){
    tablero.font = "bold 40px inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#FFFFFF";

    let anchura = 600/palabraSecreta.length;
    tablero.fillText(palabraSecreta[index],95+(anchura*index), 50);
    tablero.stroke()
}

function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = "bold 30px inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#FF4000";
    tablero.fillText(letra, 120+(30*(10-errorsLeft)), 110, 30);
    tablero.stroke()
}

function agregarLetraIncorrecta(){
    errores -= 1;
    console.log(errores);

    if (errores <= 6){
        document.getElementById("cabeza").style.visibility = "visible";
        if(errores <= 5){
            document.getElementById("cuerpo").style.visibility = "visible";
            if(errores <= 4){
                document.getElementById("brazo-izquierdo").style.visibility = "visible";
                if(errores <= 3){
                    document.getElementById("brazo-derecho").style.visibility = "visible";
                    if(errores <= 2){
                        document.getElementById("pierna-izquierda").style.visibility = "visible";
                        if(errores <= 1){
                            document.getElementById("pierna-derecha").style.visibility = "visible";
                            alert("JUEGO TERMINADO");
                        }
                    }
                }
            }
        }  
    }
}


function iniciar(){
    escogerPalabra()
    dibujar()

    document.onkeydown = (e) => {
        let letra = e.key.toUpperCase()

        if(comprobacion(letra) && palabraSecreta.includes(letra)){
            for(let i = 0; i < palabraSecreta.length; i++){
                if(palabraSecreta[i] === letra){
                    escribirLetraCorrecta(i)
                }
            }
        }else{
            escribirLetraIncorrecta(letra, errores)
            agregarLetraIncorrecta(letra)
        }
    }
}