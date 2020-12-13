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
                <button class="w3-btn"><i class="fas fa-user"></i>Injira</button>
            </div>
        </div>

        <div class="body w3-display-container">
            <div class="image">
                <img src="/assets/kigali.jpg">
            </div>

            <div class="home-goto-widget w3-display-left">
                <div>
                    <p>Uhagurukiye</p>
                    <select name="from-location-name" id="from-location-id">
                        <option value="kigali">Kigali</option>
                        <option value="muhanga">Muhanga</option>
                    </select>
                </div>

                <div>
                    <p>Ukagera</p>
                    <select name="to-location-name" id="to-location-id">
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
                email:
                <input type="email">
                password:
                <input type="password">
                <button class="w3-btn">Login</button>
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