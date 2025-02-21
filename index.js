const option3 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGFlYjkyOGFlNGIxNGQ4OTNhMDZhZTU4NjRiMjUxMyIsIm5iZiI6MTczMzE1ODc4NC42NzYsInN1YiI6IjY3NGRlNzgwNTYyYjAzMGJiNWFkZTNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qrJPwNG-BGxdoJU055eSD9taob2LnLT_-_xM8QEDIrk'
  }
};


const fetchTrendsSlide = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',     
    option3);
  const data = await res.json();
  return data
}


const manageHtml3 = async () =>{
  const trending = await fetchTrendsSlide()
  const posterTrend = trending.results.forEach(async element => {
      const postering = await element
      displayHtml3(postering)
  });
}

const displayHtml3 = async (postering) => {
  const divCarousel = document.querySelector('.carousel-inner')

  const imgCarDiv = document.createElement('div')
  imgCarDiv.className = 'carousel-item'
  const imgCar = document.createElement('img')
  imgCar.className = 'd-block w-100'
  imgCar.src = `https://image.tmdb.org/t/p/w500${postering.backdrop_path}`

  imgCarDiv.append(imgCar)
  divCarousel.prepend(imgCarDiv)
}

manageHtml3()