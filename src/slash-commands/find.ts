import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from '../types';
import { scrape } from '../scraper';
import { timeout } from '../setupTimer';

export const ScoreCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Returns a game of your choice!'),
  async run(interaction) {
    const args = interaction.options.getString('input');
    if (args !== null) {
      await interaction.reply({ content: 'Fetching score...' });
      const msg = await scrape(args);
      await interaction.editReply({ content: msg });
    } else {
      await interaction.reply({ content: 'Please enter a team name.' });
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
