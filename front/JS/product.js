// ------------------------------------------Récupération id produit--------------------------------------
console.log(window.location.search);
const id = window.location.search.split("=")[1];

fetch(`http://localhost:3000/api/products/${id}`)
  .then((kanap) => kanap.json())
  .then((kanap) => {
    // ----------------------------------------Ajouter le titre de la page---------------------------------
    document.querySelector("title").innerHTML = `${kanap.name}`;

    // -------------------------------------------------Ajouter L'image------------------------------------
    document
      .getElementsByClassName("item__img")[0]
      .insertAdjacentHTML(
        "afterbegin",
        `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`
      );

    // ---------------------------------------- Ajouter le nom de l'article--------------------------------
    document
      .getElementById("title")
      .insertAdjacentHTML("afterbegin", `${kanap.name}`);

    // --------------------------------------Ajouter le titre de l'article---------------------------------
    document
      .getElementById("price")
      .insertAdjacentHTML("afterbegin", `${kanap.price}`);

    // -----------------------------------------Ajouter la description de l'article------------------------
    document
      .getElementById("description")
      .insertAdjacentHTML("afterbegin", `${kanap.description}`);

    // -----------------------------------------Ajouter les couleurs de l'article--------------------------

    kanap.colors.forEach((color) => {
      document
        .getElementById("colors")
        .insertAdjacentHTML(
          "afterbegin",
          `<option value="${color}">${color}</option>`
        );
    });

    // --------------------------------Ecoute du bouton ajouter au panier-----------------------------------
    document.getElementById("addToCart").addEventListener("click", (event) => {
      event.preventDefault();

      // --------------------------Fonction des éléments a envoyer dans le localStorage
      const quantityValue = parseInt(document.getElementById("quantity").value);
      const colorValue = document.getElementById("colors").value;
      const infoProduct = {
        idProduct: id,
        colorProduct: colorValue,
        quantityProduct: quantityValue,
      };

      if (colorValue === "" || quantityValue === 0) {
        alert("Veuillez renseigner les champs");
      } else {
        const panier =
          localStorage.getItem("panier") != null
            ? JSON.parse(localStorage.getItem("panier"))
            : null;
        if (panier == null) {
          const panier = [];
          panier.push(infoProduct);
          localStorage.setItem("panier", JSON.stringify(panier));
        } else if (panier) {
          const checkPanier = panier.find(
            (elt) =>
              elt.idProduct === infoProduct.idProduct &&
              elt.colorProduct === infoProduct.colorProduct
          );
          if (checkPanier) {
            checkPanier.quantityProduct += infoProduct.quantityProduct;
            localStorage.setItem("panier", JSON.stringify(panier));
          } else {
            panier.push(infoProduct);
            localStorage.setItem("panier", JSON.stringify(panier));
          }
        }
      }
    });
  });
