<template>
	<div class="bg-white shadow-md rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">សាខា</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<div class="order-last">
				<router-link to="/add-branch">
					<button
						class="px-4 siemreap-regular  py-2 ml-3 bg-[#00992B] text-[15px]  text-white rounded">បង្កើតសាខា</button>
				</router-link>
			</div>
		</div>

		<div class="overflow-x-auto px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500"
				style="border-radius: 10px; overflow: hidden;">
				<thead class="text-xs text-gray-700 bg-gray-100 border">
					<tr class="text-[14px]">
						<th
							class="border px-6 py-3 text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ល.រ</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ឈ្មោះ
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ភូមិ
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ឃុំ
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ស្រុក
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ខេត្ត
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							នាយកសាខា</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ស្ថានភាព</th>
						<th
							class="border px-6 py-3 text-center w-[150px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							សកម្មភាព</th>
					</tr>
				</thead>

				<tbody style="border-radius: 10px;">
					<tr v-for="(item, index) in paginatedItems" :key="item.id"
						class="siemreap-regular bg-white border hover:bg-[#00992B] hover:text-white text-gray-700">
						<td class="w-[30px] border px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 + (currentPage - 1) * itemsPerPage }}
						</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.name }}
						</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.villageName }}
						</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.communeName }}
						</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.districtName }}
						</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.provinceName }}
						</td>
						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.branchManager?.firstName || 'N/A' }} {{ item.branchManager?.lastName || '' }}
						</td>

						<td class="px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis"
							:class="{ 'text-[#00992B]': item.status, 'text-red-600': !item.status }">
							{{ item.status ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ' }}
						</td>
						<td class="border flex justify-center px-6 py-2 text-center w-[150px]">
							<router-link :to="{ name: 'edit-branch', params: { id: item.id } }">
								<button
									class="px-4 py-2 bg-blue-50 text-center text-[#00992B] rounded-md">លម្អិត</button>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1"
							class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">ក្រោយ</button>
					</li>
					<li>
						<a href="#"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
							{{ currentPage }} នៃ {{ totalPages }}
						</a>
					</li>
					<li>
						<button @click="nextPage" :disabled="currentPage === totalPages"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">បន្ទាប់</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const branches = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

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

const fetchBranches = async () => {
	try {
		const response = await axios.get(`${baseUrl}/branch`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		branches.value = response.data;
	} catch (error) {
		console.error('Error fetching branches:', error);
	}
};

onMounted(fetchBranches);

const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	return (branches.value || []).slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
	return Math.ceil((branches.value || []).length / itemsPerPage);
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
</script>

<style scoped>
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
