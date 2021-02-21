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
          <nuxt-link to="/coach/coach-plan-list"
            >プラン一覧とプランの作成</nuxt-link
          ></button
        ><br />
        <button class="side-button">
          <nuxt-link to="/coach/coach-profile">契約履歴</nuxt-link>
        </button>
      </div>
    </div>
    <div class="v-line"></div>
    <div class="profile-box">
      <div style="text-align: center">あなたのプロフィール</div>
      <br />
      氏名
      <div class="profile-box2">{{ getName }}</div>
      <br />
      メールアドレス
      <div class="profile-box2">{{ getMail }}</div>
      <br />
      自己紹介文
      <div class="profile-box2">{{ getProfile }}</div>
      <br />
      得意スポーツ
      <div class="profile-box2">
        {{ getSpecialty }}
      </div>
      <br />
      年齢
      <div class="profile-box2">
        {{ getAge }}
      </div>
      <br />
      住所
      <div class="profile-box2">
        {{ getAddress }}
      </div>
      <button class="change-profile-button">
        <nuxt-link to="/coach/coach-change-profile"
          >プロフィールを変更する</nuxt-link
        >
      </button>
      <button class="account-delete-button">
        <nuxt-link to="/coach/coach-delete">アカウント削除</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
  computed: {
    getName: {
      get() {
        return this.$store.getters.getName
      },
    },
    getMail: {
      get() {
        return this.$store.getters.getMail
      },
    },
    getProfile: {
      get() {
        return this.$store.getters.getProfile
      },
    },
    getSpecialty: {
      get() {
        return this.$store.getters.getSpecialty
      },
    },
    getAge: {
      get() {
        return this.$store.getters.getAge
      },
    },
    getAddress: {
      get() {
        return this.$store.getters.getAddress
      },
    },
    getRequestPlan: {
      get() {
        return this.$store.getters.getRequestPlan
      },
    },
  },
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
