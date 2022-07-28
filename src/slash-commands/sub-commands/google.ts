import { CommandInteraction } from 'discord.js';
import { backupScrape } from '../../backupScraper';
import { embed, combine } from '../../utils';
import { MessageAttachment } from 'discord.js';
import * as fs from 'fs';
export async function google(
  interaction: CommandInteraction,
  usedCommandRecently: Set<any>
) {
  console.log('used google');
  const args = interaction.options.getString('input');
  if (usedCommandRecently.has(interaction.user.id)) {
    await interaction.reply({
      content:
        'Please wait at least 15 seconds before using this command again.',
    });
  } else if (args !== null) {
    const join = combine(args);
    const path = `./${join}.png`;
    await interaction.reply({ content: 'Fetching score...' });
    let msg = '';
    msg = await backupScrape(args);
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
      usedCommandRecently.add(interaction.user.id);
      setTimeout(() => {
        usedCommandRecently.delete(interaction.user.id);
      }, 15000);
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
