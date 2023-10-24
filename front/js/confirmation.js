// Récupération de l'ID de la commande via URLSearchParams
const orderId = new URLSearchParams(document.location.search);
let id = orderId.get("commande");

const elementId = document.querySelector("#orderId");

// Implémentation de l'ID de la commande dans l'orderId avec le message de remerciement
elementId.innerHTML = `<span id="orderId"><strong>${id}</strong><br><br><u>Merci pour votre commande !</u></span>`;

// Commande terminée, on enlève tout dans le localStorage
localStorage.clear();
