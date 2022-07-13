import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from '../types';
import { scrape } from '../scraper';
import { embed, combine } from '../utils';
import { MessageAttachment } from 'discord.js';
import * as fs from 'fs';

const usedCommandRecently = new Set();

export const ScoreCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Returns a game of your choice!'),
  async run(interaction) {
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
      const msg = await scrape(args);
      if (msg !== 'not live') {
        const file = new MessageAttachment(path);
        const embeddedMessage = embed(msg, args);
        await interaction.editReply({
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
  },
};

ScoreCommand.command.addSubcommand((subcommand) =>
  subcommand
    .setName('team')
    .setDescription('Searches for the current or past score of a given team.')
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('The name of the team you would like to search.')
        .setRequired(true)
    )
);
