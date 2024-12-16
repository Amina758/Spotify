// Initialize variables
let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio('songs/1.mp3');
const songs = [
    { name: "Aseer-e-Muhabat", file: "songs/1.mp3" },
    { name: "Tera mera jhan ", file: "songs/2.mp3" },
    { name: "Gentlemen", file: "songs/3.mp3" },
    { name: "Do bol", file: "songs/4.mp3" },
    { name: "Pehli siii Muhabat", file: "songs/5.mp3" },

];

// DOM Elements
const masterPlay = document.getElementById("masterPlay");
const progressBar = document.getElementById("progressBar");
const songItems = document.querySelectorAll(".songItemPlay");
const currentSong = document.getElementById("currentSong");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

// Play or pause song
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
    } else {
        audio.play();
        masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    }
    isPlaying = !isPlaying;
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

// Seek through the song
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Play selected song
function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].file;
    currentSong.innerText = `Playing: ${songs[index].name}`;
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
}

// Event listeners for each song
songItems.forEach((item, index) => {
    item.addEventListener("click", () => playSong(index));
});

// Play or pause master button
masterPlay.addEventListener("click", togglePlay);

// Next/Previous buttons
next.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

prev.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});
