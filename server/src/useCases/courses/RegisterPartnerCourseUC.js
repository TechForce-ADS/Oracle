const {registerPartnersCourse} = require('../../data/repositories/CoursesRepository')

class registerPartnersCourseUC {
    constructor(partner, course) {
        this.partner = partner;
        this.course = course;
    }

    async create(){
        try {
            const registerData = {
                partner : this.partner,
                course: this.course
            };
            return await registerPartnersCourse(registerData);
        } catch (error) {
            console.error('Error registering expertise register:', error);
            throw new Error('Failed to register expertise register.');
        }
    }
}
module.exports = registerPartnersCourseUC;