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
          <nuxt-link to="/user/user-profile">支払履歴</nuxt-link></button
        ><br />
      </div>
    </div>
    <div class="v-line"></div>
    <div class="list-display-box">プランリスト</div>
    <br />
    <input
      v-model="keyword"
      type="text"
      placeholder="検索ワード"
      class="coach-search-input"
    />
    <button class="back-user-coach-list-button">
      <nuxt-link to="/user/user-coach-list">コーチ一覧へ戻る</nuxt-link>
    </button>
    <br />
    <div v-for="plan in filteredPlans" :key="plan.index">
      <div class="user-plan-dispaly-box">
        コーチ名
        <div class="plan-information-box">
          {{ plan.coachName }}
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
  coachName: string
  name: string
  contents: string
  fee: any
  review: string
}
export default {
  css: ['~/assets/css/style.css'],
  data: () => ({
    keyword: '' as any,
    plans: [] as any,
  }),
  computed: {
    filteredPlans() {
      const cutoutPlans = []
      this.plans.forEach((value) => {
        if (
          value.coachName.includes(this.keyword) ||
          value.name.includes(this.keyword) ||
          value.contents.includes(this.keyword) ||
          value.fee.includes(this.keyword) ||
          value.review.includes(this.keyword)
        ) {
          cutoutPlans.push(value)
        }
      })
      return cutoutPlans
    },
  },
  created() {
    const db = firebase.firestore()
    const dbPlan = db
      .collection('coaches')
      .doc(this.$store.state.targetCoachID)
      .collection('plans')
    dbPlan.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const planData = doc.data()
        const pushPlan: Plan = {
          coachName: planData.CoachName ? planData.CoachName : '',
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
