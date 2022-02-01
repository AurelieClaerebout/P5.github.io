        const addPanier = () => {
                panier.push(infoProduct);
                localStorage.setItem("panier", JSON.stringify(panier));
            };




         let infoProduct = {
        idProduct: id,
        colorProduct: colorValue,
        quantityProduct: quantityValue,
        // priceProduct: parseFloat(`${kanap.price}`),
      };



      let checkPanier = panier.find((elt) => elt.id === infoProduct.id && elt.colorValue === infoProduct.colorValue);

      