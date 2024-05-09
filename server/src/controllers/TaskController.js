const express = require('express');
const router = express.Router();



router.get('/ExpertiseTask/:expertise', async (req, res) => {
    try {
        const expertise = req.params.expertise;
      
        const trackExpertises = await listTracksExpertises(expertise);
  
        res.status(200).json(trackExpertises);
    } catch (error) {
        console.error('Error getting track expertises:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});




module.exports = router;