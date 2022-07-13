import { MessageEmbed } from 'discord.js';
import { combine } from './joinWords';
export function embed(url: string, input: string): MessageEmbed {
  const join = combine(input);
  const path = `attachment://${join}.png`;
  console.log(path);
  let splitinput: string = '';
  if (input.indexOf(' ') >= 0) {
    splitinput = input
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  } else {
    splitinput = input[0].toUpperCase() + input.substring(1);
  }
  const embed = new MessageEmbed()
    .setTitle(`${splitinput} Game`)
    .setColor('#0099ff')
    .setDescription(`[Link to the ${splitinput} game!](${url})`)
    .setImage(path)
    .setTimestamp();

  return embed;
}
