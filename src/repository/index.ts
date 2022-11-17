import { addProject, readAllProjects, updateProject, deleteProject } from './ProjectRepository';
import { addProjectTask, readAllProjectTasks, updateProjectTask, deleteProjectTask } from './ProjectTaskRepository';
import { addTask, readAllTasks, updateTask, deleteTask, removeAllTask } from './TaskRepository';
import { requires } from './IRequirement';
import { BaseModel } from '@/models';
import { collection, CollectionReference, DocumentData, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

async function isValid(dataType: DataType, dataStatus: DataStatus, newData: BaseModel, data?: BaseModel, require?: requires): Promise<boolean> {
    switch (dataStatus) {
        case DataStatus.New:
            break;
        case DataStatus.Existing:
            if (!data) return false;
            if (newData.isEqual(data)) return false;
            break;
    }

    let _collection: CollectionReference<DocumentData>;
    switch (dataType) {
        case DataType.Project:
            _collection = collection(getFirestore(), "users", getAuth().currentUser!.uid, "projects");
            break;
        case DataType.ProjectTask:
            if ( !require ) return false;
            _collection = collection(getFirestore(), "users", getAuth().currentUser!.uid, "projects", require.projectId!, "project_task");
            break;
        case DataType.Task:
            if ( !require ) return false;
            _collection = collection(getFirestore(), "users", getAuth().currentUser!.uid, "projects", require.projectId!, "project_task", require.projectTaskId!, "task");
            break;
    }

    let valid = true;
    const q = query(_collection!, where("name", "==", newData.name));
    (await getDocs(q)).forEach((doc) => {
        console.log(doc.data().name);
        valid = false;
        return;
    });

    console.log(valid)

    return valid;
}

enum DataType {
    Project,
    ProjectTask,
    Task
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
    removeAllTask,

    requires,

    isValid,
    DataStatus,
    DataType
}