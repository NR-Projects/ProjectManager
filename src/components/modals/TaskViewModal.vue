<template>
    <Teleport to="#app">
        <div ref="modal_ref" class="modal" id="task-view-modal">
            <div class="modal-view-content">
                <p class="modal-title">{{ Data?.name }}</p>
                <div class="modal-meta">
                    <div class="modal-view-infos">
                        <div>
                            <span>Date Created:</span>
                            <span>{{ formatDate(Data?.date_created) }}</span>
                        </div>
                        <div>
                            <span>Date Last Updated:</span>
                            <span>{{ formatDate(Data?.date_last_updated) }}</span>
                        </div>
                    </div>
                    <div class="modal-self-option">
                        <label>Task Status:</label>
                        <select>
                            <option disabled value="">Select Status</option>
                            <option value=0 selected>Not Yet Started</option>
                            <option value=1>In Progress</option>
                            <option value=2>Finished</option>
                        </select>
                    </div>
                </div>
                <div class="modal-view-desc">
                    <div>
                        <textarea readonly>
                            NOT YET IMPLEMENTED
                        </textarea>
                    </div>
                </div>
                <div class="modal-options">
                    <div @click="_editTask" class="edit-btn">
                        <span>Edit</span>
                    </div>
                    <div @click="closeModal" class="close-btn">
                        <span>Close</span>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { Task } from '@/models';
    import { requires } from '@/repository';
    import { toggleModal } from '@/utilities';

    export default defineComponent({
        name: 'TaskViewModal',
        methods: {
            formatDate(_date: Date|null|undefined): string {
                if (_date)
                    return _date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                return "Invalid Date";
                
            },
            _editTask() {
                this.$emit('edit_task', this.Data);
            }
        },
        props: {
            Data: Task
        },
        setup() {
            const modal_ref = ref(null);

            const openModal = () => {
                // Open modal
                toggleModal('open', modal_ref.value as unknown as HTMLElement);
            };

            const closeModal = () => {
                // Close modal
                toggleModal('close', modal_ref.value as unknown as HTMLElement);
            };
            

            return {
                openModal, closeModal,
                modal_ref
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>