"use strict";
class Calculadora {
  constructor() {
    this.teclas = document.querySelectorAll(".tecla");
    this.display = document.querySelector("#display");
    this.numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.operaciones = ["suma", "resta", "multiplicacion", "division", "raiz"];
    this.operacion = "";
    this.resultado = 0;
    this.num = 0;
    this.con;
  }

  init = () => {
    this.teclas.forEach((tecla) => {
      // efecto achicar y aumentar teclas
      this.efectoTeclas(tecla);

      // eventos de operaciones matematicas
      tecla.addEventListener("click", (e) => {
        if (this.display.innerText == NaN) this.display.innerText = 0;

        // reset display
        if (this.display.innerText == "0") {
          this.display.innerText = "";
        }

        // casos de teclas
        switch (e.target.id) {
          case "on":
            this.display.innerText = 0;
            this.reset();
            break;

          case "mas":
            if (this.operacion == "") {
              this.resultado = this.display.innerText;
              // preparar para la operacion
              this.operacion = "suma";
            } else {
              this.num = this.display.innerText;

              // calcular la operacion previa
              this.resultado = this.operacionPrevia(
                this.operacion,
                this.resultado,
                this.num
              );
              this.display.innerText = this.resultado;

              // preparar para la siguiente operacion
              this.operacion = "suma";
            }

            this.con = true;
            break;

          case "menos":
            if (this.operacion == "") {
              this.resultado = this.display.innerText;
              this.operacion = "resta";
            } else {
              this.num = this.display.innerText;

              // calcular la operacion previa
              this.resultado = this.operacionPrevia(
                this.operacion,
                this.resultado,
                this.num
              );
              this.display.innerText = this.resultado;

              // preparar para la siguiente operacion
              this.operacion = "resta";
            }

            this.con = true;
            break;

          case "por":
            if (this.operacion == "") {
              this.resultado = this.display.innerText;
              this.operacion = "multiplicacion";
            } else {
              this.num = this.display.innerText;

              // calcular la operacion previa
              this.resultado = this.operacionPrevia(
                this.operacion,
                this.resultado,
                this.num
              );
              this.display.innerText = this.resultado;

              // preparar para la siguiente operacion
              this.operacion = "multiplicacion";
            }

            this.con = true;
            break;

          case "dividido":
            if (this.operacion == "") {
              this.resultado = this.display.innerText;
              this.operacion = "division";
            } else {
              this.num = this.display.innerText;

              // calcular la operacion previa
              this.resultado = this.operacionPrevia(
                this.operacion,
                this.resultado,
                this.num
              );
              this.display.innerText = this.resultado;

              // preparar para la siguiente operacion
              this.operacion = "division";
            }

            this.con = true;
            break;

          // Raiz cuadrada
          case "raiz":
            if (this.operacion == "") {
              this.resultado = this.raiz(this.display.innerText);
              this.display.innerText = this.resultado;
            } else {
              this.num = this.raiz(this.display.innerText);

              // calcular la operacion previa
              this.resultado = this.operacionPrevia(
                this.operacion,
                this.resultado,
                this.num
              );
              this.display.innerText = this.resultado;
            }
            break;

          // representacion del punto decimal
          case "punto":
            if (!this.display.innerText.split("").includes(".")) {
              this.display.innerText =
                this.display.innerText == ""
                  ? "0."
                  : (this.display.innerText += ".");
            }

            break;

          // Calcular el total
          case "igual":
            // Validacion de operacion previas
            if (this.operacion == "suma") {
              this.num = this.display.innerText;
              this.resultado = this.sumar(this.resultado, this.num);
              this.display.innerText = this.resultado;
              this.reset();
              this.con = false;
            } else if (this.operacion == "resta") {
              this.num = this.display.innerText;
              this.resultado = this.restar(this.resultado, this.num);
              this.display.innerText = this.resultado;
              this.reset();
              this.con = false;
            } else if (this.operacion == "multiplicacion") {
              this.num = this.display.innerText;
              this.resultado = this.multiplicar(this.resultado, this.num);
              this.display.innerText = this.resultado;
              this.reset();
              this.con = false;
            } else if (this.operacion == "division") {
              this.num = this.display.innerText;
              this.resultado = this.dividir(this.resultado, this.num);
              this.display.innerText = this.resultado;
              this.reset();
              this.con = false;
            } else {
              this.resultado = this.display.innerText;
            }
            break;
          case "sign":
            if (this.display.innerText[0] == "-") {
              let negativo = this.display.innerText;
              this.display.innerText = negativo.substr(1);
            } else {
              this.display.innerText = "-" + this.display.innerText;
            }
            break;
          default:
            if (e.target.id in this.numeros) {
              if (this.display.innerText == "0") this.display.innerText = "";
              if (this.operaciones.includes(this.operacion) && this.con)
                this.display.innerText = "";
              this.display.innerText =
                this.display.innerText.length < 9
                  ? (this.display.innerText += e.target.id)
                  : this.display.innerText;
              this.con = false;
            }

            break;
        }
      });
    });
  };

