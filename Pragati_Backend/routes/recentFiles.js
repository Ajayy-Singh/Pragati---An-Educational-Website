// routes/recentFiles.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add a recently opened file
router.post('/', async (req, res) => {
  const { userId, fileId, fileName, fileUrl } = req.body;
  const now = new Date();

  try {
    // Remove existing entry if it exists
    await User.updateOne(
      { _id: userId },
      { $pull: { recentFiles: { fileId } } }
    );

    // Add to the beginning
    await User.updateOne(
      { _id: userId },
      { $push: { recentFiles: { $each: [{ fileId, fileName, fileUrl, openedAt: now }], $position: 0, $slice: 5 } } }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get recent files
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.recentFiles || []);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
