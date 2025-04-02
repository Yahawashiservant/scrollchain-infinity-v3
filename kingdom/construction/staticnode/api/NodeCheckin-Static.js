export default function handler(req, res) {
  const { devKey, task, proof } = req.body;

  if (devKey !== process.env.STATICNODE_KEY || !task || !proof) {
    return res.status(403).json({ verified: false, reason: "Access denied" });
  }

  return res.status(200).json({
    verified: true,
    task,
    scrollTrigger: "/api/ScrollMint-StaticNode"
  });
}
