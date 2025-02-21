//for header
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}




const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGFlYjkyOGFlNGIxNGQ4OTNhMDZhZTU4NjRiMjUxMyIsIm5iZiI6MTczMzE1ODc4NC42NzYsInN1YiI6IjY3NGRlNzgwNTYyYjAzMGJiNWFkZTNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qrJPwNG-BGxdoJU055eSD9taob2LnLT_-_xM8QEDIrk'
  }
};


const searchBtn = document.querySelectorAll('.search-btn')[0];
const searchInput = document.querySelectorAll('.searchInput')[0];

const fetchMovieData = async (id) => {  
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${id}&include_adult=false&language=en-US&page=1`,     //  "movieName" pelo nome ou ID do filme que você deseja buscar
      options2);
    const data = await res.json();
    return data.results
}

const fetchPosters = async (movie_id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/images`,     
    options2);
  const data = await res.json();
  console.log('this data', data)
  return data
}



const myHtml = async(queryTerm) => {    //manage de todas as funcoes que eu irei usar, tranferencias de dados etc
  const movie_name = await fetchMovieData(queryTerm)
  // const poster = await fetchPosters(movie_name[0].id)
 
  
  //reset
  const posterImg = document.querySelector('.posters')
  searchBtn.addEventListener('click', async (event) => {
    posterImg.innerHTML = ''
  })

  //importante
  const resultFor = document.createElement('h1')
  resultFor.className = 'resultFor'
  resultFor.textContent = `Results for "${queryTerm}"`
  posterImg.prepend(resultFor)
  //importante
  const putPoster = movie_name.filter((item) => item.media_type === "movie").forEach(async element => {
    const poster = await fetchPosters(element.id)
    if (element.poster_path === null) {} else {
      displayHtml2(element);
    } 

  })


  
  // displayHtml2(putPoster)

}




const displayHtml2 = async (imageSource) => {
  //resets


  
  const posterImg = document.querySelector('.posters')
  const containerMovies = document.querySelector('.container-movies')
  containerMovies.innerHTML = ''
  // estrutura para imagens
  const img = document.createElement('img')
  img.src = `https://image.tmdb.org/t/p/w400${imageSource.poster_path}`
  img.className = 'trendPoster'
  //estrutura poster
  const divPosters = document.createElement('div')
  divPosters.className = 'moviesAlign'
  const posterTittle = document.createElement('p')
  posterTittle.textContent = `${imageSource.title}`
  posterTittle.className = 'pTitle'
  //conteudo comp do modal
  const modal = document.createElement('dialog')
  const modalContent = document.createElement('div')
  modalContent.className = 'modal-content'
  modalContent.append(modal)

  //conteudo


  //botoes
  
  const openBtn = document.createElement('button')
  openBtn.className = 'openBtn'
  openBtn.id = imageSource.id

  posterImg.append(divPosters)
  divPosters.prepend(openBtn)
  divPosters.append(img, posterTittle, modalContent) //adicionar aqui


openBtn.addEventListener("click", async (event) => {

  const movieId = event.target.id;
  console.log('im working')
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

searchBtn.addEventListener('click', async (event) => {
  event.preventDefault() 
  
  
  const queryTerm = searchInput.value
  myHtml(queryTerm)
})


const switchLamp = document.querySelector('.modeSwitch')

switchLamp.addEventListener('click', async (event) => {
  console.log('button working')
  const containerMovies = document.querySelector('.container-movies')
  const h1Dark = document.querySelectorAll('h1')
  const posterDark = document.querySelectorAll('.trendPoster')
  const pDark = document.querySelectorAll('.pTitle')
  const posterDivDark = document.querySelector('.posters')
  const imgSwitch = document.querySelector('.switchImg')
  const h2Dark = document.querySelector('h2')


  if (imgSwitch.src.includes('asstes/icons/lampOn.png')) {
    imgSwitch.src = 'asstes/icons/lampOff.png';
  } else {
    imgSwitch.src = 'asstes/icons/lampOn.png';
    imgSwitch.classList.toggle("-offStyle")
  }


  // h2Dark.classList.toggle('h2-dark')
  containerMovies.classList.toggle("-dark")
  posterDivDark.classList.toggle('-dark')

  h1Dark.forEach(element => {
    element.classList.toggle('h1-dark')
  });

  pDark.forEach(element => {
    element.classList.toggle('pTitle-dark')
  });

  posterDark.forEach(element => {
    element.classList.toggle('trend-poster-dark')
  });
  
})