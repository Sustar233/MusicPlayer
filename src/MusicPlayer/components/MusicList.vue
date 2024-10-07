<template>
    <div>
        <ul class="MusicList">
            <li class="MusicItem" v-for="music in musicListDatas.value" @click="changeSong(music.id)" :key="music.id">
                <span>{{ music.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const musicListDatas = defineProps(['value'])

const emit = defineEmits(["changeSong"])

const changeSong = (musicId) => {
    emit('changeSong', musicId)
}


</script>

<style lang="less">
.MusicList::-webkit-scrollbar {
    display: none;
}

.MusicList {
    padding: 0 100px;
    width: 80%;
    height: 365px;
    overflow-y: scroll;
    margin: 0 auto;
    list-style: none;

    .MusicItem {
        background-color: rgb(189, 189, 207);
        opacity: 0.5;
        padding: 15px 40px;
        border-radius: 10px;
    }

    .MusicItem:nth-child(2n) {
        background-color: rgb(199, 232, 232);
        opacity: 0.6;
    }

    .MusicItem:hover {
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 0 1px #d2d2d2;
        opacity: 0.8;
        cursor: pointer;
    }
}
</style>