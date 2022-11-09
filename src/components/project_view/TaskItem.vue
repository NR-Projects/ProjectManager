<template>
    <div class="task-item">
        <span>TASK</span>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'TaskItem'
    });
</script>

<style lang="scss" scoped>
    .task-item {
        margin: 8px;
        background: #1b1b1b;
        display: flex;
        min-width: 0;

        & > span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 15px 10px;
        }
    }
</style>