<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
        <p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
            ផ្លាស់ប្ដូរលេខសម្ងាត់ថ្មី
        </p>
        <div>
            <section class="bg-blueGray-50">
                <div class="w-full mx-auto mt-6">
                    <form @submit.prevent="handleSubmit">
                        <div class="flex flex-wrap">
                            <!-- Email -->
                            <div class="w-full lg:w-12/12 xl:w-12/12 px-2 mb-4">
                                <label class="block text-sm mb-2">អ៊ីមែល</label>
                                <select v-model="form.email" required
                                    class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
                                    <option v-for="user in users" :key="user.id" :value="user.email">{{ user.email }}</option>
                                </select>
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

                        <!-- Submit Button -->
                        <footer class="w-full relative pt-8 pb-6">
                            <div class="flex justify-end">
                                <button type="submit"
                                    class="bg-[#00992B] rounded-md text-white px-5 py-3 text-sm font-medium">យល់ព្រមបង្កើត</button>
                            </div>
                        </footer>
                    </form>
                </div>
            </section>
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

// Fetch users
const users = ref([]);
const fetchUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}/users`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Fetch users when component is mounted
onMounted(fetchUsers);

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
.moul-regular {
    font-family: "Moul", serif;
    font-weight: 400;
    font-style: normal;
}
</style>
