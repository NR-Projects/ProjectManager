<template>
    <div id="project-area">
        <div>
            <p>Your Projects:</p>
            <div id="user-projects-container">
                <ProjectItem
                    v-for="sample_project in sampleProjects"
                    :key="sample_project.id"
                    :Name="sample_project.name"
                    :Date_Created="sample_project.date_created"
                    :Date_Last_Accessed="sample_project.date_last_accessed" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import ProjectItem from '@/components/main_app/ProjectItem.vue';
    import Project from '@/models/Project';

    export default defineComponent({
        name: 'ProjectsArea',
        components: {
            ProjectItem
        },
        data () {
            return {
                sampleProjects : [
                    new Project('1', 'Sample 1', new Date(2020, 2, 23), new Date()),
                    new Project('2', 'Sample 2', new Date(2021, 5, 24), new Date()),
                    new Project('3', 'Sample 3', new Date(2022, 11, 18), new Date()),
                    new Project('4', 'Sample 4', new Date(2022, 10, 3), new Date()),
                ]
            }
        }
    });



</script>

<style lang="scss" scoped>
    #project-area {
        width: 100%;
        height: 85%;

        & > div {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            & > p {
                margin: 2rem;
                text-align: left;
                color: white;
                font-size: 1.5rem;
            }
        }
    }

    #user-projects-container {
        margin: 0.5rem;
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>