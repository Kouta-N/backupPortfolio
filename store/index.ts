import firebase from '@/plugins/firebase'

const db = firebase.firestore()
export const state = () => ({
  age: '' as any,
  address: '' as string,
  coachSpecialty: '' as string,
  coachImage: '' as string,
  loginUserName: '' as string,
  loginUserMail: '' as any,
  loginUserPass: '' as any,
  loginUserID: '' as any,
  loginCoachID: '' as any,
  profile: '' as string,
  requestPlan: '' as string,
  targetUserID: '' as any,
  targetCoachID: '' as any,
})
/// /////////////////getters////////////////////
export const getters = {
  getName: (state) => {
    return state.loginUserName
  },
  getMail: (state) => {
    return state.loginUserMail
  },
  getProfile: (state) => {
    return state.profile
  },
  getSpecialty: (state) => {
    return state.coachSpecialty
  },
  getAge: (state) => {
    return state.age
  },
  getAddress: (state) => {
    return state.address
  },
  getRequestPlan: (state) => {
    return state.requestPlan
  },
  getTargetCoachID: (state) => {
    return state.targetCoachID
  },
  getLoginUserID: (state) => {
    return state.loginUserID
  },
}
/// /////////////////mutations////////////////////
export const mutations = {
  registAccount(state: any, userInformation: any) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        userInformation.email,
        userInformation.pass
      )
      .catch((error) => {
        alert(error)
        throw new Error('アカウント登録失敗')
      })
      .then(() => {
        if (userInformation.storage === 'users') {
          db.collection('users').add({
            Name: userInformation.name as any,
            Email: userInformation.email as any,
            Password: userInformation.pass as any,
            Profile: '未登録' as string,
            Age: '未登録' as any,
            Address: '未登録' as string,
            RequestPlan: '未登録' as string,
          })
          state.requestPlan = '未登録'
        } else {
          db.collection('coaches').add({
            Name: userInformation.name as any,
            Email: userInformation.email as any,
            Password: userInformation.pass as any,
            Profile: '未登録' as string,
            Age: '未登録' as any,
            Address: '未登録' as string,
            CoachImage: '' as string,
            CoachSpecialty: '未登録' as string,
          })
          state.coachImage = '未登録'
          state.coachSpecialty = '未登録'
        }
        db.collection(userInformation.storage)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (
                querySnapshot.docs[index].data().Email ===
                  userInformation.email &&
                querySnapshot.docs[index].data().Password ===
                  userInformation.pass
              ) {
                state.loginUserID = querySnapshot.docs[index].id
                state.loginUserName = userInformation.name
                state.loginUserMail = userInformation.email
                state.loginUserPass = userInformation.pass
                state.age = '未登録'
                state.address = '未登録'
                state.profile = '未登録'
              }
            })
          })
          .catch((error) => {
            alert(error)
          })
          .then(() => {
            if (userInformation.storage === 'users') {
              this.$router.push('/user/user-profile')
            } else {
              this.$router.push('/coach/coach-profile')
            }
          })
          .catch((error) => {
            alert(error)
          })
      })
  },
  login(state: any, loginInformation: any) {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginInformation.email, loginInformation.pass)
      .catch((error) => {
        alert(error)
        throw new Error('ログインに失敗しました。')
      })
      .then(() => {
        db.collection(loginInformation.storage)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (
                querySnapshot.docs[index].data().Email ===
                  loginInformation.email &&
                querySnapshot.docs[index].data().Password ===
                  loginInformation.pass
              ) {
                state.loginUserMail = loginInformation.email
                state.loginUserPass = loginInformation.pass
                state.loginUserID = querySnapshot.docs[index].id
                state.loginUserName = querySnapshot.docs[index].data().Name
                state.profile = querySnapshot.docs[index].data().Profile
                state.age = querySnapshot.docs[index].data().Age
                state.address = querySnapshot.docs[index].data().Address
                if (loginInformation.storage === 'users') {
                  state.requestPlan = querySnapshot.docs[
                    index
                  ].data().RequestPlan
                } else {
                  state.coachImage = querySnapshot.docs[index].data().CoachImage
                  state.coachSpecialty = querySnapshot.docs[
                    index
                  ].data().CoachSpecialty
                }
              }
            })
          })
          .catch((error) => {
            alert(error)
            throw new Error('ログインに失敗しました。')
          })
      })
      .then(() => {
        if (loginInformation.storage === 'users') {
          this.$router.push('/user/user-profile')
        } else {
          this.$router.push('/coach/coach-profile')
        }
      })
  },
  getCoachID(state: any, coachInformation: any) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === coachInformation.email &&
            querySnapshot.docs[index].data().Password === coachInformation.pass
          ) {
            state.targetCoachID = querySnapshot.docs[index].id
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('対象となるコーチが存在しません。')
      })
      .then(() => {
        this.$router.push('/user/user-coach-plan-list')
      })
  },
  changeSpecialty(state: any, spInformation: any) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === spInformation.email &&
            querySnapshot.docs[index].data().Password === spInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection('coaches').doc(state.loginUserID).update({
              CoachSpecialty: spInformation.specialty,
            })
            state.coachSpecialty = spInformation.specialty
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        this.$router.push('/coach/coach-changed')
      })
  },
  changeName(state: any, nameinformation: any) {
    db.collection(nameinformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === nameinformation.email &&
            querySnapshot.docs[index].data().Password === nameinformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            state.loginUserName = nameinformation.name
            db.collection(nameinformation.storage)
              .doc(state.loginUserID)
              .update({
                Name: nameinformation.name,
              })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
    db.collection(nameinformation.storage)
      .doc(state.loginUserID)
      .update({
        Name: nameinformation.name,
      })
      .then(() => {
        if (nameinformation.storage === 'users') {
          this.$router.push('/user/user-changed')
        } else {
          this.$router.push('/coach/coach-changed')
        }
      })
  },
  changeMail(state: any, emailInformation: any) {
    db.collection(emailInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === emailInformation.email &&
            querySnapshot.docs[index].data().Password === emailInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            state.loginUserMail = emailInformation.newEmail
            db.collection(emailInformation.storage)
              .doc(state.loginUserID)
              .update({
                Email: emailInformation.newEmail,
              })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        if (emailInformation.storage === 'users') {
          this.$router.push('/user/user-changed')
        } else {
          this.$router.push('/coach/coach-changed')
        }
      })
  },
  async changeProfile(state: any, profileInformation: any) {
    await db
      .collection(profileInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email ===
              profileInformation.email &&
            querySnapshot.docs[index].data().Password ===
              profileInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(profileInformation.storage)
              .doc(state.loginUserID)
              .update({
                Profile: profileInformation.profile,
              })
            state.profile = profileInformation.profile
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        if (profileInformation.storage === 'users') {
          this.$router.push('/user/user-changed')
        } else {
          this.$router.push('/coach/coach-changed')
        }
      })
  },
  changeAge(state: any, ageInformation: any) {
    db.collection(ageInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === ageInformation.email &&
            querySnapshot.docs[index].data().Password === ageInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(ageInformation.storage)
              .doc(state.loginUserID)
              .update({
                Age: ageInformation.age,
              })
            state.age = ageInformation.age
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        if (ageInformation.storage === 'users') {
          this.$router.push('/user/user-changed')
        } else {
          this.$router.push('/coach/coach-changed')
        }
      })
  },
  changeAddress(state: any, addressInformation: any) {
    db.collection(addressInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email ===
              addressInformation.email &&
            querySnapshot.docs[index].data().Password ===
              addressInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(addressInformation.storage)
              .doc(state.loginUserID)
              .update({
                Address: addressInformation.address,
              })
            state.address = addressInformation.address
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        if (addressInformation.storage === 'users') {
          this.$router.push('/user/user-changed')
        } else {
          this.$router.push('/coach/coach-changed')
        }
      })
  },
  changeRequestPlan(state: any, planInformation: any) {
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === planInformation.email &&
            querySnapshot.docs[index].data().Password === planInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection('users').doc(state.loginUserID).update({
              RequestPlan: planInformation.plan,
            })
            state.requestPlan = planInformation.plan
          }
        })
      })
      .catch((error) => {
        alert(error)
      })
      .then(() => {
        this.$router.push('/user/user-changed')
      })
  },
  changePass(state: any, passInformation: any) {
    db.collection(passInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === passInformation.email &&
            querySnapshot.docs[index].data().Password === passInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(passInformation.storage)
              .doc(state.loginUserID)
              .update({
                Password: passInformation.newPass,
              })
            state.loginUserPass = passInformation.newPass
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        if (passInformation.storage === 'users') {
          this.$router.push('/user/user-changed')
        } else {
          this.$router.push('/coach/coach-changed')
        }
      })
  },
  makePlan(state: any, makeInformation: any) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === makeInformation.email &&
            querySnapshot.docs[index].data().Password === makeInformation.pass
          ) {
            state.loginCoachID = querySnapshot.docs[index].id
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('プラン作成に失敗しました。')
      })
      .then(() => {
        db.collection('coaches')
          .doc(state.loginCoachID)
          .collection('plans')
          .add({
            CoachName: name,
            PlanName: makeInformation.plan,
            PlanContents: makeInformation.contents,
            PlanFee: makeInformation.fee,
            PlanReview: '' as string,
          })
      })
      .catch((error) => {
        alert(error)
        throw new Error('プラン作成に失敗しました。')
      })
      .then(() => {
        this.$router.push('/coach/coach-make-finished')
      })
  },
}
/// /////////////////actions////////////////////
export const actions = {
  registAccount({ commit }: any, { name, email, pass, storage }: any) {
    const userInformation = { name, email, pass, storage }
    commit('registAccount', userInformation)
  },
  getCoachID({ commit }: any, { email, pass }: any) {
    const coachInformation = { email, pass }
    commit('getCoachID', coachInformation)
  },
  login({ commit }: any, { email, pass, storage }: any) {
    const loginInformation = { email, pass, storage }
    commit('login', loginInformation)
  },
  changeSpecialty({ commit }: any, { specialty, email, pass }: any) {
    const spInformation = { specialty, email, pass }
    commit('changeSpecialty', spInformation)
  },
  changeName({ commit }: any, { name, email, pass, storage }: any) {
    const nameInformation = { name, email, pass, storage }
    commit('changeName', nameInformation)
  },
  changeMail({ commit }: any, { email, pass, newEmail, storage }: any) {
    const emailInformation = { email, pass, newEmail, storage }
    commit('changeMail', emailInformation)
  },
  changeProfile({ commit }: any, { profile, email, pass, storage }: any) {
    const profileInformation = { profile, email, pass, storage }
    commit('changeProfile', profileInformation)
  },
  changeAge({ commit }: any, { age, email, pass, storage }: any) {
    const ageInformation = { age, email, pass, storage }
    commit('changeAge', ageInformation)
  },
  changeAddress({ commit }: any, { address, email, pass, storage }: any) {
    const addressInformation = { address, email, pass, storage }
    commit('changeAddress', addressInformation)
  },
  changeRequestPlan({ commit }: any, { plan, email, pass }: any) {
    const planInformation = { plan, email, pass }
    commit('changeRequestPlan', planInformation)
  },
  changePass({ commit }: any, { email, pass, newPass, storage }: any) {
    const passInformation = { email, pass, newPass, storage }
    commit('changePass', passInformation)
  },
  makePlan({ commit }: any, { email, pass, name, plan, contents, fee }: any) {
    const makeInformation = { email, pass, name, plan, contents, fee }
    commit('makePlan', makeInformation)
  },
  async logout() {
    await firebase
      .auth()
      .signOut()
      .catch((error) => {
        alert(error)
      })
      .then(() => {
        this.$router.push('/')
      })
  },
  async deleteAccount(state: any, { email, pass, storage }: any) {
    await db
      .collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
          }
        })
      })
      .then(() => {
        db.collection(storage).doc(state.loginUserID).delete()
      })
      .then(() => {
        firebase.auth().currentUser.delete()
      })
      .catch((error) => {
        alert(error)
        throw new Error('アカウント削除に失敗しました。')
      })
      .then(() => {
        this.$router.push('/user/user-deleted')
      })
  },
}
