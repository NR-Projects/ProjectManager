import { getFirestore, onSnapshot, collection, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, Timestamp, query, where, orderBy } from "firebase/firestore";
import requires from './IRequirement';
import { Project } from '@/models';

function addProject(require: requires) {
    //
}

function readAllProjects(require: requires) {
    //
}

function updateProject(require: requires) {
    //
}

function deleteProject(require: requires) {
    //
}

export { addProject, readAllProjects, updateProject, deleteProject };