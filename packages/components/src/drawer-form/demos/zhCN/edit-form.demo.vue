<markdown>
# 编辑表单回显
</markdown>

<script lang="tsx">
import { useMessage } from 'naive-ui'
import { createProDrawerForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const loading = ref(false)
    const message = useMessage()

    const drawerForm = createProDrawerForm<{ name?: string, age?: number }>({
      onSubmit: async (values) => {
        loading.value = true
        await delay(1500)
        message.success('更新成功')
        console.log(values)
        drawerForm.close()
        loading.value = false
      },
    })

    function edit() {
      drawerForm.values.value = {
        name: 'zcf',
        age: 26,
      }
      drawerForm.open()
    }

    return {
      edit,
      loading,
      form: drawerForm,
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="edit">
      编辑表单回显
    </n-button>
  </n-flex>
  <pro-drawer-form
    :form="form"
    :loading="loading"
    label-width="80"
    label-placement="left"
  >
    <pro-drawer-content
      title="新建表单"
      :native-scrollbar="false"
    >
      <pro-input
        title="用户名"
        path="name"
        required
      />
      <pro-digit
        title="年龄"
        path="age"
        required
      />
    </pro-drawer-content>
  </pro-drawer-form>
</template>
