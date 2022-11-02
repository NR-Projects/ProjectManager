<template>
	<MainAppView v-if="isLoggedIn" />
	<GuestView v-else />
</template>

<script lang="ts">
	import GuestView from '@/views/GuestView.vue';
	import MainAppView from '@/views/MainAppView.vue';
	
	import { defineComponent } from 'vue';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';

	export default defineComponent({
		name: 'App',
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

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	height: 100%;
}

html, body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	display: block;
	width: 100vw;
	height: 100%;
}
</style>
