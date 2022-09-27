# Score Search

> Score Search is a [Discord](https://discord.com/) Bot created by [@TylerJenningsW](https://github.com/TylerJenningsW) and [@MichaelLillis](https://github.com/MichaelLillis) using [TypeScript](https://www.typescriptlang.org/), [Puppeteer](https://pptr.dev/) for web scraping, and [Discord.JS](https://discord.js.org/#/) as a Discord API wrapper.

#

<img src="https://user-images.githubusercontent.com/36655595/188735556-6d2c2039-dc95-44f1-a386-7308379a95f1.jpg" img align="right" width=45%>

## General Information ℹ️

The Score Search Discord bot allows you and your friends to look at live or past sports scores. By using the commands given below, the bot automatically goes to the chosen site (ESPN or Google), searches the game or team you've chosen, and screenshots the game and stats for the whole discord to see. The perfect tool for trash talking on a Football Sunday ;)

## Installation 💻

Run the following commands in terminal/command prompt:

<pre><code>yarn install
</code></pre>

## Configuration ⚙️

• Insert your discord bot token and your server id into the .env

<pre><code>yarn build
yarn start
</code></pre>

## Deploy to Heroku 🚀

• Fork this repo to your github  
• Create a new app on heroku  
• Under **Resources** enable the yarn start worker, and disable web  
• Under **Settings** reveal config vars, then insert your token, application id, and guild id.  
• Then, set your buildpacks to the following:

<pre><code>heroku/nodejs
jontewks/puppeteer
</code></pre>

• Under **deploy** connect your Github account and connect the repo  
• Enable automatic deploys

## Commands 📝

##### Find a game/team on ESPN you'd like a score update on (best for advanced statistics):

> /Score espn [team name(s)]

##### Find a game/team on Google you'd like a score update on (best for quick score overview):

> /Score google [team name(s)]

## How it Works 💡

• The scraper searches on Google with the input you give it, attempts to find the box score of the given game, and takes a screenshot to post back to the Discord channel.  
• Since our web scraper searches through Google, you can make the Search as specific as you'd like it to be!  
• If your search fails with the site you've chosen (ESPN or Google), it will attempt the search on the opposing site as well.  
• We adjusted the CSS before the screenshot takes place to allow for clear and relevant information/statistics to display.  
• Speeds can range from 3-5 seconds (command to bot response)!

## Screenshots/Examples 📷

#### '/score google [phillies]' - As an example of wanting to see a live/most recent game the Phillies played!

![0U2ztME](https://user-images.githubusercontent.com/36655595/188792770-9157b5d1-2a1b-4d23-bbf4-b9552afb96f9.png)

#### /score google [eagles vs cowboys 2017] - As an example of wanting to see all games the Eagles/Cowboys played against each other in 2017!

![TOk5bNh](https://user-images.githubusercontent.com/36655595/188792405-b684e3bf-4d94-4553-b731-ccfd78a242fe.png)

#### /score espn [broncos] - As an example of wanting to see a more detailed view of a game (better for box score stats)!

![XVX6ZOt](https://user-images.githubusercontent.com/36655595/189791978-17c2bbc1-2a20-43c6-9194-d1d3e99c5443.png)

#### Screenshot when clicked in Discord:

![vhN3L0T](https://user-images.githubusercontent.com/36655595/189792074-a84d8320-9294-4ff7-8998-6c3fcb67b974.png)

## Links 🔗

> [Discord.JS - Discord API](https://nodejs.org/en/)

> [Puppeteer - Web API](https://pptr.dev/)

> [Discord - VoIP and instant messaging platform](https://discord.com/)

> [TypeScript](https://www.typescriptlang.org/)

> [Node.JS](https://discord.js.org/#/)

> [Google](https://www.google.com/)

> [ESPN](https://www.espn.com/)
