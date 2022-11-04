import { addProject, readAllProjects, updateProject, deleteProject } from './ProjectRepository';
import { addProjectTask, readAllProjectTasks, updateProjectTask, deleteProjectTask } from './ProjectTaskRepository';
import { addTaskItem, readAllTaskItems, updateTaskItem, deleteTaskItem } from './TaskItemRepository';
import requires from './IRequirement';

export {
    addProject,
    readAllProjects,
    updateProject,
    deleteProject,

    addProjectTask,
    readAllProjectTasks,
    updateProjectTask,
    deleteProjectTask,
    
    addTaskItem,
    readAllTaskItems,
    updateTaskItem,
    deleteTaskItem,

    requires
}