// const order = JSON.stringify(localStorage.getItem("orderId"))    
// document.getElementById("orderId").innerHTML = order
document.getElementById("orderId").innerHTML = JSON.stringify(localStorage.getItem("orderId"));
localStorage.clear();
