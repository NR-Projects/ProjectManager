<template>
    <div ref="modal_ref" class="modal" id="task-view-modal">
        <div class="modal-view-content">
            <p class="modal-title">TASK_VIEW</p>
            <div class="modal-meta">
                <div class="modal-view-infos">
                    <div>
                        <span>Date Created:</span>
                        <span>January 1, 1970</span>
                    </div>
                    <div>
                        <span>Date Last Updated:</span>
                        <span>January 1, 1970</span>
                    </div>
                </div>
                <div class="modal-self-option">
                    <label>Task Description:</label>
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
                    <textarea readonly></textarea>
                </div>
            </div>
            <div class="modal-options">
                <div class="edit-btn">
                    <span>Edit</span>
                </div>
                <div class="close-btn">
                    <span>Close</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Task } from '@/models';

    export default defineComponent({
        name: 'TaskViewModal'
    });
</script>

<style lang="scss" scoped>
</style>