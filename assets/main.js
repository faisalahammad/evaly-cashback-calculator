let submit = document.querySelector("button#submit");
let reset = document.querySelector("button#reset");

// Hide by default
document.querySelector(".message1").style.display = "none";
document.querySelector(".message2").style.display = "none";
showHide("none");
reset.style.display = "none";

// Create function to make it easier
function quicker(handler, update) {
  return (document.querySelector(handler).innerText = update);
}

function showHide(kihobe) {
  document.querySelector("#fullPayment").style.display = kihobe;
  document.querySelector("#partialPayment").style.display = kihobe;
}

// Get Form data
submit.addEventListener("click", function (e) {
  let productPrice = parseFloat(document.querySelector("#proPrice").value);
  let discountRate = parseFloat(document.querySelector("#discountRate").value);

  // Calculate Discount
  let discountPayment = Math.round(productPrice / (discountRate / 100 + 1)); // Payment amount
  let discountGet = productPrice - discountPayment; // Total discount amount
  let cashbackAmount = (productPrice * (discountRate / 100)).toFixed(0);
  let cashbackFullPay = productPrice - cashbackAmount;

  if (discountRate > 100) {
    document.querySelector("#bigDisc").style.display = "none";
    // document.querySelector(".megaDays").style.display = "inline-block";
  } else {
    document.querySelector("#bigDisc").style.display = "inline-block";
    // document.querySelector(".megaDays").style.display = "none";
  }

  if (discountRate == 0 || discountRate > 150) {
    document.querySelector(".message1").style.display = "block";
    showHide("none"); // Hide
    setTimeout(function () {
      document.querySelector(".message1").style.display = "none";
    }, 3000);
  } else if (discountRate.length == 0 || discountRate < 0) {
    document.querySelector(".message2").style.display = "block";
    showHide("none"); // Hide
    setTimeout(function () {
      document.querySelector(".message2").style.display = "none";
    }, 3000);
  } else {
    // Full Payment
    quicker("#fullPayment .amount", productPrice);
    quicker("#fullPayment .cashback", cashbackAmount);
    quicker("#fullPayment .discount", discountRate);
    quicker("#fullPayment .price", cashbackFullPay);

    // Partial Payment
    quicker("#partialPayment .amount", discountPayment);
    quicker("#partialPayment .discount", discountRate);
    quicker("#partialPayment .price", discountGet);

    showHide("block"); // show
    reset.style.display = "block";
  }

  e.preventDefault();
});

// Reset / Reload page
reset.addEventListener("click", function () {
  location.reload();
  document.querySelector("#proPrice").value = "";
  document.querySelector("#discountRate").value = "";
});