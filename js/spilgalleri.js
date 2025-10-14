"use strict"

/*SPILGALLERI*/

  // søg
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => renderCards(currentGames));


  // #4: Render a single movie card and add event listeners
  function displayGames(games) {
  const gameList = document.querySelector("#movie-list");

  const movieHTML = `
    <article class="movie-card" tabindex="0">
      <img src="${games.image}" 
           alt="${games.title}" 
           class="game-image" />
      <div class="game-desciption-container">
        <h3>${movie.title} <span class="movie-year">(${movie.year})</span></h3>
        <p class="movie-genre">${movie.genre.join(", ")}</p>
        <p class="movie-rating">⭐ ${movie.rating}</p>
        <p class="movie-director"><strong>Director:</strong> ${
          movie.director
        }</p>
      </div>
    </article>
  `;
