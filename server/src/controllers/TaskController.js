const express = require('express');
const router = express.Router();
const { listTrack, updateCourse, listTasksByIds, listTasksExpertise } = require('../data/repositories/TasksRepository');
const RegisterTaskUC = require('../useCases/tasks/RegisterTaskUC');

router.get('/tasksExpertises/:expertiseId', async (req, res) => {
  try {
    const expertiseId = req.params.expertiseId; 
    const taskExpertises = await listTasksExpertise(expertiseId);
    res.status(200).json(taskExpertises);
  } catch (error) {
    console.error('Error getting tasks by expertise:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



router.post('/registerExpertiseTask', async(req, res) => {
    try {
        const { name, expertise } = req.body;

        const registerUC = new RegisterTaskUC(name,  expertise) ;
        const newRegister = await registerUC.create();
        if (newRegister){
          res.status(201).json(newRegister);
          console.log("foi aaaaaaaaaaaaa")
        }
    } catch (error) {
        console.error('Error register expertise:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


router.post('/details', async (req, res) => {
  try {
    const { taskIds } = req.body;

    if (!taskIds || !Array.isArray(taskIds)) {
      return res.status(400).json({ error: 'taskIds is required and should be an array' });
    }

    const taskDetails = await listTasksByIds(taskIds);
    res.status(200).json(taskDetails);
  } catch (error) {
    console.error('Error getting task details:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


  


module.exports = router;