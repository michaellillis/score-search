import {
  SlashCommandBuilder,
} from '@discordjs/builders';
import { SlashCommand } from '../types';

export const FindCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('find')
    .setDescription('Returns a game of your choice!'),
  async run(interaction) {
    await interaction.reply({
      content: `Success`,
    });
  },
};