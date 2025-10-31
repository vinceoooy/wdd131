function togglePaymentDetails() {
  const form = document.querySelector("#checkoutForm");
  const creditCardContainer = document.getElementById("creditCardNumberContainer");
  const paypalContainer = document.getElementById("paypalUsernameContainer");

  // Hide both containers first
  creditCardContainer.classList.add("hide");
  paypalContainer.classList.add("hide");

  // Disable required attributes when hidden
  form.creditCardNumber.required = false;
  form.paypalUsername.required = false;

  // Show and require appropriate input based on payment method
  if (form.paymentMethod.value === "creditCard") {
    creditCardContainer.classList.remove("hide");
    form.creditCardNumber.required = true;
  } else if (form.paymentMethod.value === "paypal") {
    paypalContainer.classList.remove("hide");
    form.paypalUsername.required = true;
  }
}

// Validation function
function validateForm(event) {
  const theForm = event.target;
  const errors = [];
  let isValid = true;

  // Name validation
  if (theForm.fullName.value.trim() !== "Bob") {
    isValid = false;
    errors.push("Only users named 'Bob' can submit this form.");
  }

  // Credit card validation (only when credit card is selected)
  if (theForm.paymentMethod.value === "creditCard") {
    if (theForm.creditCardNumber.value.trim() !== "1234123412341234") {
      isValid = false;
      errors.push("Invalid Credit Card Number. Only 1234123412341234 is accepted for testing.");
    }
  }

  // If invalid, stop submission and show errors
  if (!isValid) {
    event.preventDefault();
    showErrors(errors);
    return false;
  }
}

// Error display function
function showErrors(errors) {
  const errorContainer = document.querySelector(".errors");
  errorContainer.innerHTML = ""; // clear existing
  errors.forEach((err) => {
    const p = document.createElement("p");
    p.textContent = err;
    p.style.color = "red";
    errorContainer.appendChild(p);
  });
}

// Event listeners
document.querySelector("#paymentMethod").addEventListener("change", togglePaymentDetails);
document.querySelector("#checkoutForm").addEventListener("submit", validateForm);
