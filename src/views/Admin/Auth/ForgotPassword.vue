<template>
    <div
        class="full-screen-bg flex justify-end items-end border-[1px] border-[#d0f3db] absolute shadow-md shadow-[#D6D6D6] w-screen h-screen overflow-hidden">
        <div class="card w-[750px] h-[540px] bg-white rounded-md mb-14 mr-14">
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
                    <form @submit.prevent="handleSubmit" class="max-w-sm mx-auto mt-5">
                        <div class="flex flex-wrap">
                            <!-- Username -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4">
                                <label class="block text-sm mb-2">ឈ្មោះ</label>
                                <input v-model="form.username" type="text" required
                                    class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full">
                                <p v-if="formErrors.username" class="text-red-500 text-sm mt-1">{{ formErrors.username
                                    }}</p>
                            </div>

                            <!-- Branch Name -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4">
                                <label class="block text-sm mb-2">សាខា</label>
                                <input v-model="form.branchName" type="text" required
                                    class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full">
                                <p v-if="formErrors.branchName" class="text-red-500 text-sm mt-1">{{
                                    formErrors.branchName }}</p>
                            </div>

                            <!-- New Password -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4 relative">
                                <label class="block text-sm mb-2">បញ្ចូលលេខសម្ងាត់ថ្មី</label>
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.newPassword" required
                                    class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
                                <span @click="togglePasswordVisibility" class="absolute right-5 top-9 cursor-pointer">
                                    <i v-if="showPassword" class="fas fa-eye-slash text-gray-600"></i>
                                    <i v-else class="fas fa-eye text-gray-600"></i>
                                </span>
                                <p v-if="formErrors.newPassword" class="text-red-500 text-sm mt-1">{{
                                    formErrors.newPassword }}</p>
                            </div>

                            <!-- Confirm Password -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4 relative">
                                <label class="block text-sm mb-2">បញ្ជាក់លេខសម្ងាត់ថ្មី</label>
                                <input :type="showPassword ? 'text' : 'password'" v-model="form.confirmPassword"
                                    required
                                    class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
                                <span @click="togglePasswordVisibility" class="absolute right-5 top-9 cursor-pointer">
                                    <i v-if="showPassword" class="fas fa-eye-slash text-gray-600"></i>
                                    <i v-else class="fas fa-eye text-gray-600"></i>
                                </span>
                                <p v-if="formErrors.confirmPassword" class="text-red-500 text-sm mt-1">{{
                                    formErrors.confirmPassword }}</p>
                            </div>

                        </div>

                        <button type="submit"
                            class="w-full moul-regular bg-[#00992B] text-center moul-regular text-white rounded-md py-3 text-[20px]">
                            ផ្លាស់ប្ដូរលេខសម្ងាត់
                        </button>
                        <router-link to="/">
                            <p class=" text-end py-3  text-sm underline text-blue-700">Back to Login</p>
                        </router-link>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
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
    username: "",
    branchName: "",
    newPassword: "",
    confirmPassword: ""
});
const formErrors = ref({
    username: "",
    branchName: "",
    newPassword: "",
    confirmPassword: ""
});

const showPassword = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
    formErrors.value = {
        username: "",
        branchName: "",
        newPassword: "",
        confirmPassword: ""
    };

    const payload = {
        username: form.value.username,
        branchName: form.value.branchName,
        newPassword: form.value.newPassword,
        confirmPassword: form.value.confirmPassword
    };

    try {
        await axios.post(`${baseUrl}/auth/reset-password`, payload, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        
        // Show success alert that auto-closes
        Swal.fire({
            title: "Success!",
            text: "Password reset successfully!",
            icon: "success",
            timer: 800,  
            showConfirmButton: false,
            timerProgressBar: false,
        });
        router.push("/user");

    } catch (error) {
        const response = error.response?.data;

        if (response?.errors) {
            // Capture specific field errors
            if (response.errors.username) {
                formErrors.value.username = response.errors.username;
            }
            if (response.errors.branchName) {
                formErrors.value.branchName = response.errors.branchName;
            }
            if (response.errors.newPassword) {
                formErrors.value.newPassword = response.errors.newPassword;
            }
            if (response.errors.confirmPassword) {
                formErrors.value.confirmPassword = response.errors.confirmPassword;
            }
        } else {
            Swal.fire("Error!", "Error resetting password. Please try again.", "error");
        }
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
