let addToy = false;
let toyList

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

//rende toys function
function addToyDiv(toys) {
  let toyCollectionDiv = document.querySelector('#toy-collection')
  toyCollectionDiv.innerHTML = ''
  toys.forEach((toy, toyIndex) => {
    console.log(toys)
    console.log(toy)
    div = document.createElement('div')
    div.setAttribute('class', "card")
    div.innerHTML =
      `<h2>${toy.name}</h2>
    <br>
    <p><img src="${toy.image}" style= "width:200px;height:200px;"></p>
    <br>
    <p>Likes: ${toy.likes || 0}</p>
    <br>
    <button class='like-btn' style= "width:50px;height:30px;font-size: 14px;">Like</button>
    <button class='delete-btn' style= "width:50px;height:30px;font-size: 14px;">Delete</button>
    `

    toyCollectionDiv.appendChild(div)

    let likeBtn = div.querySelector('.like-btn')
    likeBtn.addEventListener('click', (e) => {
      e.preventDefault()
      toy.likes = parseInt(toy.likes) + 1
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toy)
      })
      addToyDiv(toys)
    })

    let deleteBtn = div.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', (e) => {
      toys.splice(toyIndex, 1);
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'DELETE'
        //});
      }),
        addToyDiv(toys);
    });

  })
}

fetch('http://localhost:3000/toys')
  .then(function (response) {
    return response.json()
  }).then(function (toys) {
    console.log(toys)
    toyList = toys
    addToyDiv(toyList)
  })



addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});
let toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let toyName = e.target.children[1].value
  let toyImage = e.target.children[3].value
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
    .then(function (response) {
      console.log(response.json)
      return response.json()

    })
    .then(function (toy) {
      console.log(toy);
      //toysA = []
      toyList.push(toy)
      addToyDiv(toyList)
    })
})







// let toyObj= {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   }
//   body: JSON.stringify({
//     toyForm()
//   })
// }
// let toyForm = {
//   name: name,
//   image: image,
//   likes: likes
// }
// fetch('http://localhost:3000/toys', toyObj)