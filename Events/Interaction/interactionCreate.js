const { Client, CommandInteraction, MessageEmbed, Collection } = require("discord.js");
const cooldowns = new Map();
module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            const Embed = new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ An error occured while running this command.")
            if (!command) return interaction.reply({ embeds: [Embed] })
                && client.commands.delete(interaction.commandName)

            // Cooldowns ! //
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Collection());
            };
            const current_time = Date.now();
            const time_stamps = cooldowns.get(command.name);
            const cooldown_amonut = (command.cooldown) * 1000;
            if (time_stamps.has(interaction.user.id)) {
                const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amonut;

                if (expiration_time > current_time) {
                    var reply;
                    var time_left = (expiration_time - current_time) / 1000;
                    if (time_left > 3600) {
                        time_left = time_left / 3600
                        reply = `Hey there ! You can use **${command.name}** command in another **${time_left.toFixed(1)}hr** !`;
                    } else if (time_left > 60) {
                        time_left = time_left / 60
                        reply = `Hey there ! You can use **${command.name}** command in another **${time_left.toFixed(1)}min** !`;
                    } else {
                        reply = `Hey there ! You can use **${command.name}** command in another **${time_left.toFixed(1)}sec** !`;
                    }
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setDescription(`${reply}`)
                                .setColor('BLACK')
                        ], ephemeral: true
                    });
                    return;
                }
            }
            time_stamps.set(interaction.user.id, current_time);
            setTimeout(() => {
                time_stamps.delete(interaction.user.id);
            }, cooldown_amonut);

            command.execute(interaction, client)

        }
    }

}