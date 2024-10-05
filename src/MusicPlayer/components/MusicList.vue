<template>
    <div>
        <ul class="MusicList">
            <li class="MusicItem" v-for="music in musicListDatas.value">
                <button class="play-btn">test</button>
                {{ music.title }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const musicListDatas = defineProps(['value'])
</script>

<style lang="less">
.MusicList {
    padding: 40px;
    width: 80%;
    margin: 0 auto;
    background-color: #f7f1ed;
    list-style: none;


    .MusicItem {
        background-color: rgb(189, 189, 207);
        padding: 15px 40px;
        border-radius: 10px;

        .play-btn {
            visibility: hidden;
        }

    }

    .MusicItem:nth-child(2n) {
        background-color: rgb(199, 232, 232);
    }

    .MusicItem:hover {
        background-color: #ffffff;
        border-radius: 20px;

        .play-btn {
            visibility: visible;
        }
    }
}
</style>