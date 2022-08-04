import { CommandInteraction } from 'discord.js';
import { scrape } from '../../scrape';
import { backupScrape } from '../../backupScraper';
import { embed, combine } from '../../utils';
import { MessageAttachment } from 'discord.js';
import * as fs from 'fs';
export async function team(interaction: CommandInteraction) {
  console.log('used main');
  const args = interaction.options.getString('input');
  if (args !== null) {
    const join = combine(args);
    const path = `./${join}.png`;
    await interaction.reply({ content: 'Fetching score...' });
    let msg = '';
    msg = await scrape(args);
    if (msg === 'google') {
      msg = await backupScrape(args);
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
