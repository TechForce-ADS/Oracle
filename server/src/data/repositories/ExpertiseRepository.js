const {Expertise} = require('../../models/models');
const {ExpertiseRegistration} = require('../../models/models')

async function registerPartnersExpertise(registrationData){
    try {
        const existingExpertiseRegister = await ExpertiseRegistration.findOne({ title: registrationData.partner});
        if(existingExpertiseRegister){
            return false;
        }
        const newExpertiseRegistration = new ExpertiseRegistration(registrationData)
        await newExpertiseRegistration.save();
        return newExpertiseRegistration;
    } catch (error) {
        console.error('Erro registering expertise registration:', error);
        throw new Error('Failed to register expertise register');
    }
}

async function getPartnerExpertises(partnerId) {
    try {
        const partnerExpertises = await ExpertiseRegistration.find({ partner: partnerId }).populate('expertise');
        return partnerExpertises.map(item => item.expertise);
    } catch (error) {
        console.error('Error getting partner expertises:', error);
        throw new Error('Failed to get partner expertises.');
    }
}

async function listPartnersExpertises(){
    try {
        const expertisesRegisters = await ExpertiseRegistration.find({});
        return expertisesRegisters;
    } catch (error) {
        console.error('Error listing expertises registers:', error);
        throw new Error('Failed to list expertises registers.');
    }
}

async function deleteExpertiseRegistration(registerId){
    try {
        const result = await ExpertiseRegistration.deleteOne({_id: registerId});

        if(result.deletedCount === 0) {
            throw new Error('Registro de expertise não encontrado.');
        }
        return {message: "Registro de expertise removido com sucesso."}
    } catch (error) {
        console.error('Erro ao deletar registro de expertise.', error);
        throw new Error('Erro interno do servidor.')
    }
}

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


async function deleteRegister(registerId){
    try {
        const result = await ExpertiseRegistration.deleteOne({ _id: registerId });

        if (result.deletedCount === 0) {
            throw new Error('ExpertiseRegistration não encontrada ou já foi excluída.');
        }
        return { message: "Expertise removida com sucesso." };
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
    updateExpertise,
    registerPartnersExpertise,
    listPartnersExpertises,
    deleteExpertiseRegistration,
    getPartnerExpertises,
    deleteRegister
}