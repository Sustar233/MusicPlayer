<template>
  {{ musicListDatas }}
  <div class="myPlayerWrap">
    <div class="myPlayer">
      <MusicList :value="musicListDatas" />
      <div class="myPlayerControl">
        <MusicPlayer :value="musicListDatas" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicPlayer from './components/MusicPlay.vue'
import MusicList from './components/MusicList.vue'

import musicListDatas from '/static/music/songsList.json';
console.log(musicListDatas);

</script>

<style lang="less" scoped>
.myPlayerWrap {
  position: relative;
  background-color: #f7f3f0;
  width: 1000px;
  padding-top: 40px;
  height: 500px;
  margin: 0 auto;
}

.myPlayerControl {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
}
</style>
