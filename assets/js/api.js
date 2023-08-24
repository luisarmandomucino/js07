const url = "https://reqres.in/api/users?delay=3";
const tiempoDeVidaLocalStorage = 1 * 60 * 1000; // 1 minuto en milisegundos

const cargarDatosBtn = document.getElementById("cargarDatosBtn");
cargarDatosBtn.addEventListener("click", cargarDatos);

function cargarDatos() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      mostrarDatos(data.data);
      localStorage.setItem(
        "apiData",
        JSON.stringify({ data, timestamp: Date.now() })
      );
    })
    .catch((error) => console.log(error));
}

const mostrarDatos = (data) => {
  let body = "";
  for (let index = 0; index < data.length; index++) {
    body += `
      <tr>
        <td>${data[index].id}</td>
        <td>${data[index].first_name}</td>
        <td>${data[index].last_name}</td>
        <td>${data[index].email}</td>
        <td><img src="${data[index].avatar}" alt="User Avatar" width="50" class="rounded-circle"></td>
      </tr>`;
  }
  document.getElementById("data").innerHTML = body;
};

document.addEventListener("DOMContentLoaded", () => {
  const datosAlmacenados = localStorage.getItem("apiData");
  if (datosAlmacenados) {
    const { data, timestamp } = JSON.parse(datosAlmacenados);
    const tiempoTranscurrido = Date.now() - timestamp;

    if (tiempoTranscurrido < tiempoDeVidaLocalStorage) {
      mostrarDatos(data);
    } else {
      localStorage.removeItem("apiData"); // Eliminar datos expirados
    }
  }
});

// localStorage.setItem('datos', JSON.stringify(data));

// const datosAlmacenados = localStorage.getItem('datos');

// if (datosAlmacenados) {
//     const data = JSON.parse(datosAlmacenados);
//     mostrarDatos(data);
// }
