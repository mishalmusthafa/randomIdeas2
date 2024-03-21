const exp = require('constants');
const express = require('express');
const router = express.Router();
const Idea = require('../model/Idea');
const { text } = require('body-parser');

// Get All ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Get single ideas
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Post an Idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// update idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    // Match the Username
    if (idea.username === req.body.username) {
      const updateIdea = await Idea.findByIdAndUpdate(req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          }
        },
        { new: true }
      );
      return res.json({ success: true, data: updateIdea });
    }
    // Username do not match
    res.status(403).json({ success: false, error: 'You are not authorized to update this post' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Delete an idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    // Match the username
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }
    // Udername do not match
    res.status(403).json({ success: false, error: 'You are not Authorized to delete this post' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;