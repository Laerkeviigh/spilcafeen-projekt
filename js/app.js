"use strict";

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
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => renderCards(currentGames));

let allGames = [];

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
                <p>${game.players.min}-${game.players.max}</p>
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

//Game Card Dialog

function showGameCard(game) {
  // Find modal indhold container og byg HTML struktur dynamisk
  document.querySelector("#dialog-content").innerHTML = /*html*/ `
    <img src="${game.image}" alt="Poster af ${game.title}" class="movie-poster">
    <div class="dialog-details">
    <h2>${game.title}</h2>
      <div class="tags"><p>${game.genre}</p></div>
      <div class="tags"><p>${game.playtime} min</p></div>
      <div><p</div>
      <div class="tags"><p>${game.rating}</p></div>
    
      <p class="tags">${game.description}</p>
    </div>
  `;
}

// Åbn modalen - showModal() er en built-in browser funktion
document.querySelector("#gamecard-dialog").showModal();

/*Vestergade sektion*/

// Indlæs spil fra JSON og filtrér Vestergade-spil
async function loadVestergadeGames() {
  try {
    const response = await fetch("../data/games.json");
    const games = await response.json();

    const vestergadeGames = games.filter(
      (game) => game.location === "Vestergade"
    );

    renderVestergadeGames(vestergadeGames);
  } catch (error) {
    console.error("Fejl ved indlæsning af spil:", error);
  }
}

// Render kortene
function renderVestergadeGames(games) {
  const container = document.getElementById("vestergade-list");

  games.forEach((game) => {
    const card = document.createElement("article");
    card.classList.add("game-card");

    card.innerHTML = `
      <section class="top-card">
        <img src="${game.image}" alt="${game.title}" class="game-image" />
        <div class="age-tag"><p>${game.age}+</p></div>
        <div class="difficulty"><p>${game.difficulty}</p></div>
      </section>
      <section class="bottom-card">
        <h3>${game.title}</h3>
        <div class="tags"><p>${game.genre}</p></div>
        <div class="tags"><p>${game.playtime} min</p></div>
        <div class="tags"><p>${game.players.min}-${game.players.max} personer</p></div>
        <div class="tags"><p>${game.language}</p></div>
      </section>
    `;

    container.insertBefore(card, container.querySelector(".see-more"));
  });
}

// Kør funktionen når DOM’en er klar
document.addEventListener("DOMContentLoaded", loadVestergadeGames);

//Alle spil sektion//

async function loadAllGames() {
  try {
    const response = await fetch("../data/games.json");
    const games = await response.json();

    renderAllGames(games);
  } catch (error) {
    console.error("Fejl ved indlæsning af alle spil:", error);
  }
}

// Render ALLE spil i vertikal liste
function renderAllGames(games) {
  const container = document.getElementById("all-games-list");

  games.forEach((game) => {
    const card = document.createElement("article");
    card.classList.add("game-card");

    card.innerHTML = `
      <section class="top-card">
        <img src="${game.image}" alt="${game.title}" class="game-image" />
        <div class="age-tag"><p>${game.age}+</p></div>
        <div class="difficulty"><p>${game.difficulty}</p></div>
      </section>
      <section class="bottom-card">
        <h3>${game.title}</h3>
        <div class="tags"><p>${game.genre}</p></div>
        <div class="tags"><p>${game.playtime} min</p></div>
        <div class="tags"><p>${game.players.min}-${game.players.max} personer</p></div>
        <div class="tags"><p>${game.language}</p></div>
      </section>
    `;

    container.appendChild(card);
  });
}

// Når siden er klar, kør begge
document.addEventListener("DOMContentLoaded", () => {
  loadVestergadeGames();
  loadAllGames();
});
