import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import FindPassword from '../components/FindPassword.vue'
import UserTransaction from '../components/UserTransaction.vue'
import FindConfirmation from '../components/FindConfirmation.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/findpw',
    name: 'FindPw',
    component: FindPassword
  },
  {
    path: '/transactions',
    name: 'UserTransaction',
    component: UserTransaction
  },
  {
    path: '/findconfirmation',
    name: 'Confirmation',
    component: FindConfirmation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;