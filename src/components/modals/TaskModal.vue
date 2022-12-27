<template>
    <Teleport to="#app">
        <div ref="modal_ref" class="modal">
            <div class="modal-content">
                <p class="modal-title">{{ title }}</p>
                <div class="modal-inputs">
                    <div class="modal-input">
                        <label>Task Name:</label>
                        <input v-model="input_task_name" type="text" />
                    </div>
                    <div class="modal-input">
                        <label>Task Description:</label>
                        <input v-model="input_task_desc" type="text" />
                    </div>
                    <div class="modal-input" v-show="isAddingTask">
                        <label>Task Description:</label>
                        <select v-model="input_task_status">
                            <option disabled value="">Select Status</option>
                            <option value=0 selected>Not Yet Started</option>
                            <option value=1>In Progress</option>
                            <option value=2>Finished</option>
                        </select>
                    </div>
                </div>
                <div class="modal-options">
                    <div @click="closeModal" class="close-btn">
                        <span>Close</span>
                    </div>
                    <div @click="submitTask" class="submit-btn">
                        <span>Submit</span>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { Task } from '@/models';
    import { toggleModal } from '@/utilities';
    import { requires, addTask, DataStatus, isValid, updateTask, DataType } from '@/repository';

    export default defineComponent({
        name: 'ProjectTaskModal',
        setup() {
            const modal_ref = ref(null);
            const title = ref('');
            const input_task_name = ref('');
            const input_task_desc = ref('');
            const input_task_status = ref(0);
            const isAddingTask = ref(true);

            let require: requires = {};
            let taskLoaded: Task;
            let type: string;

            const submitTask = async () => {
                // Get and process data
                const newTask: Task = new Task(input_task_name.value, input_task_desc.value, input_task_status.value);

                // Check if inputs are set
                if (!newTask.areInputsValid()) {
                    window.alert("Incomplete Inputs");
                    return;
                }

                switch (type) {
                    case 'Add':
                        {
                            // Check Validity
                            if ( await isValid(DataType.Task, DataStatus.New, newTask, undefined, require) ) {
                                // Send to firebase
                                await addTask(require, newTask);
                                window.alert("New Task Added!");
                                return;
                            }
                        }
                        break;
                    case 'Edit':
                        {
                            // Check Validity
                            if ( await isValid(DataType.Task, DataStatus.Existing, newTask, taskLoaded, require) ) {
                                // Send to firebase
                                await updateTask(require, taskLoaded, newTask);
                                window.alert("Existing Task Updated!");
                                return;
                            }
                        }
                        break;
                }
                window.alert("Invalid Input Detected!");

                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };

            const openModal = (r: requires, _title: string, isEdit: boolean, data?: Task) => {
                require = r;
                title.value = _title;
                
                if ( isEdit ) {
                    input_task_name.value = data!.name;
                    input_task_desc.value = data!.desc;
                    input_task_status.value = data!.status;
                    type = 'Edit';
                    taskLoaded = data!;
                    isAddingTask.value = false;
                }
                else {
                    type = 'Add';
                    isAddingTask.value = true;
                }

                // Open modal
                toggleModal('open', modal_ref.value as unknown as HTMLElement);
            };

            const closeModal = () => {
                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };

            return {
                submitTask,
                openModal, closeModal,
                modal_ref,
                input_task_name, input_task_desc, input_task_status,
                title,
                isAddingTask
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>