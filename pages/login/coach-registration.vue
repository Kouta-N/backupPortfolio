<template>
  <div>
    <div class="header-contents">
      <nuxt-link to="/">YourCoach</nuxt-link>
      <button class="header-button">
        <nuxt-link to="/login/coach-login">ログイン</nuxt-link>
      </button>
    </div>
    <div class="main-text">
      <br />
      <br />
      <div class="login-box2">
        <h2>コーチ新規登録画面</h2>
        <br />
        <table class="table-align">
          <tbody>
            <tr>
              <th>コーチ名:</th>
              <td>
                <input v-model="coachName" type="text" placeholder="コーチ名" />
              </td>
            </tr>
            <tr>
              <th>メールアドレス:</th>
              <td>
                <input
                  v-model="mailAddress"
                  type="text"
                  placeholder="メールアドレス"
                />
              </td>
            </tr>
            <tr>
              <th>パスワード:</th>
              <td>
                <input
                  v-model="password"
                  type="password"
                  placeholder="パスワード"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button class="login-button" @click="coachRegistration">
          コーチ新規登録
        </button>
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
        ユーザの新規登録は
        <button class="login-button">
          <nuxt-link to="/login/user-registration">こちら</nuxt-link></button
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
      coachName: '' as string,
      mailAddress: '' as any,
      password: '' as any,
    }
  },
  methods: {
    coachRegistration() {
      this.$store.dispatch('registAccount', {
        name: this.coachName as string,
        email: this.mailAddress as any,
        pass: this.password as any,
        storage: 'coaches',
      })
    },
  },
}
</script>
