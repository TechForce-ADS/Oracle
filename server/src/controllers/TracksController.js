const express = require('express');
const router = express.Router();
const RegisterTrackUC = require('../useCases/tracks/RegisterTrackUC');
const registerExpertiseTrackUC = require('../useCases/tracks/RegisterExpertiseTrackUC');

const { listTrack, updateCourse, deleteCourse, listTracksExpertises } = require('../data/repositories/TracksRepository');



router.get('/trackExpertises/:track', async (req, res) => {
    try {
        const track = req.params.track;
      
        const trackExpertises = await listTracksExpertises(track);
  
        res.status(200).json(trackExpertises);
    } catch (error) {
        console.error('Error getting track expertises:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/registerExpertiseTrack', async(req, res) => {
    try {
        const { expertiseName, expertiseCompleted } = req.body;
        const track = req.body.track;
        const registerUC = new registerExpertiseTrackUC(expertiseName, track, expertiseCompleted) ;
        const newRegister = await registerUC.create();
        console.log(newRegister);
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