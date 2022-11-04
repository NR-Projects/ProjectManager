import { addProject, readAllProjects, updateProject, deleteProject } from './ProjectRepository';
import { addProjectTask, readAllProjectTasks, updateProjectTask, deleteProjectTask } from './ProjectTaskRepository';
import { addTaskItem, readAllTaskItems, updateTaskItem, deleteTaskItem } from './TaskItemRepository';
import requires from './IRequirement';
import { BaseModel } from '@/models';

function isValid(dataStatus: DataStatus, data: BaseModel, loadedDataList: Array<BaseModel>, newData?: BaseModel): boolean {
    switch (dataStatus) {
        case DataStatus.New:
            break;
        case DataStatus.Existing:
            if (!newData) return false;
            if (data.isEqual(newData)) return false;
            break;
    }

    for (let item of loadedDataList) {
        if (item.isEqual(data)) return false;
    }

    return true;
}

enum DataStatus {
    New,
    Existing
}

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

    requires,

    isValid,
    DataStatus
}