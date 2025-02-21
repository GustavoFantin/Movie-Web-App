function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGFlYjkyOGFlNGIxNGQ4OTNhMDZhZTU4NjRiMjUxMyIsIm5iZiI6MTczMzE1ODc4NC42NzYsInN1YiI6IjY3NGRlNzgwNTYyYjAzMGJiNWFkZTNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qrJPwNG-BGxdoJU055eSD9taob2LnLT_-_xM8QEDIrk'
    }
  };

const fetchTrends = async () => {
    const res = await fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',     
      options);
    const data = await res.json();
    return data
}


const manageHtml = async () =>{
    const trending = await fetchTrends()
    const posterTrend = trending.results.forEach(async element => {
        const postering = await element
        displayHtml(postering)
    });
}

const displayHtml = async (postering) => {
    const container = document.querySelector('.container-movies')

    
    const img = document.createElement('img')
    img.src = `https://image.tmdb.org/t/p/w500${postering.poster_path}`
    img.className = 'trendPoster'
    const divMovies = document.createElement('div')
    divMovies.className = 'moviesAlign'
    const movieTittle = document.createElement('p')
    movieTittle.className = 'pTitle'
    movieTittle.textContent = `${postering.title}`
    container.append(divMovies)
    
    //comp modal 
    const modal = document.createElement('dialog')
    const modalContent = document.createElement('div')
    modalContent.className = 'modal-content'
    modalContent.append(modal)
    divMovies.append(img, movieTittle, modalContent)
    
    //botao para modal
    const openBtn = document.createElement('button')
    openBtn.className = 'openBtn'
    openBtn.id = postering.id
    divMovies.prepend(openBtn)

    //adiciona o click

    openBtn.addEventListener("click", async (event) => {

      const movieId = event.target.id;
      
      const fetchDetails = async (movieId) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,     
          options2);
          const data = await res.json();
          console.log("datas",data);
          
          return data
        }
    
        try {
          // Aguarda os detalhes do filme
          const data = await fetchDetails(movieId);
      
          //reset do modal
          modal.innerHTML = ''
          
          //Cria map para generos
          console.log(data.genres)
    
          const genres = data.genres
          .map((genre) => `<span class="genre">${genre.name}</span>`)
          .join('');
    
          const number = data.vote_average
          // Cria o conteúdo do modal
          const sharedContent = `
            <img src="https://image.tmdb.org/t/p/w400${data.poster_path}" alt="${data.title}" class='modalImg'>
            <h3>${data.title}</h3>
            <p>${data.overview}</p>
            <span>${genres}</span>
            <div class='rating'>
              <img class='ratingStar' src='./asstes/icons/star.png'><p>Rating: ${parseFloat(number.toFixed(1))}</p>
            </div>
              `;
      
          // Adiciona o conteúdo ao modal
          modal.innerHTML = sharedContent;
      
    
            
          const closeBtn = document.createElement('button')
          closeBtn.className = 'closeBtn'
          closeBtn.textContent = 'close'
          modal.prepend(closeBtn)
    
          // Exibe o modal
          modal.showModal();
    
          closeBtn.addEventListener("click", () => {
            modal.close();
          });
    
    
        
        }
        catch (error) {
          console.error("Erro ao buscar detalhes do filme:", error);
        }
    
    })

}








manageHtml()