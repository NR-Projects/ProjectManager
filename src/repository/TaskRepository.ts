import { requires } from './IRequirement';
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where, 
    serverTimestamp} from "firebase/firestore";
import { Task } from '@/models';

async function addTask(require: requires, task: Task): Promise<void> {
    const { name, desc, status } = task;

    if( !require ) return;
    const project_id = require.projectId!;
    const projectTask_id = require.projectTaskId!;

    const uid = getAuth().currentUser?.uid;
    if ( !uid ) return;

    await addDoc(collection(getFirestore(), "users", uid, "projects", project_id, "project_task", projectTask_id, "task"), {
        name: name,
        desc: desc,
        status: status,
        date_created: serverTimestamp(),
        date_last_updated: serverTimestamp()
    });
}

async function readAllTasks(require: requires): Promise<Array<Task>> {
    return Array<Task>();
}

function updateTask(require: requires) {
    //
}

function deleteTask(require: requires) {
    //
}

export { addTask, readAllTasks, updateTask, deleteTask };