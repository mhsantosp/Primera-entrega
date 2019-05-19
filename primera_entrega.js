const opciones = {
    id_asignatura: {
        alias: 'asig',
        demand: true
    },
    nombre_estudiante: {
        alias: 'nom',
        demand: true
    },
    documento_estudiante: {
        alias: 'doc',
        demand: true
    }
}

const fs = require('fs');
const argv = require('yargs')
    .command('inscribir', 'Inscribase a una asignatura', opciones)
    .argv;

const imprimir = (obj, time, callback) => {
    setTimeout(function () {
        callback(`La asignatura se llama: ${obj.nombre}, dicha asignatura se identifica con el siguiente id: ${obj.id}, su duración es de: ${obj.duracion} horas y tiene un costo establesido de: ${obj.precio} pesos.`)
    }, time);
}

let asignaturas = [];
let time = 2000;
asignaturas = [{
        nombre: "Física",
        precio: 350000,
        duracion: 90,
        id: 1
    },
    {
        nombre: "Testing",
        precio: 800000,
        duracion: 120,
        id: 2
    },
    {
        nombre: "Base de Datos",
        precio: 1200000,
        duracion: 160,
        id: 3
    }
]

if (argv.id_asignatura === undefined) {
    for (let i = 0; i < asignaturas.length; i++) {
        imprimir(asignaturas[i], time, function (resultado) {
            console.log(resultado);
        });
        time += 2000;
    }
} else {
    let asignatura = asignaturas.find(m => m.id === argv.id_asignatura);
    if (asignatura === undefined) {
        console.log('Se ingreso un id de asignatura incorrecto.')
    } else {
        let crearArchivo = (asignatura, argv) => {
            let texto = `El estudiante ${argv.nombre_estudiante} con número de documento ${argv.documento_estudiante}, se prematriculo para la siguiente asignatura ${asignatura.nombre} correspondiente al id ${asignatura.id}, la duración de dicha asignatura es de ${asignatura.duracion} horas y tiene un valor de ${asignatura.precio} pesos.`;
            fs.writeFile('prematricula.txt', texto, (err) => {
                if (err) throw (err);
                console.log('Se creo con exito el archivo');
            });
        }
        crearArchivo(asignatura, argv);
    }
}
