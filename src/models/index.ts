import { requires } from '@/repository';
import BaseModel from './BaseModel';
import Project from './Project';
import ProjectTask from './ProjectTask';
import Task, { TaskStatus } from './Task';

// CE == Create/Edit
enum TargetedModal {
    ProjectCE,
    ProjectTaskCE,
    TaskCE,
    TaskView
}

interface ModalStoreParams {
    targetedModal: TargetedModal,
    require?: requires,
    title?: string,
    data: BaseModel,
    isEdit?: boolean
}


export { BaseModel, Project, ProjectTask, Task, TaskStatus, ModalStoreParams, TargetedModal };