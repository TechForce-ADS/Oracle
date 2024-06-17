const {registerTracks} = require('../../data/repositories/TracksRepository');

class RegisterTrackUC{
    constructor(name, track) {
        this.name = name;
        this.track = track;
    }

    async create(){
        try {
            const trackData = {
                name: this.name,
                track: this.track,
                
            };

            return await registerTracks(trackData);
        } catch (error) {
            console.error('Error registering course:', error);
            throw new Error('Failed to register course.')
        }
    }
}

module.exports = RegisterTrackUC;