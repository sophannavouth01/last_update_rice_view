<template>
	<div class="bg-white shadow-md rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">បុគ្គលិក</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<div class="order-last">
				<router-link to="/add-staff">
					<button 
				class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">អត្ថប្រយោជន៍</button>
				<button 
				class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">តំឡើងប្រាក់ខែ</button>
					<button 
					class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">បង្កើតបុគ្គលិក</button>
				</router-link>
				
			</div>
			
		</div>

		<div class="overflow-hidden  rounded-lg px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500"
			style="border-radius: 10px; overflow: hidden; " >
				<thead class="text-xs  text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th class="border px-6 py-3 text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ល.រ</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ឈ្មោះ </th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">មុខតំណែង</th>

						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">សាខា</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">សកម្មភាព</th>
						<th
							class="border  moul-regular w-[150px] py-3 whitespace-nowrap overflow-hidden text-ellipsis text-center">
							ស្ថានភាព</th>

					</tr>
				</thead>
				<tbody >
					<tr v-for="(item, index) in paginatedItems" :key="item.id"
						class=" siemreap-regular bg-white border border-gray-200 hover:bg-[#00992B] hover:text-white text-gray-700 ">
						<td class="w-[30px] border px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 + (currentPage - 1) * itemsPerPage }}
						</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.staff.name
							}}</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.position.name }}</td>

						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.branch.name
							|| 'No Branch' }}</td>
						<!-- <td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.staff.active }}</td> -->
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis"
							:class="{ 'text-[#00992B]': item.staff.active, 'text-red-600': !item.staff.active }">
							{{ item.staff.active ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ' }}
						</td>

						<td class="border flex justify-center  py-2 text-center w-[150px]" style=" overflow: hidden;">

							<router-link to="/detail-staff">
								<button @click="openEditModal(item)"
								class=" px-4 py-2 bg-blue-50 text-center text-[#00992B]  rounded-md">លម្អិត</button>
							</router-link>
							<button @click="confirmDelete(item.id)"
								class=" px-4 py-2 ml-2 bg-red-50 text-center text-red-600 rounded-md">លុប</button>
						</td>
					</tr>
				</tbody>
			</table>
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1"
							class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">ក្រោយ</button>
					</li>
					<li>
						<a href="#"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
							{{ currentPage }} of {{ totalPages }}</a>
					</li>
					<li>
						<button @click="nextPage" :disabled="currentPage === totalPages"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">បន្ទាប់</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const staff = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;

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

const fetchstaff = async () => {
	try {
		const response = await axios.get(`${baseUrl}/staff`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		staff.value = Array.isArray(response.data.data) ? response.data.data : [];
		console.log(staff.value)
	} catch (error) {
		console.error('Error fetching staff:', error);
		Swal.fire('Error!', 'Failed to fetch staff.', 'error');
	}
};

onMounted(fetchstaff);

const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	return staff.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(staff.value.length / itemsPerPage));
const previousPage = () => {
	if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) currentPage.value++;
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