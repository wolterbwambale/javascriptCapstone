const getMovies = async () => {
  const response = await fetch('https://www.tvmaze.com/shows');
  return response.json()
}

export default getMovies