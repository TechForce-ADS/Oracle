const {registerTask} = require('../../data/repositories/TasksRepository');



class RegisterTaskUC{
    constructor(name, expertise) {
        this.expertise = expertise;
        this.name = name;
        
    }

    async create(){
        try {
            const taskData = {
                expertise: this.expertise,
                name: this.name,
                
                
            };

            return await registerTask(taskData);
        } catch (error) {
            console.error('Error registering task:', error);
            throw new Error('Failed to register task.')
        }
    }
}

module.exports = RegisterTaskUC;