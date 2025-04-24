// Crown Protocol Terminal — Scrollchain Kingdom

document.addEventListener("DOMContentLoaded", () => {
  // Initial metric randomization
  document.getElementById('vaults-count').textContent = Math.floor(Math.random() * 50) + 100;
  document.getElementById('tx-count').textContent = Math.floor(Math.random() * 300) + 400;
  document.getElementById('tier-score').textContent = Math.floor(Math.random() * 40) + 90;

  // Refresh status
  document.getElementById("refresh-status").addEventListener("click", async () => {
    const dspyStatus = document.getElementById("dspy-status");
    const walletStatus = document.getElementById("wallet-status");

    dspyStatus.innerText = "Refreshing...";
    walletStatus.innerText = "Checking...";
    
    await new Promise(r => setTimeout(r, 1200));
    dspyStatus.innerText = "Online";
    walletStatus.innerText = Math.random() > 0.3 ? "Connected" : "Disconnected";
    document.getElementById("vault-score").innerText = Math.floor(Math.random() * 30) + 70;
  });

  // Mint button interaction
  document.getElementById("mint-vault").addEventListener("click", () => {
    document.querySelector('.form-section').scrollIntoView({ behavior: "smooth" });
    logMessage("Scrollchain: Ready to mint vault.");
  });

  // Crown command processing
  const cmdInput = document.getElementById("crownCommand");
  cmdInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const cmd = cmdInput.value;
      if (!cmd) return;
      addToConsole(`> ${cmd}`);
      cmdInput.value = "";
      await processCommand(cmd);
    }
  });

  function addToConsole(msg) {
    const consoleBox = document.getElementById("consoleOutput");
    consoleBox.innerHTML += `<div>${msg}</div>`;
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }

  async function processCommand(cmd) {
    // Simulate response
    await new Promise(res => setTimeout(res, 1000));
    if (cmd.toLowerCase().includes("mint")) {
      addToConsole("Vault minted successfully!");
      document.getElementById("tx-count").textContent = parseInt(document.getElementById("tx-count").textContent) + 1;
    } else {
      addToConsole("Command executed.");
    }
  }

  function logMessage(msg) {
    const log = document.getElementById("log");
    log.textContent = msg;
  }
});
