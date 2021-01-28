const prefix = '!'
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const html = require('./html.js');
let commandList = [];
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv').config({ path: "./.env" });

const TOKEN = process.env.BOTTOKEN;
client.login(TOKEN);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module\
    commandList.push(command.name);
    client.commands.set(command.name, command);
}
commandList = commandList.map(s => `\`${prefix}${s}\``.toLowerCase());

client.once('ready', () => {
    console.log('you are good to go')
})

client.on('message', html.html)
client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    if (msg.content == `${prefix}help`) {
        msg.channel.send({
            "embed":
              {
                "title": "__Command List__",
                "description": `${commandList.toString().replace(/,/g, "\n")}`,
                "color": 4234092
              }
          });
    }
})
client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
    }
})
