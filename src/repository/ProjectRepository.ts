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
    where, 
    CollectionReference,
    DocumentData } from "firebase/firestore";
import { Project } from '@/models';

function getCollectionRef(): CollectionReference<DocumentData> {
    return collection(getFirestore(), "users", getAuth().currentUser!.uid, "projects");
}

async function addProject(project: Project): Promise<void> {
    const { name, desc } = project;

    await addDoc(getCollectionRef(), {
        name: name,
        desc: desc,
        date_created: serverTimestamp(),
        date_last_updated: serverTimestamp()
    });
}

async function readAllProjects(): Promise<Array<Project>> {
    const projects = Array<Project>();

    const querySnapshot = await getDocs(getCollectionRef());
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
    const q = query(getCollectionRef(), where("name", "==", oldData.name));
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
    const q = query(getCollectionRef(), where("name", "==", data.name));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}

export { addProject, readAllProjects, updateProject, deleteProject };