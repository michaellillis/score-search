import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from '../types';
import { team, google, espn } from './sub-commands';

const usedCommandRecently = new Set();

export const ScoreCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Returns a game of your choice!'),
  async run(interaction) {
    if (interaction.options.getSubcommand() === 'team') {
      await team(interaction, usedCommandRecently);
    } else if (interaction.options.getSubcommand() === 'google') {
      await google(interaction, usedCommandRecently);
    } else if (interaction.options.getSubcommand() === 'espn') {
      await espn(interaction, usedCommandRecently);
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
ScoreCommand.command.addSubcommand((subcommand) =>
  subcommand
    .setName('google')
    .setDescription(
      'Google searches for the current or past score of a given team.'
    )
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('The name of the team you would like to search.')
        .setRequired(true)
    )
);
ScoreCommand.command.addSubcommand((subcommand) =>
  subcommand
    .setName('espn')
    .setDescription(
      'Searches for the current or past score of a given team on ESPN'
    )
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('The name of the team you would like to search.')
        .setRequired(true)
    )
);
