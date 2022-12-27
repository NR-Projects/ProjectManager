import requires from './IRequirement';
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
    serverTimestamp,
    CollectionReference,
    DocumentData } from "firebase/firestore";
import { Task } from '@/models';

function getCollectionRef(project_id: string, projectTask_id: string): CollectionReference<DocumentData> {
    return collection(getFirestore(), "users", getAuth().currentUser!.uid, "projects", project_id, "project_task", projectTask_id, "task");
}

async function addTask(require: requires, task: Task): Promise<void> {
    const { name, desc, status } = task;

    if( !require ) return;
    const project_id = require.projectId!;
    const projectTask_id = require.projectTaskId!;

    await addDoc(getCollectionRef(project_id, projectTask_id), {
        name: name,
        desc: desc,
        status: status,
        date_created: serverTimestamp(),
        date_last_updated: serverTimestamp()
    });
}

async function readAllTasks(require: requires): Promise<Array<Task>> {
    const projects = Array<Task>();

    if( !require ) return projects;
    const project_id = require.projectId!;
    const projectTask_id = require.projectTaskId!;

    const querySnapshot = await getDocs(getCollectionRef(project_id, projectTask_id));
    querySnapshot.forEach((doc) => {
        const doc_fields = doc.data();
        projects.push(
            new Task(
                doc_fields.name,
                doc_fields.desc,
                doc_fields.status,
                doc_fields.date_created.toDate(),
                doc_fields.date_last_updated.toDate(),
                doc.id,
            )
        );
    });

    return projects;
}

async function updateTask(require: requires, oldData: Task, newData: Task): Promise<void> {
    if( !require ) return;
    const project_id = require.projectId!;
    const projectTask_id = require.projectTaskId!;

    const q = query(getCollectionRef(project_id, projectTask_id), where("name", "==", oldData.name));
    (await getDocs(q)).forEach(async (doc) => {
        await updateDoc(doc.ref, {
            name: newData.name,
            desc: newData.desc,
            status: newData.status,
            date_created: oldData.date_created,
            date_last_updated: serverTimestamp()
        });
    });
}

async function deleteTask(require: requires, data: Task): Promise<void> {
    if( !require ) return;
    const project_id = require.projectId!;
    const projectTask_id = require.projectTaskId!;

    const q = query(getCollectionRef(project_id, projectTask_id), where("name", "==", data.name));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

async function removeAllTask(require: requires): Promise<void> {
    if( !require ) return;
    const project_id = require.projectId!;
    const projectTask_id = require.projectTaskId!;

    const q = query(getCollectionRef(project_id, projectTask_id));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

export { addTask, readAllTasks, updateTask, deleteTask, removeAllTask };