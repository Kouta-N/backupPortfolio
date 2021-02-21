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
          <nuxt-link to="/user/user-coach-list"
            >コーチ一覧とプラン</nuxt-link
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
      <div style="text-align: center">あなたのプロフィール</div>
      <br />
      氏名
      <div class="profile-box2">{{ this.$store.state.loginUserName }}</div>
      <br />
      メールアドレス
      <div class="profile-box2">{{ this.$store.state.loginUserMail }}</div>
      <br />
      自己紹介文
      <div class="profile-box2">{{ this.$store.state.profile }}</div>
      <br />
      年齢
      <div class="profile-box2">
        {{ this.$store.state.age }}
      </div>
      <br />
      住所
      <div class="profile-box2">
        {{ this.$store.state.address }}
      </div>
      <br />
      希望するプランの詳細
      <div class="profile-box2">
        {{ this.$store.state.requestPlan }}
      </div>
      <button class="change-profile-button">
        <nuxt-link to="/user/user-change-profile"
          >プロフィールを変更する</nuxt-link
        >
      </button>
      <button class="account-delete-button">
        <nuxt-link to="/user/user-delete">アカウント削除</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
