<template>
  <v-container class="px-0 py-0 mb-6">
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200"
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
    class="bg-blue-grey-lighten-5 ps-8"
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

    <template v-slot:actions>
      <div class="d-flex justify-start w-100">
        <v-btn
          color="deep-purple-darken-4"
          prepend-icon="$check"
          rounded="pill"
          variant="tonal"
          class="me-1 px-4"
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
    </template>
  </v-banner>
  <v-container class="px-8 mt-5">
    <v-row justify="space-between" align="start">
      <v-col cols="12" sm="12">
        <h2>Share a reply?</h2>
      </v-col>
      <v-col cols="12" sm="12">
        <div class="d-flex flex-column align-center">
          <v-textarea
            variant="filled"
            auto-grow
            label="Your message..."
            rows="4"
            row-height="30"
            shaped
            class="w-100"
            v-model="comment"
          >
            <template v-slot:append-inner>
              <div class="d-flex flex-column justify-end h-100 pb-2">
                <v-btn icon="$send" elevation="0" @click="onComment"></v-btn>
              </div>
            </template>
          </v-textarea>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <div
          class="w-100 d-flex justify-start mb-5 flex-wrap"
          v-for="(comment, index) in post.comments"
          :key="comment.username"
        >
          <v-avatar size="64px" class="me-5">
            <v-img alt="Avatar" cover src="@/assets/avatar4.jpeg"></v-img>
          </v-avatar>
          <div class="mb-6">
            <strong>{{ comment.username }}</strong>
            <div class="d-flex text-grey">
              <span class="me-1">
                {{ commentTime[index].hour }} : {{ commentTime[index].minutes }}
              </span>
              <p class="me-1">,</p>
              <span class="me-1">{{ commentTime[index].weekDay }}</span>
              <p class="me-1">,</p>
              <span class="me-1"
                >{{ commentTime[index].year }}/{{ commentTime[index].month }}/{{
                  commentTime[index].date
                }}</span
              >
            </div>
          </div>
          <div class="w-100">
            <div
              class="pa-4 bg-blue-grey-lighten-5 rounded-xl rounded-ts-0 text-blue-grey-darken-1"
            >
              {{ comment.text }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-snackbar
      :timeout="2000"
      :color="successComment.color"
      rounded="pill"
      v-model="successComment.show"
    >
      {{ successComment.text }}
    </v-snackbar>
  </v-container>
</template>
<script>
import blogService from "../services/blogService";
import { dateDifference, exactTime } from "../helpers/helper";

export default {
  data() {
    return {
      post: {},
      colors: ["cyan", "deep-purple", "red", "amber"],
      time: {},
      comment: "",
      commentTime: [],
      id: 2,
      like: false,
      likeIcon: "$outlinedHeart",
      successComment: {
        show: false,
        text: "There is a problem, we can't submit your comment!",
        color:'error'
      },
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
            this.commentTime.push(exactTime(comment.date));
            console.log(exactTime(comment.date));
          }
          console.log(this.commentTime);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onComment() {
      let comment = {
        text: this.comment,
      };
      console.log(this.comment);
      blogService.createComment(this.id, comment).then((res) => {
        if (res.status === 201) {
          this.successComment.show = true;
          this.successComment.text = "Your comment submitted successfully.";
          this.successComment.color = 'success'
        }
      });
    },
    onLike() {
      this.like = !this.like;
      this.likeIcon = this.like ? "$strokeHeart" : "$outlinedHeart";
    },
  },
  mounted() {
    this.getPostContent(this.id);
    // let elements = document.getElementsByClassName("v-col");
    // console.log(elements)
    // for (let element of elements) {
    //   console.log(element)
    //   element.classList.remove("v-col");
    // }
  },
};
</script>
<style>
.book-mark i {
  color: black;
}
.v-banner {
  border: none;
}
</style>
