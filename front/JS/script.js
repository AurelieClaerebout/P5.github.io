fetch("http://localhost:3000/api/products")
.then((kanap) => kanap.json())
.then((kanap) => {
  console.log(kanap);
kanap.forEach(element => {
    const index =
    `
    <a href="./product.html?id=${element._id}">
    <article>
      <img src="${element.imageUrl}" alt="${element.altTxt}">
      <h3 class="productName">${element.name}</h3>
      <p class="productDescription">${element.description}</p>
    </article>
    </a>
    `
    const items = document.getElementById('items');
    items.insertAdjacentHTML("afterbegin",index);
  });
});

