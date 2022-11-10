<template>
    <div @click="openModal" class="task-item">
        <span>{{ Data?.name }}</span>
    </div>

    <keep-alive>
        <TaskViewModal
            ref="modal_view_comp_ref"
            :Data="Data"
            @edit_task="(Data) => _edit_task(Data)" />
    </keep-alive>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { Task } from '@/models';
    import TaskViewModal from '@/components/modals/TaskViewModal.vue';

    export default defineComponent({
        name: 'TaskItem',
        props: {
            Data: Task
        },
        components: {
            TaskViewModal
        },
        methods: {
            _edit_task(Data: Task) {
                this.$emit('_editTaskModal', Data);
            }
        },
        setup() {
            const modal_view_comp_ref = ref(null);

            const openModal = () => {
                (modal_view_comp_ref.value as any).openModal();
            };

            return {
                modal_view_comp_ref,
                openModal
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
        min-width: 0;

        & > span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 15px 10px;
            color: #d1d1d1;
        }
    }
</style>