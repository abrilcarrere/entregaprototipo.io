let todosLosCaminantes = [];
let caminantesFrios = [];
let caminantesCalidos = [];
let caminantesVerdes = [];
let caminantesComunes = []; // Nuevo arreglo para los caminantes comunes
let cantidad = 4;
let cantidadTotal = 0;
let maxCantidad = 40;
let moverCaminantesCalidos = false;
let moverCaminantesFrios = false;
let moverCaminantesVerdes = false;
let moverCaminantesComunes = false; // Variable para controlar la creación de caminantes comunes

let bordesCalidos = [];
let bordesFrios = [];

function preload() {
  for (let i = 0; i <= 15; i++) {
    bordesCalidos.push(loadImage('data/borde' + i + '.png'));
    bordesFrios.push(loadImage('data/borde' + i + '.png'));
  }

  // Carga las imágenes de los bordes comunes
  for (let i = 0; i <= 15; i++) {
    bordesComunes.push(loadImage('data/borde' + i + '.png'));
  }
}

function setup() {
  createCanvas(950, 500);
  background(255);
}

function draw() {
  todosLosCaminantes.forEach((c) => c.dibujar());
  if (moverCaminantesFrios) {
    moverYActualizarCaminantes(caminantesFrios, color(random(0, 100), random(100, 200), random(200, 255)));
  } else if (moverCaminantesCalidos) {
    moverYActualizarCaminantes(caminantesCalidos, color(random(200, 255), random(100, 200), random(0, 100)));
  } else if (moverCaminantesVerdes) {
    moverYActualizarCaminantes(caminantesVerdes, color(random(0, 50), random(200, 255), random(0, 50)));
  } else if (moverCaminantesComunes) {
    moverYActualizarCaminantes(caminantesComunes, color(random(100, 200), random(100, 200), random(100, 200)));
  }
}

function limpiarLienzo() {
  background(255);
}

function moverYActualizarCaminantes(lista, nuevoColor) {
  let allCompleted = true;
  lista.forEach((c) => {
    if (!c.circuloCompleto) {
      c.mover();
      allCompleted = false;
    }
    c.dibujar();
  });

  if (allCompleted && cantidadTotal < maxCantidad) {
    crearNuevosCaminantes(cantidad, nuevoColor, lista);
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    if (mouseX > width / 2) {
      moverCaminantesFrios = true;
      moverCaminantesCalidos = false;
      moverCaminantesVerdes = false;
      moverCaminantesComunes = false;
      if (caminantesFrios.length === 0) {
        crearNuevosCaminantes(cantidad, color(random(0, 100), random(100, 200), random(200, 255)), caminantesFrios);
      }
    } else {
      moverCaminantesCalidos = true;
      moverCaminantesFrios = false;
      moverCaminantesVerdes = false;
      moverCaminantesComunes = false;
      if (caminantesCalidos.length === 0) {
        crearNuevosCaminantes(cantidad, color(random(200, 255), random(0, 100), random(0, 50)), caminantesCalidos);
      }
    }
  } else if (mouseButton === RIGHT) {
    moverCaminantesFrios = false;
    moverCaminantesCalidos = false;
    moverCaminantesVerdes = false;
    moverCaminantesComunes = true; // Activar la creación de caminantes comunes
    if (caminantesComunes.length === 0) {
      crearNuevosCaminantes(cantidad, color(random(100, 200), random(100, 200), random(100, 200)), caminantesComunes);
    }
  }
}

function mouseReleased() {
  if (mouseButton === LEFT) {
    // Al soltar el clic izquierdo, detener la creación y movimiento de caminantes fríos y cálidos
    moverCaminantesFrios = false;
    moverCaminantesCalidos = false;
    caminantesFrios = [];
    caminantesCalidos = [];
  } else if (mouseButton === RIGHT) {
    // Al soltar el clic derecho, detener la creación de caminantes comunes
    moverCaminantesComunes = false;
    caminantesComunes = [];
    cantidadTotal = 0;
  }
}


function crearNuevosCaminantes(num, nuevoColor, lista) {
  for (let i = 0; i < num; i++) {
    if (cantidadTotal < maxCantidad) {
      let imgBorde;
      if (nuevoColor.levels[2] > nuevoColor.levels[0] && nuevoColor.levels[2] > nuevoColor.levels[1]) {
        imgBorde = random(bordesFrios);
      } else {
        imgBorde = random(bordesCalidos);
      }
      let c = new Caminante(imgBorde, nuevoColor);
      lista.push(c);
      todosLosCaminantes.push
    }
  }
}