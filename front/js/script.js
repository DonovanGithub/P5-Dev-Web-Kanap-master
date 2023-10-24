// Récupération des données de l'API
fetch("http://localhost:3000/api/products")
  // Appel de la fonction d’affichage des produits
  .then((res) => res.json())
  .then((objetProduits) => {
    allKanaps(objetProduits);
  })
  .catch(function (error) {
    console.log(error);
    let msgError = document.querySelector(".titles");
    msgError.innerHTML += `<h2>une erreur a été detecté</h2>`;
  });

/**
 * Cette fonction permet d'afficher tous les canapés
 * @param {Array} products
 */
function allKanaps(products) {
  let zoneArticle = document.querySelector("#items");

  // Boucle for pour l'affichage de chaque produit indépendemment
  for (let article of products) {
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
