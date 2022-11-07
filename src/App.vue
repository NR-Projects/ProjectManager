<template>
	<router-view />
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	height: 100%;
}

html,
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	display: block;
	width: 100vw;
	height: 100%;
}

// Modified from w3schools.com and https://codepen.io/devstreak/pen/dMYgeO
/* width */
::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
	border: 2px solid #555555;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
