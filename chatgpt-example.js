document.querySelectorAll(".audio-player").forEach((player) => {
  const audio = player.querySelector("audio");
  const playToggle = player.querySelector(".play-toggle");
  const slider = player.querySelector(".ghost-input");
  const fill = player.querySelector(".custom-fill");

  // 1. Play/Pause Logic
  playToggle.addEventListener("change", () => {
    if (playToggle.checked) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  // 2. Sync Slider with Audio (as it plays)
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return; // Prevent NaN
    const percent = (audio.currentTime / audio.duration) * 100;
    slider.value = percent;
    fill.style.width = `${percent}%`;
  });

  // 3. Seeking (when user moves slider)
  slider.addEventListener("input", () => {
    const seekTime = (slider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    fill.style.width = `${slider.value}%`;
  });

  // 4. Reset toggle when audio ends
  audio.addEventListener("ended", () => {
    playToggle.checked = false;
    slider.value = 0;
    fill.style.width = "0%";
  });
});
