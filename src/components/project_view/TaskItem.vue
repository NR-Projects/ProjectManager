<template>
    <div @click="OpenModal" class="task-item" ref="TaskContainer">
        <span>{{ Data?.name }}</span>
        <img @click.stop="DeleteTask" src="@/assets/img/delete-item.svg" width="25" />
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, onUpdated, ref } from 'vue';
    import { useStore } from 'vuex';
    import { TargetedModal, Task, TaskStatus } from '@/models';
    import { deleteTask } from '@/repository';

    export default defineComponent({
        name: 'TaskItem',
        props: {
            Data: Task,
            ProjectID: String,
            ProjectTaskID: String
        },
        setup(props) {
            const store = useStore();

            const TaskContainer = ref(null);

            onMounted(() => {
                UpdateBackgroundColor();
            });

            onUpdated(() => {
                UpdateBackgroundColor();
            });

            const UpdateBackgroundColor = () => {
                let color_code = "#010101";
                let taskStatus = Number(props!.Data!.status);

                switch(taskStatus) {
                    case TaskStatus.NotYetStarted:
                        color_code = "#630000";
                        break;
                    case TaskStatus.InProgress:
                        color_code = "#454545";
                        break;
                    case TaskStatus.Finished:
                        color_code = "#00631e";
                        break;
                }

                (TaskContainer.value! as HTMLElement).style.backgroundColor = color_code;
            };

            const OpenModal = () => {
                store.dispatch('setModalStoreParams', {
                        targetedModal: TargetedModal.TaskView,
                        data: props.Data,
                        require: {
                            projectId: props.ProjectID,
                            projectTaskId: props.ProjectTaskID
                        }
                });
            };

            const DeleteTask = () => {
                if(window.confirm('Are you sure you want to delete this')) {
                    deleteTask({ projectId: props.ProjectID, projectTaskId: props.ProjectTaskID }, props.Data!);
                }
            };

            return {
                TaskContainer, OpenModal, DeleteTask
            };
        }
    });
</script>

<style lang="scss" scoped>
    .task-item {
        cursor: pointer;
        margin: 8px;
        background: #1b1b1b;
        display: flex;
        justify-content: space-between;
        min-width: 0;

        & > span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 15px 10px;
            color: #d1d1d1;
        }

        & > img {
            margin-right: 5px;
        }
    }
</style>