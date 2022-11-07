<template>
    <div>
        <p>PROJECT_TASK_NAME</p>
        <div>
            <TaskItem />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TaskItem from '@/components/project_view/TaskItem.vue';

    export default defineComponent({
        name: 'ProjectTaskItem',
        components: {
            TaskItem
        }
    });
</script>

<style lang="scss" scoped>
</style>