import scrollClasses from '../staticnode/ScrollClasses.js';

export default function handler(req, res) {
  const { devKey, buildType, stage } = req.body;

  if (devKey !== process.env.STATICNODE_KEY || !buildType || !stage) {
    return res.status(401).json({ success: false, message: "Unauthorized scroll access" });
  }

  const classMeta = scrollClasses[buildType] || scrollClasses.default;

  const nft = {
    scrollID: "SN-" + Date.now(),
    class: classMeta.class,
    multiplier: classMeta.multiplier,
    issuedBy: "Yahawashiservant",
    vault: classMeta.vault,
    prophecy: `Stage ${stage} complete. Class: ${classMeta.class}`,
    mintedAt: new Date().toISOString()
  };

  return res.status(200).json({ success: true, nft });
}
