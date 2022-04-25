import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
// import AppDate from "@/components/AppDate";

const forumApp = createApp(App);
forumApp.use(router);

const requireComponent = require.context("./components", true, /^Base[A-Z]/);
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, "").replace(/\.\w+$/, "");
  forumApp.component(baseComponentName, baseComponentConfig);
});
// forumApp.component("AppDate", AppDate);
forumApp.mount("#app");
