<template>
	<div class="bg-white shadow-md rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">
			មុខតំណែង
		</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<div class="order-last">
				<button @click="openAddModal" class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">
					បង្កើតមុខតំណែង
				</button>
			</div>
		</div>

		<div class="overflow-x-auto rounded-lg px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500" style="border-radius: 10px; overflow: hidden;">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th class="border px-6 py-3 text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ល.រ
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ឈ្មោះ
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ការពិពណ៌នា
						</th>
						<th class="border w-[150px] text-center px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ស្ថានភាព
						</th>
						<th class="border px-6 moul-regular w-[150px] py-3 whitespace-nowrap overflow-hidden text-ellipsis text-center">
							សកម្មភាព
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in paginatedItems" :key="item.id" class="siemreap-regular bg-white border hover:bg-[#00992B] hover:text-white text-gray-700">
						<td class="w-[30px] border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 + (currentPage - 1) * itemsPerPage }}
						</td>
						<td class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.name }}
						</td>
						<td class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.description || "No description" }}
						</td>
						<td class="px-6 text-center siemreap-regular py-3 border whitespace-nowrap overflow-hidden text-ellipsis"
							:class="{ 'text-[#00992B]': item.status, 'text-red-600': !item.status }">
							{{ item.status ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ' }}
						</td>
						<td class="border flex justify-center py-2 text-center">
							<button @click="openEditModal(item)" class="px-4 py-2 bg-blue-50 text-center text-[#00992B] rounded-md">
								លម្អិត
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
							ក្រោយ
						</button>
					</li>
					<li>
						<a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
							{{ currentPage }} នៃ {{ totalPages }}
						</a>
					</li>
					<li>
						<button @click="nextPage" :disabled="currentPage === totalPages" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
							បន្ទាប់
						</button>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Add Role Modal -->
		<div v-if="isAddModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg w-1/3">
				<h2 class="text-xl mb-5 text-[#00992B] text-center underline">បង្កើតមុខតំណែង</h2>
				<form @submit.prevent="handleAddSubmit">
					<div class="mb-4 flex">
						<label class="w-[150px] block pt-3 text-gray-700">ឈ្មោះ</label>
						<input v-model="role.name" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4 flex">
						<label class="w-[150px] block pt-3 text-gray-700">ការពិពណ៌នា</label>
						<input v-model="role.description" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="w-full lg:w-6/12 pr-2">
						<div class="relative w-full flex mb-3">
							<label class="block w-[120px] text-blueGray-600 text-md mb-2">ស្ថានភាព</label>
							<input type="checkbox" v-model="role.status" class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
						</div>
					</div>

					<div class="flex justify-end">
						<button type="button" @click="closeAddModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">បោះបង់</button>
						<button type="submit" class="px-4 py-2 bg-[#00992B] text-white rounded">បង្កើត</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Edit Role Modal -->
		<div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white px-6 py-5 rounded-lg w-1/3">
				<h2 class="text-xl mb-5 text-[#00992B] text-center underline">កែប្រែមុខតំណែង</h2>
				<form @submit.prevent="handleEditSubmit">
					<div class="mb-4 flex">
						<label class="block text-gray-700 w-[130px] pt-2">ឈ្មោះសិទ្ធ:</label>
						<input v-model="selectedRole.name" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4 flex">
						<label class="block text-gray-700 w-[130px] pt-2">ការពិពណ៌នា:</label>
						<input v-model="selectedRole.description" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="w-full lg:w-6/12 pr-2">
						<div class="relative w-full flex mb-3">
							<label class="block w-[120px] text-blueGray-600 text-md mb-2">ស្ថានភាព</label>
							<input type="checkbox" v-model="selectedRole.status" class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
						</div>
					</div>
					<div class="flex justify-end">
						<button type="button" @click="closeEditModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">បោះបង់</button>
							<button type="submit" class="px-4 py-2 bg-[#00992B] text-white rounded">ផ្លាស់ប្ដូរ</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useStore } from 'vuex';

const store = useStore();

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const roles = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const role = ref({
	id: null,
	name: "",
	description: "",
	status: false,
});

const selectedRole = ref({
	id: null,
	name: "",
	description: "",
	status: false,
});

const getToken = () => localStorage.getItem("authToken");

store.dispatch('loadUserFromStorage');

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

const fetchRoles = async () => {
    try {
        const response = await axios.get(`${baseUrl}/positions`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        console.log("Data fetched:", response.data); // Check this log output
        roles.value = response.data.data || response.data || []; // Adapt based on API response structure
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
};

onMounted(fetchRoles);

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return roles.value ? roles.value.slice(start, start + itemsPerPage) : []; // Always return an array
});


const totalPages = computed(() => {
	return roles.value ? Math.ceil(roles.value.length / itemsPerPage) : 1;
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
	role.value = { id: null, name: "", description: "", status: false };
	isAddModalOpen.value = true;
};

const closeAddModal = () => {
	isAddModalOpen.value = false;
};

const handleAddSubmit = async () => {
	try {
		const createdBy = store.getters.getUserId;
		const payload = {
			name: role.value.name,
			description: role.value.description || "No description",
			status: role.value.status,
			created_By: createdBy,
		};

		const response = await axios.post(`${baseUrl}/positions`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});

		roles.value.unshift(response.data.data);
		Swal.fire("Success!", "Position added successfully!", "success");
		closeAddModal();
		fetchRoles();
	} catch (error) {
		console.error("Error adding positions:", error);
		Swal.fire("Error!", "Failed to add position.", "error");
	}
};

const openEditModal = (item) => {
	selectedRole.value = { ...item, status: item.status || false };
	isEditModalOpen.value = true;
};

const closeEditModal = () => {
	isEditModalOpen.value = false;
};

const handleEditSubmit = async () => {
	try {
		await axios.put(`${baseUrl}/positions/${selectedRole.value.id}`, selectedRole.value, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		Swal.fire("Success!", "Position updated successfully!", "success");
		closeEditModal();
		fetchRoles();
	} catch (error) {
		console.error("Error updating role:", error);
		Swal.fire("Error!", "Failed to update postions.", "error");
	}
};
</script>

<style scoped>
.bg-black {
	background-color: rgba(0, 0, 0, 0.5);
}

.moul-regular {
	font-family: "Moul", serif;
	font-weight: 400;
	font-style: normal;
}

.siemreap-regular {
	font-family: "Siemreap";
	font-weight: 200;
}
</style>
