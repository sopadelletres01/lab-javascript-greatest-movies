// The `movies` array from the file `src/data.js`.


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  //REVISAR ESTA FUNCION
  //Con el tercer parametro de filter podemos obtener el estado actual del array en cada iteración.
  //Comprobamos en cada vuelta que el array actual no contiene un director duplicado
  return movies
  .map(movie=>movie.director)
  .filter((director,i,array)=>array.indexOf(director) === i)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies
  .filter(mv=>mv.genre.includes("Drama") && mv.director === "Steven Spielberg")
  .length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  return movies.length <= 0 
  ? 0
  : Number(
      (movies.reduce((acc,value)=>acc += value.score ? value.score : 0 ,0) / movies.length)
      .toFixed(2)
    )
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  let dramaMovies = movies.filter(mv=>mv.genre.includes("Drama"))
  if ( dramaMovies.length <= 0 ) return 0
  return dramaMovies.length <= 0
  ? 0
  : Number(
      (dramaMovies.reduce((acc,value)=>acc += value.score ? value.score : 0 ,0) / dramaMovies.length )
      .toFixed(2)
    )
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  let moviesToSort = [...movies]
  moviesToSort.sort((a,b)=>{
    return a.year === b.year ? 
      (a.title > b.title ? 1 :
      a.title < b.title ? -1 : 0)
      : 
      (a.year > b.year ? 1 :
      a.year < b.year ? -1 : 0)
  })
  return moviesToSort
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  let finalMovies = [...movies]
  return finalMovies.
    sort((a,b)=>{
      return (
        a.title > b.title ? 1 :
        a.title < b.title ? -1 : 
        0
      )
    })
    .slice(0,20)
    .map(mv=>mv.title)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  let moviesParsed = [...movies].map(mv=>{
    let hours = Number(mv.duration.slice(0,1))
    let minutes = Number(mv.duration.slice(3).replace("min",""))
    let totalMinutes = (hours * 60) + minutes
    return {...mv,duration:totalMinutes}
  })
  return moviesParsed
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if ( movies.length <= 0 ) return null
  let maxAverage = 0;
  let maxYear = undefined
  let listOfYears = movies
  .map(mv=>mv.year)
  .filter((year,i,array)=>{
    return array.indexOf(year) === i
  })
  listOfYears.forEach(year => {
    let moviesByYear = movies.filter(mv=>mv.year === year)
    let scoreAvg = scoresAverage(moviesByYear)
    //if ( year === 1955 ) console.log("1955",scoreAvg,maxAverage)
    //if ( year === 1977 ) console.log("1977",scoreAvg,maxAverage)

    if ( scoreAvg > maxAverage ) {
      maxAverage = scoreAvg; 
      maxYear = year;
      console.log(scoreAvg,maxAverage)
    }
  });
  return `The best year was ${maxYear} with an average score of ${maxAverage}`
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
