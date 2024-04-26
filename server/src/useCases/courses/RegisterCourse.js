const {registerCourses} = require('../../data/repositories/CoursesRepository');

class RegisterCourseUC{
    constructor(name, description, time,image) {
        this.name = name;
        this.description = description;
        this.time = time;
        this.image = image;
    }

    async create(){
        try {
            const courseData = {
                name: this.name,
                description: this.description,
                time: this.time,
                image: this.image
            };

            return await registerCourses(courseData);
        } catch (error) {
            console.error('Error registering course:', error);
            throw new Error('Failed to register course.')
        }
    }
}

module.exports = RegisterCourseUC;