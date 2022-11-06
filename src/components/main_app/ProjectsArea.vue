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
                    :Data="project"
                    @edit_project="(Data) => editProjModal(Data)" />
            </div>
        </div>
        <keep-alive>
            <ProjectModal ref="modal_comp_ref"/>
        </keep-alive>
    </div>    
</template>

<script lang="ts">
    import ProjectItem from '@/components/main_app/ProjectItem.vue';
    import ProjectModal from '@/components/main_app/ProjectModal.vue';
    import { defineComponent, ref } from 'vue';
    import { Project } from '@/models';
    import { readAllProjects } from '@/repository';

    export default defineComponent({
        name: 'ProjectsArea',
        components: {
            ProjectItem,
            ProjectModal
        },
        setup() {
            // Elements
            const modal_comp_ref = ref(null);

            // Variables
            const projects = ref(Array<Project>());

            const loadProjects = () => {
                readAllProjects().then((value) => {
                    projects.value = value;
                })
            };

            const openModal = () => {
                console.log("err");
                (modal_comp_ref.value as any).openModal('Add New Project', false);
            }

            const editProjModal = (Data: Project) => {
                (modal_comp_ref.value as any).openModal('Edit Existing Project', true, Data);
            }

            return {
                projects,
                loadProjects,
                openModal, editProjModal,
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