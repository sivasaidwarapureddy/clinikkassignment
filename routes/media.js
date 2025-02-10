const { Router } = require('express');
const router = Router();
const Media = require('../models/Media');
const Authorization = require('../middleware/authmid');

// Get all media
router.get('/', Authorization, async (req, res) => {
    try {
        const medias = await Media.find();
        res.send(medias);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Create a new media
router.post('/', Authorization, async (req, res) => {
  try {
      let media = new Media({
          title: req.body.title,
          body: req.body.body,
          media: req.body.mediaUrl,
          postedBy: req.user.id
      });
      media = await media.save();
      res.send(media);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

// Get media By ID
router.get('/:id', Authorization, async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).send("Media not found");
        res.send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Like a media
router.put('/:id/like', Authorization, async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).send("Media not found");
        
        if (!media.likes.includes(req.user.id)) {
            media.likes.push(req.user.id);
        }
        
        await media.save();
        res.send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Unlike a media
router.put('/:id/unlike', Authorization, async (req, res) => {
  try {
      const media = await Media.findById(req.params.id);
      if (!media) return res.status(404).send("Media not found");

      // Convert ObjectId to string before filtering
      media.likes = media.likes.filter(userId => userId.toString() !== req.user.id);

      await media.save();
      res.send(media);
  } catch (error) {
      res.status(500).send(error.message);
  }
});


// Delete media By ID
router.delete('/:id', Authorization, async (req, res) => {
  try {
      const media = await Media.findById(req.params.id);
      if (!media) return res.status(404).send("Media not found");
      
      // Ensure only the owner can delete the media
      if (media.postedBy.toString() !== req.user.id) {
          return res.status(403).send("Unauthorized");
      }
      
      await media.deleteOne();
      res.send({ message: "Media deleted successfully" });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

module.exports = router;
