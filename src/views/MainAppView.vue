<template>
    <TopBarArea />
    <ProjectsArea />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    import TopBarArea from '@/components/main_app/TopBarArea.vue';
    import ProjectsArea from '@/components/main_app/ProjectsArea.vue';

    export default defineComponent({
        name: 'MainAppView',
        components: {
            TopBarArea,
            ProjectsArea
        }
    });
</script>