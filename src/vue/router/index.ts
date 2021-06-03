import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		alias: ["/home", "/index", "/login", "/register"],
		name: "Home",
		component: Home,
	},
	{
		path: "/chat",
		name: "Chat",
		component: Chat,
		//component: () => import("../views/Chat.vue"),
	},
];

export const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
