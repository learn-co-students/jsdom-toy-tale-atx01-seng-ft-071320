

document.addEventListener("DOMContentLoaded", () => {
  let toyHash = {}

  let toyCollection = document.getElementById("toy-collection")
  let container = document.getElementsByClassName("container")[0]
  let newToyButton = document.getElementById("new-toy-btn")
  let toyForm = document.getElementsByClassName("add-toy-form")[0];
  console.log(container)

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.forEach(function(toy) {
        toyCollection.append(createToyCard(toy));
        toyHash[toy.name] = toy.id
      })
      console.log(toyHash)
    })

  newToyButton.addEventListener("click", function(e) {
    container.style.display = "block"
  })


  toyForm.addEventListener('submit', function(e) {
    let newToy = {};
    e.preventDefault();
    let toyName = document.getElementsByName("name")[0].value
    let toyImage = document.getElementsByName("image")[0].value
    newToy["name"] = toyName
    newToy["image"] = toyImage
    toyCollection.append(createToyCard(newToy));
    container.style.display = "none"

    let formData = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data)
      })

  })


  toyCollection.addEventListener("click", function(e) {
    if (e.target.className == "like-btn") {
      let toyName = e.target.parentNode.childNodes[1].textContent
      let toyId = toyHash[toyName]
      console.log(toyId)
      let likes = e.target.parentNode.childNodes[5].textContent.split(" ")[0]
      console.log(likes)
      let addLikes = ++likes
      e.target.parentNode.childNodes[5].textContent = `${addLikes} likes`

      let formData = {
        likes: addLikes
      }

      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }

      fetch(`http://localhost:3000/toys/${toyId}`, configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data)
        })

    } else if (e.target.className == "delete-btn") {

      let toyName = e.target.parentNode.childNodes[1].textContent
      let toyId = toyHash[toyName]
      let toyCard = e.target.parentNode
      toyCard.remove();


      let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }

      fetch(`http://localhost:3000/toys/${toyId}`, configObj)
        .then(function(response) {
          return response.json();
        })

    }
  })

})

function createToyCard(toy) {
  let card = document.createElement('div');
  card.className = "card";
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} likes</p>
    <button class="like-btn">Like <3</button>
    <button class="delete-btn">Delete</button>
  `
  return card
}
