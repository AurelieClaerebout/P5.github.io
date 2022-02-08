// Déclaration de variables pour le calcul des articles et du prix panier
const totalProduct = [];
const totalPrice = [];
// Variable pour calculer le total des valeurs dans totalProduct et totalPrice
const reducer = (previousValue, currentValue) => previousValue + currentValue;
// Récupération du panier dans le localStorge
let panier =
  localStorage.getItem("panier") != null
    ? JSON.parse(localStorage.getItem("panier"))
    : null;
// Si le panier est vide
if (panier == null || panier == 0) {
  document.getElementById("cartAndFormContainer").children[0].innerHTML =
    "Votre panier est vide";
  // Si le panier n'est PAS vide
} else {
  panier.forEach((elt) => {
    // Récupération des informations dans l'API a partir de l'IdProduct
    fetch(`http://localhost:3000/api/products/${elt.idProduct}`)
      .then((kanap) => kanap.json())
      .then((kanap) => {
        const cartItems = `
  <article class="cart__item" data-id="${elt.idProduct}" data-color="${elt.colorProduct}">
    <div class="cart__item__img">
    <img src="${kanap.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${kanap.name}</h2>
        <p>${elt.colorProduct}</p>
        <p>${kanap.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${elt.quantityProduct}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
        document
          .getElementById("cart__items")
          .insertAdjacentHTML("afterbegin", cartItems);
        // --------------------CALCULER LA QUANTITE D'ARTICLE-------------------------------------
        totalProduct.push(parseInt(`${elt.quantityProduct}`));
        const totalArticle = totalProduct.reduce(reducer, 0);
        document.getElementById("totalQuantity").innerHTML = totalArticle;
        // -----------------------CALCULER TOTAL PANIER-------------------------------------------
        totalPrice.push(
          parseInt(`${elt.quantityProduct}`) * parseInt(`${kanap.price}`)
        );
        const totalPanier = totalPrice.reduce(reducer, 0);
        document.getElementById("totalPrice").innerHTML = totalPanier;
        // -----------------------MODIFICATION DE QUANTITE----------------------------------------
        const changeQuantity = document.getElementsByClassName("itemQuantity");
        for (let j = 0; j < changeQuantity.length; j++) {
          changeQuantity[j].addEventListener("change", (event) => {
            event.preventDefault();
            const parent = event.target.closest("[data-id]");
            const oldQtt = panier.find(
              (f) =>
                f.idProduct == parent.dataset.id &&
                f.colorProduct == parent.dataset.color
            );
            console.log(oldQtt);
            const newQuantity = changeQuantity[j].valueAsNumber;
            console.log(newQuantity);
            oldQtt.quantityProduct = newQuantity;
            localStorage.setItem("panier", JSON.stringify(panier));
            location.reload();
          });
        }
        // --------------------------BOUTON SUPPRIMER---------------------------------------------
        const deleteItem = document.getElementsByClassName("deleteItem");
        for (let btn = 0; btn < deleteItem.length; btn++) {
          deleteItem[btn].addEventListener("click", (event) => {
            event.preventDefault();
            const parent = event.target.closest("[data-id]");

            panier = panier.filter(
              (p) =>
                p.idProduct !== parent.dataset.id ||
                p.colorProduct !== parent.dataset.color
            );
            
            localStorage.setItem("panier", JSON.stringify(panier));
            location.reload();
          });
        }
      }); 
  });
}

// -------------------------------------FORMULAIRE----------------------------------------

const form = document.querySelector(".cart__order__form");

// Mise en place des regex
const preNomRegexp = new RegExp("[a-zA-ZàâéèêîÏùû' -]{2,25}$");
const addressRegexp = new RegExp("^[a-zA-Z0-9,àâéèêîïùû' -]{3,}$");
const cityRegexp = new RegExp("^[a-zA-Z0-9àâéèêîÏùû' -]{3,50}$");
const emailRegexp = new RegExp(
  "^[a-zA-Z0-9._-]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$"
);

// ECOUTE FIRSTNAME
form.firstName.addEventListener("change", function () {
  const message = form.firstName.nextElementSibling;
  if (preNomRegexp.test(form.firstName.value)) {
    message.innerHTML = "Prénom valide";
  } else {
    message.innerHTML = "Prénom non valide";
  }
});
// ECOUTE LASTNAME
form.lastName.addEventListener("change", function () {
  const message = form.lastName.nextElementSibling;
  if (preNomRegexp.test(form.lastName.value)) {
    message.innerHTML = "Nom valide";
  } else {
    message.innerHTML = "Nom non valide";
  }
});
// ECOUTE ADDRESS
form.address.addEventListener("change", function () {
  const message = form.address.nextElementSibling;
  if (addressRegexp.test(form.address.value)) {
    message.innerHTML = "Adresse valide";
  } else {
    message.innerHTML = "Adresse non valide";
  }
});
// ECOUTE VILLE
form.city.addEventListener("change", function () {
  const message = form.city.nextElementSibling;
  if (cityRegexp.test(form.city.value)) {
    message.innerHTML = "Ville valide";
  } else {
    message.innerHTML = "Ville non valide";
  }
});
// ECOUTE EMAIL
form.email.addEventListener("change", function () {
  const message = form.email.nextElementSibling;
  if (emailRegexp.test(form.email.value)) {
    message.innerHTML = "Email valide";
  } else {
    message.innerHTML = "Email non valide";
  }
});

// ---------------------------ECOUTE DU BOUTON COMMANDER--------------------------------
document.getElementById("order").addEventListener("click", (event) => {
  event.preventDefault();
  //----------------------------VERIFICATION DU FORMULAIRE--------------------------------
  console.log(preNomRegexp);
  const formValid =
    preNomRegexp.test(form.firstName.value) &&
    preNomRegexp.test(form.lastName.value) &&
    addressRegexp.test(form.address.value) &&
    cityRegexp.test(form.city.value) &&
    emailRegexp.test(form.email.value);

  if (panier == 0 || panier == null) {
    console.log(formValid);
    alert("Votre panier est vide");
  } else if (formValid == false) {
    alert("Veuillez remplir le formulaire");
  } else {
    // VALUE DU FORMULAIRE A RECUPERER
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    // RECUPERATION DES ID DANS LE PANIER (ET LES QUANTITE / COULEUR ON EN FAIT QUOI ???)
    const idProduct = [];
    for (let art = 0; art < panier.length; art++) {
      idProduct.push(panier[art].idProduct);
    }

    // A ENVOYER A L'API
    const cmd = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: idProduct,
    };
    console.log(cmd);

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "Application/JSON",
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(cmd),
    })
      .then((response) => response.json())
      .then((order) => {
        console.log(order);
        console.log(order.orderId);
        localStorage.setItem("orderId", order.orderId);
        window.location.href = "confirmation.html ";
      });
      // .catch((error) => {
      //   console.log("Erreur: " + error.message);
      // });
  }
});
