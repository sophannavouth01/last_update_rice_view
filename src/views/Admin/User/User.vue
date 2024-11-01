<template>
	<div class="bg-white shadow-md h-[1000px] rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">អ្នកប្រើប្រាស់</p>
		<div class="flex justify-end px-5 py-3">
			<router-link to="/add-user">
				<button class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">
					បង្កើតអ្នកប្រើប្រាស់
				</button>
			</router-link>
		</div>
		<div class="px-5 pb-5">
			<table class="w-full text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr>
						<th class="px-6 py-3 w-5 border text-[14px]">ល.រ</th>
						<th class="px-6 py-3 border">ឈ្មោះ</th>
						<th class="px-6 py-3 border">អ៊ីមែល</th>
						<th class="px-6 py-3 border">ឈ្មោះសាខា</th>
						<th class="px-6 py-3 text-center border">សិទ្ធ</th>
						<th class="px-6 py-3 border">ស្ថានភាព</th>
						<th class="px-6 py-3 border">អនុញ្ញាតប្តូរលេខសម្ងាត់</th>
						<th class="px-6 py-3 border text-center">សកម្មភាព</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in paginatedItems" :key="item.id"
						class="bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td class="w-[30px] px-6 py-4 border">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
						<td class="px-3 py-3 border">{{ item.username }}</td>
						<td class="px-3 py-3 border">{{ item.email }}</td>
						<td class="px-6 py-3 border">{{ item.branch ? item.branch.name : 'N/A' }}</td>
						<td class="text-center w-28 py-4 border">{{ item.role.name }}</td>
						<td class="px-6 py-4 border"	:class="{ 'text-gray-700': item.active, 'text-red-600': !item.active }">
							{{ item.active ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ' }}
						</td>
						<td class="px-6 py-4 border"
							:class="{ 'text-gray-700': item.allowResetPassword, 'text-red-600': !item.allowResetPassword }">
							{{ item.allowResetPassword ? 'អាចផ្លាស់ប្តូរ' : 'មិនអាចផ្លាស់ប្តូរ' }}
						</td>
						<td class="flex justify-center border px-2 py-2 text-center">
							<button @click="openEditModal(item)" class="px-4 py-2 bg-blue-50 text-[#00992B] rounded-md">
								កែប្រែ
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Pagination controls -->
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1"
							class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">ក្រោយ</button>
					</li>
					<li>
						<a href="#"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
							{{ currentPage }} នៃ {{ totalPages }}</a>
					</li>
					<li>
						<button @click="nextPage" :disabled="currentPage === totalPages"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">បន្ទាប់</button>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Edit Modal -->
		<div v-if="isEditModalVisible"
			class="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
			<div class="bg-white w-[500px] p-5 rounded-lg">
				<h2 class="text-lg font-semibold text-gray-700 mb-4">Edit User</h2>
				<form @submit.prevent="submitEdit">
					<div class="mb-4">
						<label class="block text-sm text-gray-600">User Name</label>
						<input v-model="editForm.username" type="text" class="w-full p-2 border rounded" />
					</div>
					<div class="mb-4">
						<label class="block text-sm text-gray-600">Email</label>
						<input v-model="editForm.email" type="email" class="w-full p-2 border rounded" />
					</div>
					<div class="w-full mb-4">
						<label class="block text-sm mb-2">សាខា</label>
						<select v-model="editForm.branch_id" class="border px-3 py-2 text-sm w-full">
							<option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}
							</option>
						</select>
					</div>
					<div class="w-full mb-4">
						<label class="block text-sm mb-2">សិទ្ធ</label>
						<select v-model="editForm.role_id" class="border px-3 py-2 text-sm w-full">
							<option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
						</select>
					</div>
					<div class="flex gap-10">
						<div class="mb-4 flex items-center">
							<label class="mr-5 text-sm text-gray-600">ស្ថានភាព</label>
							<input type="checkbox" v-model="editForm.active"
								class="form-checkbox h-5 w-5 text-green-600" />
						</div>
						<!-- Modal Checkbox for Allow Password Reset -->
						<div class="mb-4 flex items-center">
							<label class="mr-5 text-sm text-gray-600">អនុញ្ញាតប្តូរលេខសម្ងាត់</label>
							<input type="checkbox" v-model="editForm.allowResetPassword"
								class="form-checkbox h-5 w-5 text-green-600" />
						</div>

					</div>
					<div class="flex justify-end">
						<button type="button" @click="closeEditModal"
							class="px-4 py-2 mr-2 bg-gray-300 rounded-md">Cancel</button>
						<button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useStore } from 'vuex';

const store = useStore();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const isEditModalVisible = ref(false);
const branches = ref([]);
const roles = ref([]);

const editForm = ref({
	username: '',
	email: '',
	employee_id: null,
	branch_id: null,
	role_id: null,
	allowResetPassword: false, // Initialized as false
	active: false
});


const editingUserId = ref(null);

const getToken = () => localStorage.getItem('authToken');

axios.interceptors.request.use(
	(config) => {
		const authToken = getToken();
		if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
		return config;
	},
	(error) => Promise.reject(error)
);

const fetchBranches = async () => {
	try {
		const response = await axios.get(`${baseUrl}/branch`, { headers: { Authorization: `Bearer ${getToken()}` } });
		branches.value = response.data;
	} catch (error) {
		console.error('Error fetching branches:', error);
	}
};

const fetchRoles = async () => {
	try {
		const response = await axios.get(`${baseUrl}/roles`, { headers: { Authorization: `Bearer ${getToken()}` } });
		roles.value = response.data;
	} catch (error) {
		console.error('Error fetching roles:', error);
	}
};

const fetchUsers = async () => {
	try {
		const response = await axios.get(`${baseUrl}/users`);
		items.value = Array.isArray(response.data) ? response.data : [];
	} catch (error) {
		items.value = [];
		console.error('Error fetching users:', error);
	}
};

onMounted(() => {
	fetchBranches();
	fetchUsers();
	fetchRoles();
});

const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return items.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));

const previousPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

const openEditModal = (user) => {
	editForm.value = {
		username: user.username,
		email: user.email,
		branch_id: user.branch ? user.branch.id : null,
		role_id: user.role.id,
		employee_id: user.employee_id,
		allowResetPassword: user.allowResetPassword, // Check this field assignment
		active: user.active,
	};
	editingUserId.value = user.id;
	isEditModalVisible.value = true;
};

const closeEditModal = () => {
	isEditModalVisible.value = false;
};

const submitEdit = async () => {
	const userId = store.state.user?.userId || JSON.parse(localStorage.getItem('loggedInUser')).userId;

	const payload = {
		username: editForm.value.username,
		email: editForm.value.email,
		role_id: editForm.value.role_id,
		employee_id: editForm.value.employee_id,
		branch_id: editForm.value.branch_id,
		allowResetPassword: editForm.value.allowResetPassword,
		active: editForm.value.active,
		updated_By: userId,
	};

	try {
		await axios.put(`${baseUrl}/users/${editingUserId.value}`, payload);
		Swal.fire('Success!', 'User has been updated.', 'success');
		fetchUsers();
		closeEditModal();
	} catch (error) {
		console.error('Error editing user:', error);
		Swal.fire('Error!', 'There was a problem updating the user.', 'error');
	}
};
</script>

<style scoped>
.moul-regular {
	font-family: 'Moul', serif;
	font-weight: 400;
}

.siemreap-regular {
	font-family: 'Siemreap', sans-serif;
}
</style>
