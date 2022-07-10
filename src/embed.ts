import { MessageEmbed } from 'discord.js';

export function embed(url: string, input: string): MessageEmbed {
  const path = `attachment://${input}.png`;
  input = input
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  const embed = new MessageEmbed()
    .setTitle(`${input} Game`)
    .setColor('#0099ff')
    .setDescription(`[Link to the ${input} game!](${url})`)
    .setImage(path)
    .setTimestamp();

  return embed;
}
