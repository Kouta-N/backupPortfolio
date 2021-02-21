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
    <br />
    <div class="list-display-box">コーチリスト</div>
    <br />
    <input
      v-model="keyword"
      type="text"
      placeholder="検索ワード"
      class="coach-search-input"
    />
    <br />
    <div v-for="coach in filteredCoaches" :key="coach.index">
      <div class="coach-list-box">
        コーチの氏名 <br />
        <div class="plan-information-box">
          {{ coach.name }}
        </div>
        コーチの画像
        <div class="plan-information-box">
          {{ coach.image }}
        </div>
        コーチの年齢 <br />
        <div class="plan-information-box">
          {{ coach.age }}
        </div>
        コーチの住所 <br />
        <div class="plan-information-box">
          {{ coach.address }}
        </div>
        コーチのプロフィール <br />
        <div class="plan-information-box">
          {{ coach.profile }}
        </div>
        <br />
        <button
          class="coach-plan-button"
          @click="doGetCoachID(coach.email, coach.pass)"
        >
          コーチのプラン一覧
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from '@/plugins/firebase'
export interface Coach {
  image: string
  name: string
  age: any
  address: any
  profile: string
  email: any
  pass: any
}
export default {
  css: ['~/assets/css/style.css'],
  data: () => ({
    keyword: '' as any,
    coaches: [] as any,
  }),
  computed: {
    filteredCoaches() {
      const cutoutCoaches = []
      this.coaches.forEach((value) => {
        if (
          value.name.includes(this.keyword) ||
          value.age.includes(this.keyword) ||
          value.address.includes(this.keyword) ||
          value.profile.includes(this.keyword)
        ) {
          cutoutCoaches.push(value)
        }
      })
      return cutoutCoaches
    },
  },
  created() {
    const db = firebase.firestore()
    const dbCoach = db.collection('coaches')
    dbCoach.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const coachData = doc.data()
        const pushCoach: Coach = {
          image: coachData.Image ? coachData.Name : '未登録',
          name: coachData.Name ? coachData.Name : '未登録',
          age: coachData.Age ? coachData.Age : '未登録',
          address: coachData.Address ? coachData.Address : '未登録',
          profile: coachData.Profile ? coachData.Profile : '未登録',
          email: coachData.Email ? coachData.Email : '',
          pass: coachData.Password ? coachData.Password : '',
        }
        this.coaches.push(pushCoach)
      })
    })
  },
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
    doGetCoachID(coachEmail, coachPass) {
      this.$store.dispatch('getCoachID', { email: coachEmail, pass: coachPass })
    },
  },
}
</script>
