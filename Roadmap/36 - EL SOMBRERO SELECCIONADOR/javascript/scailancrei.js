/*
 * EJERCICIO:
 * Cada 1 de septiembre, el Hogwarts Express parte hacia la escuela
 * de programación de Hogwarts para magos y brujas del código.
 * En ella, su famoso sombrero seleccionador ayuda a los programadores
 * a encontrar su camino...
 * Desarrolla un programa que simule el comportamiento del sombrero.
 * Requisitos:
 * 1. El sombrero realizará 10 preguntas para determinar la casa del alumno.
 * 2. Deben existir 4 casas. Por ejemplo: Frontend, Backend, Mobile y Data.
 *    (Puedes elegir las que quieras)
 * Acciones:
 * 1. Crea un programa que solicite el nombre del alumno y realice 10
 *    preguntas, con cuatro posibles respuestas cada una.
 * 2. Cada respuesta asigna puntos a cada una de las casas (a tu elección).
 * 3. Una vez finalizado, el sombrero indica el nombre del alumno
 *    y a qué casa pertenecerá (resuelve el posible empate de manera aleatoria,
 *    pero indicándole al alumno que la decisión ha sido complicada).
 */

const rs = require("readline")
const rl = rs.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const casas = ["Frontend", "Backend", "Mobile", "Data"]

async function preguntarNombre(text) {
  return await new Promise((resolve) => {
    rl.question(text, (nombre) => {
      resolve(nombre)
    })
  })
}

async function preguntaUno(text) {
  return await new Promise((resolve) => {
    casas.forEach((element) => {
      console.log(`${element}`)
    })
    rl.question(`${text} \n`, (respuesta) => {
      switch (respuesta.trim().toLowerCase()) {
        case "frontend":
          resolve("frontend")
          break
        case "backend":
          resolve("backend")
          break
        case "mobile":
          resolve("mobile")
          break
        case "data":
          resolve("data")
          break
        default:
          resolve("Frontend")
          break
      }
    })
  })
}
async function preguntaDos(text) {
  return await new Promise((resolve) => {})
}

async function sombreroSeleccionador() {
  const nombre = await preguntarNombre("¿Cuál es tu nombre? \n")

  const casaSelected = await preguntaUno(
    `¿Cuál es tu casa favorita ${nombre}? \n`
  )

  console.log(`¡Felicidades ${nombre}! Has elegido ${casaSelected}`)
}

sombreroSeleccionador()
