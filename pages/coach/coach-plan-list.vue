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
    <button class="go-plan-make-button">
      <nuxt-link to="/coach/coach-make-plan">プランの作成ページへ</nuxt-link>
    </button>
    <div v-for="(plan, index) in plans" :key="plan.index">
      <div class="plan-dispaly-box">
        プランナンバー
        <div class="plan-information-box">
          {{ index + 1 }}
        </div>
        プラン名 <br />
        <div class="plan-information-box">
          {{ plan.name }}
        </div>
        プラン内容 <br />
        <div class="plan-information-box">
          {{ plan.contents }}
        </div>
        1時間あたりのプラン料金 <br />
        <div class="plan-information-box">
          {{ plan.fee }}
        </div>
        プランレビュー <br />
        <div class="plan-information-box">
          {{ plan.review }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import firebase from '@/plugins/firebase'
export interface Plan {
  name: string
  contents: string
  fee: any
  review: string
}
export default {
  css: ['~/assets/css/style.css'],
  data: () => ({
    plans: [] as any,
  }),
  created() {
    const db = firebase.firestore()
    const dbPlan = db
      .collection('coaches')
      .doc(this.$store.state.loginUserID)
      .collection('plans')
    dbPlan.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const planData = doc.data()
        const pushPlan: Plan = {
          name: planData.PlanName ? planData.PlanName : '',
          contents: planData.PlanContents ? planData.PlanContents : '',
          fee: planData.PlanFee ? planData.PlanFee : '',
          review: planData.PlanReview
            ? planData.PlanReview
            : 'レビューはまだありません。',
        }
        this.plans.push(pushPlan)
      })
    })
  },
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
