<template>
	<router-view />

	<TaskViewModal ref="taskViewModalRef" />

	<ProjectModal ref="projectModalRef" />
	<ProjectTaskModal ref="projectTaskModalRef" />
	<TaskModal ref="taskModalRef" />
</template>

<script lang="ts">
	import { defineComponent, ref, watch } from 'vue';
	import { useStore } from 'vuex';
	import ProjectModal from '@/components/modals/ProjectModal.vue';
	import ProjectTaskModal from '@/components/modals/ProjectTaskModal.vue';
	import TaskModal from '@/components/modals/TaskModal.vue';
	import TaskViewModal from '@/components/modals/TaskViewModal.vue';
	import { ModalStoreParams, TargetedModal } from './models';

    export default defineComponent({
        name: 'App',
		components: {
			ProjectModal,
			ProjectTaskModal,
			TaskModal,
			TaskViewModal
		},
		setup() {
			const store = useStore();

			const projectModalRef = ref(null);
			const projectTaskModalRef = ref(null);
			const taskModalRef = ref(null);
			const taskViewModalRef = ref(null);

			watch(() => store.getters.getModalStoreParams, function() {
				const MSP: ModalStoreParams = store.getters.getModalStoreParams

				// Check Which Modal to open
				switch(MSP.targetedModal) {
					case TargetedModal.ProjectCE:
						(projectModalRef.value as any).openModal(MSP.title, MSP.isEdit!, MSP.data);
						break;
					case TargetedModal.ProjectTaskCE:
						(projectTaskModalRef.value as any).openModal(MSP.require!, MSP.title, MSP.isEdit!, MSP.data);
						break;
					case TargetedModal.TaskCE:
						(taskModalRef.value as any).openModal(MSP.require!, MSP.title, MSP.isEdit!, MSP.data);
						break;
					case TargetedModal.TaskView:
						(taskViewModalRef.value as any).openModal(MSP.require!, MSP.data);
						break;
				}
			});

			return {
				projectModalRef,
				projectTaskModalRef,
				taskModalRef,
				taskViewModalRef
			}
		}
    });
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	scroll-behavior: smooth;

	height: 100%;
}

html,
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	display: block;
	width: 100%;
	height: 100%;
}

// Modified from w3schools.com and https://codepen.io/devstreak/pen/dMYgeO
/* width */
::-webkit-scrollbar {
	width: 5px;
	height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
	-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
	box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
	border: 1px solid #555555;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
