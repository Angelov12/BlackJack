(() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];
  let puntosJugador = 0,
      puntosComputadora = 0,
      puntosEnPantalla = document.querySelectorAll("span");
  const btnNuevoJuego = document.querySelector("#btn-nuevo-juego"),
        btnPedirCarta = document.querySelector("#btn-pedir-carta"),
        btnDetener = document.querySelector("#btn-detener"),
        divCartasJugador = document.querySelector("#jugador-cartas"),
        divCartasComputadora = document.querySelector("#computadora-cartas");
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
  // esta funcion crea un nuevo deck
  const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    deck = _.shuffle(deck);

    return deck;
  };
  crearDeck();

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    const carta = deck.pop();

    return carta;
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
  
    if (valor === 'A') {
      if (puntosJugador > 11 || puntosComputadora > 11) {
        return 1;
      } else {
        return 11;
      }
    } else if (isNaN(valor)) {
      return 10;
    } else {
      return parseInt(valor);
    }
  };
  
  
  // Turno de la computadora

  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();
      puntosComputadora = puntosComputadora + valorCarta(carta);

      puntosEnPantalla[1].innerHTML = puntosComputadora;
      const imgCarta = document.createElement("img");
      imgCarta.classList.add("carta");

      imgCarta.src = `assets/imgs/cartas/${carta}.png`;
      divCartasComputadora.append(imgCarta);
      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
      {
        if (puntosComputadora === puntosMinimos) {
          alert("Nadie gana");
        } else if (puntosMinimos > 21) {
          alert("La computadora gana");
        } else if (puntosComputadora > 21) {
          alert("El jugador gana");
        } else if (puntosComputadora === 21) {
          alert("La computadora gana");
        } else if(puntosComputadora > puntosJugador && puntosComputadora <= 21){
          alert("La computadora gana");
        }else alert("El jugador gana");
      }
    }, 140);
  };

  btnPedirCarta.addEventListener("click", () => {
    
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosEnPantalla[0].innerHTML = puntosJugador;
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");

    imgCarta.src = `assets/imgs/cartas/${carta}.png`;
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
      console.warn("perdiste");
      btnPedirCarta.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnDetener.disabled = true;
      btnPedirCarta.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  });

  btnNuevoJuego.addEventListener("click", () => {
    puntosJugador = 0;
    puntosComputadora = 0;
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";
    deck = [];
    crearDeck();
    btnPedirCarta.disabled = false;
    btnDetener.disabled = false;
    puntosEnPantalla[0].innerText = 0;
    puntosEnPantalla[1].innerText = 0;
    btnPedirCarta.disabled = false;
    btnDetener.disabled = false;
  });
})();
