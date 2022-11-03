<template>
    <div @click="goToProjectView" class="project-item card-view">
        <p>{{ Data?.name }}</p>
        <div>
            <div>
                <span>Date Created:</span>
                <span>{{ formatDate(Data?.date_created) }}</span>
            </div>
            <div>
                <span>Last Accessed:</span>
                <span>{{ formatDate(Data?.date_last_accessed) }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Project } from '@/models/';

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
            goToProjectView() {
                this.$router.push({ name: 'project', params: { projectId: this.Data?.id } });
            }
        }
    });
</script>

<style lang="scss" scoped>
    .project-item {
        width: 275px;
        height: 175px;
        background: #e0e0e0;
        margin: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        & > p {
            font-weight: 700;
            font-size: 1.25rem;
        }

        & > div > div {
            & > span {
                font-size: 0.75rem;
            }
        }
    }
</style>