<template>
  <v-container class="px-8 mt-5">
    <v-row justify="space-between" align="start">
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <h2>Share a reply?</h2>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div class="d-flex flex-column align-center">
          <v-textarea
            variant="filled"
            auto-grow
            label="Your message..."
            rows="4"
            row-height="30"
            shaped
            class="w-100"
            v-model="comment.text"
          >
            <template v-slot:append-inner>
              <div class="d-flex flex-column justify-end h-100 pb-2">
                <v-btn icon="$send" elevation="0" @click="onComment"></v-btn>
              </div>
            </template>
          </v-textarea>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <div
          class="w-100 d-flex justify-start mb-5 flex-wrap"
          v-for="(existingComment, index) in existingComments"
          :key="existingComment.username"
        >
          <v-avatar size="64px" class="me-5">
            <v-img alt="Avatar" cover src="@/assets/avatar4.jpeg"></v-img>
          </v-avatar>
          <div class="mb-6">
            <strong>{{ existingComment.username }}</strong>
            <div class="d-flex text-grey">
              <span class="me-1">
                {{ comment.commentTime[index].hour }} : {{ comment.commentTime[index].minutes }}
              </span>
              <p class="me-1">,</p>
              <span class="me-1">{{ comment.commentTime[index].weekDay }}</span>
              <p class="me-1">,</p>
              <span class="me-1"
                >{{ comment.commentTime[index].year }}/{{ comment.commentTime[index].month }}/{{
                    comment.commentTime[index].date
                }}</span
              >
            </div>
          </div>
          <div class="w-100">
            <div
              class="pa-4 bg-blue-grey-lighten-5 rounded-xl rounded-ts-0 text-blue-grey-darken-1"
            >
              {{ existingComment.text }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-snackbar
      :timeout="2000"
      :color="comment.successComment.color"
      rounded="pill"
      v-model="comment.successComment.show"
    >
      {{ comment.successComment.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import blogService from '@/services/blogService';
export default {
  props: {
    comment: Object,
    existingComments: Array,
  },
  methods:{
    onComment() {
      let comment = {
        text: this.comment.text,
      };
      console.log(this.comment);
      blogService.createComment(this.id, comment).then((res) => {
        if (res.status === 201) {
          this.comment.successComment.show = true;
          this.comment.successComment.text = "Your comment submitted successfully.";
          this.comment.successComment.color = "success";
        }
      });
    },
  }
};
</script>
