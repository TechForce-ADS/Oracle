const express = require('express');
const router = express.Router();
const {listExpertise} = require('../data/repositories/ExpertiseRepository');
const {deleteExpertise} = require('../data/repositories/ExpertiseRepository');
const {updateExpertise} = require('../data/repositories/ExpertiseRepository');

const registerExpertiseUC = require('../useCases/expertises/RegisterExpertiseUC')

router.post('/registerExpertise', async(req, res) =>{
    try {
        const title = req.body.title;
        const registerUC = new registerExpertiseUC(title);
        const newExpetise = await registerUC.create();
        if (newExpetise){
            res.status(200).json(newExpetise);
        }
    } catch (error) {
        console.error('Error register expertise:', error);
        res.status(500).json({error: 'Internal server error.'})
    }
});

router.get('/expertisesList', async(req, res) => {
    try {
        const expertises = await listExpertise();
        res.status(200).json(expertises);
    } catch (error) {
        console.error('Erro ao listar cursos', error);
        res.status(500).json({error: "Erro interno do servidor."});
    }
});

router.delete('/deleteExpertise/:_id', async(req, res) => {
    try {
        const expertiseId = req.params._id;
        const result = await deleteExpertise(expertiseId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro interno do servidor."});
        
    }
})

router.put('/updateExpertise/:_id', async (req, res) => {
    try {
        const expertiseId = req.params._id;
        const updateData = req.body;
        const updatedExpertise = await updateExpertise(expertiseId, updateData);

        if (updatedExpertise) {
            res.status(200).json(updatedExpertise);
        }else{
            res.status(404).json({error: "Expertise não encontrada"});
        }
    } catch (error) {
        res.status(500).json({error: "Erro interno do servidor."});
    }
});

module.exports = router;