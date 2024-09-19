/*
 * EJERCICIO:
 * ¡Disney ha presentado un montón de novedades en su D23!
 * Pero... ¿Dónde está Mickey?
 * Mickey Mouse ha quedado atrapado en un laberinto mágico
 * creado por Maléfica.
 * Desarrolla un programa para ayudarlo a escapar.
 * Requisitos:
 * 1. El laberinto está formado por un cuadrado de 6x6 celdas.
 * 2. Los valores de las celdas serán:
 *    - ⬜️ Vacío
 *    - ⬛️ Obstáculo
 *    - 🐭 Mickey
 *    - 🚪 Salida
 * Acciones:
 * 1. Crea una matriz que represente el laberinto (no hace falta
 * que se genere de manera automática).
 * 2. Interactúa con el usuario por consola para preguntarle hacia
 * donde se tiene que desplazar (arriba, abajo, izquierda o derecha).
 * 3. Muestra la actualización del laberinto tras cada desplazamiento.
 * 4. Valida todos los movimientos, teniendo en cuenta los límites
 * del laberinto y los obtáculos. Notifica al usuario.
 * 5. Finaliza el programa cuando Mickey llegue a la salida.
 */

const rs = require("readline")
const rl = rs.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const mickey = "🐭"
const door = "🚪"

function generateTable() {
  const tabla = []
  for (let row = 0; row < 6; row++) {
    tabla.push([])
    for (let column = 0; column < 6; column++) {
      tabla[row].push(column)
      if (row % 2 !== 0 && column % 2 !== 0) {
        tabla[row][column] = "⬛"
      } else if (row % 2 === 0 || column % 2 === 0) {
        tabla[row][column] = "⬜"
      } else {
        tabla[row][column] = "⬛"
      }
    }
  }
  tabla[2][2] = mickey

  tabla[tabla.length - 1][tabla.length - 1] = door
  return tabla
}

async function moveMickey() {
  const movement = await new Promise((resolve) => {
    rl.question("🐭 ¿Dónde quieres ir? ", (answer) => {
      resolve(answer)
    })
  })
  return movement
}

async function getMickeyIndex(tabla) {
  const mickeyIndex = await new Promise((resolve) => {
    for (let row = 0; row < tabla.length; row++) {
      for (let column = 0; column < tabla[row].length; column++) {
        if (tabla[row][column] === mickey) {
          resolve([row, column])
        }
      }
    }
  })
  return mickeyIndex
}

async function mickeyGame() {
  const mickeyIndex = 0

  const tabla = await new Promise((resolve) => {
    resolve(generateTable())
  })

  while (tabla[tabla.length - 1][tabla.length - 1] === "🚪") {
    let index = await getMickeyIndex(tabla)
    console.log(tabla)
    /**TODO: Resolver primero el movimiento en vertical y luego en horizontal */
    const key = await moveMickey()

    switch (key) {
      case "w":
        if (index[0] > 0 && tabla[index[0] - 1][index[1]] !== "⬛") {
          tabla[index[0] - 1][index[1]] = mickey
          tabla[index[0]][index[1]] = "⬜"
        } else {
          console.log("🚫 No se puedes subir más")
        }
        break
      case "s":
        if (
          index[0] < tabla.length - 1 &&
          tabla[index[0] + 1][index[1]] !== "⬛"
        ) {
          tabla[index[0] + 1][index[1]] = mickey
          tabla[index[0]][index[1]] = "⬜"
        } else {
          console.log("🚫 No se puedes bajar más")
        }
        break
      case "a":
        if (index[1] > 0 && tabla[index[0]][index[1] - 1] !== "⬛") {
          tabla[index[0]][index[1] - 1] = mickey
          tabla[index[0]][index[1]] = "⬜"
        } else {
          console.log("🚫 No se puedes ir a la izquierda más")
        }

        break
      case "d":
        if (
          index[1] < tabla.length - 1 &&
          tabla[index[0]][index[1] + 1] !== "⬛"
        ) {
          tabla[index[0]][index[1] + 1] = mickey
          tabla[index[0]][index[1]] = "⬜"
        } else {
          console.log("Hay un obstaculo")
        }
        break
      default:
        console.log("🚫 No se puede ir en esa dirección: ")
        break
    }
  }
  console.log(tabla)
  console.log("Enhorabuena has llegado a la salida")

  rl.close()
}

mickeyGame()
