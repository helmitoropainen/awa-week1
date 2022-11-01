import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const container = document.getElementsByClassName("container")[0];

  const breeds = ["Affenpinscher", "Borzoi", "Beagle", "Pug", "Vizsla"];

  breeds.forEach(async (dog) => {
    let item = document.createElement("div");
    item.setAttribute("class", "wiki-item");

    let header = document.createElement("h1");
    header.setAttribute("class", "wiki-header");
    header.innerHTML = dog;

    let content = document.createElement("div");
    content.setAttribute("class", "wiki-content");

    let text = document.createElement("p");
    text.setAttribute("class", "wiki-text");

    const urlSum = "https://en.wikipedia.org/api/rest_v1/page/summary/" + dog;
    let resSum = await fetch(urlSum);
    let dataSum = await resSum.json();

    text.innerHTML = dataSum.extract;

    let imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img-container");

    let img = document.createElement("img");

    img.setAttribute("class", "wiki-img");
    const urlImg =
      "https://dog.ceo/api/breed/" + dog.toLowerCase() + "/images/random";
    let resImg = await fetch(urlImg);
    let dataImg = await resImg.json();

    img.setAttribute("src", dataImg.message);

    imgContainer.appendChild(img);
    content.appendChild(text);
    content.appendChild(imgContainer);
    item.appendChild(header);
    item.appendChild(content);
    container.appendChild(item);
  });
}
