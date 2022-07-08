import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import { SlashCommand } from '../types';
import { scrape } from '../scraper';

export const ScoreCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Returns a game of your choice!'),
  async run(interaction) {
    const args = interaction.options.getString('input');
    if (args !== null) {
      scrape(args);
    } else {
      await interaction.reply({ content: 'Please enter a team name.' });
    }
    await interaction.reply({
      content: args,
    });
  },
};
ScoreCommand.command.addSubcommand((subcommand) =>
  subcommand
    .setName('team')
    .setDescription('Searches for ')
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('The name of the team you want to search for')
        .setRequired(true)
    )
);
