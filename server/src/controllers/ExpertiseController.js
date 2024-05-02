const express = require('express');
const router = express.Router();
const registerExpertiseUC = require('../useCases/expertises/RegisterExpertiseUC');
const RegisterCourseUC = require('../useCases/courses/RegisterCourse');


  /*    router.post('/register', async (req, res) => {
        try {
            const title = req.body.title;
            const registerUC = new RegisterCourseUC(title);
            const newExpertise = await registerUC.create();
            if (newExpertise) {
                res.status(201).json(newExpertise);
            }
        } catch (error) {
            console.log('Error register expertise:', error);
            res.status(500).json({ error: 'Internal server error.' })
        }
    })

router.get('/expertisesList', async (req, res) => {
    try {
        const expertise = await 
    } catch (error) {

    }
})

*/