<template>
  <div class="container">
    <p v-if="userData">{{ $t("welcome") }} {{ userData.username }}</p>
  </div>
</template>

<script setup>
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
      userData.value = await res.json();
      console.log(userData.value);
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
