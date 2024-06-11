document.addEventListener("DOMContentLoaded", function () {
  // Datos de los ejercicios para cada día
  const rutinaPierna = [
    {
      ejercicio: "Sentadilla Profunda",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Extensión de Cuadriceps Lenta",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Extensión Femoral Lenta",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Elevaciones de Gemelos",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Plancha",
      series: "2",
      repeticiones: "Al Fallo",
    },
    {
      ejercicio: "Elevaciones Laterales Lentas",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Elevaciones Frontales con Disco",
      series: "4",
      repeticiones: "8",
    },
  ];
  const rutinaEspalda = [
    {
      ejercicio: "Jalon al Pecho Alto",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Remo Unilateral con Mancuerna",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Remo con Barra",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Curl de Biceps Unilateral",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Curl Martillo",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Curl con Barra",
      series: "3",
      repeticiones: "8",
    },
    {
      ejercicio: "Curl Invertido con Barra",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Elevaciones Laterales Lentas",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Elevaciones Frontales con Disco",
      series: "4",
      repeticiones: "8",
    },
  ];
  const rutinaTorso = [
    {
      ejercicio: "Press Banca Plano",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Press Banca Inclinado",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Extensión de Triceps Lenta",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Extensión sobre la Cabeza",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Elevaciones Laterales Lentas",
      series: "4",
      repeticiones: "8",
    },
    {
      ejercicio: "Elevaciones Frontales con Disco",
      series: "4",
      repeticiones: "8",
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
    rutinaPierna,
    "pierna"
  );
  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(2) tbody"),
    rutinaEspalda,
    "espalda"
  );
  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(3) tbody"),
    rutinaTorso,
    "torno"
  );

  // Navegación entre tablas
  const tables = document.querySelectorAll("#rutina table");
  let currentTableIndex = localStorage.getItem("currentTableIndex")
    ? parseInt(localStorage.getItem("currentTableIndex"), 10)
    : 0;
  tables[currentTableIndex].style.display = "table";

  document.querySelector(".left-arrow").addEventListener("click", function () {
    if (currentTableIndex > 0) {
      tables[currentTableIndex].style.display = "none";
      currentTableIndex--;
      tables[currentTableIndex].style.display = "table";
      localStorage.setItem("currentTableIndex", currentTableIndex);
      hideAllImages();
    }
  });

  document.querySelector(".right-arrow").addEventListener("click", function () {
    if (currentTableIndex < tables.length - 1) {
      tables[currentTableIndex].style.display = "none";
      currentTableIndex++;
      tables[currentTableIndex].style.display = "table";
      localStorage.setItem("currentTableIndex", currentTableIndex);
      hideAllImages();
    }
  });

  // Eventos de teclado para navegación
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      if (currentTableIndex < tables.length - 1) {
        tables[currentTableIndex].style.display = "none";
        currentTableIndex++;
        tables[currentTableIndex].style.display = "table";
        localStorage.setItem("currentTableIndex", currentTableIndex);
        hideAllImages();
      }
    } else if (event.key === "ArrowLeft") {
      if (currentTableIndex > 0) {
        tables[currentTableIndex].style.display = "none";
        currentTableIndex--;
        tables[currentTableIndex].style.display = "table";
        localStorage.setItem("currentTableIndex", currentTableIndex);
        hideAllImages();
      }
    }
  });

  // Botón de refrescar que limpia el estado guardado y recarga la página
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
  });

  // Función para ocultar todas las imágenes
  function hideAllImages() {
    const images = document.querySelectorAll(".exercise-image");
    images.forEach(function (image) {
      image.style.display = "none";
    });
  }

  // Función para mostrar la imagen del ejercicio seleccionado
  function showExerciseImage(exerciseName) {
    // Ocultamos todas las imágenes primero
    hideAllImages();

    // Mostramos la imagen correspondiente al ejercicio seleccionado
    const imageToShow = document.querySelector(`#${exerciseName}-image`);
    if (imageToShow) {
      imageToShow.style.display = "block";

      // Ocultamos la imagen después de 20 segundos
      setTimeout(() => {
        imageToShow.style.display = "none";
      }, 20000);
    }
  }

  // Agregamos el evento de clic a los nombres de los ejercicios
  const exerciseNames = document.querySelectorAll("#rutina td:first-child");
  exerciseNames.forEach(function (nameElement) {
    nameElement.addEventListener("click", function () {
      const exerciseId = this.textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      const imageElement = document.querySelector(`#${exerciseId}-image`);
      if (imageElement.style.display === "block") {
        imageElement.style.display = "none";
      } else {
        showExerciseImage(exerciseId);
      }
    });
  });

  // Agrega imágenes al contenedor de imágenes
  const exerciseImagesContainer = document.getElementById("exerciseImages");
  const exercises = [...rutinaPierna, ...rutinaEspalda, ...rutinaTorso];
  exercises.forEach((exercise) => {
    const imageName = exercise.ejercicio.toLowerCase().replace(/\s+/g, "-");
    const img = document.createElement("img");
    img.src = `assets/media/jpg/Toda_la_Rutina/${imageName}.jpg`;
    img.classList.add("exercise-image", imageName);
    img.id = `${imageName}-image`;
    exerciseImagesContainer.appendChild(img);
  });
});
