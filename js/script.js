/*SCRIPT CONTADOR ANIMADO*/
let count = 0;

let interval = setInterval(() => {
  count += 5;
  $("#contador").text(count);

  if (count >= 1200) clearInterval(interval);
}, 20);

/*Script de Texto animado*/
const textos = [
  "Descubrí el mundo",
  "Viví nuevas experiencias",
  "Viaja sin límites"
];

let i = 0;

setInterval(function () {
  i = (i + 1) % textos.length;

  $("#textoHero").fadeOut(function () {
    $(this).text(textos[i]).fadeIn();
  });

}, 3000);

/*Script de Favorito -Anima Corazon de las Cards*/
document.querySelectorAll(".favorito").forEach(btn => {
  btn.addEventListener("click", function (e) {

    e.preventDefault();     // 🚫 evita ir al link
    e.stopPropagation();    // 🚫 evita que suba al <a>

    this.classList.toggle("activo");

    let icono = this.querySelector("i");

    if (icono.classList.contains("fa-regular")) {
      icono.classList.remove("fa-regular");
      icono.classList.add("fa-solid");
    } else {
      icono.classList.remove("fa-solid");
      icono.classList.add("fa-regular");
    }

  });
});

/*SCRIPT SECCION DESTINO-FILTRO*/

/*Script para la Pag.Destino*/

$(".filtro").click(function () {

  let categoria = $(this).data("filtro");

  $(".filtro").removeClass("active");
  $(this).addClass("active");

  if (categoria === "todos"){

    $(".destino").show().addClass("mostrar");

  } else {

    $(".destino").hide().removeClass("mostrar");

    $(".destino")
      .filter("." + categoria) 
      .fadeIn(400)               // Efecto suave
      .addClass("mostrar");

  }

});

/*SCRIPT SECCION AGENCIA-RATIN ESTRELLA*/
$(document).ready(function () {

  $(".rating .star").on("click", function () {

    let estrellas = $(this).parent().find(".star");
    let index = $(this).index();
    let yaSeleccionada = $(this).hasClass("active");

    // limpiar
    estrellas.removeClass("active");

    // pintar
    if (!yaSeleccionada) {
      estrellas.each(function (i) {
        if (i <= index) {
          $(this).addClass("active");
        }
      });
    }

  });

});

/*Script para Formulario de Contacto*/
$(document).ready(function () {

  // =========================
  // Sanitización
  // =========================
  function sanitizar(texto) {
    return texto
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .trim();
  }

  // =========================
  // Validar Campo
  // =========================
  function validarCampo(id, condicion) {
    if (condicion) {
      $(id).addClass("is-valid").removeClass("is-invalid");
      return true;
    } else {
      $(id).addClass("is-invalid").removeClass("is-valid");
      return false;
    }
  }

  // =========================
  // Validar Formulario
  // =========================
  function validarFormulario() {

    let name = validarCampo("#name",
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,}$/.test($("#name").val().trim())
    );

    let email = validarCampo("#email",
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#email").val().trim())
    );

    let phone = validarCampo("#phone",
      /^[0-9]{8,15}$/.test($("#phone").val().trim())
    );

    let destination = validarCampo("#destination",
      $("#destination").val() !== ""
    );

    let message = validarCampo("#message",
      $("#message").val().trim().length >= 10
    );

    return name && email && phone && destination && message;
  }

  // =========================
  // Validación en tiempo real
  // =========================
  $("#contactForm input, #contactForm textarea, #contactForm select")
    .on("input change", function () {

      if (validarFormulario()) {
        $("button[type='submit']")
          .prop("disabled", false)
          .removeClass("btn-secondary")
          .addClass("btn-primary");
      } else {
        $("button[type='submit']")
          .prop("disabled", true)
          .removeClass("btn-primary")
          .addClass("btn-secondary");
      }

    });

  // =========================
  // Filtros en Input
  // =========================
  $("#name").on("input", function () {
    let value = $(this).val();
    $(this).val(value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""));
  });

  $("#phone").on("input", function () {
    let value = $(this).val();
    $(this).val(value.replace(/[^0-9]/g, ""));
  });

  // =========================
      //Submit
  // =========================
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    if (!validarFormulario()) return;

    let spinner = $(".spinner-border");
    spinner.removeClass("d-none");

    // Sanitizar datos
    let datos = {
      nombre: sanitizar($("#name").val()),
      email: sanitizar($("#email").val()),
      telefono: sanitizar($("#phone").val()),
      destino: sanitizar($("#destination").val()),
      mensaje: sanitizar($("#message").val())
    };

    console.log("Datos enviados:", datos);

    // Simulación de envío
    setTimeout(() => {

      spinner.addClass("d-none");

      // Mostrar modal Bootstrap 5
      let modal = new bootstrap.Modal(document.getElementById('confirmModal'));
      modal.show();

      // Reset
      this.reset();

      $("button[type='submit']")
        .prop("disabled", true)
        .removeClass("btn-primary")
        .addClass("btn-secondary");

      $(".form-control, .form-select")
        .removeClass("is-valid is-invalid");

    }, 1500);

  });

});


