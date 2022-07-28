import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from '../types';
import { team, google, espn } from './sub-commands';

const usedCommandRecently = new Set();

export const ScoreCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Returns a game of your choice!'),
  async run(interaction) {
    if (usedCommandRecently.has(interaction.user.id)) {
      await interaction.reply({
        content:
          'Please wait at least 15 seconds before using this command again.',
      });
    } else {
      const addCooldown = usedCommandRecently.add(interaction.user.id);
      setTimeout(() => {
        usedCommandRecently.delete(interaction.user.id);
      }, 15000);
      if (interaction.options.getSubcommand() === 'team') {
        addCooldown;
        await team(interaction);
      } else if (interaction.options.getSubcommand() === 'google') {
        addCooldown;
        await google(interaction);
      } else if (interaction.options.getSubcommand() === 'espn') {
        addCooldown;
        await espn(interaction);
      }
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
