const ValidationManager = (() => {
  const countryPostalCode = {
    USA: [
      "^[0-9]{5}(?:-[0-9]{4})?$",
      "American ZIP code format: 12345 or 12345-6789",
    ],
    Canada: [
      "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$",
      "Canadian postal code format: A1A 1A1 or A1A-1A1",
    ],
    UK: [
      "^([A-Z]{1,2}[0-9][0-9]?[A-Z]?[ ]?[0-9][A-Z]{2})$",
      "UK postal code format: A1 1AA, A11 1AA, A111 1AA, A1A 1AA",
    ],
  };

  const addEventListeners = (element, type) => {
    if (!element) {
      console.error(`Element with id "${element.id}" not found.`);
      return;
    }
    //delay the validation until the user has interacted.
    let hasInteracted = false;
    element.addEventListener("focus", (event) => {
      hasInteracted = true;
    });
    element.addEventListener("blur", (event) => {
      const value = element.value.trim();
      if (type === "email") {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setError(element, type, isValid ? "" : "Enter a valid email address..");
      }
      if (type === "password") {
        const isValid = value.length >= 8 && value.length <= 20;
        setError(
          element,
          type,
          isValid ? "" : "Password must be at least 8 characters long."
        );
      }
      if (type === "confirm-password") {
        const isValid = value.length >= 8 && value.length <= 20;
        if (!isValid) {
          setError(
            element,
            type,
            "Password must be at least 8 characters long."
          );
          return;
        }
        const firstPassword = document.getElementById("password").value.trim();
        const isMatch = value === firstPassword;
        setError(element, type, isMatch ? "" : "Passwords do not match.");
      }
      if (type === "country") {
        const isValid = value.length != "Select a country";
        setError(element, type, isValid ? "" : "Please select a country.");
      }
      if (type === "postcode") {
        const country = document.getElementById("country").value.trim();
        const postalCodeRegex = countryPostalCode[country]?.[0];
        const postalCodeMessage = countryPostalCode[country]?.[1];
        if (!postalCodeRegex) {
          setError(element, type, "Invalid country selected.");
          return;
        }
        const constraint = new RegExp(postalCodeRegex);
        const isValid = constraint.test(value);
        setError(element, type, isValid ? "" : postalCodeMessage);
      }
    });
  };
  const setError = (input, type, message) => {
    console.log(type, input);
    const errorElement = document.querySelector(`#${type}-error`);
    console.log("errorElement", errorElement);
    if (!errorElement) {
      console.error(`Error element with class "${type}-error" not found.`);
      return;
    }
    if (message) {
      input.classList.add("invalid");
      errorElement.textContent = message;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
      errorElement.textContent = "";
    }
  };
  const validateEmail = () => {
    const email = document.getElementById("email");
    addEventListeners(email, "email");
  };
  const validatePassword = () => {
    const password = document.getElementById("password");
    addEventListeners(password, "password");
  };
  const validateConfirmPassword = () => {
    const confirmPassword = document.getElementById("confirm-password");
    console.log("confrim password", confirmPassword);
    addEventListeners(confirmPassword, "confirm-password");
  };
  const validateCountry = () => {
    const country = document.getElementById("country");
    addEventListeners(country, "country");
  };
  const validatePostcode = () => {
    const postcode = document.getElementById("postcode");
    addEventListeners(postcode, "postcode");
  };

  return {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateCountry,
    validatePostcode,
  };
})();

export default ValidationManager;
