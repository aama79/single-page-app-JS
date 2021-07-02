export function ContacForm() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");

  $form.classList.add("contact-form");

  $styles.innerHTML = `
  .contact-form {
  --form-ok-color: #1976d2;
  --form-error-color: #d50000;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
.contact-form * {
  padding: 0.5rem;
  margin: 1rem auto;
  display: block;
  width: 100%;
  border-radius: 0.6rem;
}

.contact-form textarea {
  resize: none;
}

.contact-form legend,
.contact-form-response {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.contact-form input,
.contact-form textarea {
  width: 650px;
  padding: 12px 20px 12px 40px;
   
  font-size: 1rem;
  font-family: sans-serif;
  outline: none !important;
}

.contact-form input:focus,
.contact-form textarea:focus{
    outline: none !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.contact-form input[type="submit"] {
  width: 450px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 1rem;
  
}

.contact-form input[type="submit"]:hover {
  background-color: #42a5f5;
  color: #eceff1;
}

.contact-form *::placeholder {
  color: #263238;
}

.contact-form [required]:valid {
  border: thin solid var(--form-ok-color);
}

.contact-form [required]:invalid {
  border: thin solid var(--form-error-color);
}

.contact-form-error {
  margin-top: 1rem;
  padding: 12px 20px 12px 40px;
  width: 650px;
  font-size: 90%;
  background-color: var(--form-error-color);
  color: #fff;
  transition: all 800ms ease;
}
.contac-form-loader {
  text-align: center;
}
.contac-form-loader img {
  width: 8%;
}

.contact-form-error.is-active {
  display: block;
  animation: show-message 1s 1 normal 0s ease-out both;
}

.none {
  display: none;
}
  
  `;

  $form.innerHTML = `
  <legend>Envianos tus comentarios</legend>
    <input type="text" name="name" placeholder="Escribe tu nombre..."
      title="Este campo solo acepta letras y espacios en blanco."
      pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
    <input type="email" name="email" placeholder="Escribe tu email"
      title="Email incorrecto"
      pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$"
      required>
    <input type="text" name="subject" placeholder="Asunto a tratar.."
      title="El asunto es requerido" required>
    <textarea name="comments" cols="50" rows="5"
      placeholder="Escribe tus comentarios"
      title="Tu comentario no debe exceder los 255 caracteres"
      data-pattern="^.{1,255}$" required></textarea>
    <input type="submit" value="Enviar">
    <div class="contac-form-loader none">
      <img src="../app/assets/puff.svg" alt="Cargando">
    </div>
    <div class="contact-form-response none">
      <p>Los datos han sido enviados</p>
    </div>
  `;

  function valForm() {
    const $form = d.querySelector(".contact-form"),
      $inputs = d.querySelectorAll(".contact-form [required]");

    //console.log($inputs);

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contact-form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });
    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        //console.log($input, pattern);
        if (pattern && $input.value !== "") {
          //console.log("El input tiene patron");
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
        if (!pattern) {
          //console.log("El input NO tiene patron");
          return $input.value === ""
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });

    d.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Enviando formulario...");

      const $loader = d.querySelector(".contac-form-loader"),
        $response = d.querySelector(".contact-form-response");

      $loader.classList.remove("none");

      fetch("https://formsubmit.co/ajax/aama.79@gmail.com", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          $loader.classList.add("none");
          $response.classList.remove("none");
          $response.innerHTML = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let message =
            err.statusText || "Ocurrio un error al enviar, intenta nuevamente!";
          $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        })
        .finally(() =>
          setTimeout(() => {
            $response.classList.add("none");
            $response.innerHTML = "";
          }, 3000)
        );
    });
  }

  setTimeout(() => valForm(), 100);

  return $form;
}
