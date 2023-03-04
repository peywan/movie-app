const form = document.querySelector("#searchForm");
const imageContainer = document.querySelector("#imageContainer");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm, isFunny: "colt" } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  makeImages(res.data);
});

document.querySelector("#clearButton").addEventListener("click", function (e) {
  e.preventDefault();
  form.reset();
  imageContainer.innerHTML = ""; // Remove all images from the container
});

const makeImages = (shows) => {
  imageContainer.innerHTML = "";
  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";
  imageContainer.appendChild(gridContainer);

  shows.slice(0, 3).forEach((show) => {
    if (show.show.image) {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = show.show.image.medium;
      card.appendChild(img);

      const title = document.createElement("p");
      title.textContent = show.show.name;
      title.style.fontFamily = "Climate Crisis"; // set font to "Climate Crisis"
      card.appendChild(title);

      const score = document.createElement("p");
      score.textContent = `Score: ${Math.round(show.score * 10)}`;
      score.style.fontFamily = "Climate Crisis"; // set font to "Climate Crisis"
      card.appendChild(score);

      gridContainer.appendChild(card);
    }
  });
};
