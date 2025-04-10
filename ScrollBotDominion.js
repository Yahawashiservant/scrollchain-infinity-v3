// ScrollBotDominion.js

import fetch from "node-fetch";
import { ethers } from "ethers";

/* ENV VALUES — Inject in Replit or from .env */
const {
  INFURA_ID,
  PRIVATE_KEY,
  TREASURY_WALLET,
  NFT_MINT_CONTRACT,
  N8N_WEBHOOK_URL,
  NOTION_API_KEY,
  NOTION_DB_ID,
  ALLOWED_TIERS
} = process.env;

const provider = new ethers.providers.InfuraProvider("mainnet", INFURA_ID);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(NFT_MINT_CONTRACT, [
  "function mintNFT(address to, string memory tokenURI) public returns (uint256)"
], signer);

/**
 * DOMINION MODE — Master Control Function
 */
export async function scrollBotDominion({ metadataURI, userWallet, tier = "guest" }) {
  const allowed = (ALLOWED_TIERS || "crown,lp,tier1").split(",");

  if (!allowed.includes(tier.toLowerCase())) {
    speak(`Access denied. Tier '${tier}' is not authorized to mint.`);
    throw new Error(`Unauthorized tier: ${tier}`);
  }

  try {
    // Mint NFT
    const tx = await contract.mintNFT(TREASURY_WALLET, metadataURI);
    await tx.wait();
    const txLink = `https://etherscan.io/tx/${tx.hash}`;
    speak(`NFT successfully minted for tier ${tier}. Vault updated.`);

    // Notify n8n
    if (N8N_WEBHOOK_URL) {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "vault_mint",
          metadata: metadataURI,
          tier,
          wallet: userWallet,
          tx: tx.hash,
          timestamp: Date.now()
        })
      });
    }

    // Log to Notion
    if (NOTION_API_KEY && NOTION_DB_ID) {
      await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NOTION_API_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
          parent: { database_id: NOTION_DB_ID },
          properties: {
            Name: { title: [{ text: { content: `Vault NFT (${tier})` } }] },
            Wallet: { rich_text: [{ text: { content: userWallet } }] },
            Tier: { select: { name: tier } },
            TxHash: { url: txLink }
          }
        })
      });
    }

    return {
      status: "success",
      tx: tx.hash,
      tier,
      userWallet
    };

  } catch (err) {
    speak("ScrollBot reports: minting failed.");
    throw new Error(`Mint failed: ${err.message}`);
  }
}

function speak(msg) {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(msg);
    speechSynthesis.speak(utter);
  } else {
    console.log(`[ScrollBot] ${msg}`);
  }
}
import { scrollBotDominion } from "./ScrollBotDominion.js";

scrollBotDominion({
  metadataURI: "ipfs://QmYourMetaHash",
  userWallet: "0xYourWallet",
  tier: "lp"
});
touch ScrollBotDominion.js
# Paste this file

git add ScrollBotDominion.js
git commit -m "Add ScrollBot Dominion Mode - full mint engine, logs, tier AI"
git push origin main
if (command === "dominion") {
  scrollBotDominion({
    metadataURI: "ipfs://QmYourMeta",
    userWallet: connectedWallet,
    tier: getUserTier(connectedWallet)
  });
}
