import { CommandInteraction } from 'discord.js';
import { scrapeGoogle } from '../../scrapeGoogle';
import { embed, combine } from '../../utils';
import { MessageAttachment } from 'discord.js';
import * as fs from 'fs';
import { scrapeEspn } from '../../scrapeEspn';
export async function site(
  interaction: CommandInteraction,
  usesGoogle: boolean
) {
  const args = interaction.options.getString('input');
  if (args !== null) {
    const join = combine(args);
    const path = `./${join}.png`;
    await interaction.reply({ content: 'Fetching score...' });
    let msg = '';
    let isValidGame = true;
    if (!usesGoogle) {
      [msg, isValidGame] = await scrapeEspn(args);
    } else {
      [msg, isValidGame] = await scrapeGoogle(args);
    }

    if (isValidGame === true) {
      const file = new MessageAttachment(path);
      const embeddedMessage = embed(msg, args, isValidGame);
      await interaction.editReply({
        content: null,
        embeds: [embeddedMessage],
        files: [file],
      });
      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log('path was deleted.');
      });
    } else {
      const embeddedMessage = embed(
        'Could not find game on ESPN or Google.',
        args,
        isValidGame
      );

      await interaction.editReply({
        embeds: [embeddedMessage],
      });
    }
  } else {
    await interaction.reply({
      content: 'Please enter a team name.',
    });
  }
}
