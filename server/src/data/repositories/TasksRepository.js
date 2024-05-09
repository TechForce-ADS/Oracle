const {Task} = require('../../models/models');

async function registerTask(taskData){
    try {
        const existingTask = await Task.findOne({name: taskData.name});
        if(existingTask){
            return false;
        }
        const newTask = new Task(taskData);
        await newTask.save();
    } catch (error) {
        console.error('Error registering task:',error);
        throw new Error('Failed to register task.')
    }
}

async function listTask() {
    try {
        const task = await Task.find({});
        return task;
    } catch (error) {
        console.error('Error listing task:', error);
        throw new Error('Failed to list task.');
    }
}

async function deleteTask(taskId){
    try {
        const result = await Task.deleteOne({_id: taskId});
        if (result.deletedCount === 0) {
            throw new Error('Task não encontrada.');
        }
        return {message: "Task removida com sucesso."};
    } catch (error) {
        console.error('Erro ao deletar task:', error);
        throw new Error('Erro interno do servidor.');     
    }
}

async function updateTask(taskId, updateData){
    try {
        const result = await Task.findByIdAndUpdate(taskId, updateData, {new: true});
        if(!result){
            throw new Error('Task não encontrada.');
        }
        return result;
    } catch (error) {
        console.error('Erro ao atualizar task.', error);
        throw new Error('Erro interno do servidor.');
    }
}

module.exports = {
    registerTask,
    listTask,
    deleteTask,
    updateTask
}