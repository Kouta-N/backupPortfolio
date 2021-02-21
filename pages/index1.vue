<template>
  <div>
    <div class="header-contents">
      <nuxt-link to="/">YourCoach</nuxt-link>
      <button class="header-button">
        <nuxt-link to="/login/user-login"> ログイン </nuxt-link>
      </button>
      <button class="header-button2">
        <nuxt-link to="/login/user-registration">新規登録</nuxt-link>
      </button>
    </div>
    <div class="main-text2">
      <br />
      <br />
      <div class="text-box">
        あなたに最適なコーチとの出会いを提供します。<br /><br />
        <h4>【あなたもコーチになれる】</h4>
        コーチを雇うのみでなく、あなた自身がコーチになり、報酬金を得ることが可能です。<br /><br />
        <h4>【多種多様】</h4>
        全国からあなたの練習したいスポーツのコーチを選べます。<br /><br />
        <h4>【リーズナブル】</h4>
        企業でなく、個人との契約のためお手頃な価格を実現可能です。<br /><br />
        <h4>【カスタマイズプラン】</h4>
        あなたやあなたのチームの都合に合わせて、コーチと相談してプランを作成可能です。
      </div>
      <div class="ranking-box">
        先週の人気ランキング<br />
        1位:仮<br />
        2位:仮<br />
        3位:仮<br />
        4位:仮<br />
        5位:仮<br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
}
</script>
