<template>
    <div @click="openModal" class="task-item">
        <span>{{ Data?.name }}</span>
        <img @click="delete_task" src="@/assets/img/delete-item.svg" width="25" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from 'vuex';
    import { TargetedModal, Task } from '@/models';
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

            const openModal = () => {
                store.dispatch('setModalStoreParams', {
                        targetedModal: TargetedModal.TaskView,
                        data: props.Data,
                        require: {
                            projectId: props.ProjectID,
                            projectTaskId: props.ProjectTaskID
                        }
                });
            };

            const delete_task = () => {
                if(window.confirm('Are you sure you want to delete this')) {
                    deleteTask({ projectId: props.ProjectID, projectTaskId: props.ProjectTaskID }, props.Data!);
                }
            };

            return {
                openModal, delete_task
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