import mainPic from "./img/Pacman.jpeg";

const createDomElement = (parentElement, type, className, words = "") => {
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  if (words !== "") {
    newElement.textContent = words;
  }
  parentElement.append(newElement);
  return newElement;
};

const createImage = () => {
  const parent = document.querySelector(".image-container");
  const newImage = createDomElement(parent, "img", "main-pic");
  newImage.src = mainPic;
  newImage.alt = "Pacman";
};

const DisplayManager = (() => {
  const renderPage = () => {
    createImage();
  };
  return {
    renderPage,
  };
})();
export default DisplayManager;
