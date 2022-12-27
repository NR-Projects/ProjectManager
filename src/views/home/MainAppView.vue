<template>
    <div id="main-app">
        <ProfileInformation />
        <ProjectsArea />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    import ProfileInformation from '@/components/main_app/ProfileInformation.vue';
    import ProjectsArea from '@/components/main_app/ProjectsArea.vue';

    export default defineComponent({
        name: 'MainAppView',
        components: {
            ProfileInformation,
            ProjectsArea
        }
    });
</script>

<style lang="scss" scoped>
    #main-app {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(51,6,89,1) 0%, rgba(75,2,144,1) 100%);
    }
</style>