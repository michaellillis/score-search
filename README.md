# Score Search

> Score Search is a [Discord](https://discord.com/) Bot created by [@TylerJenningsW](https://github.com/TylerJenningsW) and [@MichaelLillis](https://github.com/MichaelLillis) using [TypeScript](https://www.typescriptlang.org/), [Puppeteer](https://pptr.dev/) for web scraping, and [Discord.JS](https://discord.js.org/#/) as a Discord API wrapper.
#

<img src="https://user-images.githubusercontent.com/36655595/188735556-6d2c2039-dc95-44f1-a386-7308379a95f1.jpg" img align="right" width=40%>

## General Information ℹ️
The Score Search Discord bot allows you and your friends to look at live or past sports scores. By using the commands given below, the bot automatically goes to the chosen site (ESPN or Google), searches the game or team you've chosen, and screenshots the game and stats for the whole discord to see. The perfect tool for trash talking on a Football Sunday ;)

## Installation 💻

Run the following commands in terminal/command prompt:
<pre><code>npm install
</code></pre>

## Configuration ⚙️

• Insert your discord bot token and your server id into the .env  
• Run main.ts

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
• Speeds can range from 2-4 seconds (command to bot response)!

## Screen Shots 📷



## Links 🔗

> [Discord.JS - Discord API](https://nodejs.org/en/)

> [Puppeteer - Discord API](https://pptr.dev/)

> [Discord - VoIP and instant messaging platform](https://discord.com/)

> [TypeScript](https://www.typescriptlang.org/)

> [Node.JS](https://discord.js.org/#/)

> [Google](https://www.google.com/)

> [ESPN](https://www.espn.com/)
