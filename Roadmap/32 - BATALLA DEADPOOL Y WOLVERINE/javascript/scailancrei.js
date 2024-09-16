/*
 * EJERCICIO:
 * ¡Deadpool y Wolverine se enfrentan en una batalla épica!
 * Crea un programa que simule la pelea y determine un ganador.
 * El programa simula un combate por turnos, donde cada protagonista posee unos
 * puntos de vida iniciales, un daño de ataque variable y diferentes cualidades
 * de regeneración y evasión de ataques.
 * Requisitos:
 * 1. El usuario debe determinar la vida inicial de cada protagonista.
 * 2. Cada personaje puede impartir un daño aleatorio:
 *    - Deadpool: Entre 10 y 100.
 *    - Wolverine: Entre 10 y 120.
 * 3. Si el daño es el máximo, el personaje que lo recibe no ataca en el
 * siguiente turno, ya que tiene que regenerarse (pero no aumenta vida).
 * 4. Cada personaje puede evitar el ataque contrario:
 *    - Deadpool: 25% de posibilidades.
 *    - Wolverine: 20% de posibilidades.
 * 5. Un personaje pierde si sus puntos de vida llegan a cero o menos.
 * Acciones:
 * 1. Simula una batalla.
 * 2. Muestra el número del turno (pausa de 1 segundo entre turnos).
 * 3. Muestra qué pasa en cada turno.
 * 4. Muestra la vida en cada turno.
 * 5. Muestra el resultado final.
 */
const rs = require("readline")

const rl = rs.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const Deadpool = {
  vida: 200,
  daño: 10,
  dañoMax: 100,
  turno: true,
  evasion: 0.25,
}

const Wolverine = {
  vida: 200,
  daño: 10,
  dañoMax: 120,
  turno: false,
  evasion: 0.2,
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function deadpoolAttack() {
  console.log("Es el turno de Deadpool")
  if (Math.random() < Wolverine.evasion) {
    console.log("Wolverine ha esquivado el ataque de Deadpool\n")
    Deadpool.turno = false
    Wolverine.turno = true
  } else {
    Deadpool.daño = Math.floor(Math.random() * (Deadpool.dañoMax - 10 + 1) + 10)
    if (Deadpool.daño === Deadpool.dañoMax) {
      Wolverine.vida -= Deadpool.daño
      console.log(
        "Deadpool ha inflingido ",
        Deadpool.daño,
        " de daño maximo a Wolverine!"
      )
      Deadpool.turno = true
      Wolverine.turno = false
    } else {
      Wolverine.vida -= Deadpool.daño
      console.log(
        "Deadpool ha inflingido ",
        Deadpool.daño,
        " de daño a Wolverine"
      )
      Deadpool.turno = false
      Wolverine.turno = true
    }
  }

  console.log("El turno de Deadpool ha terminado")
}

async function wolverineAttack() {
  console.log("Es el turno de wolverine")
  if (Math.random() < Deadpool.evasion) {
    console.log("Deadpool ha esquivado el ataque de Wolverine\n")
    Wolverine.turno = false
    Deadpool.turno = true
  } else {
    Wolverine.daño =
      Math.floor(Math.random() * (Wolverine.dañoMax - 10 + 1)) + 10
    if (Wolverine.daño === Wolverine.dañoMax) {
      console.log(
        "Wolverine ha inflingido ",
        Wolverine.daño,
        " de daño maximo a Deadpool!"
      )
      Deadpool.vida -= Wolverine.daño
      Wolverine.turno = true
      Deadpool.turno = false
    } else {
      console.log(
        "Wolverine ha inflingido ",
        Wolverine.daño,
        " de daño a Deadpool!"
      )
      Deadpool.vida -= Wolverine.daño
      Wolverine.turno = false
      Deadpool.turno = true
    }
  }

  console.log("El turno de wolverine ha terminado")
}
async function lifeQuestion(name) {
  return new Promise((resolve) => {
    rl.question(`¿Cuál es la vida inicial de ${name}? `, (respuesta) => {
      resolve(respuesta)
    })
  })
}

console.log("Comienza la pelea!")
let turnoNumber = 1

async function startBattle() {
  await lifeQuestion("Deadpool").then((respuesta) => {
    Deadpool.vida = parseInt(respuesta)
  })
  await lifeQuestion("Wolverine").then((respuesta) => {
    Wolverine.vida = parseInt(respuesta)
  })

  rl.close()
  while (Wolverine.vida > 0 || Deadpool.vida > 0) {
    console.log("Turno: ", turnoNumber)
    console.log(
      "Vida actual de deadpool ",
      Deadpool.vida <= 0 ? 0 : Deadpool.vida
    )
    console.log(
      "Vida actual de wolverine ",
      Wolverine.vida <= 0 ? 0 : Wolverine.vida
    )

    if (Wolverine.vida <= 0 || Deadpool.vida <= 0) {
      break
    }

    if (Wolverine.turno) {
      wolverineAttack()
    } else if (Deadpool.turno) {
      deadpoolAttack()
    }
    console.log("Preparando para el siguiente turno")
    await sleep(3000)
    turnoNumber += 1
  }
  console.log(
    "El ganador es: ... ",
    Deadpool.vida > 0 ? "Deadpool!" : "Wolverine!"
  )
  console.log("Game over!")
}

startBattle()
