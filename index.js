// target the root div and insert html into it
const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label><b>Search for a movie</b></label>
<input class="input" />
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results">
           
    </div>
  </div>
</div>
`;

// target various elements
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

// function for fetching data from OMDb API
const fetchData = async (searchTerm) => {
  const response = await fetchMovies(searchTerm);
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

// gets fired when typing
const onInput = async (e) => {
  const movies = await fetchData(e.target.value);

  // clear out previous results
  resultsWrapper.innerHTML = "";

  // close dropdown if not fetching anything (cleared input)
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  // add another class name to dropdown div
  dropdown.classList.add("is-active");
  // traverse movies
  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    option.classList.add("dropdown-item");
    option.innerHTML = `
      <img src="${imgSrc}"/>
      ${movie.Title}
      `;

    // listen for a click on a single option
    option.addEventListener("click", () => {
      // close the dropdown and update input
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      fetchMovie(movie);
    });

    resultsWrapper.appendChild(option);
  }
};

// debounce the onInput call to fire after 1 second of no new input
input.addEventListener("input", debounce(onInput, 1000));

// listen for a click outside of root container to close dropdown
document.addEventListener("click", (e) => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});
