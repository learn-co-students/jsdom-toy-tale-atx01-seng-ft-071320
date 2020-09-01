let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.querySelector(".add-toy-form");
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
  .then(function(response) {
  return response.json();
  })
  .then(function(json){
    renderToys(json);
  });
  function renderToys(toys){
    toys.forEach(element => {
    const createDiv = document.createElement("div");
    // creates <div></div>
    createDiv.setAttribute("class", "card");
    // <div class="card"></div>
    createDiv.setAttribute("toy_id", `${element.id}`);
    createDiv.innerHTML = `<h2>${element.name}</h2>
    <img src=${element.image} class="toy-avatar" />
    <p>${element.likes} Likes</p>
    <button class="like-btn">Like <3</button>`
    toyCollection.append(createDiv)
    })//forEach
  let likeButtonList = document.querySelectorAll(".like-btn")
  likeButtonList.forEach(button => {
    button.addEventListener("click", addLikes);
  })
  };
    function addLikes(arg) {
      console.log(arg.target.parentElement)
      let parentElement = arg.target.parentElement;
      let likes = parseInt(parentElement.children[2].innerText.split(" ")[0]) +1
      let like = `${likes} Likes`
      parentElement.children[2].innerText = like
      let id = parentElement.getAttribute("toy_id")
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers:
        {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
        "likes": likes
        }) //body
      }) //fetch
    }; //function
  toyForm.addEventListener("submit", (event) => {
    fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({
    "name": toyForm.name.value,
    "image": toyForm.image.value,
    "likes": 0
    }) //body
    }) //fetch
  }) //addEventListener
});


