document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault(); 

  var searchInput = document.getElementById("search-input").value;
  var request = new XMLHttpRequest();
  var url = "http://localhost:3000/search?query=" + encodeURIComponent(searchInput);

  request.open("GET", url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      displaySearchResults(response, searchInput);
    } else {
      console.error("Error occurred while fetching search results. Status:", request.status);
    }
  };

  request.onerror = function() {
    console.error("An error occurred during the request.");
  };

  request.send();
});

function displaySearchResults(results, query) {
  var searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = ""; // Clear previous results

  var queryHeading = document.createElement("h2");
  var resultCount = results.results.length;
  queryHeading.textContent = "Found " + resultCount + " " + (resultCount === 1 ? "result" : "results") + " for " + query + ":";
  searchResultsContainer.appendChild(queryHeading);

  if (resultCount === 0) {
    var messageElement = document.createElement("p");
    messageElement.textContent = "No movies found matching the search criteria.";
    searchResultsContainer.appendChild(messageElement);
  } else {
    results.results.forEach(function(result) {
      var movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      var posterElement = document.createElement("img");
      posterElement.classList.add("movie-poster");
      posterElement.src = getPosterURL(result.poster_path);

      var detailsElement = document.createElement("div");
      detailsElement.classList.add("movie-details");

      var titleElement = document.createElement("h2");
      titleElement.textContent = result.title;

      var releaseDateElement = document.createElement("p");
      releaseDateElement.textContent = "Release Date: " + result.release_date;

      var overviewElement = document.createElement("p");
      overviewElement.textContent = result.overview;

      var ratingElement = document.createElement("p");
      ratingElement.textContent = "Rating: " + result.vote_average;

      detailsElement.appendChild(titleElement);
      detailsElement.appendChild(releaseDateElement);
      detailsElement.appendChild(overviewElement);
      detailsElement.appendChild(ratingElement);

      movieElement.appendChild(posterElement);
      movieElement.appendChild(detailsElement);

      searchResultsContainer.appendChild(movieElement);
    });
  }
}

function getPosterURL(posterPath) {
  if (posterPath) {
    return "https://image.tmdb.org/t/p/w200" + posterPath;
  } else {
    return "No-Preview-Available.jpg"; 
  }
}
