it("Shows an autocomplete", () => {
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Some other movie" },
        { Title: "Some third movie" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});
