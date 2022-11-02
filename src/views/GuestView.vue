<template>
	<div id="guest-view">
		<!-- Title -->
		<div id="app-title_guest">
			<h2>
				Project Manager
			</h2>
		</div>

		<!-- "About" -->
		<div id="app-about_guest">
			<p>
				This is a web app that helps you to manage your projects and share to others for easy collaboration
			</p>
		</div>

		<!-- Simple Auth -->
		<div id="auth-container">
			<p>
				Log In Here
			</p>
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
			}
		}
    });
</script>

<style lang="scss" scoped>
	#guest-view {
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;

		background: linear-gradient(180deg, rgba(51,6,89,1) 0%, rgba(75,2,144,1) 100%);
	}

	#app-title_guest {
		flex-basis: 20%;

		h2 {
			font-size: 2.75rem;
			color: #ffffff;
		}
	}

	#app-about_guest {
		p {
			color: white;
		}
	}

	#auth-container {
		background: #00000036;
		margin: 10px;
        outline: 1px solid #fff;
        padding: 10px;
        max-width: fit-content;
        max-height: fit-content;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

		p {
			color: #ffffff;
		}
	}

    .auth-btn {
        padding: 10px 15px;
        margin: 10px 0;
        min-width: 175px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        color: white;
		
        img {
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
</style>