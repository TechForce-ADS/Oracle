const {Expertise} = require('../../models/models');

async function registerExpertise(expertiseData){
    try {
        const existingExpertise = await Expertise.findOne({ title: expertiseData.title});
        if(existingExpertise) {
            return false;
        }
        const newExpetise = new Expertise(expertiseData);
        await newExpetise.save();
        return newExpetise;
    } catch (error) {
        console.error('Erro registering expertise:', error);
        throw new Error('Failed to register exerpertise.')
    }
}

async function listExpertise() {
    try {
        const expertise = await Expertise.find({});
        return expertise;
    } catch (error) {
        console.error('Error listing expertise:', error);
        throw new Error('Failed to list expertises.');
    }
}

async function deleteExpertise(expertiseId){
    try {
        const result = await Expertise.deleteOne({_id: expertiseId});

        if (result.deletedCount === 0) {
            throw new Error('Expertise não encontrada.');
        }
        return {message: "Expetise removida com sucesso."}
    } catch (error) {
        console.error('Erro ao deletar expertise:', error);
        throw new Error('Erro interno do servidor.');
    }
}

async function updateExpertise(expertiseId, updateData){
    try {
        const result = await Expertise.findByIdAndUpdate(expertiseId, updateData, {new: true});

        if(!result) {
            throw new Error('Expertise não encontrada.');
        }

        return result;
    } catch (error) {
        console.error('Erro ao atualizar expertise.', error);
        throw new Error('Erro interno do servidor');
    }
}

module.exports = {
    registerExpertise,
    listExpertise,
    deleteExpertise,
    updateExpertise
}