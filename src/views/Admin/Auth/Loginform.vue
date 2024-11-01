<template>
	<div
		class="full-screen-bg flex justify-end items-end border-[1px] border-[#d0f3db] absolute shadow-md shadow-[#D6D6D6] w-screen h-screen overflow-hidden">
		<div class="card w-[750px] h-[400px] bg-white rounded-md mb-14 mr-14">
			<div class="grid grid-cols-3 grid-rows-3 gap-4 p-4">
				<div class="flex justify-center items-center">
					<div class="w-[217px] h-[190px]">
						<img class="w-full h-full" src="../../../assets/logo.png" alt="logo" />
					</div>
				</div>
				<div class="col-span-2">
					<h5 class="font-bold text-center py-4 text-[25px] text-[#00992B] moul-regular">
						ប្រព័ន្ធគ្រប់គ្រងប្រតិបត្តិការអង្ករ
					</h5>
					<form class="max-w-sm mx-auto mt-5" @submit.prevent="handleLogin">
						<div class="mb-5">
							<input v-model="userName"
								class="bg-gray-50 border border-gray-300 text-[#848484] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								placeholder="username" required />
						</div>
						<div class="mb-5 relative">
							<input :type="showPassword ? 'text' : 'password'" v-model="password"
								class="bg-gray-50 border border-gray-300 text-[#848484] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
								placeholder="លេខសម្ងាត់ .........." required />
							<i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
								@click="togglePasswordVisibility"
								class="absolute right-3 top-3 cursor-pointer text-gray-500"></i>
						</div>
						<button type="submit"
							class="w-full moul-regular bg-[#00992B] text-center moul-regular text-white rounded-md py-3 text-[20px]">
							ចូលទៅកាន់ប្រព័ន្ធ
						</button>
						<router-link to="/forgot-password"><p class=" text-end py-3 text-slate-400 text-sm">Forgot password?</p></router-link>
					</form>

				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useStore } from 'vuex';  // Import Vuex store
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const getToken = () => localStorage.getItem('authToken');

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();
const userName = ref('');
const password = ref('');
const showPassword = ref(false);
const store = useStore();  // Use the store

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value;
};
axios.interceptors.request.use(
    (config) => {
        const authToken = getToken();
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
const handleLogin = async () => {
    try {
        const loginPayload = {
            username: userName.value,  // Change `userName` to `username`
            password: password.value
        };

        const response = await axios.post(`${baseUrl}/auth/login`, loginPayload);
        const data = response.data;

        if (data && data.access_token) {
            store.dispatch('login', data);
            router.push("/dashboard");
        } else {
            Swal.fire({
                title: 'Login Failed',
                text: 'Invalid response from the server.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        Swal.fire({
            title: 'Error',
            text: 'Something went wrong during login',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
};

</script>

<style scoped>
.full-screen-bg {
	background-image: url('../../../assets/backgroud.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.moul-regular {
	font-family: 'Moul', serif;
	font-weight: 400;
	font-style: normal;
}

.siemreap-regular {
	font-family: 'Siemreap', sans-serif;
}
</style>
