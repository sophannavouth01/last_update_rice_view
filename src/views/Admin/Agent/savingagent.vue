<template>
	<div class="bg-white h-screen">
		<p class="p-5 text-lg font-semibold underline text-black">ទិន្នន័យភ្នាក់ងារ</p>
		<div class="flex justify-between px-5 py-3">
			<div></div>
			<div class="order-last">
				<button @click="openAddModal" class="px-4 py-2 ml-3 bg-[#e01a2e] text-white rounded">Add Agent</button>
			</div>
		</div>

		<div class="overflow-x-auto shadow-md sm:rounded-lg px-5 pb-5">
			<table class="w-full border-collapse border rounded-lg text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-50">
					<tr>
						<th class="px-6 py-3 border border-gray-200">No</th>
						<th class="px-6 py-3 border border-gray-200">Name</th>
						<th class="px-6 py-3 border border-gray-200">Position</th>
						<th class="px-6 py-3 border border-gray-200">Branch</th>
						<th class="px-6 py-3 border border-gray-200">Commission</th>
						<th class="px-6 py-3 border border-gray-200">Village Code</th>
						<th class="px-6 py-3 border border-gray-200">Active</th>
						<th class="px-6 w-32 py-3 border border-gray-200 text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in paginatedItems" :key="item.id" class="bg-white border border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 w-5 border border-gray-200">{{ index + 1}}</td>
						<td class="px-6 py-4 border border-gray-200">{{ item.name }}</td>
						<td class="px-6 py-4 border border-gray-200">{{ item.position.name }}</td>
						<td class="px-6 py-4 border border-gray-200">{{ item.branch.name}}</td>
						<td class="px-6 py-4 border border-gray-200">{{ item.commision }} ($)</td>
						<td class="px-6 py-4 border border-gray-200 text-blue-700">{{ item.address.villageName }}</td>
						<td class="px-6 py-4 border border-gray-200">{{ item.active ? 'Yes' : 'No' }}</td>
						<td class="flex justify-center px-6 py-4 text-center w-32 border-gray-200">
							<i class="fa-regular fa-pen-to-square text-blue-600 cursor-pointer" @click="openEditModal(item)"></i>
							<i class="fa-solid fa-trash-arrow-up px-5 text-red-600 cursor-pointer" @click="confirmDelete(item.id)"></i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Pagination controls -->
		<div class="flex justify-between px-5 py-3">
			<button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 text-gray-600 rounded">Previous</button>
			<span class="self-center">Page {{ currentPage }} of {{ totalPages }}</span>
			<button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-200 text-gray-600 rounded">Next</button>
		</div>

		<!-- Add Agent Modal -->
		<div v-if="isAddModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg w-1/3">
				<h2 class="text-xl mb-4">Add Agent</h2>
				<form @submit.prevent="handleAddSubmit">
					<div class="mb-4">
						<label class="block text-gray-700">Name</label>
						<input v-model="agent.name" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Gender</label>
						<select v-model="agent.gender" class="w-full border px-3 py-2 rounded-lg" required>
							<option value="M">Male</option>
							<option value="F">Female</option>
						</select>
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">DOB</label>
						<input v-model="agent.dob" type="date" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Tel 1</label>
						<input v-model="agent.tel_1" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Tel 2</label>
						<input v-model="agent.tel_2" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Tel 3</label>
						<input v-model="agent.tel_3" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Position ID</label>
						<input v-model="agent.positionId" type="number" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Commission</label>
						<input v-model="agent.commission" type="number" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Branch ID</label>
						<input v-model="agent.branchId" type="number" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Village Code</label>
						<input v-model="agent.villageCode" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Address</label>
						<input v-model="agent.address" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="flex items-center mb-4">
						<label class="block text-gray-700 mr-3">Active</label>
						<input v-model="agent.active" type="checkbox" />
					</div>
					<div class="flex justify-end">
						<button type="button" @click="closeAddModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
						<button type="submit" class="px-4 py-2 bg-[#e01a2e] text-white rounded">Add</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Edit Agent Modal -->
		<div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg w-1/3">
				<h2 class="text-xl mb-4">Edit Agent</h2>
				<form @submit.prevent="handleEditSubmit">
					<div class="mb-4">
						<label class="block text-gray-700">Name</label>
						<input v-model="selectedAgent.name" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Gender</label>
						<select v-model="selectedAgent.gender" class="w-full border px-3 py-2 rounded-lg" required>
							<option value="M">Male</option>
							<option value="F">Female</option>
						</select>
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">DOB</label>
						<input v-model="selectedAgent.dob" type="date" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Tel 1</label>
						<input v-model="selectedAgent.tel_1" type="text" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Tel 2</label>
						<input v-model="selectedAgent.tel_2" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Tel 3</label>
						<input v-model="selectedAgent.tel_3" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Position ID</label>
						<input v-model="selectedAgent.positionId" type="number" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Commission</label>
						<input v-model="selectedAgent.commission" type="number" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Branch ID</label>
						<input v-model="selectedAgent.branchId" type="number" class="w-full border px-3 py-2 rounded-lg" required />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Village Code</label>
						<input v-model="selectedAgent.villageCode" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700">Address</label>
						<input v-model="selectedAgent.address" type="text" class="w-full border px-3 py-2 rounded-lg" />
					</div>
					<div class="flex items-center mb-4">
						<label class="block text-gray-700 mr-3">Active</label>
						<input v-model="selectedAgent.active" type="checkbox" />
					</div>
					<div class="flex justify-end">
						<button type="button" @click="closeEditModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
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
const agents = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const agent = ref({
	id: null,
	name: '',
	gender: 'F',
	dob: '',
	tel_1: '',
	tel_2: '',
	tel_3: '',
	positionId: null,
	commission: null,
	branchId: null,
	villageCode: '',
	address: '',
	active: true,
	created_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	created_At: new Date().toISOString(), // Automatically set to current date-time
	updated_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	updated_At: new Date().toISOString() // Automatically set to current date-time
});

