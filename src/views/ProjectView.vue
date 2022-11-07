<template>
    <div>
        <div>
            <p>{{ project_name }}</p>
            <p>{{ project_desc }}</p>
        </div>
        <div class="project-task-collection">
            <ProjectTaskItem
                v-for="projectTask in projectTasks"
                :key="projectTask.id"
                :Data="projectTask" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import ProjectTaskItem from '@/components/project_view/ProjectTaskItem.vue';
    import { Project, ProjectTask } from '@/models';
    import { readAllProjectTasks } from '@/repository';

    export default defineComponent({
            name: 'ProjectView',
            components: {
                ProjectTaskItem
            },
            setup() {
                const store = useStore();
                const router = useRouter();

                const project_name = ref('');
                const project_desc = ref('');

                const projectTasks = ref(Array<ProjectTask>());

                const loadProjectTasks = () => {
                    readAllProjectTasks({}).then((value) => {
                        projectTasks.value = value;
                    })
                };

                onMounted(() => {
                    const projectMounted: Project = store.getters.getprojectLoaded;
                    if ( projectMounted.isNull() ) {
                        // If none, go to projects area
                        router.push({ name: 'home'});
                        return;
                    }
                    
                    loadProjectTasks();
                });

                return {
                    projectTasks,
                    loadProjectTasks,
                    project_name, project_desc
                };
            }
    });
</script>

<style lang="scss" scoped>
</style>