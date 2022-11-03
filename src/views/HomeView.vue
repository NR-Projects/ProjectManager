<template>
	<MainAppView v-if="isLoggedIn" />
	<GuestView v-else />
</template>

<script lang="ts">
	import GuestView from '@/views/home/GuestView.vue';
	import MainAppView from '@/views/home/MainAppView.vue';
	
	import { defineComponent } from 'vue';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';

	export default defineComponent({
		name: 'HomeView',
		methods: {
		},
		components: {
			GuestView,
			MainAppView
		},
		data() {
			return {
				isLoggedIn: false
			}
		},
		mounted() {
			onAuthStateChanged(getAuth(), (user) => {
				if (user) this.isLoggedIn = true;
				else this.isLoggedIn = false;
			});
		}
	});
</script>