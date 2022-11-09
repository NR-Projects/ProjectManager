<template>
    <Teleport to="#app">
        <div ref="modal_ref" class="modal">
            <div class="modal-content">
                <p class="modal-title">{{ title }}</p>
                <div class="modal-inputs">
                    <div class="modal-input">
                        <label>Project Task Name:</label>
                        <input v-model="input_project_task_name" type="text" />
                    </div>
                </div>
                <div class="modal-options">
                    <div @click="closeModal">
                        <span>Close</span>
                    </div>
                    <div @click="submitProjectTask">
                        <span>Submit</span>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import { ProjectTask } from '@/models';
    import { toggleModal } from '@/utilities';
    import { requires, addProjectTask, DataStatus, isValid, updateProjectTask, DataType } from '@/repository';

    export default defineComponent({
        name: 'ProjectTaskModal',
        props: {
            ProjectID: String
        },
        setup(props) {
            const modal_ref = ref(null);
            const title = ref('');
            const input_project_task_name = ref('');

            let projectTaskLoaded: ProjectTask;
            let type: string;

            const submitProjectTask = async () => {
                // Get and process data
                const newProjectTask: ProjectTask = new ProjectTask(input_project_task_name.value);

                let r: requires = {
                    projectId: props.ProjectID
                }

                switch (type) {
                    case 'Add':
                        {
                            // Check Validity
                            if ( await isValid(DataType.ProjectTask, DataStatus.New, newProjectTask, undefined, r) ) {
                                // Send to firebase
                                addProjectTask(r, newProjectTask);
                                window.alert("New Project Task Added!");
                                return;
                            }
                        }
                        break;
                    case 'Edit':
                        {
                            // Check Validity
                            if ( await isValid(DataType.ProjectTask, DataStatus.Existing, newProjectTask, projectTaskLoaded, r) ) {
                                // Send to firebase
                                updateProjectTask(r, projectTaskLoaded, newProjectTask);
                                window.alert("Existing Project Task Updated!");
                                return;
                            }
                        }
                        break;
                }
                window.alert("Invalid Input Detected!");

                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };

            const openModal = (_title: string, isEdit: boolean, data?: ProjectTask) => {
                title.value = _title;
                
                if ( isEdit ) {
                    input_project_task_name.value = data!.name;
                    type = 'Edit';
                    projectTaskLoaded = data!;
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
                submitProjectTask,
                openModal, closeModal,
                modal_ref,
                input_project_task_name, title
            };
        }
    });
</script>

<style lang="scss" scoped>
</style>