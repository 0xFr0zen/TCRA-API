/* Config */
const twitchTvHandle = "REPLACE_WITH_USERNAME"; // Username / Botname
const oAuth = "oauth:REPLACE_WITH_TOKEN"; // https://twitchtokengenerator.com/ <- Generation of an oAuth token only replace after `oath:`
const channelToConnectTo = "REPLACE_WITH_CHANNEL"; // Channel where the bot should listen

/* Default Variables to fall back to [DO NOT TOUCH] */
const PAUSE_DURATION = 30 * 1000; // 30 seconds -- Not Used Right now
var DISPLAY_DURATION = 10 * 1000; // 10 seconds -- Default Duration if not configured in custom

/* DOM [DO NOT TOUCH] */
const container = document.querySelector(".alerts");
const img = new Image();
const queue = new Queue();


/* Custom Redemption Alerts */
var customRedeemAlerts = [
    {
    "name": "REPLACE_WITH_REDEMPTION_NAME", // Correct name of the redemption
    "text":  " REPLACE_WITH_TEXT_YOU_WANT", // Text to be displayed | For Redemptions with Text Input put #REPLACEWITHCONTENT# to input the user text to the Alert
    "gif": "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif", // Either a link or a file in the current folder
    "sound": "horn.wav", // File in current folder
    "duration": 10 // Duration in seconds
  }
];

/* Custom Command Alerts */
var customCommandAlerts = [
  {
    "name": "REPLACE_WITH_COMMAND_NAME", // Name of the command
    "access": "4", // 0 broadcaster < 1 mod < 2 subscriber < 3 vip < 4 all
    "text": " REPLACE_WITH_TEXT_YOU_WANT", // Text to be displayed | For Redemptions with Text Input put #REPLACEWITHCONTENT# to input the user text to the Alert
    "gif": "test-pattern.jpeg", // Either a link or a file in the current folder
    "sound": "Magic_Chime.mp3", // File in current folder
    "duration": 10, // Duration in seconds
    "cooldown": 60 // Cooldown in seconds | NO USE RIGHT NOW
  }
];

const wait = async duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

ComfyJS.Init(twitchTvHandle, oAuth, channelToConnectTo);


ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(`!${command} was typed in chat`);
  for(var i = 0; i < customCommandAlerts.length; i++) {
    if(command == customCommandAlerts[i].name) {
      console.log(customCommandAlerts[i]);
      var access = customCommandAlerts[i].access;
      if(flags.broadcaster || access == 4) {
        InitAlert(user, message, customCommandAlerts[i]);
      } else if((flags.mod && access > 0) || (flags.subscriber && access > 1) || (flags.vip && access > 2)) {
        InitAlert(user, message, customCommandAlerts[i]);
      } else {
        console.log(`!${user} didn't have the required rights to access this command!`);
      }
      break;
    }
  }
  console.log( user, command, message, flags, extra );
};


ComfyJS.onReward = ( user, reward, cost, extra ) => {
  for (var i = 0; i < customRedeemAlerts.length; i++) {
    if(reward == customRedeemAlerts[i].name) {
      InitAlert(user, extra, customRedeemAlerts[i]);
      break;
    }
  }
  console.log( user, reward, cost, extra );
}

// No use right now. Maybe some integration to greet vips, subscriber or whatever on first message?
ComfyJS.onChat = (user, message, flags, self, extra) => {
    console.log(user + ":", message, flags);
};

function InitAlert(user, msg, opts) {
  var sound = null; 
  if (opts.sound != "") {
    sound = new Audio(opts.sound);
  }
  content = opts.text.replace(/#([^#]+)#/g, msg);
  DISPLAY_DURATION = opts.duration * 1000;
  new gifAlert(user, opts.gif, sound, content);
}

function gifAlert(user, gif, audio, text) {
  queue.add(async () => {
    if(audio) {
      audio.play();
    }
    container.innerHTML = `
      <h1 class="text-shadows">${user + text}</h1>
      <img src="${gif}" />
    `;
    container.style.opacity = 1;
    await wait(DISPLAY_DURATION);
    if (!queue.isLooping) {
      container.style.opacity = 0;
    }
  });
}
