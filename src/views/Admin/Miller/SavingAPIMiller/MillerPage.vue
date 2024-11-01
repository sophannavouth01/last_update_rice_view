<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">រោងម៉ាស៊ីន</p>
		<div class="flex justify-between px-5 py-3">
			<div></div>
			<div class="order-last">
				<router-link to="/add-miller">
					<button
						class="px-4 siemreap-regular  py-2 ml-3 bg-[#00992B] text-[15px]  text-white rounded">បង្កើតបញ្ជីឈ្មោះ</button>

				</router-link>
			</div>
		</div>

		<div class="overflow-x-auto sm:rounded-lg px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr>
						<th
							class="px-6 py-3  w-5 border text-[14px]   whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ល.រ</th>
						<th class="px-6 py-3 border  whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ឈ្មោះ
						</th>
						
						<th class="px-6 py-3 border  whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ភូមិ
						</th>
						<th class="px-6 py-3 border   whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ខេត្ត
						</th>
						<th class="px-6 py-3 w-[150px] border  whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							លេខទូរស័ព្ទ</th>
							<th class="px-6 py-3 w-[150px] border  whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
								លេខទូរស័ព្ទ</th>
						<th class="px-6 py-3 border w-[100px]  whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ស្ថានភាព</th>
						<th
							class="px-4 py-3 border text-center w-[100px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							សកម្មភាព</th>
					</tr>
				</thead>
				<tbody style="border-radius: 10px;">
					<tr v-for="(item, index) in millers" :key="item.userId"
					class="siemreap-regular bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td
							class="w-[30px] px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 + (currentPage - 1) * itemsPerPage }}
						</td>
						<td class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.name }}</td>
						
						<td
							class=" w-28  px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.address.villageName }}</td>
						<td
							class=" w-28 px-6  py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.address.provinceName }}</td>
							<td class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.tel_1 }}</td>
							<td class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.tel_2 }}</td>
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis"
							:class="{ 'text-[#00992B]': item.active, 'text-red-600': !item.active }">
							{{ item.active ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ' }}
						</td>
						<!-- <td class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{{ item.active ? 'true' : 'false' }}</td> -->
						<td class=" p-2 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">							
							<router-link :to="{ name: 'miller-detail', params: { id: item.id } }">
								<button
									class=" px-4 py-2 bg-blue-50 text-center text-[#00992B]  rounded-md">លម្អិត</button>
							</router-link>
							<button @click="confirmDelete(item.userId)"
								class=" px-4 py-2 ml-2 bg-red-50 text-center text-red-600 rounded-md">លុប</button>
						</td>
					</tr>
				</tbody>
			</table>
			<!-- Pagination controls -->
			<nav aria-label="Page navigation    example" class="flex justify-end  py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1"
							class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">ក្រោយ</button>
					</li>
					<li>
						<a href="#"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
							{{ currentPage }} នៃ {{ totalPages }}</a>
					</li>
					<li>
						<button @click="nextPage" :disabled="currentPage === totalPages"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">បន្ទាប់</button>
					</li>
				</ul>
			</nav>

		</div>


		<!-- Add User Modal -->
		<div v-if="showCreateModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div class="bg-white p-5 rounded-lg  w-1/3" >
				<h2 class="text-xl mb-5 text-[#00992B] text-center underline">បន្ថែមថ្មី</h2>
				<form @submit.prevent="createItem">
					<div class="mb-4 flex">
						<label class="block pt-3 w-[150px] text-gray-700">ឈ្មោះ</label>
						<input v-model="newItem.name" type="text"
						class="w-full border px-3 py-2 rounded-lg">
					</div>
					<div class="mb-4 flex">
						<label class="block pt-3 w-[150px] text-gray-700">មុខតំណែង</label>
						<input v-model="newItem.position" type="text"
						class="w-full border px-3 py-2 rounded-lg">
					</div>
					<div class="mb-4 flex">
						<label class="block pt-3 w-[150px] text-gray-700">សាខា</label>
						<input v-model="newItem.branch" type="text"
						class="w-full border px-3 py-2 rounded-lg">
					</div>
					<div class="mb-4 flex">
						<label class="block pt-3 w-[150px] text-gray-700">ភូមិ</label>
						<input v-model="newItem.village" type="text"
						class="w-full border px-3 py-2 rounded-lg">
					</div>
					<div class="mb-4 flex">
						<label class="block pt-3 w-[150px] text-gray-700">ខេត្ត</label>
						<input v-model="newItem.village" type="text"
						class="w-full border px-3 py-2 rounded-lg">
					</div>
					<div class="mb-4 flex">
						<label class="block pt-3 w-[150px] text-gray-700">ចំនួនអង្ករ</label>
						<input v-model="newItem.village" type="text"
						class="w-full border px-3 py-2 rounded-lg">
					</div>
					<div class="mb-4 flex">
						<label class="block pt-3 w-[150px] text-gray-700">ស្ថានភាព</label>
						<input v-model="newItem.status" type="text"
						class="w-full border px-3 py-2 rounded-lg">
					</div>
					<div class="flex mt-6 justify-end">
						<button @click="showCreateModal = false"
						class="px-4 py-2 bg-gray-500 text-white rounded mr-2">បោះបង់</button>
						<button type="submit" class="px-4 py-2 bg-[#00992B] text-white rounded">បន្ថែម</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Edit User Modal -->
		<div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg w-1/3">
				<h2 class="text-xl mb-4">Edit User</h2>
				<form @submit.prevent="handleEditSubmit">
					<div class="mb-4">
						<label class="block text-gray-700">Username</label>
						<input v-model="selectedUser.userName" type="text" class="w-full border px-3 py-2 rounded-lg"
							required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Email</label>
						<input v-model="selectedUser.email" type="email" class="w-full border px-3 py-2 rounded-lg"
							required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Branch</label>
						<input v-model="selectedUser.branchName" type="text" class="w-full border px-3 py-2 rounded-lg"
							required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Role</label>
						<select v-model="selectedUser.role"
							class="block w-full py-2 px-3 border border-gray-300 rounded-lg" required>
							<option value="" disabled>Select Role</option>
							<option value="admin">Admin</option>
							<option value="user">User</option>
							<option value="hr">HR</option>
						</select>
					</div>
					<div class="flex justify-end">
						<button type="button" @click="closeEditModal"
							class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
						<button type="submit" class="px-4 py-2 bg-[#e01a2e] text-white rounded">Update</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const items = ref([]);
const showPassword = ref(false);
const millers = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const getToken = () => {
	return localStorage.getItem('authToken');
};
axios.interceptors.request.use(
	(config) => {
		const authToken = getToken();
		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
const miller = ref({
	id: null,
	name: '',
	description: '',
	tel_1: '',
	tel_2: '',
	tel_3: '',
	villageCode: '',
	active: true,
	created_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	created_At: new Date().toISOString(), // Automatically set to current date-time
	updated_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	updated_At: new Date().toISOString() // Automatically set to current date-time
});
const selectedMiller = ref({
	id: null,
	name: '',
	description: '',
	tel_1: '',
	tel_2: '',
	tel_3: '',
	villageCode: '',
	active: true,
	created_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	created_At: new Date().toISOString(), // Automatically set to current date-time
	updated_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	updated_At: new Date().toISOString() // Automatically set to current date-time
});
const fetchMillers = async () => {
	try {
		const response = await axios.get(`${baseUrl}/miller`);
		millers.value = response.data.data;
		console.log('success fetching', millers.value);

	} catch (error) {
		console.error('Error fetching millers:', error);
	}
};
fetchMillers();

const handleAddSubmit = async () => {
	try {
		await axios.post(`${baseUrl}/miller`, miller.value);
		Swal.fire({
			icon: 'success',
			title: 'Added!',
			text: 'Miller has been added.',
		});
		fetchMillers();
		closeAddModal();
	} catch (error) {
		console.error('Error adding miller:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		});
	}
};
const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return items.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(items.value.length / itemsPerPage);
});

const previousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

const openAddModal = () => {
	newUser.value = {
		id: null,
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		branchId: 1,
		roleName: '',
		allowResetPassword: true,
		active: true,
		created_At: new Date().toISOString(), // Set the current date-time
		created_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6' // Replace with the appropriate value
	};
	isAddModalOpen.value = true;
};

const closeAddModal = () => {
	isAddModalOpen.value = false;
};

const closeEditModal = () => {
	isEditModalOpen.value = false;
};

const toggleShowPassword = () => {
	showPassword.value = !showPassword.value;
};



const openEditModal = (selectedUserItem) => {
	selectedUser.value = {
		userId: selectedUserItem.userId,
		userName: selectedUserItem.userName,
		email: selectedUserItem.email,
		branchId: selectedUserItem.branchId,
		branchName: selectedUserItem.branchName,
		role: selectedUserItem.role,
		allowReset: selectedUserItem.allowReset,
		active: selectedUserItem.active,
		created_At: selectedUserItem.created_At,
		created_by: selectedUserItem.created_by
	};
	isEditModalOpen.value = true;
};

const handleEditSubmit = async () => {
	try {
		await axios.put(`${baseUrl}/miller/${selectedMiller.value.id}`, selectedMiller.value);
		Swal.fire({
			icon: 'success',
			title: 'Updated!',
			text: 'Miller has been updated.',
		});
		fetchMillers();
		closeEditModal();
	} catch (error) {
		if (error.response && error.response.status === 400 && error.response.data.errors) {
			const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
			Swal.fire({
				icon: 'error',
				title: 'Validation Error',
				text: `Failed to update miller: ${errorMessages}`,
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Something went wrong!',
			});
		}
		console.error('Error updating miller:', error);
	}
};

const confirmDelete = (userId) => {
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			deleteUser(userId);
		}
	});
};

const deleteUser = async (userId) => {
	try {
		await axios.delete(`${baseUrl}/user/${userId}`);
		Swal.fire({
			icon: 'success',
			title: 'Deleted!',
			text: 'User has been deleted.',
		});
		fetchData();
	} catch (error) {
		console.error('Error deleting user:', error);
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
		});
	}
};
</script>

<style scoped>
.bg-black {
	background-color: rgba(0, 0, 0, 0.5);
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
