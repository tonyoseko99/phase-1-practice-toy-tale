let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.querySelector("form").addEventListener("submit", (e) => addToyToDB(e))



fetch("http://localhost:3000/toys").then(response => response.json()).then(json => createToy(json))

function createToy(toys) {
  for (const toy of toys) {
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const p = document.createElement("p")
    const btn = document.createElement("button")

    div.classList.add("card")
    h2.innerText = toy.name
    img.src = toy.image
    img.classList.add("toy-avatar")
    p.innerText = toy.likes + " Likes"
    btn.classList.add("like-btn")
    btn.id = toy.id
    btn.innerText = "Like <3"
    btn.addEventListener("click", e => addLikes(e))
    div.append(h2, img, p, btn)
    document.getElementById("toy-collection").append(div)
  }
}

function addToyToDB(event) {
  event.preventDefault()
  const toyName = event.target[0].value
  const toyUrl = event.target[1].value
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toyName,
      "image": toyUrl,
      "likes": 0
    })
  };
  fetch("http://localhost:3000/toys", configurationObject).then(response => response.json()).then(json => createToy([json]))
}

function addLikes(event) {
  // console.log(event)
  const id = event.target.id
  const likes = parseInt(event.target.previousSibling.innerText.split(" ")[0])

  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes + 1
    })
  };
  fetch(`http://localhost:3000/toys/${id}`, configurationObject).then(response => response.json()).then(json => event.target.previousSibling.innerText = json.likes + " Likes")
}