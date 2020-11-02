
const fetchData = async () => {
  const response = await axios.get(`http://www.omdbapi.com`, {
    params: {
      apikey: 45384805,
      // s: "avengers",
      i: "tt0848228"
    },
  });
  console.log(response.data);
};

fetchData();
