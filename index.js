require(`dotenv`).config();
const fs = require(`fs`);
const path = require(`path`);
const { Client, Collection, Events, GatewayIntentBits } = require(`discord.js`);

if (!process.env.TOKEN) {
	throw new Error(`Missing environment variables!`);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Finding command files and adding them to client.commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, `commands`);
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if (`data` in command && `execute` in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
		} else {
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: `There was an error while executing this command!`, ephemeral: true });
				} else {
					await interaction.reply({ content: `There was an error while executing this command!`, ephemeral: true });
				}
			}
		}
	}
});

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);
