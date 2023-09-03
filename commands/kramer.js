const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function generatePrompt(message) {
  return `Respond to following prompt enclosed within quotes as Cosmo Kramer from the sitcom Seinfeld: "${message}"`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`kramer`)
    .setDescription(`Replies as Kramer!`)
    .addStringOption((option) => {
      option
        .setName("message")
        .setDescription("The message to reply to")
        .setRequired(true)
        .setMaxLength(200);
    }),
  execute: async (interaction) => {
    try {
      await interaction.deferReply();
      const message = interaction.options.getString("message");
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(message),
        temperature: 0.6,
      });
      await interaction.editReply(completion.data.choices[0].text);
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
      await interaction.editReply(`An error occurred.`)
    }
  },
};
