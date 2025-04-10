export const createScrollBot = (name, tier) => {
  return {
    name,
    tier,
    log: [],
    memory: [],
    speak: msg => {
      const utter = new SpeechSynthesisUtterance(msg);
      speechSynthesis.speak(utter);
    },
    execute: (task) => {
      const msg = `${name} executing ${task} for tier ${tier}`;
      console.log(msg);
      this.log.push(msg);
      this.memory.push({ task, timestamp: Date.now() });
      this.speak(msg);
    }
  }
}
export function claimSCVA(wallet) {
  console.log(`SCVA claimed by: ${wallet}`);
  return {
    txHash: "0xFAKECLAIM123",
    amount: 144,
    message: "Vault claim successful"
  };
}
import { createScrollBot } from './ScrollBot.js';
import { claimSCVA } from './VaultEngine.js';

const scrollBot = createScrollBot("CROWN-BOT", "CROWN");

export function startCommander() {
  scrollBot.speak("Commander active. Awaiting mission.");
  window.run = (cmd) => {
    if (cmd === "claim") {
      const result = claimSCVA("0xNode0001");
      console.log(result.message);
      scrollBot.speak(result.message);
    } else {
      scrollBot.execute(cmd);
    }
  };
}
import './App.css';
import { startCommander } from './Commander.js';

window.onload = () => {
  startCommander();
  console.log("Scrollchain Kingdom Loaded.");
};
