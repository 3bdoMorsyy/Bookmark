var nameInput = document.getElementById("nameInput");
var urlInput = document.getElementById("UrlInput");
var tableBody = document.getElementById("tableBody");

allSites = JSON.parse(localStorage.getItem("allSites")) || [];
display();

function addElement() {
  if (
    urlInput.classList.contains("is-valid") &&
    nameInput.classList.contains("is-valid")
  ) {
    site = {
      name: nameInput.value,
      url: urlInput.value,
    };
    allSites.push(site);
    reset();
    localStorage.setItem("allSites", JSON.stringify(allSites));
    display();
  } else {
    validateSubmit();
  }
}

function reset() {
  nameInput.value = "";
  urlInput.value = "";
  nameInput.classList.remove(["is-valid", "is-invalid"]);
  urlInput.classList.remove(["is-valid", "is-invalid"]);
}
function display() {
  var cartoona = "";
  for (let i = 0; i < allSites.length; i++) {
    cartoona += `
            <tr>
              <td>${i + 1}</td>
              <td class='name'>${allSites[i].name}</td>
              <td>
                  <a class='btn btn-visit' target="_blank" href="${
                    allSites[i].url.includes("www.")
                      ? allSites[i].url
                      : `${allSites[i].url}`
                  }"> <i class="fa-solid fa-eye"></i> Visit </a>
              </td>
              <td>
                <button onclick="deleteElement(${i})" class="btn btn-danger">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr> `;
  }
  tableBody.innerHTML = cartoona;
}
function deleteElement(i) {
  allSites.splice(i, 1);
  localStorage.setItem("allSites", JSON.stringify(allSites));
  display();
}
"".match();
function validateUrl() {
  if (
    urlInput.value.match(
      /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/
    ) === null ||
    urlInput.value == ""
  ) {
    urlInput.classList.add("is-invalid");
  } else {
    urlInput.classList.remove("is-invalid");
    urlInput.classList.add("is-valid");
  }
}

function validateName() {
  if (nameInput.value == "") {
    nameInput.classList.add("is-invalid");
  } else {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
  }

  for (let i = 0; i < allSites.length; i++) {
    if (allSites[i].name == nameInput.value) {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
    }
  }
}

function validateSubmit() {
  Swal.fire({
    icon: "Error!",
    title: "Oops...",
    text: ``,
  });
  document.getElementById(
    "swal2-html-container"
  ).innerHTML = `<div>[1] Name Can't Be Repeated or Empty</div>
  <div>[2]Url Should Start With 'HTTPS' ex:https://google.com</div> `;
}
