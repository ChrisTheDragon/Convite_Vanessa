const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const openInvitation = document.querySelector(".scroll-cue");

function updateMusicButton(isPlaying) {
  musicToggle.textContent = isPlaying ? "♫ Música ligada" : "♫ Música";
  musicToggle.setAttribute("aria-label", isPlaying ? "Desligar música" : "Ligar música");
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
}

async function playMusic() {
  try {
    await music.play();
    updateMusicButton(true);
  } catch (error) {
    console.error("Não foi possível reproduzir a música.", error);
    musicToggle.textContent = "♫ Áudio indisponível";
    musicToggle.setAttribute("aria-label", "Tentar ligar música novamente");
  }
}

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    updateMusicButton(false);
  }
});

openInvitation.addEventListener("click", async (event) => {
  event.preventDefault();
  playMusic();
  document.getElementById("introducao").scrollIntoView({ behavior: "smooth" });
});

const eventDate = new Date("2026-11-18T18:00:00-03:00").getTime();
const fields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const remaining = Math.max(0, eventDate - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  fields.days.textContent = String(days).padStart(2, "0");
  fields.hours.textContent = String(hours).padStart(2, "0");
  fields.minutes.textContent = String(minutes).padStart(2, "0");
  fields.seconds.textContent = String(remainder).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
