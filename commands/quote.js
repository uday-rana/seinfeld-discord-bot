const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
	data: new SlashCommandBuilder().setName(`quote`).setDescription(`Provides a random Seinfeld quote.`),
	execute: async (interaction) => {
		let res = await fetch(`https://jade-simple-nose.glitch.me/random`);
		let data = await res.json();
		const quoteEmbed = new EmbedBuilder()
			.setColor(`Gold`)
			.setAuthor({ name: data.author })
			.setDescription(data.quote)
			.addFields({ name: `Season`, value: data.season }, { name: `Episode`, value: data.episode });
        data.image && quoteEmbed.setThumbnail(data.image);
		await interaction.reply({ embeds: [quoteEmbed] });
	},
};
