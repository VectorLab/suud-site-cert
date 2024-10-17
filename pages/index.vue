<template>
  <button class="btn btn-primary" @click.prevent="oauthLogin">enter</button>
</template>

<script setup>
const ssoClientID = ""; // your sso site id here
const dashboardURL = "/dashboard";

const oauthLogin = () => {
  const SUUD = new URL("/sso", "https://suud.net");
  SUUD.searchParams.set("s", ssoClientID);
  SUUD.searchParams.set("t", "cert");
  
  // Set permission parameters:
  // 1: user ID
  // 2: username
  // 3: avatar
  const permissions = [1, 2, 3];
  permissions.forEach(p => SUUD.searchParams.append("p", p));

  const callbackURL = new URL(dashboardURL, window.location.href);
  SUUD.searchParams.set("cb", callbackURL.toString());

  try {
    /**
     * DO NOT use window.location.replace,
     * which will cause current site unable to handle error
     */
    window.location.assign(SUUD.toString());
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>

</style>
