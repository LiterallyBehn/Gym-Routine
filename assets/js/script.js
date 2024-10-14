document.addEventListener("DOMContentLoaded", function () {
  const rutinaTorso = [
    {
      ejercicio: "Press Banca Plano",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Press Banca Inclinado",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Press Militar",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Extensión de Triceps Lenta",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Extensión sobre la Cabeza",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Elevaciones Laterales Lentas",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Elevaciones Frontales con Disco",
      series: "3",
      repeticiones: "10",
    },
  ];

  const rutinaEspalda = [
    {
      ejercicio: "Jalon al Pecho Alto",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Remo Unilateral con Mancuerna",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Remo con Barra",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Curl de Biceps Unilateral",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Curl Martillo",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Curl con Barra",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Curl Invertido con Barra",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Elevaciones Laterales Lentas",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Elevaciones Frontales con Disco",
      series: "3",
      repeticiones: "10",
    },
  ];

  const rutinaPierna = [
    {
      ejercicio: "Sentadilla Profunda",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Extensión de Cuadriceps Lenta",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Extensión Femoral Lenta",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Elevaciones de Gemelos",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Plancha",
      series: "2",
      repeticiones: "Al Fallo",
    },
    {
      ejercicio: "Elevaciones Laterales Lentas",
      series: "3",
      repeticiones: "10",
    },
    {
      ejercicio: "Elevaciones Frontales con Disco",
      series: "3",
      repeticiones: "10",
    },
  ];

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

      const checkbox = document.getElementById(checkboxId);
      const checked = localStorage.getItem(checkboxId) === "true";
      checkbox.checked = checked;

      checkbox.addEventListener("change", function () {
        localStorage.setItem(checkboxId, checkbox.checked);
      });
    });
  }

  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(1) tbody"),
    rutinaTorso,
    "torso"
  );
  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(2) tbody"),
    rutinaEspalda,
    "espalda"
  );
  agregarEjercicios(
    document.querySelector("#rutina table:nth-child(3) tbody"),
    rutinaPierna,
    "pierna"
  );

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

  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
  });

  function hideAllImages() {
    const images = document.querySelectorAll(".exercise-image");
    images.forEach(function (image) {
      image.style.display = "none";
    });
  }

  function showExerciseImage(exerciseName) {
    hideAllImages();

    const imageToShow = document.querySelector(`#${exerciseName}-image`);
    if (imageToShow) {
      imageToShow.style.display = "block";

      setTimeout(() => {
        imageToShow.style.display = "none";
      }, 20000);
    }
  }

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

  const exerciseImagesContainer = document.getElementById("exerciseImages");
  const exercises = [...rutinaTorso, ...rutinaEspalda, ...rutinaPierna];
  exercises.forEach((exercise) => {
    const imageName = exercise.ejercicio.toLowerCase().replace(/\s+/g, "-");
    const img = document.createElement("img");
    img.src = `assets/media/jpg/Toda_la_Rutina/${imageName}.jpg`;
    img.classList.add("exercise-image", imageName);
    img.id = `${imageName}-image`;
    exerciseImagesContainer.appendChild(img);
  });
});
