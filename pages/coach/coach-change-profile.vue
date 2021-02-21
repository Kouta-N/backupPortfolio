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
      専門スポーツ
      <div class="profile-box2">{{ this.$store.state.coachSpecialty }}</div>
      変更する専門スポーツの内容<br />
      <input v-model="newSpecialty" class="form-box" type="text" /><br />
      <button class="change-profile-button2" @click="doChangeSpecialty">
        専門スポーツを変更する
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
      <br /><br />
      変更するパスワード<br />
      <input v-model="newPass" class="form-box" type="password" /><br />
      <button class="change-profile-button2" @click="doChangePass">
        パスワードを変更する
      </button>
      <br /><br />
      <button class="back-profile-button">
        <nuxt-link to="/coach/coach-profile">戻る</nuxt-link>
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
      newSpecialty: '' as string,
      newAge: '' as any,
      newAddress: '' as any,
      newPass: '' as any,
    }
  },
  methods: {
    doChangeName() {
      this.$store.dispatch('changeName', {
        name: this.newName,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'coaches',
      })
    },
    doChangeMail() {
      this.$store.dispatch('changeMail', {
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        newEmail: this.newMail,
        storage: 'coaches',
      })
    },
    doChangeProfile() {
      this.$store.dispatch('changeProfile', {
        profile: this.newProfile,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'coaches',
      })
    },
    doChangeSpecialty() {
      this.$store.dispatch('changeSpecialty', {
        specialty: this.newSpecialty,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
      })
    },
    doChangeAge() {
      this.$store.dispatch('changeAge', {
        age: this.newAge,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'coaches',
      })
    },
    doChangeAddress() {
      this.$store.dispatch('changeAddress', {
        address: this.newAddress,
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        storage: 'coaches',
      })
    },
    doChangePass() {
      this.$store.dispatch('changePass', {
        email: this.$store.state.loginUserMail,
        pass: this.$store.state.loginUserPass,
        newPass: this.newPass,
        storage: 'coaches',
      })
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
