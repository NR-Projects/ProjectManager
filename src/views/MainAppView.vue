<template>
    <TopBar />
    <ProjectsArea />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    import TopBar from '@/components/main_app/TopBar.vue';
    import ProjectsArea from '@/components/main_app/ProjectsArea.vue';

    export default defineComponent({
        name: 'MainAppView',
        components: {
            TopBar,
            ProjectsArea
        }
    });
</script>