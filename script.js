
const songs = [
    {
        name: "Main Rahoon Ya Na Rahoon",
        artist: "Armaan Malik",
        cover: "assests/1623410-i-5fe8c00b81e1.jpeg",
        audio: "songs/Armaan_Malik_-Main_Rahoon_Ya_Na_Rahoon_(mp3.pm).mp3"
    },

    {
        name: "Jeena Jeena",
        artist: "Atif Aslam",
        cover: "assests/images (1).jpeg",
        audio: "songs/AUD-20260810-WA0003.mp3"
    },

    {
        name: "Tere Sang Yaara",
        artist: "Atif Aslam",
        cover: "assests/images.jpeg",
        audio: "songs/tere-sang-yaara.mp3"
    }
];


// =============================
// Variables
// =============================

let currentSong = 0;
let isPlaying = false;


// =============================
// Audio
// =============================

const audio = new Audio();

audio.volume = 1;


// =============================
// HTML Elements
// =============================

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


// =============================
// Load Song
// =============================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    // Song information
    songName.textContent = song.name;

    artistName.textContent = song.artist;

    // Cover image
    cover.src = song.cover;

    // Audio
    audio.src = song.audio;

    audio.load();

    // Reset progress
    progress.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";


    // Update active playlist item
    playlistItems.forEach(item => {
        item.classList.remove("active");
    });

    if (playlistItems[currentSong]) {
        playlistItems[currentSong].classList.add("active");
    }

    // Reset play button
    isPlaying = false;

    playButton.textContent = "▶";
}


// =============================
// Play Song
// =============================

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            playButton.textContent = "❚❚";

        })
        .catch(error => {

            console.log("Audio error:", error);

            isPlaying = false;

            playButton.textContent = "▶";

            alert(
                "Ye song play nahi ho raha. Audio file ka naam aur songs folder ka path check karo."
            );

        });
}


// =============================
// Pause Song
// =============================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playButton.textContent = "▶";
}


// =============================
// Play / Pause
// =============================

playButton.addEventListener("click", () => {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


// =============================
// Next Song
// =============================

nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();
});


// =============================
// Previous Song
// =============================

prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    playSong();
});


// =============================
// Playlist
// =============================

playlistItems.forEach(item => {

    item.addEventListener("click", () => {

        const index =
            Number(item.getAttribute("data-index"));

        // Selected song load
        loadSong(index);

        // Selected song play
        playSong();

    });

});


// =============================
// Update Progress
// =============================

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


// =============================
// Song Duration
// =============================

audio.addEventListener("loadedmetadata", () => {

    if (!isNaN(audio.duration)) {

        duration.textContent =
            formatTime(audio.duration);

    }
});


// =============================
// Change Progress
// =============================

progress.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }

    const newTime =
        (progress.value / 100) * audio.duration;

    audio.currentTime = newTime;
});


// =============================
// Volume
// =============================

volume.addEventListener("input", () => {

    audio.volume = Number(volume.value);

});


// =============================
// Song End
// =============================

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();
});


// =============================
// Audio Error
// =============================

audio.addEventListener("error", () => {

    console.log(
        "Audio file not found:",
        songs[currentSong].audio
    );

});


// =============================
// Format Time
// =============================

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


// =============================
// Initial Song
// =============================

loadSong(0);

