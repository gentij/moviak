let movie;


function myFunction() {
    var menu = document.getElementById("ul");
    let toggler = document.getElementById("icon")

    if(menu.classList.contains('animationIn')) {
        menu.classList.add('animationOut')
        menu.classList.remove('animationIn')

        toggler.classList.add('fa-bars')
        toggler.classList.remove('fa-times')
    
    } else {
        menu.classList.add('animationIn')
        menu.classList.remove('animationOut')

        toggler.classList.remove('fa-bars')
        toggler.classList.add('fa-times')
    }
  }

function passData(data) {
    movie = data;


    let title = document.getElementById("title")
    let genres = document.getElementById("genres")
    let rating = document.getElementById("rating")
    let runtime = document.getElementById("runtime")
    let plot = document.getElementById("plot")
    let actors = document.getElementById("actors")
    let director = document.getElementById("director")
    let production = document.getElementById("production")
    let poster = document.getElementById("poster")

    console.log(movie);

    title.innerText = movie.Title;
    genres.innerText = movie.Genre;
    rating.innerText = movie.imdbRating;
    runtime.innerText = movie.Runtime;
    plot.innerText = movie.Plot;
    actors.innerText = `Actors: ${movie.Actors}`;
    director.innerText =  `Director: ${movie.Director}`;
    production.innerText = `Production ${movie.Production}`;
    poster.setAttribute('src', `${movie.Poster}`)

    document.querySelector('.result').style.display = "flex"

    let inputValue = document.getElementById('input').value;
    inputValue = ''
}

function fetchData(param) {
    fetch(`http://www.omdbapi.com/?i=${param}&apikey=e6bd81b4`, {
	"method": "GET",
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        passData(data)
    })
    .catch(err => {
        console.log(err);
    });
}


function fetchDataId (param) {
    fetch(`http://www.omdbapi.com/?s=${param}&apikey=e6bd81b4`, {
	"method": "GET",
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        if(data.Error == "Movie not found!") {
            alert("Movie not found!")
        } else {
            fetchData(data.Search[0].imdbID)
        }
    })
    .catch(err => {
        console.log(err);
    });
}


function getInput() {
    let inputValue = document.getElementById('input').value;
    if(inputValue) {
        fetchDataId(inputValue)
    } else {
        alert('Invalid input')
    }
    inputValue = ""
}

const input = document.getElementById('input');
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if(input.value) {
            fetchDataId(input.value)
        } else {
            alert('Invalid input')
        }
        input.value = ""
    }
});
