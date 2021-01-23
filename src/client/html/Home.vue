<template>
    <div class="home-main-container">
        <div class="itangazo">
            <p class="w3-container">itangazo: Nta muntu wemerewe kugura itike atayikuye hano...</p>
        </div>

        <div class="header w3-display-container">
            <div class="logo w3-display-left">
                itike.COM
            </div>

            <div class="menu w3-display-bottomright">
                <button class="w3-btn"><i class="fas fa-headphones"></i>Ubufasha</button>
                <button @click="show_login=true" class="w3-btn"><i class="fas fa-user"></i>Injira</button>
            </div>
        </div>

        <div class="body w3-display-container">
            <div class="image">
                <img src="/assets/kigali.jpg">
            </div>

            <div class="home-goto-widget w3-display-left">
                <div>
                    <label>Uhagurukiye </label>
                    <select class="w3-select" name="from-location-name" id="from-location-id">
                        <option value="kigali">Kigali</option>
                        <option value="muhanga">Muhanga</option>
                    </select>
                </div>

                <div>
                    <label>Ukagera</label>
                    <select class="w3-select" name="to-location-name" id="to-location-id">
                        <option value="kigali">Kigali</option>
                        <option value="muhanga">Muhanga</option>
                    </select>
                </div>

                <div class="itariki w3-display-container">
                    <p>itariki</p>
                    <input type="date">

                    <div class="none w3-display-right">
                        <button class="w3-btn">none</button>
                    </div>

                    <div class="ejo w3-display-right">
                        <button class="w3-btn">ejo</button>
                    </div>
                </div>

                <div>
                    <button>Shaka imodoka</button>
                </div>

            </div>
        </div>

        <div>
            <h2>Ibibazo byibazwa cyane...</h2>
            <div class="ikibazo">
                <div class="prob">
                    <p>Mufata komisiyo?</p>
                </div>
                <div class="answer">
                    <p>Oya...</p>
                </div>
            </div>
        </div>

        <div v-show="show_login" class="home-login w3-display-container">
            <div class="fullscreen"></div>
            <div class="login-container w3-display-middle">
                <h1 data="chap">chap</h1>
                <label>email</label>
                <input class="w3-input" type="email">
                <label>password</label>
                <input class="w3-input" type="password">
                <button class="w3-btn">Login</button>
                <div class="login-progress">
                    <div class="progress-item"></div>
                </div>
                <div class="login-container-close">
                    <button @click="show_login=false" class="w3-btn">X</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="../js/Home.vue.js">
</script>

<style src="../css/Home.vue.less">
</style>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="less" scoped>
    .login-progress{
        position: relative;
        height: 50px;
        border: 1px solid red;
        overflow: hidden;
        .progress-item{
            width: 100%;
            height: 100%;
            background-image: linear-gradient(-45deg, red 25%, white 25%, white 50%, red 50%, red 75%, white 75%);
            background-size: 50px;
            animation: progress 3s;
            &::after{
                content: "";
            }
        }
    }

    @keyframes progress{
        from{background-position: 0%;}
        to{background-position: 100%;}
    }
</style>