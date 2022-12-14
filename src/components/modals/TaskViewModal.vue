<template>
    <Teleport to="#app">
        <div ref="modal_ref" class="modal">
            <div class="modal-view-content" style="outline: 3px solid" v-bind:style="outlineColor">
                <p class="modal-title">{{ DataView.name }}</p>
                <div class="modal-meta">
                    <div class="modal-view-infos">
                        <div>
                            <span>Date Created:</span>
                            <span>{{ formatDate(DataView.date_created) }}</span>
                        </div>
                        <div>
                            <span>Date Last Updated:</span>
                            <span>{{ formatDate(DataView.date_last_updated) }}</span>
                        </div>
                    </div>
                    <div class="modal-self-option">
                        <label>Task Status:</label>
                        <select v-model="DataView.status" @change="onChange()">
                            <option disabled value="">Select Status</option>
                            <option value=0 selected>Not Yet Started</option>
                            <option value=1>In Progress</option>
                            <option value=2>Finished</option>
                        </select>
                    </div>
                </div>
                <div class="modal-view-desc">
                    <div>
                        <textarea readonly v-model="DataView.desc">
                        </textarea>
                    </div>
                </div>
                <div class="modal-options">
                    <div @click="closeModal" class="close-btn">
                        <span>Close</span>
                    </div>
                    <div @click="editTask" class="edit-btn">
                        <span>Edit</span>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useStore } from 'vuex';
    import { TargetedModal, Task, TaskStatus } from '@/models';
    import { requires, updateTask } from '@/repository';
    import { toggleModal } from '@/utilities';

    export default defineComponent({
        name: 'TaskViewModal',
        methods: {
            formatDate(_date: Date|null|undefined): string {
                if (_date)
                    return _date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                return "Invalid Date";
            }
        },
        setup() {
            const store = useStore();
            const modal_ref = ref(null);
            const outlineColor = ref({});

            const DataView = ref(new Task('', '', 0));
            let require: requires = {};

            const UpdateUI = () => {
                let color_code = '';
                let taskStatus = Number(DataView.value.status);

                switch(taskStatus) {
                    case TaskStatus.NotYetStarted:
                        color_code = "#630000";
                        break;
                    case TaskStatus.InProgress:
                        color_code = "#454545";
                        break;
                    case TaskStatus.Finished:
                        color_code = "#00631e";
                        break;
                }

                outlineColor.value = { 'outline-color': color_code };
            };

            const openModal = (r: requires, Data: Task) => {
                require = r;
                DataView.value = Data;

                // Open modal
                toggleModal('open', modal_ref.value as unknown as HTMLElement);

                // Update UI
                UpdateUI();
            };

            const closeModal = () => {
                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };
            
            const editTask = () => {
                store.dispatch('setModalStoreParams', {
                    targetedModal: TargetedModal.TaskCE,
                    title: 'Edit Existing Task',
                    isEdit: true,
                    data: DataView.value,
                    require: require
                });
            }

            const onChange = async () => {
                await updateTask(require, DataView.value, DataView.value);

                // Update UI
                UpdateUI();
            }

            return {
                openModal, closeModal, onChange,
                modal_ref, DataView,
                editTask,
                outlineColor
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>