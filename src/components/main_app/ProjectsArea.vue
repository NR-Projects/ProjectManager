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

    <Teleport to="#app">
        <div ref="modal_ref" class="modal">
            <div class="modal-content">
                <p class="modal-title">This is a modal</p>
                <div class="modal-inputs">
                    <div class="modal-input">
                        <label>Project Name:</label>
                        <input v-model="add_project_name" type="text" />
                    </div>
                    <div class="modal-input">
                        <label>Project Description:</label>
                        <input v-model="add_project_desc" type="text" />
                    </div>
                </div>
                <div class="modal-options">
                    <div @click="closeModal">
                        <span>Close</span>
                    </div>
                    <div @click="submitAddProject">
                        <span>Submit</span>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import ProjectItem from '@/components/main_app/ProjectItem.vue';
    import { Project } from '@/models';
    import { addProject, readAllProjects, isValid, DataStatus } from '@/repository';
    import { toggleModal } from '@/utilities';

    export default defineComponent({
        name: 'ProjectsArea',
        components: {
            ProjectItem
        },
        setup() {
            // Elements
            const modal_ref = ref(null);

            // Variables
            const projects = ref(Array<Project>());
            const add_project_name = ref('');
            const add_project_desc = ref('');

            const loadProjects = () => {
                readAllProjects().then((value) => {
                    projects.value = value;
                })
            };

            const submitAddProject = () => {
                // Get and process data
                const newProject: Project = new Project(add_project_name.value, add_project_desc.value);

                // Check Validity
                if ( !isValid(DataStatus.New, newProject, projects.value) ) return;

                // Send to firebase
                addProject(newProject);

                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };

            const openModal = () => {
                // Open modal
                toggleModal('open', modal_ref.value as unknown as HTMLElement);
            };

            const closeModal = () => {
                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };

            return {
                projects,
                submitAddProject, loadProjects,
                openModal, closeModal,
                modal_ref,
                add_project_name, add_project_desc
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