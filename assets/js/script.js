// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Datos de los ejercicios para cada día
  const rutinaFullBody = [
    { ejercicio: "Press Banca", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Dominadas", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Press Militar", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Elevaciones Laterales", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Extensiones de Codo", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Curl con Mancuerna", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Sentadilla", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Peso Muerto Rumano", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Hip Thrust", series: "2-5", repeticiones: "8-12" },
    {
      ejercicio: "Elevación de Talón de Pie",
      series: "2-5",
      repeticiones: "8-12",
    },
  ];

  const rutinaTorso = [
    { ejercicio: "Press Banca", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Dominadas", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Press Militar", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Fondos", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Remo con Barra", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Elevaciones Laterales", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Extension de Codo", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Curl con Mancuerna", series: "2-5", repeticiones: "8-12" },
  ];

  const rutinaPierna = [
    { ejercicio: "Sentadilla", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Peso Muerto Rumano", series: "2-5", repeticiones: "8-12" },
    { ejercicio: "Hip Thrust", series: "2-5", repeticiones: "8-12" },
    {
      ejercicio: "Extensiones en Máquina",
      series: "2-5",
      repeticiones: "8-12",
    },
    { ejercicio: "Curl en Máquina", series: "2-5", repeticiones: "8-12" },
    {
      ejercicio: "Elevación de Talón de Pie",
      series: "2-5",
      repeticiones: "8-12",
    },
    {
      ejercicio: "Elevación de Talón Sentado",
      series: "2-5",
      repeticiones: "8-12",
    },
  ];

  // Función para agregar ejercicios a la tabla
  function agregarEjercicios(tbody, rutina, dia) {
    rutina.forEach(function (ejercicio, index) {
      const tr = document.createElement("tr");
      const checkboxId = `chk-${dia}-${index}`;
      tr.innerHTML = `
                <td>${ejercicio.ejercicio}</td>
                <td>${ejercicio.series}</td>
                <td>${ejercicio.repeticiones}</td>
                <td><input type="checkbox" id="${checkboxId}" class="checkbox"></td>
            `;
      tbody.appendChild(tr);

      // Cargar el estado guardado de los checkboxes
      const checkbox = document.getElementById(checkboxId);
      const checked = localStorage.getItem(checkboxId) === "true";
      checkbox.checked = checked;

      // Guardar el estado de los checkboxes
      checkbox.addEventListener("change", function () {
        localStorage.setItem(checkboxId, checkbox.checked);
      });
    });
  }

  // Agregar ejercicios a las tablas
  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(1) tbody"),
    rutinaFullBody,
    "fullbody"
  );
  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(2) tbody"),
    rutinaTorso,
    "torso"
  );
  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(3) tbody"),
    rutinaPierna,
    "pierna"
  );

  // Navegación entre tablas
  const tables = document.querySelectorAll("#rutina table");
  let currentTableIndex = localStorage.getItem("currentTableIndex")
    ? parseInt(localStorage.getItem("currentTableIndex"), 10)
    : 0;
  tables[currentTableIndex].style.display = "table"; // Muestra la tabla actual

  document.querySelector(".left-arrow").addEventListener("click", function () {
    if (currentTableIndex > 0) {
      tables[currentTableIndex].style.display = "none";
      currentTableIndex--;
      tables[currentTableIndex].style.display = "table";
      localStorage.setItem("currentTableIndex", currentTableIndex);
    }
  });

  document.querySelector(".right-arrow").addEventListener("click", function () {
    if (currentTableIndex < tables.length - 1) {
      tables[currentTableIndex].style.display = "none";
      currentTableIndex++;
      tables[currentTableIndex].style.display = "table";
      localStorage.setItem("currentTableIndex", currentTableIndex);
    }
  });

  // Función para cambiar la tabla visible y ajustar la posición de las flechas
  function changeTable(next) {
    tables[currentTableIndex].style.display = "none";
    currentTableIndex = next ? currentTableIndex + 1 : currentTableIndex - 1;
    currentTableIndex = Math.max(
      0,
      Math.min(currentTableIndex, tables.length - 1)
    );
    tables[currentTableIndex].style.display = "table";
    localStorage.setItem("currentTableIndex", currentTableIndex);
    centerArrows(); // Llama a la función para centrar las flechas
  }

  // Función para centrar las flechas de navegación con respecto a la tabla visible
  function centerArrows() {
    const tableRect = tables[currentTableIndex].getBoundingClientRect();
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const navigationContainer = document.querySelector(".table-navigation");

    // Calcula la posición central de la tabla
    const tableCenter = tableRect.left + tableRect.width / 2;
    // Centra el contenedor de navegación con respecto a la tabla
    navigationContainer.style.left = `${tableCenter}px`;
    navigationContainer.style.transform = "translateX(-50%)";

    // Ajusta la posición de las flechas dentro del contenedor
    leftArrow.style.left = `${-tableRect.left}px`;
    rightArrow.style.right = `${document.body.clientWidth - tableRect.right}px`;
  }

  // Eventos de teclado para navegación
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      if (currentTableIndex < tables.length - 1) {
        tables[currentTableIndex].style.display = "none";
        currentTableIndex++;
        tables[currentTableIndex].style.display = "table";
        localStorage.setItem("currentTableIndex", currentTableIndex);
      }
    } else if (event.key === "ArrowLeft") {
      if (currentTableIndex > 0) {
        tables[currentTableIndex].style.display = "none";
        currentTableIndex--;
        tables[currentTableIndex].style.display = "table";
        localStorage.setItem("currentTableIndex", currentTableIndex);
      }
    }
  });

  // Botón de refrescar que limpia el estado guardado y recarga la página
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
  });
});
