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
                    <div @click="submitProject">
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
    import { addProject, updateProject, isValid, DataStatus, DataType } from '@/repository';
    import { toggleModal } from '@/utilities';

    export default defineComponent({
        name: 'ProjectsArea',
        components: {
        },
        setup() {
            // Elements
            const modal_ref = ref(null);

            // Variables
            const title = ref('');
            const input_project_name = ref('');
            const input_project_desc = ref('');
            
            let projectLoaded: Project;
            let type: string;

            const submitProject = async () => {
                // Get and process data
                const newProject: Project = new Project(input_project_name.value, input_project_desc.value);

                switch (type) {
                    case 'Add':
                        {
                            // Check Validity
                            if ( await isValid(DataType.Project, DataStatus.New, newProject) ) {
                                // Send to firebase
                                addProject(newProject);
                                window.alert("New Project Added!");
                                return;
                            }
                        }
                        break;
                    case 'Edit':
                        {
                            // Check Validity
                            if ( await isValid(DataType.Project, DataStatus.Existing, newProject, projectLoaded) ) {
                                // Send to firebase
                                updateProject(projectLoaded, newProject);
                                window.alert("Existing Project Updated!");
                                return;
                            }
                        }
                        break;
                }
                window.alert("Invalid Input Detected!");

                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };

            const openModal = (_title: string, isEdit: boolean, data?: Project) => {
                title.value = _title;
                
                if ( isEdit ) {
                    input_project_name.value = data!.name;
                    input_project_desc.value = data!.desc;
                    type = 'Edit';
                    projectLoaded = data!;
                }
                else {
                    type = 'Add';
                }

                // Open modal
                toggleModal('open', modal_ref.value as unknown as HTMLElement);
            };

            const closeModal = () => {
                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };

            return {
                submitProject,
                openModal, closeModal,
                modal_ref,
                input_project_name, input_project_desc, title
            };
        }
    });
</script>

<style lang="scss" scoped>
</style>