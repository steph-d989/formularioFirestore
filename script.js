const firebaseConfig = {
    apiKey: "AIzaSyCyXuddDSgQgXEtgDgCg1C9R220LM0YTcI",
    authDomain: "pruebafirebase-48a54.firebaseapp.com",
    projectId: "pruebafirebase-48a54",
    storageBucket: "pruebafirebase-48a54.appspot.com",
    messagingSenderId: "332833310200",
    appId: "1:332833310200:web:9fda6b8f49916dae82820d"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();

const formulario = document.querySelector('#formLogin')
const cuerpoTabla = document.querySelector('#cuerpoTabla')
let objUsuarios = {};

let nombre;
let email;
let mensaje;
let imagen;


document.getElementById('create').addEventListener('click', () => {
    validarForm()
    crearUsuario({
        nombre, email, mensaje, imagen
    })


})
//crear usuario
const crearUsuario = async(usuario) => {
    db.collection('prueba1')
        .add(usuario)
        .then((docRef) => {
            console.log('Documento con id:', docRef.id)
        })
        .catch((error) => console.error("Error adding document: ", error));
}

const validarForm = async() => {
    nombre = formulario.name.value;
    email = formulario.mail.value;
    mensaje = formulario.mensaje.value;
    imagen = formulario.imagen.value;

    if (!nombre || !email || !mensaje || !imagen) {
        alert('Ingresa todos los campos')
        return
    }
    pintarBD(nombre, email, mensaje, imagen)
}

const verTodo = async() => {
    borrarBD();
    bd.collection('prueba1')
        .get()
        .then((querySnapchot) => {
            querySnapchot.forEach((doc) => {
                pintarBD(doc.data().nombre, doc.data().email, doc.data().mensaje, doc.data().imagen)
            });
        })
        .catch((error)=>console.log(`no pinta datos`))
}

//Delete one
document.getElementById('delete').addEventListener('click', () => {
    deleteUser();
});

const deleteUser = async() => {
    const id = prompt('Introduce ID por borrar')
    db.collection('prueba1').doc(id).delete()
        .then(() => {
            alert(`Documneto con ID ${id} Fue borrado`)
            cuerpoTabla.innerHTML = ''
            verTodo();
        })
        .catch(() => console.log('Error borrando documento'))
}

const borrarBD = () => {
    cuerpoTabla.innerHTML = '';
}

const pintarBD = async(nombre, email, mensaje, imagen) => {
    let tablafila = document.createElement('TR');
    let columna1 = document.createElement('TD');
    columna1.textContent = nombre;
    let columna2 = document.createElement('TD');
    columna2.textContent = email;
    let columna3 = document.createElement('TD');
    columna3.textContent = mensaje;
    let columna4 = document.createElement('TD');
    columna4.innerHTML = `<img class=imagen src=${imagen}></img>`;
    tablafila.append(columna1, columna2, columna3, columna4)
    console.log(tablafila)
    cuerpoTabla.append(tablafila);
}

async function readOne(id) {
    // Limpia el album para mostrar el resultado
    borrarBD();
    //Petición a Firestore para leer un documento de la colección album 
    var docRef = db.collection("prueba1").doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            pintarBD(doc.data().nombre, doc.data().email, doc.data().mensaje, doc.data().imagen, doc.id);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}
