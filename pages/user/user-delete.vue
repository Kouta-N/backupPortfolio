<template>
  <div>
    <div class="header-contents">
      YourCoach
      <input type="text" class="search-box" placeholder="コーチを検索" />
      <button class="header-button2" @click="doLogout">ログアウト</button>
    </div>
    <div>
      <div class="side-text">
        <br />
        <br />
        <button class="side-button">
          <nuxt-link to="/user/user-profile"
            >あなたのプロフィール</nuxt-link
          ></button
        ><br />
        <button class="side-button">
          <nuxt-link to="/user/user-plan-search-list"
            >プラン一覧と検索</nuxt-link
          ></button
        ><br />
        <button class="side-button">
          <nuxt-link to="/user/user-profile"
            >契約中のコーチとプラン</nuxt-link
          ></button
        ><br />
        <button class="side-button">
          <nuxt-link to="/user/user-profile">支払履歴</nuxt-link>
        </button>
      </div>
    </div>
    <div class="v-line"></div>
    <div class="profile-box">
      <div style="text-align: center">
        アカウント削除画面 <br /><br />
        下記のアカウントを本当に削除しますか？<br />
        <button class="account-delete-button2" @click="deleteUser">はい</button
        ><button class="back-button">
          <nuxt-link to="/user/user-profile">戻る</nuxt-link></button
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
    deleteUser() {
      this.$store
        .dispatch('deleteAccount', {
          email: this.$store.state.loginUserMail as any,
          pass: this.$store.state.loginUserPass as any,
          storage: 'users',
        })
        .then(() => {
          this.$router.push('/user/user-delete-complete')
        })
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
