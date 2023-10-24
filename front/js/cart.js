/**
 * Récupération des données de l'item "panier" dans le localStorage
 * @param {Array} panier
 */
let panier = JSON.parse(window.localStorage.getItem("panier"));
let hidden = document.querySelector(".hidden");
let cart = document.querySelector("#cart__items");

// Mise en place de la suppression du formulaire si le panier est vide
if (panier === null || panier.length === 0) {
  hidden.style.display = "none";
  cart.innerHTML = "<h1><u>Votre panier est vide !</u></h1>";
} else {
  hidden.style.display = "block";
}

// Déclaration de variable pour le total quantity et total price
let totalP = 0;
let totalQ = 0;

const cartItem = document.querySelector("#cart__items");

// Boucle for pour récupérer l'id et afficher les produits dans le panier
for (let article of panier) {
  fetch("http://localhost:3000/api/products/" + article.id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      // Calcul pour l'affichage des prix additionnés et des quantités
      totalP = data.price * article.quantity + totalP;
      totalQ = parseInt(article.quantity) + parseInt(totalQ);

      // Affichage des produits
      cartItem.innerHTML += `
              <article class="cart__item" id="cartItem" data-id="${article.id}" data-color="${article.couleur}" data-quantity="${article.quantity}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${article.couleur}</p>
                    <p>${data.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="cart__item__content__settings__quantity" min="1" max="100" value="${article.quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                    </div>
                  </div>
                </div>
                </article>
              `;
      let cartPrice = document.querySelector(".cart__price");

      // Affichage des quantités totales et du prix
      cartPrice.innerHTML = `<p>Total (<span id="totalQuantity">${totalQ}</span> articles) : <span id="totalPrice">${totalP}</span> €</p>`;

      const cartItems = document.querySelectorAll("#cart__items");
      /**
       * Cette fonction prend en charge le changement des quantités
       * @param {function} editQuantity
       */
      function editQuantity() {
        cartItems.forEach((cart) =>
          cart.addEventListener("change", function (e) {
            // Utilisation de elementClosest pour récupérer les data du produit
            const idTarget = e.target
              .closest("article")
              .getAttribute("data-id");
            const colorTarget = e.target
              .closest("article")
              .getAttribute("data-color");
            const found = panier.find(
              (element) =>
                element.id === idTarget && element.couleur === colorTarget
            );

            if (found) {
              article.quantity = e.target.value;
              found.quantity = article.quantity;
              window.localStorage.setItem("panier", JSON.stringify(panier));
              window.location.reload();
            }
          })
        );
      }

      /**
       * Cette fonction prend en charge les produits supprimés
       * @param {function} deleteProduct
       */
      function deleteProduct() {
        const deleteItem = document.querySelectorAll(".deleteItem");
        deleteItem.forEach((article) => {
          article.addEventListener("click", function (e) {
            // Utilisation de elementClosest pour récupérer les data du produit
            const idTarget = e.target
              .closest("article")
              .getAttribute("data-id");
            const colorTarget = e.target
              .closest("article")
              .getAttribute("data-color");

            const delArticle = panier.find(
              (panier) =>
                panier.id === idTarget && panier.couleur === colorTarget
            );

            panier = panier.filter((item) => item != delArticle);

            localStorage.setItem("panier", JSON.stringify(panier));
            window.location.reload();
          });
        });
      }

      //Déclaration des fonctions
      editQuantity();
      deleteProduct();

      let cartOrder = document.querySelector(".cart__order");
      let firstNameErr = document.querySelector("#firstNameErrorMsg");
      let lastNameErr = document.querySelector("#lastNameErrorMsg");
      let addressErr = document.querySelector("#addressErrorMsg");
      let cityErr = document.querySelector("#cityErrorMsg");
      let emailErr = document.querySelector("#emailErrorMsg");

      /**
       * Cette fonction prend en charge le regEx du prénom, nom et ville
       * @param {function} regEx1
       */

      function regEx1(value) {
        return !/^([A-Za-z|\s]{3,15})?([]{0,1})?([A-Za-z|\s]{3,15})$/.test(
          value
        );
      }

      /**
       * Cette fonction prend en charge le regEx de l'adresse
       * @param {function} regEx2
       */

      function regEx2(value) {
        return !/^[a-zA-Z0-9\s,.'-]{10,50}$/.test(value);
      }

      /**
       * Cette fonction prend en charge le regEx de l'email
       * @param {function} regEx3
       */

      function regEx3(value) {
        return !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      }

      // Add event listener pour détexter les champs du formulaire
      cartOrder.addEventListener("change", function () {
        /**
         * Cette variable crée l'objet contact
         * @param {object} contact
         */
        let contact = {
          firstName: document.querySelector("#firstName").value,
          lastName: document.querySelector("#lastName").value,
          address: document.querySelector("#address").value,
          city: document.querySelector("#city").value,
          email: document.querySelector("#email").value,
        };

        // Gestion des regEx via des conditions
        if (regEx1(contact.firstName)) {
          firstNameErr.innerHTML = `<p style="color: red;">Entrez un prénom valide !</p>`;
          contact.firstName = "";
        } else {
          firstNameErr.innerHTML = `<p style="color: red;"></p>`;
        }

        if (regEx1(contact.lastName)) {
          lastNameErr.innerHTML = `<p style="color: red;">Entrez un nom valide !</p>`;
          contact.lastName = "";
        } else {
          lastNameErr.innerHTML = `<p style="color: red;"></p>`;
        }

        if (regEx2(contact.address)) {
          addressErr.innerHTML = `<p style="color: red;">Entrez un adresse valide !</p>`;
          contact.address = "";
        } else {
          addressErr.innerHTML = `<p style="color: red;"></p>`;
        }

        if (regEx1(contact.city)) {
          cityErr.innerHTML = `<p style="color: red;">Entrez le nom d'une ville valide !</p>`;
          contact.city = "";
        } else {
          cityErr.innerHTML = `<p style="color: red;"></p>`;
        }

        if (regEx3(contact.email)) {
          emailErr.innerHTML = `<p style="color: red;">Entrez une adresse email valide !</p>`;
          contact.email = "";
        } else {
          emailErr.innerHTML = `<p style="color: red;"></p>`;
        }

        // Création de l'objet contact dans le localStorage uniquement si les champs sont correctement remplis
        if (
          contact.firstName != "" &&
          contact.lastName != "" &&
          contact.city != "" &&
          contact.email != "" &&
          contact.address != ""
        ) {
          localStorage.setItem("contact", JSON.stringify(contact));
        }
      });

      let contactLocal = JSON.parse(localStorage.getItem("contact"));
      let panierId = [];

      // Récupération de tous les ID des produits
      for (let i = 0; i < panier.length; i++) {
        panierId.push(panier[i].id);
      }

      /**
       * Cette variable crée l'objet de la commande finale a envoyer
       * @param {object} commandeFinale
       */
      let commandeFinale = {
        contact: {
          firstName: contactLocal.firstName,
          lastName: contactLocal.lastName,
          address: contactLocal.address,
          city: contactLocal.city,
          email: contactLocal.email,
        },
        products: panierId,
      };

      // Fetch de type POST pour envoyer l'objet commande finale et récupérer l'orderId
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commandeFinale),
      })
        .then((res) => res.json())
        .then((data) => {
          // On envoie l'utilisateur vers la page confirmation
          window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
        })

        .catch(function (err) {
          console.log(err);
        });
    });
}
