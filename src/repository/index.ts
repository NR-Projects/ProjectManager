import { addProject, readAllProjects, updateProject, deleteProject } from './ProjectRepository';
import { addProjectTask, readAllProjectTasks, updateProjectTask, deleteProjectTask } from './ProjectTaskRepository';
import { addTask, readAllTasks, updateTask, deleteTask } from './TaskRepository';
import { requires } from './IRequirement';
import { BaseModel } from '@/models';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

async function isValid(dataStatus: DataStatus, newData: BaseModel, data?: BaseModel): Promise<boolean> {
    switch (dataStatus) {
        case DataStatus.New:
            break;
        case DataStatus.Existing:
            if (!data) return false;
            if (newData.isEqual(data)) return false;
            break;
    }

    let valid = true;
    const q = query(collection(getFirestore(), "users", getAuth().currentUser!.uid, "projects"), where("name", "==", newData.name));
    (await getDocs(q)).forEach((doc) => {
        valid = false;
        return;
    });

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
    
    addTask,
    readAllTasks,
    updateTask,
    deleteTask,

    requires,

    isValid,
    DataStatus
}