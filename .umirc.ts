import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", redirect: '/01_v18hooks' },
    { path: "/01_v18hooks", component: "01_v18hooks" },
    { path: "/02_ahooks", component: "02_ahooks" },
  ],
  npmClient: 'pnpm',
});
