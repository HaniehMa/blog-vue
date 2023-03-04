<template>
  <v-container class="px-0 py-0 mb-6">
    <v-row>
      <v-card class="w-100">
        <v-img
          height="250"
          src="@/assets/header1.jpg"
          cover
          gradient="to top, rgba(0,0,0,0), rgba(0,0,0,.8)"
          class="text-white"
        >
          <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark" class="mt-9">
            <template v-slot:prepend>
              <v-btn size="x-large" icon="$arrowLeft"></v-btn>
            </template>
            <template v-slot:append>
              <v-btn size="x-large" @click="onLike()" :icon="likeIcon"></v-btn>
            </template>
          </v-toolbar>
        </v-img>
      </v-card>
    </v-row>
  </v-container>
  <v-container class="px-8 mt-10 mb-5">
    <v-row justify="space-between" align="start">
      <v-col cols="12">
        <v-chip
          v-for="(tag, index) in post.tags"
          :key="tag"
          class="me-3 font-weight-bold"
          :color="colors[index]"
        >
          {{ tag }}
        </v-chip>
      </v-col>
      <v-col cols="12">
        <h2>{{ post.title }}</h2>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="d-flex justify-start">
          <v-avatar size="64px" class="me-5">
            <v-img alt="Avatar" src="@/assets/avatar1.jpeg"></v-img>
          </v-avatar>
          <div>
            <strong>By {{ post.author }}</strong>
            <div class="d-flex text-grey">
              <span class="me-1" v-if="time.years">{{ time.years }} years</span>
              <p class="me-1" v-if="time.years">and</p>
              <span class="me-1" v-if="time.months"
                >{{ time.months }} month</span
              >
              <p class="me-1" v-if="time.months && time.days">and</p>
              <span class="me-1" v-if="time.days">{{ time.months }} days</span>
              <p>ago</p>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <p v-html="post.content"></p>
      </v-col>
    </v-row>
  </v-container>
  <v-banner
    lines="three"
    color="deep-purple-accent-4"
    class="bg-blue-grey-lighten-5 ps-7 pe-7"
  >
    <template v-slot:prepend>
      <v-avatar size="64px">
        <v-img alt="Avatar" cover src="@/assets/avatar.jpg"></v-img>
      </v-avatar>
    </template>

    <v-banner-text>
      <h2>About the author</h2>
      <span class="text-blue-grey-darken-1"
        >{{ post.author }} is a New York Times bestseller and a RITA®
        winner.</span
      >
    </v-banner-text>
    <v-banner-actions class="d-flex justify-start justify-sm-end">
      <div class="d-flex">
        <v-btn
          color="deep-purple-accent-4"
          prepend-icon="$check"
          rounded="pill"
          variant="flat"
          class="me-3 px-4"
        >
          Following
        </v-btn>
        <v-btn
          color="grey"
          icon="$bookMark"
          size="small"
          variant="outlined"
          class="book-mark"
        >
        </v-btn>
      </div>
    </v-banner-actions>
  </v-banner>
  <comment :comment="comment" :existingComments="post.comments"></comment>
</template>
<script>
import blogService from "../services/blogService";
import { dateDifference, exactTime } from "../helpers/helper";
import Comment from "./Comment.vue";

export default {
  components: {
    Comment,
  },
  data() {
    return {
      post: {},
      colors: ["cyan", "deep-purple", "red", "amber"],
      time: {},
      comment: {
        text: "",
        commentTime: [],
        successComment: {
          show: false,
          text: "There is a problem, we can't submit your comment!",
          color: "error",
        },
      },
      id: 2,
      like: false,
      likeIcon: "$outlinedHeart",
    };
  },
  methods: {
    getPostContent(id) {
      blogService
        .getPost(id)
        .then((res) => {
          this.post = res.data;
          console.log(res.data);
          this.time = dateDifference(Date.now(), this.post.date);
          for (let comment of this.post.comments) {
            this.comment.commentTime.push(exactTime(comment.date));
            console.log(exactTime(comment.date));
          }
          console.log(this.comment.commentTime);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onLike() {
      this.like = !this.like;
      this.likeIcon = this.like ? "$strokeHeart" : "$outlinedHeart";
    },
  },
  mounted() {
    this.getPostContent(this.id);
  },
};
</script>
<style>
.book-mark i.v-icon {
  color: black !important;
}
.v-banner {
  border: none !important;
}
</style>
