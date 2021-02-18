const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    description: 'Get an image and title from a random r/programmerhumor post',
    execute(msg) {
        fetch('http://www.reddit.com/r/programmerhumor/random.json?limit=1').then(res => res.json()).then(data => msg.channel.send(`>>> ${data[0].data.children[0].data.title}\n${data[0].data.children[0].data.url}`)).catch('error');
    }
}
