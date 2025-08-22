const express = require('express');
const router = express.Router();
const formModel = require('./../models/form');


router.post('/submit', async (req, res) => {
  try {
    const { name, email, experiences, skills } = req.body;

    
    const user = await formModel.create({
      name,
      email,
      experiences,
      skills
    });

    return res.status(201).json({
      message: "Form submitted successfully",
      data: user
    });

  } catch (err) {
    console.error("Form submission error", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;
