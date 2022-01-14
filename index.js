const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
module.exports = client;
const { Token } = require('./config.json');
const { glob } = require('glob');
const { promisify } = require('util');
const PG = promisify(glob)
const Ascii = require("ascii-table")

client.commands = new Collection();


["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.maintenance = false;

client.cooldown = new Collection();

client.login(Token);