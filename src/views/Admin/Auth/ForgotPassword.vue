<template>
	<div
		class="full-screen-bg flex justify-end items-end border-[1px] border-[#d0f3db] absolute shadow-md shadow-[#D6D6D6] w-screen h-screen overflow-hidden">
		<div class="card w-[750px] h-[450px] bg-white rounded-md mb-14 mr-14">
			<div class="grid grid-cols-3 grid-rows-3 gap-4 p-4">
				<div class="flex justify-center items-center">
					<div class="w-[217px] h-[190px]">
						<img class="w-full h-full" src="../../../assets/logo.png" alt="logo" />
					</div>
				</div>
				<div class="col-span-2 ">
					<h5 class="font-bold text-center py-4 text-[25px] text-[#00992B] moul-regular">
						ផ្លាស់ប្ដូរលេខសម្ងាត់ថ្មី
					</h5>
					<form @submit.prevent="handleSubmit" class="max-w-sm mx-auto mt-5" >
						<div class="flex flex-wrap">
                            <!-- Email -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4">
                                <label class="block text-sm mb-2">អ៊ីមែល</label>
                                <input v-model="form.email" type="text" required name="" id=""  class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" >
                            </div>

                            <!-- New Password -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4 relative">
                                <label class="block text-sm mb-2">បញ្ចូលលេខសម្ងាត់ថ្មី</label>
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.newPassword" required
                                    class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
                                <span @click="togglePasswordVisibility"
                                    class="absolute right-5 top-9 cursor-pointer">
                                    <i v-if="showPassword" class="fas fa-eye-slash text-gray-600"></i>
                                    <i v-else class="fas fa-eye text-gray-600"></i>
                                </span>
                            </div>

                            <!-- Confirm Password -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4 relative">
                                <label class="block text-sm mb-2">បញ្ជាក់លេខសម្ងាត់ថ្មី</label>
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.confirmPassword" required
                                    class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
                                <span @click="togglePasswordVisibility"
                                    class="absolute right-5 top-9 cursor-pointer">
                                    <i v-if="showPassword" class="fas fa-eye-slash text-gray-600"></i>
                                    <i v-else class="fas fa-eye text-gray-600"></i>
                                </span>
                            </div>
                        </div>

						<button type="submit" class="w-full moul-regular bg-[#00992B] text-center moul-regular text-white rounded-md py-3 text-[20px]">
							ផ្លាស់ប្ដូរលេខសម្ងាត់
						</button>
						<router-link to="/"><p class=" text-end py-3  text-sm underline text-blue-700">Back to Login</p></router-link>
					</form>

				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const getToken = () => localStorage.getItem('authToken');

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();

const form = ref({
    email: "",
    newPassword: "",
    confirmPassword: ""
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

// Handle form submission
const handleSubmit = async () => {
    const payload = {
        email: form.value.email,
        newPassword: form.value.newPassword,
        confirmPassword: form.value.confirmPassword
    };

    try {
        await axios.post(`${baseUrl}/auth/reset-password`, payload, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        Swal.fire("Success!", "Password reset successfully!", "success");
        router.push("/user");
    } catch (error) {
        console.error("Error resetting password:", error.response?.data || error.message);
        Swal.fire("Error!", "Error resetting password. Please try again.", "error");
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
