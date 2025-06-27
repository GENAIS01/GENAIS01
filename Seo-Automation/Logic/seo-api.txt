// /api/seo-metadata.js
// POST route to apply metadata using the review engine (pre-registration flow)

const express = require('express');
const router = express.Router();

const { reviewAndApplyInitialMetadata } = require('../logic/metadata-review-engine');

// POST /api/seo-metadata
router.post('/', (req, res) => {
  const { platform, userConcurrence, metadata } = req.body;

  if (!metadata || typeof metadata.title !== 'string') {
    return res.status(400).json({ error: 'Invalid metadata payload.' });
  }

  const result = reviewAndApplyInitialMetadata({
    platform: platform || 'standard',
    userConcurrence: !!userConcurrence,
    metadata
  });

  return res.status(200).json(result);
});

module.exports = router;
