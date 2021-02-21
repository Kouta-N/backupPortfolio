<template>
  <div>
    <div class="header-contents">YourCoach</div>
    <div class="report-box">プランを作成しました。</div>
    <div style="margin: 2em 0 0 40em">
      <div style="font-size: 1.5em">
        <nuxt-link to="coach-plan-list"
          ><button class="top-back-button">プラン一覧へ戻る</button></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  css: ['~/assets/css/style.css'],
}
</script>
