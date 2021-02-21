<template>
  <div>
    <div class="header-contents">
      YourCoach
      <button class="header-button" @click="doLogout">ログアウト</button>
    </div>
    <div>
      <div class="side-text">
        <br />
        <br />
        <button class="side-button">
          <nuxt-link to="/coach/coach-profile"
            >あなたのプロフィール</nuxt-link
          ></button
        ><br />
        <button class="side-button">
          <nuxt-link to="/coach/coach-profile"
            >契約中のコーチとプラン</nuxt-link
          ></button
        ><br />
        <button class="side-button">
          <nuxt-link to="/coach/coach-profile">支払履歴</nuxt-link>
        </button>
      </div>
    </div>
    <div class="v-line"></div>
    <div class="profile-box">
      <div style="text-align: center">
        アカウント削除画面 <br /><br />
        下記のアカウントを本当に削除しますか？<br />
        <button class="account-delete-button2" @click="deleteCoach">はい</button
        ><button class="back-button">
          <nuxt-link to="/coach/coach-profile">戻る</nuxt-link></button
        ><br /><br />
      </div>
      <div class="delete-confirm-box">
        氏名
        <div class="profile-box2">{{ this.$store.state.loginUserName }}</div>
        <br />
        自己紹介文
        <div class="profile-box2">{{ this.$store.state.Profile }}</div>
        <br />
        年齢
        <div class="profile-box2">
          {{ this.$store.state.Age }}
        </div>
        <br />
        住所
        <div class="profile-box2">
          {{ this.$store.state.Address }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
  methods: {
    deleteCoach() {
      this.$store
        .dispatch('deleteAccount', {
          email: this.$store.state.loginUserMail as any,
          pass: this.$store.state.loginUserPass as any,
          storage: 'coaches',
        })
        .then(() => {
          this.$router.push('/coach/coach-delete-complete')
        })
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
