"use strict"

/*FORSIDE*/

document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  const splash = document.querySelector(".splash-screen");

  // logo-animation efter kort delay
  setTimeout(() => {
    logo.classList.add("animate");
  }, 800); // 0.8 sekunder efter load

  // fade splash-screen ud
  setTimeout(() => {
    splash.classList.add("fade-out");
  }, 2500); // fade starter efter 2.5 sekunder

  // skift til næste side (location.html)
  setTimeout(() => {
    window.location.href = "sites/location.html";
  }, 3500); 
});


/*LOCATION*/

document.addEventListener("DOMContentLoaded", () => {
  const locationSection = document.querySelector(".location");

  // Tilføj fade-in efter kort delay
  setTimeout(() => {
    locationSection.classList.add("fade-in");
  }, 100); 
});



/*SPILGALLERI*/

  // søg
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => renderCards(currentGames));

let allGames = []

// #2: Fetch games from JSON file
async function getGames() {
  const response = await fetch(
    "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json"
  );
  allGames = await response.json();
  console.log("📁 Games loaded:", allGames.length);
  populateCategoryDropdown(); // Udfyld dropdown med genrer fra data
  displayGames(allGames);
}

// #3: Display all games
function displayGames(games) {
  const gameList = document.querySelector("#game-list");
  gameList.innerHTML = "";

  if (games.length === 0) {
    gameList.innerHTML =
      '<p class="no-results">Ingen spil matchede dine filtre 😢</p>';
    return;
  }

  for (const game of games) {
    displayGame(game);
  }
}

  // #4: Render a single game card and add event listeners
  function displayGames(games) {
  const gameList = document.querySelector("#game-list");

  const gameHTML = `
    <article class="game-card" tabindex="0">
        <section class="top-card">
            <img src="${games.image}" 
            alt="${games.title}" 
            class="game-image" />
            <div class="age-tag">${games.age}</div>
            <div class="rating-tag">${games.rating}</div>
            <div class="difficulty-tag">${games.difficulty}</div>
        </section>
        <sec class="bottom-card">
            <h2>${games.title}</h2>
            <div class="tags">
                <p>${game.genre}</p>
            </div>
            <div class="tags">
                <p>${game.playtime}</p>
            </div>
            <div class="tags">
                <p>${game.players}</p>
            </div>
            <div class="tags">
                <p>${game.language}</p>
            </div>
        </section>
    </article>
  `;
    gameList.insertAdjacentHTML("beforeend", gameHTML);

    // Tilføj click event til den nye card
    const newCard = gameList.lastElementChild;
    newCard.addEventListener("click", function () {
        console.log(`Klik på: "${game.title}"`);
        showGameModal(game); // ÆNDRET: Fra showGameDetails til showGameModal
    });
    }


    


