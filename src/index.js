import "./style.css";
import DisplayManager from "./display.js";
import ValidationManager from "./formValidation.js";

DisplayManager.renderPage();
ValidationManager.validateEmail();
ValidationManager.validatePassword();
ValidationManager.validateConfirmPassword();

// ValidationManager.validateCountry();
ValidationManager.validatePostcode();

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const country = document.getElementById("country");
  const postcode = document.getElementById("postcode");

  if (
    email.classList.contains("valid") &&
    password.classList.contains("valid") &&
    confirmPassword.classList.contains("valid") &&
    postcode.classList.contains("valid")
  ) {
    alert("Form submitted successfully! High Five!");
  } else {
    alert("Form submission failed. Please fix the errors.");
  }
});

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  const formElements = document.querySelectorAll("input, select");
  formElements.forEach((element) => {
    element.classList.remove("valid");
    element.classList.remove("invalid");
    element.value = "";
  });
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
  });
});
