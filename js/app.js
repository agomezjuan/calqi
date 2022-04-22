window.addEventListener("load", function () {
  //Constantes
  const teclas = document.querySelectorAll(".tecla");
  const display = document.querySelector("#display");
  const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operaciones = ["suma", "resta", "multiplicacion", "division", "raiz"];

  //Variables globles
  let operacion = "";
  let resultado = 0;
  let num = 0;

  teclas.forEach((tecla) => {
    tecla.addEventListener("click", (e) => {
      //console.log(e.target.id);

      if (display.innerText == NaN) display.innerText = 0;

      // reset display
      if (display.innerText == "0") {
        display.innerText = "";
      }

      // casos de teclas
      switch (e.target.id) {
        case "on":
          display.innerText = 0;
          reset();
          break;

        case "mas":
          if (operacion == "") {
            resultado = display.innerText;
            // preparar para la operacion
            operacion = "suma";
          } else {
            num = display.innerText;

            // calcular la operacion previa
            resultado = operacionPrevia(operacion, resultado, num);
            display.innerText = resultado;

            // preparar para la siguiente operacion
            operacion = "suma";
          }

          con = true;
          break;

        case "menos":
          if (operacion == "") {
            resultado = display.innerText;
            operacion = "resta";
          } else {
            num = display.innerText;

            // calcular la operacion previa
            resultado = operacionPrevia(operacion, resultado, num);
            display.innerText = resultado;

            // preparar para la siguiente operacion
            operacion = "resta";
          }

          con = true;
          break;

        case "por":
          if (operacion == "") {
            resultado = display.innerText;
            operacion = "multiplicacion";
          } else {
            num = display.innerText;

            // calcular la operacion previa
            resultado = operacionPrevia(operacion, resultado, num);
            display.innerText = resultado;

            // preparar para la siguiente operacion
            operacion = "multiplicacion";
          }

          con = true;
          break;

        case "dividido":
          if (operacion == "") {
            resultado = display.innerText;
            operacion = "division";
          } else {
            num = display.innerText;

            // calcular la operacion previa
            resultado = operacionPrevia(operacion, resultado, num);
            display.innerText = resultado;

            // preparar para la siguiente operacion
            operacion = "division";
          }

          con = true;
          break;

        // Raiz cuadrada
        case "raiz":
          if (operacion == "") {
            resultado = raiz(display.innerText);
            display.innerText = resultado;
          } else {
            num = raiz(display.innerText);

            // calcular la operacion previa
            resultado = operacionPrevia(operacion, resultado, num);
            display.innerText = resultado;
          }
          break;

        // representacion del punto decimal
        case "punto":
          display.innerText =
            display.innerText == "" ? "0." : (display.innerText += ".");
          break;

        // Calcular el total
        case "igual":
          // Validacion de operacion previas
          if (operacion == "suma") {
            num = display.innerText;
            resultado = sumar(resultado, num);
            display.innerText = resultado;
            reset();
            con = false;
          } else if (operacion == "resta") {
            num = display.innerText;
            resultado = restar(resultado, num);
            display.innerText = resultado;
            reset();
            con = false;
          } else if (operacion == "multiplicacion") {
            num = display.innerText;
            resultado = multiplicar(resultado, num);
            display.innerText = resultado;
            reset();
            con = false;
          } else if (operacion == "division") {
            num = display.innerText;
            resultado = dividir(resultado, num);
            display.innerText = resultado;
            reset();
            con = false;
          } else {
            resultado = display.innerText;
          }
          break;
        case "sign":
          if (display.innerText[0] == "-") {
            let negativo = display.innerText;
            display.innerText = negativo.substr(1);
          } else {
            display.innerText = "-" + display.innerText;
          }
          break;
        default:
          if (e.target.id in numeros) {
            if (display.innerText == "0") display.innerText = "";
            if (operaciones.includes(operacion) && con) display.innerText = "";
            display.innerText =
              display.innerText.length < 9
                ? (display.innerText += e.target.id)
                : display.innerText;
            con = false;
          }

          break;
      }
    });
  });

  /**
   * Operaciones
   */
  // Suma
  const sumar = (x, y) => {
    operacion = "suma";
    let suma = parseFloat(x) + parseFloat(y);
    console.log(x + " + " + y + " = " + suma);
    return suma;
  };

  // Resta
  const restar = (x, y) => {
    operacion = "resta";
    let resta = parseFloat(x) - parseFloat(y);
    console.log(x + " - " + y + " = " + resta);

    return resta;
  };

  // Multiplicación
  const multiplicar = (x, y) => {
    operacion = "multiplicacion";
    let producto = parseFloat(x) * parseFloat(y);
    console.log(x + " x " + y + " = " + producto);
    return normalizar(producto);
  };

  // División
  const dividir = (x, y) => {
    operacion = "division";
    let cociente = parseFloat(x) / parseFloat(y);
    console.log(x + " / " + y + " = " + cociente);
    return normalizar(cociente);
  };

  // Raíz cuadrada
  const raiz = (x) => {
    let rc = Math.sqrt(x);
    console.log("Raiz cuadrada de " + x + " = " + rc);
    return normalizar(rc);
  };

  // consolidar operacion previa
  const operacionPrevia = (operacion, x, y) => {
    let resultado = 0;
    if (operacion == "suma") resultado = sumar(x, y);
    if (operacion == "resta") resultado = restar(x, y);
    if (operacion == "multiplicacion") resultado = multiplicar(x, y);
    if (operacion == "division") resultado = dividir(x, y);
    return resultado;
  };

  // normalizar longitud de caracteres en pantalla
  const normalizar = (display) => parseFloat(display.toString().slice(0, 9));

  // resetear calculadora
  function reset() {
    operacion = "";
    resultado = 0;
    num = 0;
  }
});
