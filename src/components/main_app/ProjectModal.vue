<template>
    <Teleport to="#app">
        <div ref="modal_ref" class="modal">
            <div class="modal-content">
                <p class="modal-title">{{ title }}</p>
                <div class="modal-inputs">
                    <div class="modal-input">
                        <label>Project Name:</label>
                        <input v-model="input_project_name" type="text" />
                    </div>
                    <div class="modal-input">
                        <label>Project Description:</label>
                        <input v-model="input_project_desc" type="text" />
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
    import { Project } from '@/models';
    import { addProject, isValid, DataStatus } from '@/repository';
    import { toggleModal } from '@/utilities';

    export default defineComponent({
        name: 'ProjectsArea',
        components: {
        },
        setup() {
            // Elements
            const modal_ref = ref(null);

            // Variables
            const input_project_name = ref('');
            const input_project_desc = ref('');

            const submitAddProject = () => {
                // Get and process data
                const newProject: Project = new Project(input_project_name.value, input_project_desc.value);

                // Check Validity
                if ( !isValid(DataStatus.New, newProject, Array<Project>()) ) return;

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
                submitAddProject,
                openModal, closeModal,
                modal_ref,
                input_project_name, input_project_desc
            };
        },
        mounted() {
            if ( this.project && this.type && this.type == 'existing') {
                this.input_project_name = this.project.name;
                this.input_project_desc = this.project.desc;
            }
        },
        props: {
            title: String,
            type: String,
            project: Project
        }
    });
</script>

<style lang="scss" scoped>
</style>