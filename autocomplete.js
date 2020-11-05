const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  // target the root div and insert html into it
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
            
      </div>
    </div>
  </div>
`;

  // target various elements
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  // gets fired when typing
  const onInput = async (e) => {
    const items = await fetchData(e.target.value);
    // clear out previous results
    resultsWrapper.innerHTML = "";
    // close dropdown if not fetching anything (cleared input)
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    // add another class name to dropdown div
    dropdown.classList.add("is-active");
    // traverse items
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      // listen for a click on a single option
      option.addEventListener("click", () => {
        // close the dropdown and update input
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
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
};
