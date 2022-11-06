<template>
    <div>
        <p>PROJECT_TASK_NAME</p>
        <div>
            <TaskItem />
        </div>
    </div>

    <ProjectTaskModal />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TaskItem from '@/components/project_view/TaskItem.vue';
    import ProjectTaskModal from '@/components/project_view/ProjectTaskModal.vue';

    export default defineComponent({
        name: 'ProjectTaskItem',
        components: {
            TaskItem,
            ProjectTaskModal
        }
    });
</script>

<style lang="scss" scoped>
</style>