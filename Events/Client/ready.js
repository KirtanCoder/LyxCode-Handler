const mongoose = require('mongoose')
const { MANGODB } = require('../../config.json')
module.exports = {
    name: "ready",
    execute(client) {
        console.log('The Client is Now Ready 💚')
        client.user.setActivity(`| in | ${client.guilds.cache.size} Server `, { type: 'WATCHING' });

        if (!MANGODB) return;
        mongoose.connect(MANGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('The Client Is Now Connected to the DataBase 💚')
        }).catch((err) => {
            console.log(err)
        });
    }
}
