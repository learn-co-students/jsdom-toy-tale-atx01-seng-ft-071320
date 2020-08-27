let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById('toy-collection');



document.addEventListener("DOMContentLoaded", () => {
loadToys();
});



function loadToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => {
      toys = json;
      toys.forEach(toy => addToToyCollect(toy));
  });
}



function addToToyCollect(toy) {
  let h2 = document.createElement('h2');
  h2.innerText = toy.name;

  let img = document.createElement('img');
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar');

  let p = document.createElement('p');
  p.innerText = `${toy.likes} likes!`;


  let likeBtn = document.createElement('button');
  likeBtn.setAttribute('class', 'like-btn');
  likeBtn.setAttribute('id', toy.id);
  likeBtn.innerText = 'Like';
  likeBtn.addEventListener('click', (e) => {
    likes(e);
  });

  let deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'delete-btn');
  deleteBtn.setAttribute('id', toy.id);
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', (e) => {
    deleteToy(e);
  });

  let divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');
  divCard.append(h2, img, p, likeBtn, deleteBtn);
  toyCollection.append(divCard);
}



function likes(e) {
  e.preventDefault();
  let oneMoreLike = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json",
      Accept: "application-json"
    },
    body: JSON.stringify({
      "likes": oneMoreLike
    })
  })
    .then(res => res.json())
    .then(toy => {
  e.target.previousElementSibling.innerText = `${oneMoreLike} likes!`;
  })
}



function deleteToy(e) {
  e.preventDefault();
  let targetId = Number(e.target.id);
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(toy => {
  toyCollection.removeChild(toyCollection.getElementsByClassName('card')[targetId - 1]);
  })
}
  


addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
    toyFormContainer.addEventListener('submit', (e) => {
      e.preventDefault();
      postToy(e.target);
    })
  } else {
    toyFormContainer.style.display = "none";
  }
});



function postToy(toy_data) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      Accept: "application-json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
    .then(res => res.json())
    .then(toy => {
  addToToyCollect(toy);
  })
}