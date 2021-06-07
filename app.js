const Discord = require("discord.js");
const client = new Discord.Client();
const https = require("https");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const channelID = "851509394893963285";

function sendToChannel(str) {
  client.channels.cache.get(channelID).send(str);
}

client.on("message", (message) => {
  if (message.content === "%server") {
    https
      .get("https://api.mcsrvstat.us/2/51.79.162.52:25579", (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
          rawData += chunk;
        });

        res.on("end", () => {

          const data = JSON.parse(rawData);
          console.log(data);

          if (data.online) {
            sendToChannel("https://api.mcsrvstat.us/icon/51.79.162.52:25579");

            sendToChannel(
              `:white_check_mark: IP: ${data.ip}:${
                data.port
              }\n:white_check_mark: Status: ${
                data.online ? "Online" : "Offline"
              }\n:white_check_mark: Message: ${
                data.motd.raw
              }\n:white_check_mark: Version: ${
                data.version
              }\n:white_check_mark: Online: ${data.players.online}/${
                data.players.max
              }`
            );

            let players = ">>> **Players**\n";
            if (data.players.online) {
              data.players.list.forEach((playerName, i) => {
                players += `\t${i + 1}. ${playerName}\n`;
              });

              sendToChannel(players);
            }
          } else if (data.online === false) {
            sendToChannel(":x: Server is offline! :x:");
          }

        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  }
});

client.login("ODQyNjg3MDkxOTI1NTgxODM0.YJ47gw.FadApRY2LBhHRXULPb83sAIO2Xo");

// https://discord.com/oauth2/authorize?client_id=842687091925581834&permissions=522320&scope=bot
// 851509394893963285
