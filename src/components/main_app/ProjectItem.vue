<template>
    <div class="project-item card-view">
        <p @click="GoToProjectView">{{ Data?.name }}</p>
        <div class="project-dates">
            <div>
                <span>Date Created:</span>
                <span>{{ formatDate(Data?.date_created) }}</span>
            </div>
            <div>
                <span>Last Accessed:</span>
                <span>{{ formatDate(Data?.date_last_updated) }}</span>
            </div>
        </div>
        <div class="project-options">
            <img @click="EditProject" src="@/assets/img/edit-item.svg" />
            <img @click="DeleteProject" src="@/assets/img/delete-item.svg" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Project, TargetedModal } from '@/models/';
    import { deleteProject } from '@/repository';

    export default defineComponent({
        name: 'ProjectItem',
        props: {
            Data: Project
        },
        methods: {
            formatDate(_date: Date|null|undefined): string {
                if (_date)
                    return _date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                return "Invalid Date";
            },
            GoToProjectView() {
                this.$store.dispatch("setProjectLoaded", this.Data);
                this.$router.push({ name: 'project' });
            },
            EditProject() {
                this.$store.dispatch('setModalStoreParams', {
                    targetedModal: TargetedModal.ProjectCE,
                    title: 'Edit Existing Project',
                    isEdit: true,
                    data: this.Data
                });
            },
            DeleteProject() {
                if(window.confirm('Are you sure you want to delete this')) {
                    deleteProject(this.Data!);
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    .project-item {
        width: 275px;
        height: 175px;
        background: #ccaaf1;
        margin: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        & > p {
            font-weight: 700;
            font-size: 1.25rem;
            
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }

        & > .project-dates > div {
            & > span {
                font-size: 0.75rem;
            }
        }

        & > .project-options {
            height: fit-content;
            display: flex;
            
            & > img {
                cursor: pointer;
                width: 20px;
                margin: 10px;
            }
        }
    }
</style>