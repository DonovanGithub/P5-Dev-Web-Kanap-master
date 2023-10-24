// Récupération de l'ID du produit selectionné via URLSearchParams
const params = new URLSearchParams(document.location.search);
let id = params.get("_id");
// Récupération des données de l'API du produit selectionné avec l'ID correspondant
fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  // Appel de la fonction d’affichage
  .then((data) => {
    let image = document.querySelector("#imageUrl");
    let prix = document.querySelector("#price");
    let titre = document.querySelector("#title");
    let description = document.querySelector("#description");
    let couleur = document.querySelector("#colors");

    image.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    prix.innerHTML += `<span id="price">${data.price}</span>€</p>`;
    titre.innerHTML += `<h1 id="title">${data.name}</h1>`;
    description.innerHTML += `<p id="description">${data.description}</p>`;
    for (let color of data.colors) {
      couleur.innerHTML += `<option value="${color}">${color}</option>`;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
let cart = document.querySelector("#addToCart");

// Ajout d'un eventListener pour détecter les changements dans les valeurs via le clique
cart.addEventListener("click", function () {
  /**
   * Cette variable permet de récupérer les valeurs de la quantité et de la couleur choisie
   * @param {object} dataValue
   */

  let dataValue = {
    itemQuantity: document.querySelector("#quantity").value,
    colorSelect: document.querySelector("#colors").value,
  };

  let msgErrorr = document.querySelector("#nombre");
  let msgError = document.querySelector("#couleurr");

  // Gestion des quantités et des selections via des conditions
  if (dataValue.itemQuantity > 100 || dataValue.itemQuantity < 1) {
    dataValue.itemQuantity = null;
    msgErrorr.innerHTML = `<h4 style="color: red;">Le chiffre doit se trouver entre 1 et 100 !</h4>`;
  } else {
    msgErrorr.innerHTML = `<h4></h4>`;
  }

  if (dataValue.colorSelect === "") {
    dataValue.colorSelect = null;
    msgError.innerHTML = `<h4 style="color: red;">Choisissez une couleur !</h4>`;
  } else {
    msgError.innerHTML = `<h4></h4>`;
  }

  /**
   * Variable permettant de crée l'objet complet
   * @param {object} product
   */
  let product = {
    couleur: dataValue.colorSelect,
    quantity: dataValue.itemQuantity,
    id: id,
  };

  let panier;
  let panierStorage = window.localStorage.getItem("panier");

  //Gestion du panier et récupération des données
  if (panierStorage === null) {
    panier = [];
  } else {
    panier = JSON.parse(panierStorage);
  }
  // Recherche avec la méthode find() si l'id et la couleur d'un article est déjà présent dans le local storage
  const found = panier.find(
    (element) =>
      element.id === product.id && element.couleur === product.couleur
  );

  // Si un produit se trouve avec les mêmes valeurs que celui déjà présent, on ajoute ces valeurs
  if (
    found != undefined ||
    product.couleur === null ||
    product.quantity === null
  ) {
    let addition = parseInt(found.quantity) + parseInt(product.quantity);
    found.quantity = JSON.stringify(addition);
  } else {
    panier.push(product);
  }
  // Création d'un objet panier dans le localstorage
  window.localStorage.setItem("panier", JSON.stringify(panier));
});
