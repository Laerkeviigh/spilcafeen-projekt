"use strict";

/* ==========================
   INDEX (splash screen)
   ========================== */
if (document.querySelector(".splash-screen")) {
  document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
    const splash = document.querySelector(".splash-screen");

    // Logo-animation
    setTimeout(() => logo.classList.add("animate"), 800);

    // Fade ud efter 2.5 sekunder
    setTimeout(() => splash.classList.add("fade-out"), 2500);

    // Skift til location.html efter 3.5 sekunder
    setTimeout(() => {
      window.location.href = "./sites/location.html";
    }, 3500);
  });
}

/* ==========================
   LOCATION (fade in)
   ========================== */

if (document.querySelector(".location")) {
  document.addEventListener("DOMContentLoaded", () => {
    const locationSection = document.querySelector(".location");

    // Fade ind
    setTimeout(() => locationSection.classList.add("fade-in"), 100);
  });
}

/* ==========================
   SPILGALLERI (navbar, dialog osv.)
   ========================== */

if (document.querySelector(".spilgalleri-titel")) {
  console.log("🎮 Spilgalleri loaded");
}

// Back button (sikker måde)
document.querySelector(".back-btn").addEventListener("click", () => {
  window.location.href = "../sites/location.html";
});

// søg
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => renderCards(currentGames));

let allGames = [];

// #2: Fetch games from JSON file
async function getGames() {
  const response = await fetch("../data/games.json");
  allGames = await response.json();
  console.log("📁 Games loaded:", allGames.length);
  populateCategoryDropdown(); // Udfyld dropdown med genrer fra data
  displayGames(allGames);
}

// #3: Display all games
function displayGames(games) {
  const gameList = document.querySelector(".game-list-all");
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
function displayGame(game) {
  const gameList = document.querySelector(".game-list-all");

  const gameHTML = `
    <article class="game-card" tabindex="0">
        <section class="top-card">
            <img src="${game.image}" 
            alt="${game.title}" 
            class="game-image" />
            <div class="age-tag">${game.age}+</div>
            <div class="rating-tag">${game.rating}</div>
            <div class="difficulty-tag">${game.difficulty}</div>
        </section>
        <sec class="bottom-card">
            <h2 class="card-titel">${game.title}</h2>
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
}

gameList.insertAdjacentHTML("beforeend", gameHTML);

{
  // Tilføj click event til den nye card
  const newCard = gameList.lastElementChild;
  newCard.addEventListener("click", function () {
    console.log(`Klik på: "${game.title}"`);
    showGameModal(game.id); // ÆNDRET: Fra showGameDetails til showGameModal
  });
}

// #6: Vis game details (Session 3 version - bliver erstattet med modal i Del 2)
function showGameDetails(game) {
  alert(`
🎬 ${games.title} (${game.year})

🎭 Genre: ${game.genre.join(", ")}
⭐ Rating: ${game.rating}
🎥 Director: ${game.director}
👥 Actors: ${game.actors.join(", ")}

📝 ${game.description}
  `);
}

//Game Card Dialog
function showGameModal(id) {
  const game = allGames.find((g) => g.id == id);

  document.querySelector("#dialog-content").innerHTML = /*html*/ `
    <img src="${game.image}" alt="${game.title}" class="game-image" />
    <div class="dialog-details">
      <h2>${game.title}</h2>
      <p class="game-category">${game.genre}</p>
      <p class="game-rating">☆ ${game.rating}</p>
      <p><strong>Spilletid:</strong> ${game.playtime} min</p>
      <p><strong>Spillere:</strong> ${game.players.min}-${game.players.max}</p>
      <p><strong>Alder:</strong> ${game.age}+</p>
      <p><strong>Sværhedsgrad:</strong> ${game.difficulty}</p>
      <p><strong>Sprog:</strong> ${game.language}</p>
      <p><strong>Placering:</strong> ${game.location}, hylde ${game.shelf}</p>
      <p class="game-description">${game.rules}</p>
    </div>
  `;

  document.querySelector("#game-dialog").showModal();
}

<article class="dialog-container">
  <div class="dialog-image-container">
    <img src=".../img/tilbageknap.png" class="go-back"></img>
    <div class="age">
      <p>${game.age}</p>
    </div>
    <img src="${game.imgage}" alt="${game.title}" class="dialog-image"></img>
  </div>
  <div class="dialog-description-container">
    <h2 class="dialog-header"></h2>
    <div class="dialog-tag-container">
      <div class="tags">
        <p>
          ${game.players.min}-${game.players.max}
        </p>
      </div>
      <div class="tags">
        <p>${game.genre}</p>
      </div>
      <div class="tags">
        <p>${game.playtime}</p>
      </div>
      <div class="tags">
        <p>${game.language}</p>
      </div>
    </div>
    <p class="dialog-description">
      ${game.desciption}" "${game.rules}
    </p>
    <div class="dialog-bottom-container">
      <div class="difficulty-big-tag">
        <p>${game.difficulty}</p>
      </div>
      <div class="shelf-big-tag">
        <p>
          hylde: <strong>${game.shelf}</strong>
        </p>
      </div>
    </div>
  </div>
  <div class="dialog-user-rating"></div>
  <div class="dialog-might-like"></div>
</article>;

// Luk dialog på klik af X
document.querySelector("#close-dialog").addEventListener("click", () => {
  document.querySelector("#game-dialog").close();
});

// Dropdown-menu //// Åbn/luk dropdowns
