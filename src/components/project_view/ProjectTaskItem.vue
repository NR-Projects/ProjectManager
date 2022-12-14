<template>
    <div class="project-task-item">
        <div class="project-task-info">
            <p>{{ Data?.name }}</p>
        </div>
        <div class="project-task-tools">
            <img @click="EditProjectTask" src="@/assets/img/edit-item.svg" width="25" />
            <img @click="DeleteProjectTask" src="@/assets/img/delete-item.svg" width="25" />
        </div>
        <div class="project-task-container">
            <div class="task-tools">
                <div @click="OpenModal">
                    <img src="@/assets/img/add-item.svg" width="25" />
                    <span>Add New Task</span>
                </div>
                <div @click="LoadTasks">
                    <img src="@/assets/img/refresh.svg" width="25" />
                </div>
            </div>
            <Draggable
                class="task-collection"
                v-model="tasks"
                group="task"
                item-key="id">
                <template #item="{element}">
                    <TaskItem
                        :key="element.id"
                        :Data="element"
                        :ProjectID="ID"
                        :ProjectTaskID="Data?.id" />
                </template>
            </Draggable>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, watch } from 'vue';
    import { useStore } from 'vuex';
    import { ProjectTask, TargetedModal, Task } from '@/models';
    import { deleteProjectTask, addTask, deleteTask, readAllTasks } from '@/repository';
    import { arrayDiff } from '@/utilities';
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
        methods: {
            EditProjectTask() {
                this.$store.dispatch('setModalStoreParams', {
                    targetedModal: TargetedModal.ProjectTaskCE,
                    title: 'Edit Existing Project Task',
                    isEdit: true,
                    data: this.Data,
                    require: {
                        projectId: this.ID
                    }
                });
            },
            DeleteProjectTask() {
                if(window.confirm('Are you sure you want to delete this')) {
                    deleteProjectTask({ projectId: this.ID }, this.Data!);
                }
            }
        },
        setup(props) {
            const store = useStore();
            let tasks = ref(Array<Task>());
            let isLoadCalledFlag = false;

            const LoadTasks = async () => {
                isLoadCalledFlag = true;
                await readAllTasks({ projectId: props.ID, projectTaskId: props.Data?.id }).then((value) => {
                    tasks.value = value;
                })
                console.log(tasks.value);
            };

            const OpenModal = () => {
                store.dispatch('setModalStoreParams', {
                        targetedModal: TargetedModal.TaskCE,
                        title: 'Add New Task',
                        isEdit: false,
                        require: {
                            projectId: props.ID,
                            projectTaskId: props.Data!.id!
                        }
                });
            }

            watch(tasks, (newTasks, oldTasks) => {
                if (isLoadCalledFlag) {
                    isLoadCalledFlag = false;
                    return;
                }

                // Exit when this is not triggered by draggable event
                if ( newTasks.length == oldTasks.length ) return;

                // Check If Add or Delete
                let op_task: any;
                if ( newTasks.length > oldTasks.length ) op_task = addTask;
                else op_task = deleteTask;

                // Check for Items to Add or Delete
                const diffItems = arrayDiff(newTasks, oldTasks);
                diffItems.forEach(element => {
                    op_task( { projectId: props.ID, projectTaskId: props.Data!.id! } , element );
                });
            })

            onMounted(() => {
                LoadTasks();
            });

            return {
                tasks, LoadTasks, OpenModal
            };
        }
    });
</script>

<style lang="scss" scoped>
    .project-task-item {
        margin: 10px 4px;
        background: #0a001c83;
        min-width: 350px;
        max-width: 350px;
        display: flex;
        flex-direction: column;

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
            flex: 1;

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

            & > .task-collection {
                display: flex;
                flex-direction: column;
                flex: 1;
            }
        }
    }
</style>