const ToysUrl = 'http://localhost:3000/toys'
const toyCollection = document.querySelector('#toy-collection')
document.addEventListener('submit', createToy)
fetchToys();

function fetchToys(){
fetch(ToysUrl)
  .then(data => data.json())
  .then(toys => renderToys(toys))
}
function renderToys(toys) {
  for (const toy of toys) {
    renderToy(toy)
  }
  //toys.forEach(toy => renderToys(toy)) alternative to line 10
}

function renderToy(toy) {
  toyDiv = document.createElement("div")
  //toyDiv.setAttribute('class', 'card') alternative 
  toyDiv.classList = 'card'
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
                      <img src='${toy.image}' width='200' height='auto' class="toy-avatar" />
                      <p class='likes'>Likes: ${toy.likes || 0} <p>
                       <button class="like-btn">Like <3</button>`

  toyCollection.append(toyDiv)

  let likeButton = toyDiv.querySelector('.like-btn')
  likeButton.addEventListener('click', (e) => {
    //e.preventDefault();
    toy.likes = parseInt(toy.likes) + 1;

    likes = document.querySelector('.likes')//Experimental, Only first toy likes increase without reload
    likes.innerHTML = `Likes: ${toy.likes}`//Experiemental code

    fetch(`${ToysUrl}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toy)
    });
    fetchToys();
  });

}

function createToy(e) {
  //e.preventDefault();

  let formData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  };

  let configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(ToysUrl, configObj)
    .then(response => response.json())
    .then(console.log)
    .catch(function (error) {
      alert("Something went wrong! Check console");
      console.log(error.message);
    });
}

