const {registerPartnersExpertise} = require('../../data/repositories/ExpertiseRepository')

class registerPartnersExpertiseUC {
    constructor(partner, expertise) {
        this.partner = partner;
        this.expertise = expertise;
    }

    async create(){
        try {
            const registerData = {
                partner : this.partner,
                expertise: this.expertise
            };
            return await registerPartnersExpertise(registerData);
        } catch (error) {
            console.error('Error registering expertise register:', error);
            throw new Error('Failed to register expertise register.');
        }
    }
}
module.exports = registerPartnersExpertiseUC;