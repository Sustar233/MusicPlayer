

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
var fs = require('fs')

const files = fs.readdirSync('./')

console.log(files);

let songsList = []
let songList = files.forEach(
    file => {
        if (!/\.mp3$/.test(file)) { return }
        let songName = file.slice(0, -4)
        songsList.push({
            title: songName,
            link: 'static/music/' + songName + '.mp3',
            cover: 'static/music/' + songName + '.png'
        })
    }
)

let musicList = JSON.stringify(songsList)
console.log(songsList);

fs.writeFile('./songsList.json', musicList, function (err) {
    if (err) { res.status(500).send('Server is error...') }
})
