<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			បន្ថែងអ្នកប្រើប្រាស់ថ្មី
		</p>
		<div>
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form @submit.prevent="handleSubmit">
						<div class="flex flex-wrap">
							<!-- User Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះ</label>
								<input type="text" v-model="form.userName" 
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" required />
							</div>
              <!-- Email -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">អុីម៉ែល</label>
								<input type="email" v-model="form.email" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Password -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4 relative">
								<label class="block text-sm mb-2">លេខសម្ងាត់</label>
								<input :type="showPassword ? 'text' : 'password'" v-model="form.password" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
								<span @click="togglePasswordVisibility('password')" class="absolute right-3 top-10 cursor-pointer">
									<i v-if="showPassword" class="fas fa-eye-slash text-gray-600"></i>
									<i v-else class="fas fa-eye text-gray-600"></i>
								</span>
							</div>
						<!-- Confirm Password -->
              <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4 relative">
								<label class="block text-sm mb-2">បញ្ជាក់លេខសម្ងាត់ម្តងទៀត</label>
								<input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmPassword" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
								<span @click="togglePasswordVisibility('confirmPassword')" class="absolute right-3 top-10 cursor-pointer">
									<i v-if="showConfirmPassword" class="fas fa-eye-slash text-gray-600"></i>
									<i v-else class="fas fa-eye text-gray-600"></i>
								</span>
							</div>
							<!-- Role -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">សិទ្ធ</label>
								<select v-model="form.roleName" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="role in roles" :key="role.id"
										:value="role.name">{{ role.name }}</option>
								</select>
							</div>
							
						<!-- Branch -->
            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះសាខា</label>
								<select v-model="form.branchId" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="branch in branchs" :key="branch.id"
										:value="branch.id">{{ branch.name }}</option>
								</select>
							</div>
							<!-- Is Active -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4 flex">
								<label class="block text-sm mb-2 mx-3">ស្ថានភាព</label>
								<input type="checkbox" v-model="form.active"
									class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
							</div>
              <!-- Allow Reset Password -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4 flex">
								<label class="block text-sm mb-2 mx-4">អនុញ្ញាតអាចប្តូរលេខសម្ងាត់</label>
								<input type="checkbox" v-model="form.allowResetPassword"
									class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
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
import { useStore } from 'vuex';


const store = useStore();

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
	userName: "",
	email: "",
	password: "",
	confirmPassword: "",
	branchId: 0,
	roleName: "",
	active: false,
	allowResetPassword: false,
	created_At: new Date().toISOString(),
	created_By: getToken(),
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    showPassword.value = !showPassword.value;
  } else if (field === 'confirmPassword') {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};

onMounted(() => {
  fetchBranchs();
  fetchRoles();
});
// Fetch branches
const branchs = ref([]);
const fetchBranchs = async () => {
  try {
		const token = getToken();
		const response = await axios.get(`${baseUrl}/core/branch`, {
			headers: { Authorization: `Bearer ${token}` },
		});
    branchs.value = response.data.data;
	} catch (error) {
		console.error('Error fetching branches:', error);
	}
};
// Fetch roles
const roles = ref([]);
const fetchRoles = async () => {
  try {
		const token = getToken();
		const response = await axios.get(`${baseUrl}/role`, {
			headers: { Authorization: `Bearer ${token}` },
		});
    roles.value = response.data;
	} catch (error) {
		console.error('Error fetching roles:', error);
	}
};

// Handle form submission
const handleSubmit = async () => {
	const createdBy = store.getters.getUserId;
	const payload = {
		userName: form.value.userName,
		email: form.value.email,
		password: form.value.password,
		confirmPassword: form.value.confirmPassword,
		branchId: form.value.branchId,
		roleName: form.value.roleName,
		active: form.value.active,
		allowResetPassword: form.value.allowResetPassword,
		created_At: form.value.created_At,
		created_By: createdBy,
	};

	try {
		const response = await axios.post(`${baseUrl}/user`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		console.log("User created successfully:", response.data);
		Swal.fire("Success!", "User created successfully!.", "success");
		router.push("/user");
	} catch (error) {
		console.error("Error creating user:", error);
		Swal.fire("Error!", "Error creating user. Please try again.", "error");
	}
};
</script>

<style scoped>
.moul-regular {
	font-family: "Moul", serif;
	font-weight: 400;
	font-style: normal;
}

.siemreap-regular {
	font-family: "Siemreap", sans-serif;
}
</style>