  /**
   * Operaciones
   */
  // Suma
  sumar = (x, y) => {
    this.operacion = "suma";
    let suma = parseFloat(x) + parseFloat(y);
    console.log(x + " + " + y + " = " + suma);
    return suma;
  };

  // Resta
  restar = (x, y) => {
    this.operacion = "resta";
    let resta = parseFloat(x) - parseFloat(y);
    console.log(x + " - " + y + " = " + resta);
    return resta;
  };

  // Multiplicación
  multiplicar = (x, y) => {
    this.operacion = "multiplicacion";
    let producto = parseFloat(x) * parseFloat(y);
    console.log(x + " x " + y + " = " + producto);
    return this.normalizar(producto);
  };

  // División
  dividir = (x, y) => {
    this.operacion = "division";
    let cociente = parseFloat(x) / parseFloat(y);
    console.log(x + " / " + y + " = " + cociente);
    return this.normalizar(cociente);
  };

  // Raíz cuadrada
  raiz = (x) => {
    let rc = Math.sqrt(x);
    console.log("Raiz cuadrada de " + x + " = " + rc);
    return this.normalizar(rc);
  };

  //this.consolidar operacion previa
  operacionPrevia = (operacion, x, y) => {
    let resultado = 0;
    if (operacion == "suma") resultado = this.sumar(x, y);
    if (operacion == "resta") resultado = this.restar(x, y);
    if (operacion == "multiplicacion") resultado = this.multiplicar(x, y);
    if (operacion == "division") resultado = this.dividir(x, y);
    return resultado;
  };

  // normalizar longitud de caracteres en pantalla
  normalizar = (display) => parseFloat(display.toString().slice(0, 9));

  // resetear calculadora
  reset = () => {
    this.operacion = "";
    this.resultado = 0;
    this.num = 0;
  };

  // efectos aumentar y reducir tamaño de teclas
  efectoTeclas = (tecla) => {
    tecla.addEventListener("mousedown", (e) => {
      if (["0", "1", "2", "3", "igual", "punto"].includes(e.target.id)) {
        e.target.style.width = "28%";
        e.target.style.height = "62px";
      } else if (e.target.id == "mas") {
        e.target.style.width = "88%";
        e.target.style.height = "98%";
      } else {
        e.target.style.width = "21%";
        e.target.style.height = "62px";
      }
    });

    tecla.addEventListener("mouseup", (e) => {
      if (["0", "1", "2", "3", "igual", "punto"].includes(e.target.id)) {
        e.target.style.width = "29%";
        e.target.style.height = "62.91px";
      } else if (e.target.id == "mas") {
        e.target.style.width = "90%";
        e.target.style.height = "100%";
      } else {
        e.target.style.width = "22%";
        e.target.style.height = "62.91px";
      }
    });
  };
}

const calqi = new Calculadora();
calqi.init();
