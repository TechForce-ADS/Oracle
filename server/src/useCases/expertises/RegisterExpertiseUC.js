const {registerExpertise} = require('../../data/repositories/ExpertiseRepository');

class registerExpertiseUC {
    constructor(title){
        this.title = title;
    }

    async create(){
        try {
            const expertiseData = {
                title: this.title
            };
            return await registerExpertise(expertiseData);
        } catch (error) {
            console.log('Error registering expertise:', error);
            throw new Error('Failed to register expertise.')
        }
    }
}

module.exports = registerExpertiseUC;