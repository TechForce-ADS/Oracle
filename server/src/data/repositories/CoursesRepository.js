const { Course } = require('../../models/models');

async function registerCourses(courseData) {
    try {
        const existingCourse = await Course.findOne({ nome: courseData.nome});
        if (existingCourse) {
            return false;
        }
        const newCourse = new Course(courseData);

        await newCourse.save();

        return newCourse;
    } catch (error) {
        console.error('Error registering course.', error);
        throw new Error('Failed to register course.')        
    }
}

async function listCourse() {
    try {
        const courses = await Course.find({});
        return courses;
    } catch (error) {
        console.error('Error listing courses:', error);
        throw new Error('Failed to list courses.');
    }
}

async function listCourse() {
    try {
        const courses = await Course.find({});
        return courses;
    } catch (error) {
        console.error('Error listing courses:', error);
        throw new Error('Failed to list courses.');
    }
}

async function deleteCourse(courseId) {
    try {
        const result = await Course.deleteOne({_id: courseId});

        if(result.deletedCount === 0) {
            throw new Error('Curso não encontrado.');
        }

        return {message: 'Curso removido com sucesso.'}
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        throw new Error('Erro interno do servidor.')
    }
}

async function updateCourse(courseId, updateCourse){
    try {
        const result = await Course.findByIdAndUpdate(courseId, updateCourse, {new: true});
        if(!result){
            throw new Error('Curso não encontrao');
        }
        return result;
    } catch (error) {
        console.error('Erro ao atualizar cursos:', error);
        throw new Error('Erro interno do servidor.');
    }

}

module.exports = {
    registerCourses,
    listCourse,
    deleteCourse,
    updateCourse
}