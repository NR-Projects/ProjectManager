<template>
    <div class="project-task-item">
        <div class="project-task-info">
            <p>{{ Data?.name }}</p>
        </div>
        <div class="project-task-tools">
            <img @click="_editProjectTask" src="@/assets/img/edit-item.svg" width="25" />
            <img @click="_deleteProjectTask" src="@/assets/img/delete-item.svg" width="25" />
        </div>
        <div class="project-task-container">
            <div class="task-tools">
                <div @click="openModal">
                    <img src="@/assets/img/add-item.svg" width="25" />
                    <span>Add New Task</span>
                </div>
                <div @click="loadTasks">
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
                        @_editTaskModal="(Data) => editTaskModal(Data)" />
                </template>
            </Draggable>
        </div>
    </div>

    <keep-alive>
        <TaskModal
            ref="modal_comp_ref"
            :ProjectID="ID"
            :ProjectTaskID="Data?.id" />
    </keep-alive>

</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import { ProjectTask, Task } from '@/models';
    import { deleteProjectTask, readAllTasks } from '@/repository';
    import Draggable from 'vuedraggable';
    import TaskItem from '@/components/project_view/TaskItem.vue';
    import TaskModal from '@/components/modals/TaskModal.vue';

    export default defineComponent({
        name: 'ProjectTaskItem',
        components: {
            TaskItem,
            TaskModal,
            Draggable
        },
        props: {
            Data: ProjectTask,
            ID: String
        },
        methods: {
            _editProjectTask() {
                this.$emit('edit_projectTask', this.Data);
            },
            _deleteProjectTask() {
                if(window.confirm('Are you sure you want to delete this')) {
                    deleteProjectTask({ projectId: this.ID }, this.Data!);
                }
            }
        },
        setup(props) {
            const modal_comp_ref = ref(null);
            const tasks = ref(Array<Task>());

            const loadTasks = () => {
                readAllTasks({ projectId: props.ID, projectTaskId: props.Data?.id }).then((value) => {
                    tasks.value = value;
                })
            };

            const openModal = () => {
                (modal_comp_ref.value as any).openModal('Add Project Task', false);
            }

            const editTaskModal = (Data: Task) => {
                (modal_comp_ref.value as any).openModal('Edit Existing Project Task', true, Data);
            }

            onMounted(() => {
                loadTasks();
            });

            return {
                modal_comp_ref,
                tasks, loadTasks,
                openModal, editTaskModal
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