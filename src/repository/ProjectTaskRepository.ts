import { requires } from './IRequirement';
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    where } from "firebase/firestore";
import { ProjectTask } from '@/models';

async function addProjectTask(require: requires, projectTask: ProjectTask): Promise<void> {
    const { name } = projectTask;

    if( !require ) return;
    const project_id = require.projectId!;

    const uid = getAuth().currentUser?.uid;
    if ( !uid ) return;

    await addDoc(collection(getFirestore(), "users", uid, "projects", project_id, "project_task"), {
        name: name
    });
}

async function readAllProjectTasks(require: requires): Promise<Array<ProjectTask>> {
    const projectTasks = Array<ProjectTask>();

    if( !require ) return projectTasks;
    const project_id = require.projectId!;

    const uid = getAuth().currentUser?.uid;
    if ( !uid ) return projectTasks;

    const querySnapshot = await getDocs(collection(getFirestore(), "users", uid, "projects", project_id, "project_task"));
    querySnapshot.forEach((doc) => {
        const doc_fields = doc.data();
        projectTasks.push(
            new ProjectTask(
                doc_fields.name,
                doc.id,
            )
        );
    });

    return projectTasks;
}

async function updateProjectTask(require: requires, oldData: ProjectTask, newData: ProjectTask): Promise<void> {
    if( !require ) return;
    const project_id = require.projectId!;

    const uid = getAuth().currentUser?.uid;
    if ( !uid ) return;

    const q = query(collection(getFirestore(), "users", uid, "projects", project_id, "project_task"), where("name", "==", oldData.name));
    (await getDocs(q)).forEach(async (doc) => {
        await updateDoc(doc.ref, {
            name: newData.name
        });
    });
}

async function deleteProjectTask(require: requires, data: ProjectTask): Promise<void> {
    if( !require ) return;
    const project_id = require.projectId!;

    const uid = getAuth().currentUser?.uid;
    if ( !uid ) return;

    const q = query(collection(getFirestore(), "users", uid, "projects", project_id, "project_task"), where("name", "==", data.name));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

export { addProjectTask, readAllProjectTasks, updateProjectTask, deleteProjectTask };