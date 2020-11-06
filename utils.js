// fetchMovies
const fetchMovies = async (searchTerm) => {
  const response = await axios.get(`http://www.omdbapi.com`, {
    params: {
      apikey: 45384805,
      s: searchTerm,
    },
  });
  return response;
};

// onMovieSelect
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get(`http://www.omdbapi.com`, {
    params: {
      apikey: 45384805,
      i: movie.imdbID,
    },
  });
  // console.log(response);
  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

// runComparison
const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification"
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = leftStat.dataset.value;
    const rightSideValue = rightStat.dataset.value;

    // console.log(leftSideValue > rightSideValue);
    console.log(
      `comparing left side: ${leftSideValue} with right side: ${rightSideValue}`
    );
    console.log(
      `Winner: ${
        leftSideValue > rightSideValue ? leftSideValue : rightSideValue
      }`
    );

    if (rightSideValue === "NaN" && leftSideValue === "NaN") {
      // console.log(rightSideValue)
      rightStat.classList.remove("is-primary");
      leftStat.classList.remove("is-primary");
    } else if (rightSideValue > leftSideValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else if (rightSideValue < leftSideValue) {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
};

// movieTemplate
const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metaScore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));
  const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value=${awards} class="notification is-primary">
      <p>${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
      <p>${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metaScore} class="notification is-primary">
      <p>${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p>${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p>${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

// debounce wrapper function for limiting api calls
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // if typing keep clearing timeoutId so setTimeout callback never fires
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // apply ...args to the callback function
      func.apply(null, args);
    }, delay);
  };
};
