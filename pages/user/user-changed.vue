<template>
  <div>
    <div class="header-contents">YourCoach</div>
    <div class="report-box">プロフィール情報を変更しました</div>
    <div style="margin: 2em 0 0 40em">
      <div style="font-size: 1.5em">
        <button class="back-profile-button">
          <nuxt-link to="/user/user-profile">戻る</nuxt-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
}
</script>
