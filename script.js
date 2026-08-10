
const songs = [
    {
        name: "Main Rahoon Ya Na Rahoon",
        artist: "Armaan Malik",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/4f/0e/3b/4f0e3b11-1c7e-5d13-6f87-3e7a4e9a0c5a/cover.jpg/600x600bb.jpg",
        audio: "songs/Armaan_Malik_-_Main_Rahoon_Ya_Na_Rahoon_(mp3.pm).mp3"
    },

    {
        name: "Jeena Jeena",
        artist: "Atif Aslam",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3a/7c/48/3a7c48f8-4a20-7e2c-5a5a-8b0f3b5f2c6b/cover.jpg/600x600bb.jpg",
        audio: "songs/jeena-jeena.mp3"
    },

    {
        name: "Tere Sang Yaara",
        artist: "Atif Aslam",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7a/4b/2d/7a4b2d3e-1d7e-8a2c-5c4e-9b5f2d7a3e1c/cover.jpg/600x600bb.jpg",
        audio: "songs/tere-sang-yaara.mp3"
    }
];


// -----------------------------
// Variables
// -----------------------------

let currentSong = 0;
let isPlaying = false;


// -----------------------------
// Audio
// -----------------------------

const audio = new Audio();

audio.volume = 1;


// -----------------------------
// HTML Elements
// -----------------------------

const cover = document.getElementById("cover");

const songName = document.getElementById("song-name");

const artistName = document.getElementById("artist-name");

const playButton = document.getElementById("play");

const prevButton = document.getElementById("prev");

const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");

const playlistItems =
    document.querySelectorAll(".playlist-item");


// -----------------------------
// Load Song
// -----------------------------

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    songName.textContent = song.name;

    artistName.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.audio;

    audio.load();

    progress.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";


    // Active playlist item

    playlistItems.forEach(item => {

        item.classList.remove("active");

    });


    if (playlistItems[currentSong]) {

        playlistItems[currentSong]
            .classList.add("active");

    }


    isPlaying = false;

    playButton.textContent = "▶";
}


// -----------------------------
// Play Song
// -----------------------------

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            playButton.textContent = "❚❚";

        })
        .catch(error => {

            console.log(
                "Audio could not be played:",
                error
            );

        });

}


// -----------------------------
// Pause Song
// -----------------------------

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playButton.textContent = "▶";

}


// -----------------------------
// Play / Pause Button
// -----------------------------

playButton.addEventListener("click", () => {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


// -----------------------------
// Next Song
// -----------------------------

nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// -----------------------------
// Previous Song
// -----------------------------

prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// -----------------------------
// Playlist
// -----------------------------

playlistItems.forEach(item => {

    item.addEventListener("click", () => {

        const index =
            Number(item.getAttribute("data-index"));

        loadSong(index);

        playSong();

    });

});


// -----------------------------
// Update Progress
// -----------------------------

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTime.textContent =
        formatTime(audio.currentTime);

});


// -----------------------------
// Song Duration
// -----------------------------

audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// -----------------------------
// Change Progress
// -----------------------------

progress.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }

    const newTime =
        (progress.value / 100) * audio.duration;

    audio.currentTime = newTime;

});


// -----------------------------
// Volume Control
// -----------------------------

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// -----------------------------
// Automatically Play Next Song
// -----------------------------

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// -----------------------------
// Format Time
// -----------------------------

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return (
        minutes +
        ":" +
        seconds.toString().padStart(2, "0")
    );

}


// -----------------------------
// Initial Song
// -----------------------------

loadSong(0);

