// Déclaration de variables pour le calcul des articles et du prix panier
const totalProduct = [];
const totalPrice = [];
// Variable pour calculer le total des valeurs dans totalProduct et totalPrice
const reducer = (previousValue, currentValue) => previousValue + currentValue;
// Récupération du panier dans le localStorge
const panier =
  localStorage.getItem("panier") != null? JSON.parse(localStorage.getItem("panier")): null;
// Si le panier est vide
if (panier == null) {
  console.log("Le panier est vide");
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
        totalPrice.push(parseInt(`${elt.quantityProduct}`) * parseInt(`${kanap.price}`)
        );
        const totalPanier = totalPrice.reduce(reducer, 0);
        document.getElementById("totalPrice").innerHTML = totalPanier;
        // -----------------------MODIFICATION DE QUANTITE----------------------------------------
        // addEventListener ('change')
        // --------------------------BOUTON SUPPRIMER---------------------------------------------
        const deleteItem = document.getElementsByClassName("deleteItem");
        console.log(deleteItem);
        for (let btn = 0; btn < deleteItem.length; btn++) {
          deleteItem[btn].addEventListener('click', (event) => {
            event.preventDefault();
            alert('TOTOOOOOOOOOOO')
          })
        } 
      });
    });
  }
  