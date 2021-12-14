<template>
  <div class="container_login">
    <h2>Bienvenue sur votre réseau social d'entreprise</h2>
    <h3>Connexion</h3>

    <form class="login" @submit.prevent="login">
      <label for="email">Email :</label>
      <input
        required
        v-model="email"
        type="email"
        name="email"
        id="email"
        placeholder="utilisateur@domaine.fr"
      />

      <label for="password">Mot de passe :</label>
      <input
        required
        v-model="password"
        type="password"
        name="password"
        id="password"
      />

      <button type="submit" @click.prevent="buttonLogin">Se connecter</button>
      <p v-if="message">{{ message }}</p>
    </form>

    <div class="container_signup">
      <p>
        Vous n'avez pas de compte?
        <router-link to="/signup">signup</router-link>.
      </p>
    </div>
  </div>
</template>
//----------------------------------------------------------------------------------------------------------------------
<script>
import axios from "axios";

export default {
  data() {
    return {
      token: "",
      userId: "",
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async buttonLogin() {
      await axios
        .post("/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.userId);
            localStorage.setItem("isAdmin", res.data.isAdmin);
          }
          this.$router.push("/profile");
        })
        .catch((error) => {
          alert("Authentification incorrect");
          this.error = error;
        });
    },
  },
};
</script>
//----------------------------------------------------------------------------------------------------------------------
<style scoped>
.container_login {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px #7219bb;
  margin-top: 50px;
  width: 95%;
  background-color: rgb(248, 245, 250);
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login input {
  width: 400px;
  margin-bottom: 15px;
  max-width: 95%;
  border-style: solid;
  border-radius: 5px;
  border-color: #b67fd1;
  background-color: #f4dafd;
}
.login button {
  width: 150px;
  cursor: pointer;
  border: unset;
  border-radius: 30px;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background: hsl(278, 65%, 54%);
  margin-top: 40px;
  margin-bottom: 60px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.login button:hover {
  border-radius: 10px 0 10px 0;
}
.container_signup {
  margin-top: 20px;
  box-shadow: 0px 0px 10px 0px rgb(68, 66, 66);
}
</style>