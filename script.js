const songs = [
    {
        name: "Midnight Drive",
        artist: "Dreamer",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
        audio: "songs/song1.mp3"
    },

    {
        name: "Ocean Eyes",
        artist: "Billie",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        audio: "songs/song2.mp3"
    },

    {
        name: "Golden Hour",
        artist: "JVKE",
        cover: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
        audio: "songs/song3.mp3"
    }
];


let currentSong = 0;
let isPlaying = false;

const audio = new Audio();

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

const playlistItems = document.querySelectorAll(".playlist-item");


/* Load Song */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    songName.textContent = song.name;
    artistName.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.audio;

    audio.load();

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

    if (isPlaying) {

        audio.pause();

        playButton.textContent = "▶";

        isPlaying = false;

    } else {

        audio.play();

        playButton.textContent = "❚❚";

        isPlaying = true;

    }

});


/* Next Song */

nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "❚❚";

    isPlaying = true;

});


/* Previous Song */

prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "❚❚";

    isPlaying = true;

});


/* Update Progress */

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressValue =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressValue;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


/* Song Duration */

audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


/* Change Progress */

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


/* Volume */

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


/* Song End */

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "❚❚";

    isPlaying = true;

});


/* Playlist */

playlistItems.forEach(item => {

    item.addEventListener("click", () => {

        const index =
            Number(item.getAttribute("data-index"));

        loadSong(index);

        audio.play();

        playButton.textContent = "❚❚";

        isPlaying = true;

    });

});


/* Time Format */

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}


/* First Song */

audio.volume = 1;

loadSong(0);
