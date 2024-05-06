const {registerTracks} = require('../../data/repositories/TracksRepository');

class RegisterTrackUC{
    constructor(name) {
        this.name = name;
 
    }

    async create(){
        try {
            const trackData = {
                name: this.name,
                
            };

            return await registerTracks(trackData);
        } catch (error) {
            console.error('Error registering course:', error);
            throw new Error('Failed to register course.')
        }
    }
}

module.exports = RegisterTrackUC;