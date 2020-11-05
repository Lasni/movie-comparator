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
const onMovieSelect = async (movie) => {
  const response = await axios.get(`http://www.omdbapi.com`, {
    params: {
      apikey: 45384805,
      i: movie.imdbID,
    },
  });
  console.log(response)
  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

// movieTemplate
const movieTemplate = (movieDetail) => {
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
    <article class="notification is-primary">
      <p>${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p>${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p>${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p>${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB rating</p>
    </article>
    <article class="notification is-primary">
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
