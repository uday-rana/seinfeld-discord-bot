require(`dotenv`).config();
const { REST, Routes } = require(`discord.js`);
const fs = require(`fs`);
const path = require(`path`);

if (!(process.env.TOKEN && process.env.CLIENT_ID)) {
	throw new Error(`Missing environment variables!`);
}

if (process.env.GUILD_ID) {
	console.log(`GUILD_ID environment variable found, deploying guild commands`);
}

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, `commands`);
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(`.js`));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if (`data` in command && `execute` in command) {
		commands.push(command.data.toJSON());
	} else {
		console.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			process.env.GUILD_ID
				? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
				: Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands }
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
