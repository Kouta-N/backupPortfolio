<template>
  <div>
    <div class="header-contents">
      <nuxt-link to="/">YourCoach</nuxt-link>
      <button class="header-button">
        <nuxt-link to="/login/user-login">ログイン</nuxt-link>
      </button>
    </div>
    <div class="main-text">
      <br />
      <br />
      <div class="login-box">
        <h2>ユーザ新規登録画面</h2>
        <br />
        <table class="table-align">
          <tbody>
            <tr>
              <th>ユーザ名:</th>
              <td>
                <input v-model="userName" type="text" placeholder="ユーザ名" />
              </td>
            </tr>
            <tr>
              <th>メールアドレス:</th>
              <td>
                <input
                  v-model="userMailAddress"
                  type="email"
                  placeholder="メールアドレス"
                />
              </td>
            </tr>
            <tr>
              <th>パスワード:</th>
              <td>
                <input
                  v-model="userPassword"
                  type="password"
                  placeholder="パスワード"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button class="login-button" @click="registUser">ユーザ新規登録</button>
      </div>
      <div class="links">
        <br />
        ユーザとしてログインする場合は
        <button class="login-button">
          <nuxt-link to="/login/user-login">こちら</nuxt-link></button
        ><br /><br />
        コーチとしてログインする場合は
        <button class="login-button">
          <nuxt-link to="/login/coach-login">こちら</nuxt-link></button
        ><br /><br />
        コーチの新規登録は
        <button class="login-button">
          <nuxt-link to="/login/coach-registration">こちら</nuxt-link></button
        ><br /><br />
        <button class="top-back-button">
          <nuxt-link to="/">トップへ戻る</nuxt-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
  data() {
    return {
      userName: '' as string,
      userMailAddress: '' as any,
      userPassword: '' as any,
    }
  },
  methods: {
    registUser() {
      this.$store.dispatch('registAccount', {
        name: this.userName as string,
        email: this.userMailAddress as any,
        pass: this.userPassword as any,
        storage: 'users',
      })
    },
  },
}
</script>
