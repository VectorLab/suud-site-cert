// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2020-04-03",
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
        // { property: "og:image", content: "" },
        // { property: "twitter:image", content: "" }
      ],
      link: [
        { rel: "shortcut icon", href: "/favicon.ico" }
      ]
    }
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.min.css"
  ],
  plugins: [
    "~/plugins/script.client.js"
  ]
});