const selectedAgent = ref({
	id: null,
	name: '',
	gender: 'F',
	dob: '',
	tel_1: '',
	tel_2: '',
	tel_3: '',
	positionId: null,
	commission: null,
	branchId: null,
	villageCode: '',
	address: '',
	active: true,
	created_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	created_At: new Date().toISOString(), // Automatically set to current date-time
	updated_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	updated_At: new Date().toISOString() // Automatically set to current date-time
});

// Retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem('access_token');
};

// Adding Authorization header to all axios requests
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

const fetchAgents = async () => {
  try {
    const response = await axios.get(`${baseUrl}/agent`);
    agents.value = response.data.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
  }
};

fetchAgents();

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return agents.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(agents.value.length / itemsPerPage);
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
  agent.value = {
	id: null,
	name: '',
	gender: 'F',
	dob: '',
	tel_1: '',
	tel_2: '',
	tel_3: '',
	positionId: null,
	commission: null,
	branchId: null,
	villageCode: '',
	address: '',
	active: true,
	created_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	created_At: new Date().toISOString(), // Automatically set to current date-time
	updated_By: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
	updated_At: new Date().toISOString() // Automatically set to current date-time
  };
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const handleAddSubmit = async () => {
  try {
    await axios.post(`${baseUrl}/agent`, agent.value);
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: 'Agent has been added.',
    });
    fetchAgents();
    closeAddModal();
  } catch (error) {
    console.error('Error adding agent:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
};

const openEditModal = (selectedAgentItem) => {
  selectedAgent.value = { ...selectedAgentItem };
  isEditModalOpen.value = true;
};

const handleEditSubmit = async () => {
  try {
    await axios.put(`${baseUrl}/agent/${selectedAgent.value.id}`, selectedAgent.value);
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Agent has been updated.',
    });
    fetchAgents();
    closeEditModal();
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: `Failed to update agent: ${errorMessages}`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
    console.error('Error updating agent:', error);
  }
};

const confirmDelete = (agentId) => {
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
      deleteAgent(agentId);
    }
  });
};

const deleteAgent = async (agentId) => {
  try {
    await axios.delete(`${baseUrl}/agent/${agentId}`);
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Agent has been deleted.',
    });
    fetchAgents();
  } catch (error) {
    console.error('Error deleting agent:', error);
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
</style>
