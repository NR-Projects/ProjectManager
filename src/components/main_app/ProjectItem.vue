<template>
    <div class="project-item card-view">
        <p>{{ Name }}</p>
        <div>
            <div>
                <span>Date Created:</span>
                <span>{{ formatDate(Date_Created) }}</span>
            </div>
            <div>
                <span>Last Accessed:</span>
                <span>{{ formatDate(Date_Last_Accessed) }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ProjectItem',
        props: {
            Name: String,
            Date_Created: Date,
            Date_Last_Accessed: Date
        },
        methods: {
            formatDate(_date: Date|null|undefined): string {
                if (_date)
                    return _date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                return "Invalid Date";
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