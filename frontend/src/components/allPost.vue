<template>
  <div v-if="!loading" id="allPost">
    <h3 class="title">Liste des posts</h3>
    <card-post
      :key="post.id"
      v-for="post of posts"
      :title="post.title"
      :content="post.content"
      :user="post.User"
      :image="post.image"
      :id="post.id"
    />
  </div>
  <div v-else id="chargement">
    chargement
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";
import cardPost from "./cardPost";
export default {
  name: "allPosts",
  components: { cardPost },
  data() {
    return {
      posts: [],
      loading: false,
    };
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const { data } = await axios.get("/api/post");
        this.posts = data;
      } catch (error) {
        if (error.status === 401) {
          this.$router.push("/login");
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
h3 {
  margin-left: 20px;
  margin-right: 20px;
  background-color: #9b45d4b8;
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 10px;
}
#chargement {
  margin-top: 20px;
  color: #225ad1b8;
}
#chargement span {
  width: 0.5em;
  height: 0.5em;
  margin: 0 2px;
  background-color: #2731bfb8;
  border-radius: 50%;
  display: inline-block;
  animation-name: JumpingDots;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
span:nth-child(2) {
  animation-delay: 0.4s;
}
span:nth-child(3) {
  animation-delay: 0.8s;
}
@keyframes JumpingDots {
  30% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>