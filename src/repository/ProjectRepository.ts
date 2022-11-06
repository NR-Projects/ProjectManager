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
import { Project } from '@/models';

async function addProject(project: Project): Promise<void> {
    const { name, desc } = project;

    const uid = getAuth().currentUser?.uid;

    if ( !uid ) return;

    await addDoc(collection(getFirestore(), "users", uid, "projects"), {
        name: name,
        desc: desc,
        date_created: serverTimestamp(),
        date_last_updated: serverTimestamp()
    });
}

async function readAllProjects(): Promise<Array<Project>> {
    const projects = Array<Project>();

    const uid = getAuth().currentUser?.uid;

    if ( !uid ) return projects;

    const querySnapshot = await getDocs(collection(getFirestore(), "users", uid, "projects"));
    querySnapshot.forEach((doc) => {
        const doc_fields = doc.data();
        projects.push(
            new Project(
                doc_fields.name,
                doc_fields.desc,
                doc_fields.date_created.toDate(),
                doc_fields.date_last_updated.toDate(),
                doc.id,
            )
        );
    });

    return projects;
}

async function updateProject(oldData: Project, newData: Project): Promise<void> {
    const uid = getAuth().currentUser?.uid;

    if ( !uid ) return;

    const q = query(collection(getFirestore(), "users", uid, "projects"), where("name", "==", oldData.name));
    (await getDocs(q)).forEach(async (doc) => {
        await updateDoc(doc.ref, {
            name: newData.name,
            desc: newData.desc,
            date_created: oldData.date_created,
            date_last_updated: serverTimestamp()
        });
    });
}

async function deleteProject(data: Project): Promise<void> {
    const uid = getAuth().currentUser?.uid;

    if ( !uid ) return;

    const q = query(collection(getFirestore(), "users", uid, "projects"), where("name", "==", data.name));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

export { addProject, readAllProjects, updateProject, deleteProject };