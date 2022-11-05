<template>
    <div id="top-bar">
        <div id="top-bar_title">
            <p>Project Manager</p>
        </div>
        <div id="top-bar_user">
            <p>{{ userName }}</p>
            <div ref="ddc_button" class="img-drop-down">
                <img :src=userPhotoURL :on-error=ProfilePicError />
                <div ref="ddc_content" class="drop-down-content">
                    <div @click="LogOut" id="logout-btn" class="drop-down-element">
                        <img src="@/assets/img/logout.svg" />
                        <span>Log Out</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { getAuth } from 'firebase/auth';

    export default defineComponent({
        name: 'TopBarArea',
        methods: {
            ToggleDropDown() {
                let source = this.$refs.ddc_button as HTMLElement;
                let content = this.$refs.ddc_content as HTMLElement;

                window.onclick = function(event: MouseEvent) {
                    if (source.contains(event.target as Node)) content.style.display = 'block';
                    else content.style.display = 'none';
                }
            },
            ProfilePicError() {
                this.userPhotoURL = "img/no-avatar.svg";
            },
            LogOut() {
                if(window.confirm('Are you sure you want to sign out'))
                    getAuth().signOut();
            }
        },
        data() {
            return {
                userName: "",
                userPhotoURL: ""
            }
        },
        mounted() {
            let user = getAuth().currentUser;
            if (user == null) return;
            if (user.displayName) this.userName = user.displayName;
            if (user.photoURL) this.userPhotoURL = user.photoURL;

            this.ToggleDropDown();
        }
    });
</script>

<style lang="scss" scoped>
    #top-bar {
        width: 100%;
        height: 15%;
        background: #2f2f2f56;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    #top-bar_title {
        font-size: 1.75rem;
        color: #ffffff;
    }

    #top-bar_user {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        color: #ffffff;
    }

    #logout-btn {
        padding: 10px 0px;
        margin: 10px 0px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        color: white;

        @include auth-button($color-outside: hsl(0, 86%, 46%));
		&:hover {
			background-color: hsl(0, 86%, 36%);
		}

        & > img {
            max-width: 30px;
        }
    }
</style>