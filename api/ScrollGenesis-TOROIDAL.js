import {
  mintPixelNFT,
  updateScrollVault
} from './scrollcore';

import {
  loadScrollBrain,
  executeProphecy,
  runToroidPulse
} from '../ai/scrollmind';

export default async function ScrollCommandCenter(req, res) {
  const { robotID, pixelRequest, wallet } = req.body;

  const brain = await loadScrollBrain(robotID);
  const pulse = await runToroidPulse(brain, 75600);
  const pixel = await mintPixelNFT(pixelRequest, wallet);
  const tx = await updateScrollVault(wallet, pixel, brain);
  const prophecy = await executeProphecy(brain, tx);

  res.status(200).json({
    success: true,
    pixel,
    tx,
    pulse,
    prophecy,
    pulseKey: brain.pulseKey,
    kingdom: "ScrollChain Eternal Grid"
  });
}
