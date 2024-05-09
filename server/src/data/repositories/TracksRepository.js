const { Track } = require('../../models/models');
const { TrackRegistration } = require('../../models/models');

async function registerTracks(trackData) {
    try {
        const existingTrack = await Track.findOne({ name: trackData.name});
        if (existingTrack) {
            return false;
        }
        const newTrack = new Track(trackData);

        await newTrack.save();

        return newTrack;
    } catch (error) {
        console.error('Error registering track.', error);
        throw new Error('Failed to register course.')        
    }
}

async function listTrack() {
    try {
        const tracks = await Track.find({});
        return tracks;
    } catch (error) {
        console.error('Error listing tracks:', error);
        throw new Error('Failed to list tracks.');
    }
}


async function deleteCourse(courseId) {
    try {
        const result = await Track.deleteOne({_id: courseId});

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


async function registerExpertiseTrack(registrationData){
    try {
        const existingTrackRegister = await TrackRegistration.findOne({ expertiseName: registrationData.expertiseName});
        if(existingTrackRegister){
            return false;
        }
        const newTrackRegistration = new TrackRegistration(registrationData)
        await newTrackRegistration.save();
        return newTrackRegistration;
    } catch (error) {
        console.error('Erro registering CourseRegistration :', error);
        throw new Error('Failed to register CourseRegistration');
    }
}


async function listTracksExpertises(track) {
    try {
        const expertisesRegisters = await TrackRegistration.find({ track: track });
        return expertisesRegisters;
    } catch (error) {
        console.error('Error listing expertises registers:', error);
        throw new Error('Failed to list expertises registers.');
    }
}


module.exports = {
    registerTracks,
    listTrack,
    deleteCourse,
    updateCourse,
    registerExpertiseTrack,
    listTracksExpertises
}