<template>
  <div class="container">
    <p>Welcome, {{ userData.username }}</p>
    <img :src="userData.avatar"/>
  </div>
</template>

<script setup>
const userData=ref({
  username:"",
  avatar:""
});

onMounted(async () => {
  try {
    const url = new URL(window.location.href);
    const params = {
      h: url.searchParams.get("sso_h"),
      b: url.searchParams.get("sso_b"),
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const res_data= await res.json();
      userData.value.username =res_data.username;
      userData.value.avatar =res_data.avatar;
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
    window.location.href = "/";
  }
});
</script>

<style scoped>

</style>
