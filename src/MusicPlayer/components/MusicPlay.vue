<template>
  <div :class="['musicContainer', { isPlay }]">
    <div class="musicInfo">
      <div class="musicTitle">{{ curMusic.title }}</div>
      <div class="progressContainer" ref="progressContainer" @click="setProgress">
        <div class="progress" :style="{ width: curProgress }"></div>
      </div>
    </div>
    <div class="musicCover">
      <img :src="curMusic.cover" alt="" />
    </div>
    <div class="musicControls">
      <div class="actionBtn" @click="changeSong('pre')">
        <i class="fas fa-backward">last</i>
      </div>
      <div :class="['actionBtn', 'actionBtnBig']" ref="playSongBtn" @click="playSong">
        <i :class="`fas ${isPlay ? 'fa-pause' : 'fa-play'}`">O</i>
      </div>
      <div class="actionBtn" @click="changeSong('next')">
        <i class="fas fa-forward">next</i>
      </div>
    </div>
    <audio ref="audio" :src="curMusic.link" @timeupdate="updateProgress" @ended="changeSong('next')"></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import musicList from '/static/music/songsList.json';

// const musicList = [
//   {
//     title: '打上花火',
//     link: 'static/music/7月の翼.mp3',
//     cover: 'static/music/7月の翼.png'
//   }
// ]

let isPlay = ref(false)
let curMusic = ref({})
let curIndex = ref(0)
let curProgress = ref('0%')
const playSongBtn = ref(null)
const audio = ref(new Audio());

function playSong() {
  audio.value.play()
  isPlay.value ? audio.value.pause() : audio.value.play()
  isPlay.value = !isPlay.value;
}
function changeSong(cmd) {
  if (cmd === 'pre') {
    curIndex.value--
    if (curIndex.value < 0) curIndex.value = musicList.length - 1
  }
  else if (cmd === 'next') {
    curIndex.value = (curIndex.value + 1) % musicList.length
  }
  curMusic.value = musicList[curIndex.value]

  if (cmd === 'cur') return

  this.isPlay = true
  nextTick(() => {
    console.log('nextTick')
    audio.value.play();
  });
}
function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  curProgress.value = `${progressPercent}%`;
}
function setProgress(e) {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.value.duration;
  audio.value.currentTime = (clickX / width) * duration;
}

onMounted(() => {
  changeSong('cur');
})
</script>

<style lang="less">
.musicContainer {
  position: relative;
  margin: 0 auto;
  margin-top: 80px;
  padding: 20px 30px;
  height: 100px;
  width: 420px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgba(8, 182, 212, 0.822);
  display: flex;
  z-index: 10;
}

.musicInfo {
  position: absolute;
  top: 0;
  left: 30px;
  width: 360px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;

  .musicTitle {
    font-size: 16px;
    line-height: 22px;
  }

  .progressContainer {
    margin: 10px 0;
    height: 4px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;

    .progress {
      height: 100%;
      width: 0%;
      background-color: #0decfc;
      border-radius: inherit;
      transition: width 0.1s linear;
    }
  }
}

.musicCover {
  position: relative;
  top: -50px;
  width: 110px;
  height: 110px;
  margin-right: 30px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fff;
  }

  img {
    height: inherit;
    width: inherit;
    border-radius: 50%;
    object-fit: cover;
    animation: rotate 3s linear infinite;
    animation-play-state: paused;
  }
}

.musicControls {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  .actionBtn {
    background-color: #fff;
    color: #0decfc;
    cursor: pointer;
    font-size: 20px;
    padding: 10px;
    margin: 0 20px;
  }

  .actionBtnBig {
    color: #0cdae9;
    font-size: 30px;
  }
}

// 播放状态
.musicContainer.isPlay {
  .musicInfo {
    opacity: 1;
    transform: translateY(-100%);
  }

  .musicCover {
    img {
      animation-play-state: running;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>