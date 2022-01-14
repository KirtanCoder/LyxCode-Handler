const { CommandInteraction } = require('discord.js')

module.exports = {
    name: "ping",
    description: "ping",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        interaction.reply({ content: "Pong" })
    }
}