<template>
    <div class="project-task-item">
        <div class="project-task-info">
            <p>{{ projectTask.name }}</p>
        </div>
        <div class="project-task-tools">
            <img src="@/assets/img/edit-item.svg" width="25" />
            <img src="@/assets/img/delete-item.svg" width="25" />
        </div>
        <div class="project-task-container">
            <div class="task-tools">
                <div>
                    <img src="@/assets/img/add-item.svg" width="25" />
                    <span>Add New Task</span>
                </div>
                <div>
                    <img @click="loadTasks" src="@/assets/img/refresh.svg" width="25" />
                </div>
            </div>
            <Draggable>
                <TaskItem />
            </Draggable>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import { ProjectTask, Task } from '@/models';
    import { readAllTasks } from '@/repository';
    import Draggable from 'vuedraggable';
    import TaskItem from '@/components/project_view/TaskItem.vue';

    export default defineComponent({
        name: 'ProjectTaskItem',
        components: {
            TaskItem,
            Draggable
        },
        props: {
            Data: ProjectTask,
            ID: String
        },
        setup(props) {
            const projectTask = ref(ProjectTask.createEmptyObject());
            const tasks = ref(Array<Task>());

            const loadTasks = () => {
                readAllTasks({ projectId: props.ID, projectTaskId: props.Data?.id }).then((value) => {
                    tasks.value = value;
                })
            };

            onMounted(() => {
                loadTasks();

                projectTask.value = props.Data!;
            });

            return {
                projectTask,
                loadTasks
            };
        }
    });
</script>

<style lang="scss" scoped>
    .project-task-item {
        margin: 10px 4px;
        background: #0a001c83;
        min-width: 350px;

        & > .project-task-info {
            display: inline-block;
            color: #d6d6d6;
        }

        & > .project-task-tools {
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            & > img {
                cursor: pointer;
            }
        }

        & > .project-task-container {
            display: flex;
            flex-direction: column;

            & > .task-tools {
                display: flex;
                
                & > div {
                    background: #c7c7c731;
                    margin: 10px 5px;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &:hover {
                        background: #c7c7c763;
                        cursor: pointer;

                        & > span {
                            color: #000000e3;
                            font-weight: 600;
                        }
                    }

                    &:nth-child(1) {
                        flex-grow: 4;
                    }
                    &:nth-child(2) {
                        flex-grow: 1;
                    }

                    & > span {
                        color: #dcdbdbd1;
                        font-size: 0.75rem;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>