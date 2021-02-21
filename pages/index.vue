<template>
  <div class="container">
    <h1 class="title" v-text="title" />
    <div class="card">
      <p class="image-area">
        <img :src="product.image" :alt="product.name" class="image" />
      </p>
      <div class="info-area">
        <h2 class="name" v-text="product.name" />
        <p class="desc" v-text="product.desc" />
        <p
          class="amount"
          v-text="'¥' + product.amount.toLocaleString() + '-'"
        />
        <client-only>
          <p class="stripe-area">
            <card
              :options="stripeOptions"
              :stripe="stripePK"
              class="stripe"
              @change="isEntered = $event.complete"
            />
          </p>
        </client-only>
        <div class="message" v-text="message" />
        <p class="button-area">
          <button
            class="button"
            :class="{ active: isEntered }"
            aria-label="決済する"
            @click="pay"
            v-text="'決済する'"
          />
        </p>
      </div>
      <div class="complete" :class="{ active: isComplete }">
        <p class="message" v-text="'Thank you!'" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'
export default {
  components: {
    Card,
  },
  data() {
    return {
      title: '決済フォーム',
      product: {
        name: 'サンプル腕時計',
        desc:
          'こちらは決済フォームのサンプルのためご購入はできません。また、カード番号を入力しても請求されることはありません。ご理解いただいた上でお進みください。カード番号は「4242 4242 4242 4242」をご入力ください。※年月,CVCは任意の値で結構です。',
        amount: 12345,
        image: 'watch.jpg',
      },
      stripeOptions: { hidePostalCode: true },
      stripePK: 'pk_test_87vXgp7lt7eQx9IsTAPG6SVw00SkJVRHj7',
      message: '',
      isEntered: false,
      isComplete: false,
    }
  },
  head() {
    return {
      title: this.title,
      script: [{ src: '//js.stripe.com/v3/' }],
    }
  },
  methods: {
    async pay() {
      try {
        // 決済用トークン発行
        const tokenResult = await createToken()
        if (
          !tokenResult ||
          !tokenResult.token ||
          !tokenResult.token.id ||
          tokenResult.token.id === ''
        ) {
          throw new Error('トークン発行エラー')
        }

        // 決済処理
        const chargeResult = await axios.post(
          `${process.env.FUNCTION_URL}/.netlify/functions/charge`,
          {
            amount: this.product.amount,
            token: tokenResult.token.id,
          }
        )
        if (!chargeResult || chargeResult.data !== 'NORMAL') {
          throw new Error('決済エラー')
        }
        this.isComplete = true
      } catch (error) {
        this.message = error.message + 'が発生しました。'
      }
    },
  },
}
</script>
