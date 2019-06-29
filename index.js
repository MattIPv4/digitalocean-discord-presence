const Discord = require("discord-rpc");

const clientId = "593013925184798730";
const doStatus = {
    state: "do.co/community",
    details: "Community Q&A + Tutorials",
    largeImageKey: "do_logo_icon_blue",
    largeImageText: "digitalocean.com",
    smallImageKey: "sammy-front",
    smallImageText: "Sammy the Shark",
};

const run = () => {
    const rpc = new Discord.Client({transport: "ipc"});

    rpc.on("ready", () => {
        console.log("Connected to Discord as", rpc.user.username);
        rpc.setActivity(doStatus)
    });

    rpc.on("disconnected", () => {
        console.log("Disconnected from Discord, re-attempting login in 15 seconds");
        setTimeout(() => {
            run();
        }, 15000)
    });

    rpc.login({clientId}).catch(() => {
        console.log("Failed to login, re-attempting in 5 seconds");
        setTimeout(() => {
            run();
        }, 5000)
    })
};

run();
