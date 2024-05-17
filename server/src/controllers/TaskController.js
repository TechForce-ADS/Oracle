const express = require('express');
const router = express.Router();
const { listTrack, updateCourse, deleteCourse, listTasksExpertise } = require('../data/repositories/TasksRepository');
const RegisterTaskUC = require('../useCases/tasks/RegisterTaskUC');


router.post('/registerExpertiseTask', async(req, res) => {
    try {
        const { name, expertise } = req.body;

        const registerUC = new RegisterTaskUC(name,  expertise) ;
        const newRegister = await registerUC.create();
        console.log(newRegister);
    } catch (error) {
        console.error('Error register expertise:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

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
  


module.exports = router;