const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const volumeContainer = document.querySelector(".volume-container");
const volume = document.querySelector(".volume");
const muteUnmute = document.querySelector("#mute-unmute");
const songList = document.querySelectorAll("li");
// console.log(songList);
// console.log(songList[0].innerText);
const themeDot = document.querySelectorAll(".dot");




//song titles
const songs = ['nare', 'nazani', 'elise', 'makhmuraghjik'];

//keep track of songs
let songIndex = 2;

//Initially load song into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song){
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}


function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    // songList[songIndex].style.color = "#cdc2d0";    
    audio.play();
}


function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playSong();
}

function updateProgress(event){
    const duration = event.target.duration;
    const currentTime = event.target.currentTime;
    // console.log(currentTime);
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;    
}


function setProgress(event) {
    const width = this.clientWidth;
    // console.log(width);
    const clickX = event.offsetX;
    // console.log(clickX);
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


function setVolume(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const volumeProgress = (clickX / width) * 100;
    volume.style.width = `${volumeProgress}%`;
    audio.volume = clickX/width;
    muteUnmute.querySelector('i.fas').classList.remove('fa-volume-mute');
    muteUnmute.querySelector('i.fas').classList.add('fa-volume-up');

}


function mute(){
    const isUnmuted =  muteUnmute.querySelector('i.fas').classList.contains('fa-volume-up');
    // const isMuted = audio.muted;
    if(isUnmuted){
        muteUnmute.querySelector('i.fas').classList.remove('fa-volume-up');
        muteUnmute.querySelector('i.fas').classList.add('fa-volume-mute');
        audio.volume = 0;
        volume.style.width = "0%";
    }
    else{
        muteUnmute.querySelector('i.fas').classList.remove('fa-volume-mute');
        muteUnmute.querySelector('i.fas').classList.add('fa-volume-up');
        audio.volume = 0.5;
        volume.style.width = "100%"      
    }    
}


//Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
    
})



for(let i=0; i < themeDot.length; i++){
    themeDot[i].addEventListener('click', function(){
        let mode = this.dataset.mode;
        setTheme(mode)
    })
}


function setTheme(mode){
    if(mode == "light"){
        document.getElementById('theme').href = "lightmode.css"
    }
    if(mode == "dark"){
        document.getElementById('theme').href = "darkmode.css"
    }

}


for(let j = 0; j < songList.length; j++ ){
    songList[j].addEventListener('click', function(){
        
        let  song = songList[j].innerText
        loadSong(song)
        playSong()
        
        // songList[i].style.color = "grey"
        
    })
}


//Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);  
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)
volumeContainer.addEventListener('click', setVolume)
muteUnmute.addEventListener('click', mute)
