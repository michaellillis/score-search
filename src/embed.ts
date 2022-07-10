import { MessageEmbed } from 'discord.js';

const Discord = require('discord.js');

export function embed(url: string, input: string): MessageEmbed {
  input = input
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  const embed = new Discord.MessageEmbed()
    .setTitle(`${input} Game`)
    .setColor('#0099ff')
    .setDescription(`[Link to the ${input} game!](${url})`)
    .setImage('attachment://screenshot.png')
    .setTimestamp();

  return embed;
}
