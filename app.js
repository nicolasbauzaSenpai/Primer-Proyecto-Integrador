/* Funcionalidad del modal */

var openModalBtn = document.getElementById("boton-ingresar");
var modal = document.getElementById("Modal-box");
var closeBtn = document.querySelector(".close");
openModalBtn.onclick = () => {
  modal.style.display = "block";
};
closeBtn.onclick = () => {
  modal.style.display = "none";
};
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/* Valifación del formulario */

let formulario = document.getElementById("form");
let imputs = document.querySelectorAll("#form input");

let expresionesRegulares = {
  correo:
    /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ /* Validación para correo electrónico */,
  contraseña:
    /^[A-Z][a-z]{6,}$/ /* Empieza con una mayúscula y 6 minúscula mínimo */,
};

let campos = {
  correo: false,
  contraseña: false,
};

const validacion = (e) => {
  switch (e.target.name) {
    case "correo":
      validarCampos(expresionesRegulares.correo, e.target, "correo");
      break;
    case "contraseña":
      validarCampos(expresionesRegulares.contraseña, e.target, "contraseña");
      break;
  }
};

const validarCampos = (expresion, input, campo) => {
  let inputForm = document.getElementById(`${campo}`);
  if (expresion.test(input.value)) {
    inputForm.classList.add("green");
    inputForm.classList.remove("red");
    document.getElementById(campo + "-error").innerHTML = "";
    campos[campo] = true;
  } else {
    inputForm.classList.add("red");
    inputForm.classList.remove("green");
    document.getElementById(campo + "-error").innerHTML =
      "Verifique los campos";
    campos[campo] = false;
  }
};

imputs.forEach((input) => {
  input.addEventListener("blur", validacion);
  input.addEventListener("keyup", validacion);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.correo && campos.contraseña) {
    formulario.reset();
    document.getElementById("form-section").style.display = "none";
    setTimeout(() => {
      document.querySelector(
        ".modal-content"
      ).innerHTML = `<section id="modal-verificacion" >
      <img class="logo-blanco" src="/img/logo-blanco.png" alt="logo-blanco">
      <h2>Bienvenido</h2>
      </section>`;
    }, 500);
    document
      .querySelectorAll("#form input")
      .forEach((input) => input.classList.remove("green"));
    document.getElementById("correo-error").innerHTML = "";
    document.getElementById("contraseña-error").innerHTML = "";
  } else {
    for (var campo in campos) {
      if (!campos[campo] || campos[campo].value === "") {
        document.getElementById(campo).classList.add("red");
        document.getElementById(campo + "-error").innerHTML = "Requerido";
      } else {
        document.getElementById(campo).classList.remove("red");
        document.getElementById(campo + "-error").innerHTML = "";
      }
    }
  }
});


