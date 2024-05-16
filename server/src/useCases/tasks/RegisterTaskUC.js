const {registerTask} = require('../../data/repositories/TasksRepository');

class RegisterTaskUC{
    constructor(name, expertise) {
        this.name = name;
        this.expertise = expertise;
    }

    async create(){
        try {
            const taskData = {
                name: this.name,
                expertise: this.expertise,
                
            };

            return await registerTask(taskData);
        } catch (error) {
            console.error('Error registering task:', error);
            throw new Error('Failed to register task.')
        }
    }
}

module.exports = RegisterTaskUC;