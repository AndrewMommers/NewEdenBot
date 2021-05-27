'use strict';

require('dotenv').config();
const { Client, Message, Guild, WebhookClient, MessageEmbed, GuildMember, DiscordAPIError, Collection} = require('discord.js');
const client = new Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });

const fs = require('fs');

client.commands = new Collection();

console.log('Authenticating Token!');
client.login (process.env.BOT_TOKEN);
    console.log(process.env.BOT_TOKEN);
console.log('Token has been accepted!');

console.log('Bot is now Starting!');

function refresh() {

client.on('ready', async() => {
    console.log(`${client.user.username} Has Successfully Started!`);
    client.user.setActivity(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Members`, {type: 'WATCHING' });
})

setTimeout(refresh, 1000 * 10)
}
refresh()

client.on('guildMemberAdd', member => {
    const welcome = member.guild.channels.cache.find(ch => ch.name ==='welcome')
    var role = member.guild.roles.cache.find(role => role.name === 'Registered Member')
    member.roles.add(role)
    let newEmbed = new MessageEmbed()
        .setColor('#11ff00')
        .setDescription(`${member} joined the server`)
        .setTimestamp();
    welcome.send(newEmbed);
});

client.on('guildMemberRemove', member => {
    const welcome = member.guild.channels.cache.find(ch => ch.name ==='welcome')
    var role = member.guild.roles.cache.find(role => role.name === 'Registered Member')
    member.roles.remove(role)
    let newEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`${member} left the server`)
        .setTimestamp();
    welcome.send(newEmbed);
});