/* SCRIPT SECCION BLOG */

$(document).ready(function(){

  // FILTRO
  $(".filter-btn").click(function(){

    let categoria = $(this).data("filter");

    if(categoria == "all"){
      $(".blog-card").fadeIn();
    } else {
      $(".blog-card").hide();
      $("." + categoria).fadeIn();
    }

  });

  // SCROLL REVEAL
  function mostrar(){

    $(".blog-card").each(function(){

      let top = $(this).offset().top;
      let scroll = $(window).scrollTop();
      let altura = $(window).height();

      if(scroll + altura > top + 100){
        $(this).addClass("show");
      }

    });

  }

  $(window).on("scroll", mostrar);
  mostrar();

});

/*Script comentarios*/
$(document).ready(function(){
  const nombres = ["Ana Gómez", "Carlos Ruiz", "María López", "Juan Pérez", "Lucía Fernández"];
  const textos = [
   "Bariloche es increíble, lo recomiendo!",
   "Iguazú fue una experiencia única.",
   "Cancún,sus playas es la mejor",
   "Jujuy,increible paisajes y su buena gente",
   "Hermoso Argentina,su calidad espero algun día volver!"
  ];
  const avatares = [
    "https://i.pravatar.cc/50?img=1",
    "https://i.pravatar.cc/50?img=2",
    "https://i.pravatar.cc/50?img=3",
    "https://i.pravatar.cc/50?img=4",
    "https://i.pravatar.cc/50?img=5"
  ];

  function agregarComentario(){
    let nombre = nombres[Math.floor(Math.random() * nombres.length)];
    let texto = textos[Math.floor(Math.random() * textos.length)];
    let avatar = avatares[Math.floor(Math.random() * avatares.length)];

    let nuevoComentario = $(`
      <div class="card mb-2" style="display:none;">
        <div class="card-body d-flex">
          <img src="${avatar}" class="rounded-circle me-3 avatar-img" alt="avatar">
          <div>
            <h5 class="card-title mb-1">${nombre}</h5>
            <p class="card-text mb-1">${texto}</p>
            <small class="text-muted">Publicado hace unos segundos</small>
          </div>
        </div>
      </div>
    `);

    $("#comentario").append(nuevoComentario);
    nuevoComentario.fadeIn("slow");
  }

  // Detectar scroll al final del contenedor
  $("#comentario").on("scroll", function(){
    if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight){
      // Agregar varios comentarios al llegar al final
      for(let i=0; i<3; i++){
        agregarComentario();
      }
    }
  });

  // Cargar algunos comentarios iniciales
  for(let i=0; i<5; i++){
    agregarComentario();
  }
});

/*SCRIPT PAGINA DE PRECIOS*/

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });
});

/*Script para Pagina de Phishing-Interaccion*/
$("#verificarBtn").click(function () {
  let seleccionados = [];
  $("#fraudeForm input:checked").each(function () {
    seleccionados.push($(this).val());
  });

  if (seleccionados.includes("dominio") && seleccionados.includes("enlace") && seleccionados.includes("alarmista") && !seleccionados.includes("correcto")) {
    alert("✅ ¡Excelente! Identificaste todas las señales de fraude correctamente.");
  } else {
    alert("⚠ Revisa otra vez: recuerda que el dominio, el enlace y el tono alarmista son pistas de phishing.");
  }
});
