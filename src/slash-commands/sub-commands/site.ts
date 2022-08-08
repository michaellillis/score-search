import { CommandInteraction } from 'discord.js';
import { scrapeUsingGoogle } from '../../scrapeUsingGoogle';
import { embed, combine } from '../../utils';
import { MessageAttachment } from 'discord.js';
import * as fs from 'fs';
import { scrapeUsingESPN } from '../../scrapeUsingESPN';
export async function site(
  interaction: CommandInteraction,
  usesGoogle: boolean,
  usesTeamCommand: boolean
) {
  const args = interaction.options.getString('input');
  if (args !== null) {
    const join = combine(args);
    const path = `./${join}.png`;
    await interaction.reply({ content: 'Fetching score...' });
    let msg = '';
    if (usesTeamCommand === true || usesGoogle === false) {
      msg = await scrapeUsingESPN(args);
    }
    if (usesGoogle === true || msg === 'google') {
      msg = await scrapeUsingGoogle(args);
    }

    if (msg !== 'not live') {
      const file = new MessageAttachment(path);
      const embeddedMessage = embed(msg, args);
      await interaction.editReply({
        content: null,
        embeds: [embeddedMessage],
        files: [file],
      });
      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log('path was deleted');
      });
    } else {
      const embeddedMessage = embed(msg, args);
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
