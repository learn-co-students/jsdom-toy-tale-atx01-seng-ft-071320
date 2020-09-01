let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form');
  const toyCollection = document.getElementById('toy-collection');

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

    .then(function(data) {
      toyCollection.innerHTML = "";
      data.forEach(function(element) {
        createToyCard(element);
      })
    });

    toyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const firstInput = document.getElementsByName("name")[0].value
      const secondInput = document.getElementsByName("image")[0].value

      let formData = {
        name : firstInput,
        image : secondInput,
        likes : 0
      };

      let configObj = {
      method: "POST",
      headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(element) {
          createToyCard(element);
        })
    });

    toyCollection.addEventListener('click', function(e) {
      if (e.target.className == "like-btn") {

        let parent = e.target.parentElement
        let likeText = parent.querySelector('p')
        let parentId = parent.dataset.id
        let addLike = ++parent.dataset.likes
        console.log(addLike)
        likeText.textContent = `${addLike} Likes`


        let configObj = {
          method: "PATCH",
          headers:
          { "Content-Type": "application/json",
            Accept: "application/json" },

          body: JSON.stringify({
            "likes": addLike
          })
        }

        fetch(`http://localhost:3000/toys/${parentId}`, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(element) {
            console.log(element)
          })

        };

    });


    toyCollection.addEventListener('click', function(e) {
      if (e.target.className == "delete-btn") {
        e.target.parentElement.remove();

        let parent = e.target.parentElement
        let parentId = parent.dataset.id

        let configObj = {
          method: "DELETE"
        }

        fetch(`http://localhost:3000/toys/${parentId}`, configObj)
          .then(function(response) {
            return response.json();
          })
      }
    });




});

function createToyCard(element) {
  const toyCollection = document.getElementById('toy-collection')
  toyCollection.innerHTML +=
  `
   <div class="card" data-id=${element.id} data-likes=${element.likes}>
        <h2>${element.name}</h2>
        <img src="${element.image}" class="toy-avatar" />
        <p> ${element.likes} Likes</p>
        <button class="like-btn">Like <3</button>
        <button class="delete-btn">Delete</button>
   </div>
  `
};



const likeButton = document.querySelector('.like-btn')
