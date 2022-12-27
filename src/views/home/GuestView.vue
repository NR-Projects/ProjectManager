<template>
	<div id="guest-view">
		<div id="gv_top-bar">
			<div id="gv_title">
				<img src="favicon.ico" />
				<p>Project Manager</p>
			</div>
			<nav id="gv_content_links">
				<span v-on:click="PageAnchor('home')">Home</span>
				<span v-on:click="PageAnchor('login')">Login</span>
				<span v-on:click="PageAnchor('about')">About</span>
			</nav>
		</div>
		<div class="gv_content_area" id="gv_content_home" ref="home">
			<p>
				This is a web app that helps you to manage your projects
			</p>
		</div>
		<div class="gv_content_area" id="gv_content_login" ref="login">
			<p>
				Connect With Your Account
			</p>
			<div id="gv_auth_container">
				<div class="auth-btn" id="google-auth-btn" v-on:click="GoogleLogIn()">
					<img src="@/assets/img/google_icon.png" />
					<span>Google</span>
				</div>
				<div class="auth-btn" id="github-auth-btn">
					<img src="@/assets/img/github_icon.png" />
					<span>Github</span>
				</div>
			</div>
		</div>
		<div class="gv_content_area" id="gv_content_about" ref="about">
			<span>Developer: &gt; TunaSalmon &lt;</span>
			<span>Github: https://github.com/Null-Root</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default defineComponent({
	name: 'GuestView',
	methods: {
		GoogleLogIn() {
			const provider = new GoogleAuthProvider();
			signInWithPopup(getAuth(), provider);
		},
		GithubLogIn() {
			const provider = new GithubAuthProvider();
			signInWithPopup(getAuth(), provider);
		},
		PageAnchor(loc: string) {
			let top = 0;
			switch(loc) {
				case 'home':
					top = (this.$refs.home as HTMLElement).offsetTop;
					break;
				case 'login':
					top = (this.$refs.login as HTMLElement).offsetTop;
					break;
				case 'about':
					top = (this.$refs.about as HTMLElement).offsetTop;
					break;
			}
			window.scrollTo(0, top);
			document.body.scrollTo(0, top);
		}
	}
});
</script>

<style lang="scss" scoped>
#guest-view {
	height: 100%;
	display: block;
}

#gv_top-bar {
	background: #00000035;
	position: fixed;
	display: flex;
	width: 100%;
	height: 10%;
	z-index: 2;
	top: 0;
}

#gv_title {
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;

	& > img {
		width: 40px;
		height: 40px;
		margin-right: 1em;
	}

	& > p {
		margin: 0;
		padding: 0;
		color: #ffffff;
	}
}

#gv_content_links {
	flex-grow: 2;
	display: flex;
	align-items: center;
	justify-content: center;

	@include media('<=bp-500') {
		display: none;
	}

	& > span {
		text-decoration: none;
		margin: 0 0.8em;
		color: #ffffff;

		&:hover {
			text-decoration: underline;
			color: #00cb00;
			cursor: pointer;
		}
	}
}

.gv_content_area {
	overflow-y: auto;
	width: 100%;
	min-height: 80vh;
}

#gv_content_home {
	background: linear-gradient(180deg, rgba(51, 6, 89, 1) 0%, rgba(75, 2, 144, 1) 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 90%;

	& > p {
		color: #ffffff;
		font-size: 1.5em;
	}
}

#gv_content_login {
	background: linear-gradient(0deg, rgba(51, 6, 89, 1) 0%, rgba(75, 2, 144, 1) 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90%;

	& > p {
		color: #ffffff;
		font-size: 1.25em;
	}

	& > #gv_auth_container {
		width: 100%;
		margin: 2em 0;
        display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
}

.auth-btn {
    padding: 10px 15px;
    margin: 10px 20px;
    min-width: 175px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
	color: white;
		
    & > img {
        width: 25px;
        margin-right: 10px;
    }
}

#google-auth-btn {
	@include auth-button($color-outside: hsl(147, 100%, 50%));
	&:hover {
		background-color: hsl(138, 100%, 42%);
	}
}
#github-auth-btn {
    @include auth-button($color-outside: hsl(0, 0%, 14%));
    &:hover {
        background-color: hsl(0, 0%, 17%);
    }
}

#gv_content_about {
	background: linear-gradient(180deg, rgba(51, 6, 89, 1) 0%, rgba(75, 2, 144, 1) 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 90%;

	& > span {
		color: #ffffff;
		font-size: 1.25em;
		margin: 1em 0;
	}
}
</style>