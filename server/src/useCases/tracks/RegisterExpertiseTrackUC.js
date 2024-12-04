const {registerExpertiseTrack} = require('../../data/repositories/TracksRepository')

class registerExpertiseTrackUC {
    constructor(expertiseName, track, expertiseCompleted) {
        this.expertiseName = expertiseName;
        this.track = track;
        this.expertiseCompleted = expertiseCompleted;
    }

    async create(){
        try {
            const registerData = {
                expertiseName : this.expertiseName,
                track: this.track,
                expertiseCompleted: this.expertiseCompleted
            };
            return await registerExpertiseTrack(registerData);
        } catch (error) {
            console.error('Error registering expertise register:', error);
            throw new Error('Failed to register expertise.');
        }
    }
}
module.exports = registerExpertiseTrackUC;