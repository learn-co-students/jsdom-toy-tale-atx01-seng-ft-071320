let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.getElementById("add-toy-form");
const toyCollection = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", () => {


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then((json) => addToyInfo(json))


    toyForm.addEventListener("submit", (e) => submitToy())
});

function addToyInfo(json) {
  json.forEach(element => {
    let toyInfo = document.createElement("div");
    toyInfo.classList.add("card");
    toyInfo.innerHTML = `<h2>${element["name"]}</h2>
      <img src=${element["image"]} class="toy-avatar" />
      <p>${element["likes"]} likes</p>
      <button class="like-btn">Like <3</button>`;
    toyCollection.append(toyInfo);
    const likeButton = toyInfo.querySelector("button");
    const likeCount = toyInfo.querySelector("p");
    likeButton.addEventListener("click", (e) => like(element, likeCount))
  });
}

function like(toy, likeCount) {
  fetch(`http://localhost:3000/toys/${toy["id"]}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": (toy.likes++)
    })
  });
  likeCount.innerHTML = `<p>${toy["likes"]} likes</p>`
};

function submitToy() {
  fetch("http://localhost:3000/toys/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${toyForm.name.value}`,
      "image": `${toyForm.image.value}`,
      "likes": 0
    })
  });
}