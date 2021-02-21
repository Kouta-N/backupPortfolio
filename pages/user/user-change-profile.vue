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
    <div class="profile-change-box">
      <div style="text-align: center">プロフィール変更画面</div>
      <br />
      氏名
      <div class="profile-box2">{{ this.$store.state.loginUserName }}</div>
      変更する氏名<br />
      <input v-model="newName" class="form-box" type="text" /><br />
      <button class="change-profile-button2" @click="doChangeName">
        氏名を変更する
      </button>
      <br /><br />
      メールアドレス
      <div class="profile-box2">{{ this.$store.state.loginUserMail }}</div>
      変更するメールアドレス<br />
      <input v-model="newMail" class="form-box" type="text" /><br />
      <button class="change-profile-button2" @click="doChangeMail">
        メールアドレスを変更する
      </button>
      <br /><br />
      自己紹介文
      <div class="profile-box2">{{ this.$store.state.profile }}</div>
      変更する自己紹介文の内容<br />
      <input v-model="newProfile" class="form-box" type="text" /><br />
      <button class="change-profile-button2" @click="doChangeProfile">
        自己紹介文を変更する
      </button>
      <br /><br />
      年齢
      <div class="profile-box2">
        {{ this.$store.state.age }}
      </div>
      変更する年齢<br />
      <input v-model="newAge" class="form-box" type="text" /><br />
      <button class="change-profile-button2" @click="doChangeAge">
        年齢を変更する
      </button>
      <br /><br />
      住所
      <div class="profile-box2">
        {{ this.$store.state.address }}
      </div>
      変更する住所<br />
      <input v-model="newAddress" class="form-box" type="text" /><br />
      <button class="change-profile-button2" @click="doChangeAddress">
        住所を変更する
      </button>
      <br />
      <br />
      希望するプランの詳細
      <div class="profile-box2">
        {{ this.$store.state.requestPlan }}
      </div>
      変更する希望プラン<br />
      <input v-model="newPlan" class="form-box" type="text" /><br />
      <button class="change-profile-button2" @click="doChangePlan">
        希望するプランを変更する
      </button>
      <br /><br />
      変更するパスワード<br />
      <input v-model="newPass" class="form-box" type="password" /><br />
      <button class="change-profile-button2" @click="doChangePass">
        パスワードを変更する
      </button>
      <br /><br />
      <button class="back-profile-button">
        <nuxt-link to="/user/user-profile">戻る</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
  data() {
    return {
      newName: '' as string,
      newMail: '' as any,
      newProfile: '' as string,
      newAge: '' as any,
      newAddress: '' as any,
      newPlan: '' as string,
      newPass: '' as any,
    }
  },
  methods: {
    doChangeName() {
      this.$store.dispatch('changeName', {
        name: this.newName,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'users',
      })
    },
    doChangeMail() {
      this.$store.dispatch('changeMail', {
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        newEmail: this.newMail,
        storage: 'users',
      })
    },
    doChangeProfile() {
      this.$store.dispatch('changeProfile', {
        profile: this.newProfile,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'users',
      })
    },
    doChangeAge() {
      this.$store.dispatch('changeAge', {
        age: this.newAge,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'users',
      })
    },
    doChangeAddress() {
      this.$store.dispatch('changeAddress', {
        address: this.newAddress,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'users',
      })
    },
    doChangePlan() {
      this.$store.dispatch('changeRequestPlan', {
        plan: this.newPlan,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
      })
    },
    doChangePass() {
      this.$store.dispatch('changePass', {
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        newPass: this.newPass,
        storage: 'users',
      })
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
