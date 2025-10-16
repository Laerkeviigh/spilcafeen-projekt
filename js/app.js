"use strict";

// Hent spil fra JSON fil
async function getGames() {
  console.log("🎲 Starter loading af spil...");
  try {
    const response = await fetch("../data/games.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const games = await response.json();
    console.log("📁 Games loaded:", games.length);
    displayGames(games);
  } catch (error) {
    console.error("❌ Fejl ved loading af spil:", error);
  }
}

// Vis alle spil
function displayGames(games) {
  const gameList = document.querySelector(".game-list-all");
  if (!gameList) {
    console.error("Kunne ikke finde .game-list-all element");
    return;
  }
  
  gameList.innerHTML = "";

  if (games.length === 0) {
    gameList.innerHTML = '<p class="no-results">Ingen spil matchede dine filtre 😢</p>';
    return;
  }

  for (const game of games) {
    displayGame(game);
  }
}

// Vis et enkelt spil
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
        <section class="bottom-card">
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

  gameList.insertAdjacentHTML("beforeend", gameHTML);
}

// Start loading af spil når siden er klar
if (document.querySelector(".spilgalleri-titel")) {
  document.addEventListener("DOMContentLoaded", getGames);
}

/* ==========================
   GLOBALE VARIABLER
   ========================== */
let allGames = [];

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
    setTimeout(() => locationSection.classList.add("fade-in"), 100);
  });
}

/* ==========================
   SPILGALLERI
   ========================== */

// Funktion til at hente spil fra JSON fil
async function getGames() {
  console.log("🎲 Starter loading af spil...");
  try {
    const response = await fetch("../data/games.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    allGames = await response.json();
    console.log("📁 Games loaded:", allGames.length);
    console.log("Første spil:", allGames[0]);
    displayGames(allGames);
  } catch (error) {
    console.error("❌ Fejl ved loading af spil:", error);
  }
}

// Funktion til at vise alle spil
function displayGames(games) {
  const gameList = document.querySelector(".game-list-all");
  if (!gameList) {
    console.error("Kunne ikke finde .game-list-all element");
    return;
  }
  
  gameList.innerHTML = "";

  if (games.length === 0) {
    gameList.innerHTML = '<p class="no-results">Ingen spil matchede dine filtre 😢</p>';
    return;
  }

  for (const game of games) {
    displayGame(game);
  }
}

// Funktion til at vise et enkelt spil
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
        <section class="bottom-card">
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

  gameList.insertAdjacentHTML("beforeend", gameHTML);

  const newCard = gameList.lastElementChild;
  newCard.addEventListener("click", () => {
    console.log(`Klik på: "${game.title}"`);
    showGameModal(game.id);
  });
}

// Funktion til at vise spil detaljer i en modal
function showGameModal(id) {
  const game = allGames.find((g) => g.id == id);
  if (!game) return;

  const dialogContent = document.querySelector("#dialog-content");
  if (!dialogContent) return;

  dialogContent.innerHTML = /*html*/ `
    <article class="dialog-container">
      <div class="dialog-image-container">
        <img src="../img/tilbageknap.png" class="go-back" alt="Tilbage" />
        <div class="age">
          <p>${game.age}</p>
        </div>
        <img src="${game.image}" alt="${game.title}" class="dialog-image" />
      </div>
      <div class="dialog-description-container">
        <h2 class="dialog-header">${game.title}</h2>
        <div class="dialog-tag-container">
          <div class="tags">
            <p>${game.players.min}-${game.players.max}</p>
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
          ${game.description} ${game.rules}
        </p>
        <div class="dialog-bottom-container">
          <div class="difficulty-big-tag">
            <p>${game.difficulty}</p>
          </div>
          <div class="shelf-big-tag">
            <p>Hylde: <strong>${game.shelf}</strong></p>
          </div>
        </div>
      </div>
      <div class="dialog-user-rating"></div>
      <div class="dialog-might-like"></div>
    </article>
  `;

  const dialog = document.querySelector("#game-dialog");
  if (dialog) dialog.showModal();
}

// Event listeners til spilgalleri siden
if (document.querySelector(".spilgalleri-titel")) {
  console.log("Spilgalleri loaded");

  // Tilføj back button event listener
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "../sites/location.html";
    });
  }

  // Tilføj search input event listener
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      displayGames(allGames);
    });
  }

  // Luk dialog på klik af X
  const closeButton = document.querySelector("#close-dialog");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      const dialog = document.querySelector("#game-dialog");
      if (dialog) dialog.close();
    });
  }

  // Start loading af spil når siden er klar
  document.addEventListener("DOMContentLoaded", getGames);
}

/* ==========================
   SPILGALLERI (navbar, dialog osv.)
   ========================== */

// Global variabel til at holde alle spil
let allGames = [];

// Kun tilføj event listeners hvis vi er på spilgalleri siden
if (document.querySelector(".spilgalleri-titel")) {
  console.log("Spilgalleri loaded");

  // Tilføj back button event listener
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "../sites/location.html";
    });
  }

  // Tilføj search input event listener
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      // Midlertidigt - brug displayGames i stedet for renderCards
      displayGames(allGames);
    });
  }
}

}  // Lukker if (document.querySelector(".spilgalleri-titel"))

/* ==========================
   SPIL FUNKTIONER
   ========================== */

async function getGames() {
  console.log("🎲 Starter loading af spil...");
  try {
    const response = await fetch("../data/games.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    allGames = await response.json();
    console.log("📁 Games loaded:", allGames.length);
    console.log("Første spil:", allGames[0]); // Vis det første spil for at tjekke data

    // Midlertidigt fjernet populateCategoryDropdown() for at teste
    displayGames(allGames);
  } catch (error) {
    console.error("❌ Fejl ved loading af spil:", error);
  }

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
        <section class="bottom-card">
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

  gameList.insertAdjacentHTML("beforeend", gameHTML);

  const newCard = gameList.lastElementChild;
  newCard.addEventListener("click", function () {
    console.log(`Klik på: "${game.title}"`);
    showGameModal(game.id);
  });
}

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
    <article class="dialog-container">
      <div class="dialog-image-container">
        <img src="../img/tilbageknap.png" class="go-back" alt="Tilbage" />
        <div class="age">
          <p>${game.age}</p>
        </div>
        <img src="${game.image}" alt="${game.title}" class="dialog-image" />
      </div>
      <div class="dialog-description-container">
        <h2 class="dialog-header">${game.title}</h2>
        <div class="dialog-tag-container">
          <div class="tags">
            <p>${game.players.min}-${game.players.max}</p>
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
          ${game.description} ${game.rules}
        </p>
        <div class="dialog-bottom-container">
          <div class="difficulty-big-tag">
            <p>${game.difficulty}</p>
          </div>
          <div class="shelf-big-tag">
            <p>Hylde: <strong>${game.shelf}</strong></p>
          </div>
        </div>
      </div>
      <div class="dialog-user-rating"></div>
      <div class="dialog-might-like"></div>
    </article>
  `;

  document.querySelector("#game-dialog").showModal();
}

// Luk dialog på klik af X
document.querySelector("#close-dialog").addEventListener("click", () => {
  document.querySelector("#game-dialog").close();
});

// Kald getGames når vi er på spilgalleri siden og DOM'en er loaded
if (document.querySelector(".spilgalleri-titel")) {
  document.addEventListener("DOMContentLoaded", getGames);
}
