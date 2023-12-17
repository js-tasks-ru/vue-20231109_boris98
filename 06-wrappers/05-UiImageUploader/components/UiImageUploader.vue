<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': state === 'loading' }">
      <span class="image-uploader__text">{{ uploaderText }}</span>
      <input
        type="file"
        ref="input"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @click="handleRemove"
        @change="handleChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },
  created() {
    if (this.preview) this.state = 'filled';
  },

  emits: ['remove', 'select', 'error', 'upload'],

  data() {
    return {
      state: 'empty',
      previewURL: this.preview,
      file: null,
    };
  },
  computed: {
    backgroundImage() {
      return this.previewURL ? `url(${this.previewURL})` : 'var(--default-cover)';
    },
    uploaderText() {
      if (this.state === 'loading') return 'Загрузка...';
      if (this.state === 'filled') return 'Удалить изображение';
      return 'Загрузить изображение';
    },
  },
  methods: {
    handleChange(event) {
      this.file = event.target.files[0];
      if (this.previewURL && typeof this.previewURL === 'object') {
        URL.revokeObjectURL(this.selectedURL);
      }
      if (this.file) {
        this.previewURL = URL.createObjectURL(this.file);
      } else {
        this.previewURL = '';
      }
      this.$emit('select', this.file);
      this.uploadFile(this.file);
    },
    async uploadFile(file) {
      if (this.uploader) {
        this.state = 'loading';
        try {
          const result = await this.uploader(file);
          this.handleSuccessUpload(result);
        } catch (error) {
          this.handleError(error);
        }
      } else {
        this.state = 'filled';
      }
    },
    handleSuccessUpload(result) {
      this.state = 'filled';
      this.$emit('upload', result);
    },

    handleError(error) {
      this.$emit('error', error);
      this.resetUploader();
    },
    resetUploader() {
      this.previewURL = null;
      this.$refs.input.value = null;
      this.state = 'empty';
    },
    handleRemove(event) {
      if (this.state === 'filled') {
        event.preventDefault();
        this.$emit('remove');
        this.resetUploader();
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind(backgroundImage);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
