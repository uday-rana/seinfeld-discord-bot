# seinfeldBot

This Discord Bot uses my [Seinfeld API](https://github.com/uday-rana/seinfeldAPI) to display a random quote on command. Warning: Spoilers.

Special thanks to [kubikill](https://github.com/kubikill) for allowing me to deploy my bot on his [Coolify](https://coolify.io/) instance.

## History
This project first began as a venture into Python development, when I had zero experience working in Node.js. I used Flask and Discord.py to explore what was possible with a new language. The project relied on a [third-party API by GitHub user wdifruscio](https://github.com/wdifruscio/seinfeld-api).

 Unfortunately, with the elimination of Heroku's free plan, this API was shut down. A few months later, having become proficient in using Node.js to create applications and services, I decided to leverage my newfound knowledge to create my own API for use with the bot.
 
 I was able to finish the API in less than an hour, which inspired me to start up my old bot right away. However, looking at the [old bot's repository](https://github.com/uday-rana/KramerBot), I felt it would be much more efficient to use Node.js and it's robust dev environment together with Discord.js's far more detailed documentation and active community, to create a production-ready application, and thus, the new seinfeldBot was born.

## Features
- Slash command support
- Embed formatting
- Always online
- Manual command deployment
