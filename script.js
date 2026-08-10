const songs = [
    {
        name: "Midnight Drive",
        artist: "Dreamer",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
        audio: ""
    },

    {
        name: "Ocean Eyes",
        artist: "Billie",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        audio: ""
    },

    {
        name: "Golden Hour",
        artist: "JVKE",
        cover: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
        audio: ""
    }
];


let currentSong = 0;
let isPlaying = false;


/* Elements */

const cover = document.getElementById("cover");
const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist-name");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const playlistItems = document.querySelectorAll(".playlist-item");


/* Change Song */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    songName.textContent = song.name;
    artistName.textContent = song.artist;

    cover.src = song.cover;

    progress.value = 0;

    playlistItems.forEach(item => {
        item.classList.remove("active");
    });

    playlistItems[currentSong].classList.add("active");

    isPlaying = false;

    playButton.textContent = "▶";
}


/* Play / Pause */

playButton.addEventListener("click", () => {

    isPlaying = !isPlaying;

    if (isPlaying) {
        playButton.textContent = "❚❚";
    } else {
        playButton.textContent = "▶";
    }

});


/* Next */

nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

});


/* Previous */

prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

});


/* Playlist Click */

playlistItems.forEach(item => {

    item.addEventListener("click", () => {

        const index = item.getAttribute("data-index");

        loadSong(index);

    });

});


/* Progress */

progress.addEventListener("input", () => {

    console.log("Progress:", progress.value);

});


/* Volume */

volume.addEventListener("input", () => {

    console.log("Volume:", volume.value);

});


/* First Song */

loadSong(0);
