const express = require('express');
const router = express.Router();
const RegisterCourseUC = require('../useCases/courses/RegisterCourse');

const { listCourse, updateCourse, deleteCourse } = require('../data/repositories/CoursesRepository');
const { deletePartner } = require('../data/repositories/PartnerRepository');
const registerPartnersExpertiseUC = require('../useCases/courses/RegisterPartnerCourseUC')

router.post('/registerPartnersCourse', async(req, res) => {
    try {
        const { partner_id, course_id } = req.body;
        const registerUC = new registerPartnersExpertiseUC(partner_id, course_id);
        const newRegister = await registerUC.create();
        if(newRegister){
            res.status(200).json(newRegister);
        }
    } catch (error) {
        console.error('Error register expertise:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});



router.post('/registerCourse', async (req, res) =>{
    try {
        const name = req.body.name;
        const description = req.body.description;
        const time = req.body.time;
        const image = req.body.image;
        const registerUC = new RegisterCourseUC(name,description,time,image);
        const newCourse = await registerUC.create();
        if (newCourse){
            res.status(200).json(newCourse);
        }
    } catch (error) {
        console.error('Error register course:', error);
        res.status(500).json({error: 'Internal server error.'})
    }
});

router.get('/coursesList', async(req, res) => {
    try {
        const courses = await listCourse();
        res.status(200).json(courses); 
    } catch (error) {
        console.error('Erro ao listar cursos', error);
        res.status(500).json({error: "Erro interno do servidor."});
    }
})




    router.delete("/deleteCourse/:_id", async(req, res) => {

    try {
        const courseId = req.params._id;
        const result = await deleteCourse(courseId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro interno do servido."});
    }
})


    router.put("/updateCourse/:_id", async (req, res) => {

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