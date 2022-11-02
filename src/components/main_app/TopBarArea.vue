<template>
    <div id="top-bar">
        <div id="top-bar_title">
            <p>Project Manager</p>
        </div>
        <div id="top-bar_user">
            <p>{{ userName }}</p>
            <div ref="ddc_button" class="img-drop-down">
                <img :src=userPhotoURL />
                <div ref="ddc_content" class="drop-down-content">
                    <p>Option 1</p>
                    <p>Option 2</p>
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
                // eslint-disable-next-line
                let source: any = this.$refs.ddc_button;
                // eslint-disable-next-line
                let content: any = this.$refs.ddc_content;

                window.onclick = function(event) {
                    if (source.contains(event.target)) content.style.display = 'block';
                    else content.style.display = 'none';
                }
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
        background: #2f2f2f56;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    #top-bar_title {
        font-size: 1.75rem;
    }

    #top-bar_user {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
</style>