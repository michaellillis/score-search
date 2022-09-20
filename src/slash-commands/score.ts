import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from '../types';
import { site } from './sub-commands';

const usedCommandRecently = new Set();

export const ScoreCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Returns the box score of a chosen team/game.'),
  async run(interaction) {
    if (usedCommandRecently.has(interaction.user.id)) {
      await interaction.reply({
        content:
          'Please wait at least 15 seconds before using this command again.',
      });
    } else {
      usedCommandRecently.add(interaction.user.id);
      setTimeout(() => {
        usedCommandRecently.delete(interaction.user.id);
      }, 15000);

      let usesGoogle = interaction.options.getSubcommand() === 'google';

      await site(interaction, usesGoogle);
    }
  },
};

ScoreCommand.command.addSubcommand((subcommand) =>
  subcommand
    .setName('google')
    .setDescription(
      'Google searches for the current or past score of a given team.'
    )
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription(
          'The name of the team/matchup you would like to search.'
        )
        .setRequired(true)
    )
);
ScoreCommand.command.addSubcommand((subcommand) =>
  subcommand
    .setName('espn')
    .setDescription(
      'Searches for the live or past score of a given team on ESPN.'
    )
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription(
          'The name of the team/matchup you would like to search.'
        )
        .setRequired(true)
    )
);
//
