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
    CollectionReference,
    DocumentData } from "firebase/firestore";
import { ProjectTask } from '@/models';

function getCollectionRef(project_id: string): CollectionReference<DocumentData> {
    return collection(getFirestore(), "users", getAuth().currentUser!.uid, "projects", project_id, "project_task");
}

async function addProjectTask(require: requires, projectTask: ProjectTask): Promise<void> {
    const { name } = projectTask;

    if( !require ) return;
    const project_id = require.projectId!;

    await addDoc(getCollectionRef(project_id), {
        name: name
    });
}

async function readAllProjectTasks(require: requires): Promise<Array<ProjectTask>> {
    const projectTasks = Array<ProjectTask>();

    if( !require ) return projectTasks;
    const project_id = require.projectId!;

    const querySnapshot = await getDocs(getCollectionRef(project_id));
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

    const q = query(getCollectionRef(project_id), where("name", "==", oldData.name));
    (await getDocs(q)).forEach(async (doc) => {
        await updateDoc(doc.ref, {
            name: newData.name
        });
    });
}

async function deleteProjectTask(require: requires, data: ProjectTask): Promise<void> {
    if( !require ) return;
    const project_id = require.projectId!;

    const q = query(getCollectionRef(project_id), where("name", "==", data.name));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

export { addProjectTask, readAllProjectTasks, updateProjectTask, deleteProjectTask };