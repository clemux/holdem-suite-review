<script setup lang="ts">
import { ref } from 'vue'

const API_URL = 'http://localhost:8000/upload'


const selectedFile = ref<File | null>(null)
const onFileSelected = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    selectedFile.value = files[0]
  }
}

const onUpload = async () => {
  if (selectedFile.value) {
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    })
  }
}



</script>

<template>
    <label for="upload">Choose a tournament history file</label>
    <input type="file" @change="onFileSelected" id="upload" name="upload" accept="text/plain"/>
    <button @click="onUpload">Upload</button>
</template>
