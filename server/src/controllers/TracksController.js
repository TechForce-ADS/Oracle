const express = require('express');
const router = express.Router();
const RegisterTrackUC = require('../useCases/tracks/RegisterTrackUC');
const registerExpertiseTrackUC = require('../useCases/tracks/RegisterExpertiseTrackUC');

const { listTrack, updateCourse, deleteCourse } = require('../data/repositories/TracksRepository');
const { deletePartner } = require('../data/repositories/PartnerRepository');




router.post('/registerExpertiseTrack', async(req, res) => {
    try {
        const { expertiseName, track_id, expertiseCompleted } = req.body;
        const registerUC = new registerExpertiseTrackUC(expertiseName, track_id, expertiseCompleted) ;
        const newRegister = await registerUC.create();
        if(newRegister){
            res.status(200).json(newRegister);
        }
    } catch (error) {
        console.error('Error register expertise:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});




router.post('/registerTrack', async (req, res) =>{
    try {
        const name = req.body.name;
        const registerUC = new RegisterTrackUC(name);
        const newTrack = await registerUC.create();
        if (newTrack){
            res.status(200).json(newTrack);
        }
    } catch (error) {
        console.error('Error register track:', error);
        res.status(500).json({error: 'Internal server error.'})
    }
});

router.get('/tracksList', async(req, res) => {
    try {
        const tracks = await listTrack();
        res.status(200).json(tracks); 
    } catch (error) {
        console.error('Erro ao listar tracks', error);
        res.status(500).json({error: "Erro interno do servidor."});
    }
})




    router.delete("/deleteTrack/:_id", async(req, res) => {

    try {
        const courseId = req.params._id;
        const result = await deleteCourse(courseId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro interno do servido."});
    }
})


    router.put("/updateTrack/:_id", async (req, res) => {

    try {
        const courseId = req.params._id;
        const updateData = req.body;
        const updatedCourse = await updateCourse(courseId, updateData);

        if (updatedCourse) {
            res.status(200).json(updatedCourse);
        }else{
            res.status(404).json({error: "Curso não encontrado"});
        }
    } catch (error) {
        res.status(500).json({error: "Erro interno do servidor"});
    }
})




module.exports = router;