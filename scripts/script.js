import  {data}  from '../data/data.js';

const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const items = document.getElementById('items');
const detail = document.getElementById('detail');
const listaCompra = document.querySelector('#listaCompra');
const listaTotal = document.querySelector('#listaTotal');
let heroe = { };
let carrito = [];



//prevent default Detiene el comportamiento predeterminado de los navegadores
//cancela un evento
function functionSubmit(e){
    e.preventDefault();
}

/*Evento que permite que luego de cargar el documento
llame a la función loadImages*/
document.addEventListener('DOMContentLoaded', () => {
    loadImages(data);
})



const loadImages = data => {
    data.forEach(heroe => {
       const {id, superhero,image} = heroe; //destructuración
        templateCard.querySelector('h5').textContent  = superhero;
        templateCard.querySelector('img').setAttribute('src',image);
        templateCard.querySelector('img').dataset.id = id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone); // permite clonar un nodo
        //console.log(templateCard.querySelector('img').dataset.id);
    })
    // appendChild agrega un nodo al final de la lista
   items.appendChild(fragment);
}

//////////////////// Almacenar en el local storage//////////////
  /** Evento escuchar a un formulario con un boton submit */


form.addEventListener('submit',function LocalStorage(){
           
    //captura de datos y almacenamiento en variables
    let inputName = document.querySelector('#inputName').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value
    let message = document.querySelector('#msm').value;

    //validación de campos vacíos
    if(inputName=="" || email=="" || gender=="" || message==""){
         alert('Ingresar todos los campos');
         return true;
    }
    else{
        if(isNaN(inputName)){
            localStorage.setItem("Name", inputName);
            localStorage.setItem("Email", email);
            localStorage.setItem("Gender", gender);
            localStorage.setItem("Message", message);
            getLocalStorage();
        }else{
             alert("Name most string");
        }
        return false;
    }

    
})

//Obtener la información del local storage//
function getLocalStorage(){
    let nameSave = localStorage.getItem("Name");
    let emailSave = localStorage.getItem("Email");
    let genderSave = localStorage.getItem("Gender");
    let messageSave = localStorage.getItem("Message");
    alert(`The information stored is: ${nameSave} 
    ${emailSave}
    ${genderSave}
    ${messageSave}`);
}

//Evento clic lista
items.addEventListener('click', e => {


    let idTarget = e.target.dataset.id;
    //console.log(e.target.dataset.id);

    data.forEach(heroe => {
        const {id,name,superhero,publisher,alter_ego,first_appearance,image,price} = heroe; //destructuración
          if(id == idTarget){
             const objeto = {
                 id: id,
                 name: name,
                 superhero: superhero,
                 publisher: publisher,
                 alter_ego: alter_ego,
                 first_appearance: first_appearance,
                 image: image,
                 price: price
             }

             localStorage.setItem("Heroe",JSON.stringify(objeto));
             getSuperhero();
             carrito.push(objeto);
             localStorage.setItem("Carrito",JSON.stringify(carrito));
             listarCarrito();
          }
     }) 
     
     //stop propagation Evita que el evento propague (o “burbujee”) el DOM.
     //es decir que no se extienda a otros elementos del dom
     e.stopPropagation();
     e.preventDefault();
})


function getSuperhero(){
    detail.innerHTML = "";
    heroe = JSON.parse(localStorage.getItem("Heroe"));
    let {superhero,publisher,alter_ego,first_appearance,image,price} = heroe;
    detail.innerHTML =  ` 
    <table border="2px" align="center">
    <tr>
        <td rowspan="3"><img src="${image}"  width="400" height="500"></td>
        <td align="center">
         <h2>${superhero}</h2>
         <h4>${publisher}</h4>
         <h5>${alter_ego}</h5>
         <h5>${first_appearance}</h5>
         <h1>${price}</h1>
        </td>
    </tr>
</table>
    `
    
}


const listarCarrito = () => {
    listaCompra.innerHTML = '';
    let total = 0;
    let totalInt = 0;
    carrito = JSON.parse(localStorage.getItem('Carrito'));
    //operador ternario
    carrito === null ? (carrito = []) : (
     carrito.forEach(element => {
         totalInt += element.price;
         listaCompra.innerHTML += `<br> <br>
         <div width="100" height="100" align="center">
         <span>${element.superhero}</span>
         <span>${element.price}</span>
         <span><button id="${element.id}">x</button></span><br>
         </div>`
         total = totalInt;
     })
    );
   getTotal(total);
    
}

function getTotal(total){
    listaTotal.innerHTML = '';
    listaTotal.innerHTML += `<h1 align="center">Total a pagar ${total}</h1>`
    localStorage.setItem("Total",total);
}


listaCompra.addEventListener('click', (e) => {
    e.preventDefault();
    let id = e.target.id;
    deleteHeroe(id);
    
})

function deleteHeroe(idI){
    let indexArreglo;

  carrito.forEach((elemento,index) => {
       if(elemento.id == idI){
        indexArreglo = index;
       }
       
  })

    carrito.splice(indexArreglo,1);
    localStorage.setItem("Carrito",JSON.stringify(carrito));
    listarCarrito();
}