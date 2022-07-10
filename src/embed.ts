import { MessageEmbed } from 'discord.js';
import { combine } from './joinWords';
export function embed(url: string, input: string): MessageEmbed {
  const join = combine(input);
  const path = `attachment://${join}.png`;
  console.log(path);
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
