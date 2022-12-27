<template>
    <div class="project-view">
        <div class="project-topbar">
            <div>
                <img v-on:click="BackToProjects" src="@/assets/img/arrow-left.svg" />
            </div>
            <div></div>
        </div>
        <div class="project-info">
            <p>{{ project_name }}</p>
            <p>{{ project_desc }}</p>
        </div>
        <div class="project-task-container">
            <div class="project-task-tools">
                <div v-on:click="LoadProjectTasks" class="project-task-tool">
                    <img src="@/assets/img/refresh.svg" width="30" />
                    <span>Refresh Project Tasks</span>
                </div>
                <div v-on:click="OpenModal" class="project-task-tool">
                    <img src="@/assets/img/add-item.svg" width="30" />
                    <span>Add New Project Task</span>
                </div>
            </div>
            <div class="project-task-collection">
                <ProjectTaskItem
                    v-for="projectTask in projectTasks"
                    :key="projectTask.id"
                    :ID="projectIdRef"
                    :Data="projectTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { Project, ProjectTask, TargetedModal } from '@/models';
    import { readAllProjectTasks } from '@/repository';
    import ProjectTaskItem from '@/components/project_view/ProjectTaskItem.vue';

    export default defineComponent({
            name: 'ProjectView',
            components: {
                ProjectTaskItem
            },
            setup() {
                const store = useStore();
                const router = useRouter();
                const projectMounted: Project = store.getters.getprojectLoaded;

                const projectIdRef = ref('');
                const project_name = ref('');
                const project_desc = ref('');
                const projectTasks = ref(Array<ProjectTask>());

                projectIdRef.value = projectMounted.id!;

                const LoadProjectTasks = () => {
                    readAllProjectTasks({ projectId: projectMounted.id }).then((value) => {
                        projectTasks.value = value;
                    })
                };

                const OpenModal = () => {
                    store.dispatch('setModalStoreParams', {
                        targetedModal: TargetedModal.ProjectTaskCE,
                        title: 'Add New Project Task',
                        isEdit: false,
                        require: {
                            projectId: projectIdRef.value
                        }
                    });
                }

                const BackToProjects = () => {
                    router.push({ name: 'home'});
                }

                onMounted(() => {
                    if ( projectMounted.isNull() ) {
                        // If none, go to projects area
                        router.push({ name: 'home'});
                        return;
                    }
                    
                    project_name.value = projectMounted.name;
                    project_desc.value = projectMounted.desc;
                    LoadProjectTasks();
                });

                return {
                    OpenModal, LoadProjectTasks, BackToProjects,
                    projectTasks,
                    project_name, project_desc,
                    projectIdRef
                };
            }
    });
</script>

<style lang="scss" scoped>
.project-view {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgb(40, 5, 69) 0%, rgb(84, 2, 161) 100%);
}

.project-topbar {
    background: #00000036;
    display: flex;
    height: 10%;

    & > div {
        &:nth-child(1) {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            & > img {
                width: 40px;
                cursor: pointer;
            }
        }

        &:nth-child(2) {
            flex: 3;
        }
    }
}

.project-info {
    display: inline-block;
    width: 100%;
    height: 20%;

    & > p {
        color: #ffffff;
        
        &:nth-child(1) {
            font-size: 1.55rem;
        }
    }
}
        
.project-task-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70%;

    & > .project-task-tools {
        display: flex;
        justify-content: flex-end;

        & > .project-task-tool {
            background: #ffffff5f;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-right: 10px;
                    
            &:hover {
                cursor: pointer;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.367);
                background: #ffffff35;
            }

            & > img {
                margin: 3px 6px;
            }

            & > span {
                color: rgb(222, 222, 222);
                font-size: 0.75rem;
                margin-right: 5px;
            }
        }
    }

    & > .project-task-collection {
        background: #00000039;
        margin: 10px;
        height: 100%;
        display: flex;
        align-items: stretch;
        overflow-x: auto;
    }
}
</style>