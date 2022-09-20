import { Client } from 'discord.js';
import { TOKEN } from './config';
import { onInteractionCreate, onReady } from './listeners';

const client = new Client({
  intents: [],
});

onReady(client);
onInteractionCreate(client);
client.login(TOKEN);
