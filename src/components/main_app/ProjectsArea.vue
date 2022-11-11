<template>
    <div id="project-area">
        <div>
            <p>Your Projects:</p>
            <div id="user-projects-tools">
                <img @click="openModal" src="@/assets/img/add-item.svg" />
                <img @click="loadProjects" src="@/assets/img/refresh.svg" />
            </div>
            <div id="user-projects-container">
                <ProjectItem
                    v-for="project in projects"
                    :key="project.id"
                    :Data="project" />
            </div>
        </div>
    </div>    
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStore } from 'vuex';
    import { Project, TargetedModal } from '@/models';
    import { readAllProjects } from '@/repository';
    import ProjectItem from '@/components/main_app/ProjectItem.vue';

    export default defineComponent({
        name: 'ProjectsArea',
        components: {
            ProjectItem
        },
        setup() {
            const store = useStore();
            const modal_comp_ref = ref(null);
            const projects = ref(Array<Project>());

            const loadProjects = () => {
                readAllProjects().then((value) => {
                    projects.value = value;
                })
            };

            const openModal = () => {
                store.dispatch('setModalStoreParams', {
                    targetedModal: TargetedModal.ProjectCE,
                    title: 'Add New Project',
                    isEdit: false
                });
            }

            return {
                projects,
                loadProjects,
                openModal,
                modal_comp_ref
            };
        },
        mounted() {
            this.loadProjects();
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

    #user-projects-tools {
        display: flex;
        align-items: center;
        justify-content: right;
        padding-right: 5vw;

        & > img {
            width: 30px;
            margin: 0.5vw;

            &:hover {
                cursor:pointer;
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