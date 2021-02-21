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
          <nuxt-link to="/coach/coach-contract"
            >契約中のユーザとプラン</nuxt-link
          ></button
        ><br />
        <button class="side-button">
          <nuxt-link to="/coach/coach-plan-list"
            >プラン一覧とプランの作成</nuxt-link
          ></button
        ><br />
      </div>
    </div>
    <div class="v-line"></div>
    <div class="plan-make-box">
      <div style="text-align: center">プラン作成画面</div>
      <br />
      プランの名前<br />
      <input v-model="planName" class="form-box" type="text" /><br />
      <br />
      プランの内容<br />
      <input v-model="planContents" class="form-box" type="text" /><br />
      <br />
      1時間あたりのプランの料金<br />
      <input v-model="planFee" class="form-box" type="text" /><br /><br />
      <div style="color: red">{{ message }}</div>
      <button class="plan-make-button" @click="doMakePlan">
        プランを作成する
      </button>
      <button class="back-profile-button">
        <nuxt-link to="/coach/coach-profile">戻る</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      planName: '' as string,
      planContents: '' as string,
      planFee: '' as number,
      message: '' as string,
    }
  },
  css: ['~/assets/css/style.css'],
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
    doMakePlan() {
      if (
        this.planName === '' ||
        this.planContents === '' ||
        this.planFee === ''
      ) {
        this.message = '未入力の値があります'
      } else {
        this.$store.dispatch('makePlan', {
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          name: this.$store.state.loginUserName,
          plan: this.planName,
          contents: this.planContents,
          fee: this.planFee,
        })
      }
    },
  },
}
</script>
