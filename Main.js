const Config = require('./Config.json');
const Djs = require('discord.js');
const Client = new Djs.Client({ intents: 32767 });

Client.login(Config.TOKEN);

Client.on("ready", () => { console.log(`${Client.user.tag} en ligne !`) });

Client.on('presenceUpdate', async (oldPresence, newPresence) => { if(newPresence.user.bot) return;  await newPresence.activities.map(async (statut) => { if(!statut) return; if(statut.type !== "CUSTOM_STATUS") return;  else { if(statut.state.includes(Config.STATUT)) { Client.guilds.cache.get(Config.GUILD_ID).members.cache.get(newPresence.user.id).roles.add(Config.ROLE); } else { Client.guilds.cache.get(Config.GUILD_ID).members.cache.get(newPresence.user.id).roles.remove(Config.ROLE); } } }) })