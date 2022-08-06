<template>
  <div>
    <img alt="Vue logo" src="../../assets/logo.png" />
    <n-form
      ref="userFormRef"
      :model="userForm"
      :rules="userRules"
      label-placement="left"
      label-width="120px"
      :size="formSize"
    >
      <n-form-item label="username" prop="username">
        <n-input v-model:value="userForm.username" type="text" autocomplete="on" clearable />
      </n-form-item>
      <n-form-item label="Password" prop="password">
        <n-input v-model:value="userForm.password" type="password" autocomplete="off" clearable />
      </n-form-item>
      <div>
        <n-button type="primary" @click="submit">登录</n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { FormInst, FormItemRule } from 'naive-ui'
const formSize:Ref<string> = ref('small')
const userFormRef = ref<FormInst | null>(null)
const userForm = reactive({
  username: undefined,
  password: undefined
})
const validateUsername = (rule: FormItemRule, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('用户名不能为空'))
  } else if (value.length < 3) {
    callback(new Error('用户名不能少于3个字符'))
  } else {
    callback()
  }
}
const validatePassword = (rule: FormItemRule, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('密码不能为空'))
  } else if (value.length < 6) {
    callback(new Error('密码不能少于3个字符'))
  } else {
    callback()
  }
}
const userRules = {
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
}
const submit = (e: MouseEvent) => {
  e.preventDefault()
  userFormRef.value?.validate((errors) => {
    if (!errors) {
      // 验证成功
    } else {
      console.log(errors)
      // 验证失败
    }

  })
}

</script>

<style scoped>
</style>
