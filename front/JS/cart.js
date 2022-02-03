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
 document.getElementById('cartAndFormContainer').children[0].innerHTML = 'Votre panier est vide'
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
            const oldQtt = panier.find((f) => f.idProduct == parent.dataset.id && f.colorProduct == parent.dataset.color);
            console.log(oldQtt);
            const newQuantity = changeQuantity[j].valueAsNumber;
            console.log(newQuantity);
            oldQtt.quantityProduct = newQuantity;   
            localStorage.setItem("panier", JSON.stringify(panier)); 
            location.reload()    
          });
        }
        // --------------------------BOUTON SUPPRIMER---------------------------------------------
        const deleteItem = document.getElementsByClassName("deleteItem");
        let panier = JSON.parse(localStorage.getItem("panier"));
        for (let btn = 0; btn < deleteItem.length; btn++) {
          deleteItem[btn].addEventListener("click", (event) => {
            event.preventDefault();
            const parent = event.target.closest("[data-id]");
            
            panier = panier.filter((p) => p.idProduct !== parent.dataset.id || p.colorProduct !== parent.dataset.color);
            // panier = panier.filter((p) => console.log(p.colorProduct , parent.dataset.color))
            localStorage.setItem("panier", JSON.stringify(panier));
            // location.reload();
          });
        }

        // -------------------------------------FORMULAIRE----------------------------------------
        const form = document.getElementsByClassName('cart__order__form')
        console.log(form);

        // Ecoute value prénom
        document.getElementById('firstName').addEventListener('change', (event) => {
          event.preventDefault()
          console.log('prenom');
        })
       

        // Ecoute value nom
        document.getElementById('lastName').addEventListener('change', (event) => {
          event.preventDefault()
          console.log('nom');
        })
        // Ecoute value adresse
        document.getElementById('address').addEventListener('change', (event) => {
          event.preventDefault()
          console.log('adresse');
        })
        // Ecoute value ville
        document.getElementById('city').addEventListener('change', (event) => {
          event.preventDefault()
          console.log('ville');
        })
        // Ecoute value email  
        document.getElementById('email').addEventListener('change', (event) => {
          event.preventDefault()
          console.log('email');
        })
      });
  });
}
