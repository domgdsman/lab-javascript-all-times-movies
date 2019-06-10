// Get the average of all rates with 2 decimals

function ratesAverage(moviesArray) {
  let ratingsArray = moviesArray.map(function(movie) {
    return movie.rate;
  });
  sumOfRatings = ratingsArray.reduce(function(acc, value) {
    return acc + Number(value);
  }, 0);
  avgRating = sumOfRatings / moviesArray.length;
  avgRating = Math.round(avgRating * 100) / 100;
  return avgRating;
}

// $$$ In-Class Solution $$$

// function ratesAverage(movies) {
//   const ratesSum = movies.reduce(function(accumulator, value) {
//     return accumulator + parseFloat(value.rate);
//   }, 0);

//   const average = parseFloat((ratesSum / movies.length).toFixed(2)); // toFixed(2) returns a string with 2-digit comma number
//   // parseFloat() converts a string to a floating point number
//   return average;
// }

// Get the average of Drama Movies

function dramaMoviesRate(moviesArray) {
  let dramaMoviesArray = moviesArray.filter(function(movie) {
    return movie.genre.includes("Drama");
    // return movie.genre.indexOf("Drama") !== -1;
  });
  if (!dramaMoviesArray.length) return 0;
  return ratesAverage(dramaMoviesArray);
}

// Order by time duration, ascending

function orderByDuration(moviesArray) {
  let sortedMovies = moviesArray.slice().sort(function(a, b) {
    if (a.duration !== b.duration) {
      return a.duration - b.duration;
    }
    return a.title.localeCompare(b.title);
  });
  return sortedMovies;
}

// How many movies did Steven Spielberg direct

function howManyMovies(moviesArray) {
  let dramaStevenArray = moviesArray.filter(function(movie) {
    return (
      movie.genre.includes("Drama") && movie.director === "Steven Spielberg"
    );
  });
  return dramaStevenArray.length;
}

// Order by title and print the first 20 titles

function orderAlphabetically(moviesArray) {
  let sortedMovies = moviesArray.slice().sort(function(a, b) {
    return a.title.localeCompare(b.title);
  });
  let firstTwentyMovies = sortedMovies.slice(0, 20);
  let firstTwentyTitles = firstTwentyMovies.map(function(movie) {
    return movie.title;
  });
  return firstTwentyTitles;
}

// Best yearly rate average

function bestYearAvg(moviesArray) {
  if (!moviesArray.length) return null; //should never return null, but test requires it
  let yearsAsNumbers = moviesArray.map(function(movie) {
    let newMovies = Object.assign({}, movie, { year: Number(movie.year) });
    return newMovies;
  }); // create a new array with year value as a number
  let sortedMovies = yearsAsNumbers.slice().sort(function(a, b) {
    return a.year - b.year;
  }); // sort movies in ascending order by year
  let uniqueYears = [];
  sortedMovies.forEach(function(uniques) {
    if (uniqueYears.indexOf(uniques.year) === -1)
      uniqueYears.push(uniques.year);
  }); // push all unique values for year onto the uniqueYears array
  let bestYearAvg = 0;
  let bestYear = 0;
  for (let i = 0; i < uniqueYears.length; i++) {
    let currentAvg = ratesAverage(
      moviesArray.filter(function(movie) {
        return Number(movie.year) === uniqueYears[i];
      })
    );
    if (currentAvg > bestYearAvg) {
      bestYearAvg = currentAvg;
      bestYear = uniqueYears[i];
    }
  } // let averages compete for every year in the uniqueYears array
  return `The best year was ${bestYear} with an average rate of ${bestYearAvg}`;
}

// Turn duration of the movies from hours to minutes

function turnHoursToMinutes(moviesArray) {
  let rawTimeArray = moviesArray.map(function(movie) {
    return movie.duration;
  }); // create new array with all movie durations
  for (let i = 0; i < rawTimeArray.length; i++) {
    if (!rawTimeArray[i].includes("min")) {
      rawTimeArray[i] = rawTimeArray[i].concat(" 0min");
    } else if (!rawTimeArray[i].includes("h")) {
      rawTimeArray[i] = "0h ".concat(rawTimeArray[i]);
    } else rawTimeArray[i] = rawTimeArray[i];
  } // give the strings all the same structure
  let formulaArray = [];
  for (let i = 0; i < rawTimeArray.length; i++) {
    formulaArray[i] = rawTimeArray[i]
      .replace(/h/, " * 60 +")
      .replace(/min/, "");
  } // replace the letters with mathematical notation
  let numericArray = [];
  for (let i = 0; i < formulaArray.length; i++) {
    numericArray[i] = eval(formulaArray[i]);
  } // evaluate the string formulas to numbers
  let convertedTimeArray = moviesArray.map(function(movie, i) {
    let newMovies = Object.assign({}, movie, { duration: numericArray[i] });
    return newMovies;
  }); // create a new array with movie duration as integers
  return convertedTimeArray;
}

// turnHoursToMinutes(movies);

// rawTimeArray.map(function(movieTime) {
//   if (!movieTime.includes("min")) return movieTime + " 0min";
//   if (!movieTime.includes("h")) return "0h " + movieTime;
//   return movieTime;
// });

// replacedArray = rawTimeArray.forEach(function(time) {
//   time = time.replace(/h/, " * 60 +");
//   time = time.replace(/min/, " * 1");
// });

// console.log(rawTimeArray);

// rawTimeArray.map(function(movieTime) {
//   if (!movieTime.includes("min")) return movieTime + " 0min";
//   if (!movieTime.includes("h")) return "0h " + movieTime;
//   return movieTime;
// });

// FOR REFERENCE

// let asNumbers = moviesArray.map(function(movie) {
//   let newMovies = Object.assign({}, movie, { year: Number(movie.year) });
//   return newMovies;

// sortedMovies.forEach(function(uniques) {
//   if (uniqueYears.indexOf(uniques.year) === -1)
//     uniqueYears.push(uniques.year);
// });
