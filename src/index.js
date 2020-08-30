let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let toyCollectionDiv = document.querySelector('#toy-collection')


let toyForm = document.querySelector('.add-toy-form')


//initial fetch
fetch('http://localhost:3000/toys')
  .then(function (response) {
    return response.json()
  }).then(function (toys) {
    console.log(toys)
    toys.forEach(toy => {
      renderToys(toy)
    })
  })

// function getToys() {
//   return fetch('http://localhost:3000/toys')
//     .then(res => res.json())
// }
// function getToys(){
//   return fetch('http://localhost:3000/toys')
//   .then(function (response) {
//     return response.json()
//   })
// }

// getToys().then(toys => {
//   console.log(toys)
//   toys.forEach(toy => {
//     renderToys(toy)
//   })
// })

//post fetch
function postToy(toyInfo) {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyInfo.name.value,
      image: toyInfo.image.value,
      likes: 0
    })
  })
    .then(function (response) {
      console.log(response.json)
      return response.json()

    })
    .then(function (objecttoy) {
      let newToy = renderToys(objecttoy)
      toyCollectionDiv.append(newToy)
    })
}
// render toys to HTML
function renderToys(toy) {
  //toyCollectionDiv.innerHTML = ''
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let div = document.createElement('div')
  div.setAttribute('class', "card")
  ////////////////////
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  img.setAttribute('style','width:200px;height:200px;')


  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  
  //////////////////////////Our code below
  // div.innerHTML =
  //   `<h2>${toy.name}</h2>x
  //   <br>
  //   <p><img src="${toy.image}" style= "width:200px;height:200px;"></p>
  //   <br>
  //   <p>Likes: ${toy.likes || 0}</p>
  //   <br>
  //   <button class='like-btn' style= "width:50px;height:30px;font-size: 14px;">Like</button>
  //   <button class='delete-btn' style= "width:50px;height:30px;font-size: 14px;">Delete</button>
  //   `
  div.append(h2, img, p, btn)
  toyCollectionDiv.append(div)
}

//Event Listeners
let likeBtn = document.querySelector('.like-btn')
let deleteBtn = document.querySelector('.delete-btn')
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
  renderToys(toys)
})


deleteBtn.addEventListener('click', (e) => {
  toys.splice(toyIndex, 1);
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'DELETE'
    //});
  }),
    renderToys(toys)
})


addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
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