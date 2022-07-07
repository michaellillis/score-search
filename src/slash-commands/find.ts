import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import { SlashCommand } from '../types';

export const ScoreCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Returns a game of your choice!'),
  async run(interaction) {
    const args = interaction.options.getString('input');
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
