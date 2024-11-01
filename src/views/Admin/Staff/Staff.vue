<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">បុគ្គលិក</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<div class="order-last">
				<router-link to="/add-staff">
					<button class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">
						បង្កើតបុគ្គលិក
					</button>
				</router-link>
			</div>
		</div>

		<div class="overflow-x-auto px-5 pb-5">
			<table class="w-full text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th class="border text-nowrap px-6 py-3">ល.រ</th>
						<th class="border text-nowrap px-6 py-3">ឈ្មោះ</th>
						<th class="border text-nowrap px-6 py-3">ភេទ</th>
						<th class="border text-nowrap px-6 py-3">ថ្ងៃកំណើត</th>
						<th class="border text-nowrap px-6 py-3">មុខតំណែង</th>
						<th class="border text-nowrap px-6 py-3">សាខា</th>
						<!-- <th class="border text-nowrap px-6 py-3">ប្រាក់បៀវត្ស៍</th> -->
						<th class="border text-nowrap px-6 py-3 text-center">ស្ថានភាព</th>
						<th class="border text-nowrap px-6 py-3 text-center">សកម្មភាព</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(staff, index) in paginatedItems" :key="staff.id"
						class="siemreap-regular bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td class="w-[30px] border px-6 py-4">{{ index + 1 }}</td>
						<td class="px-6 text-nowrap border">{{ staff.firstName }} {{ staff.lastName }}</td>

						<td class="px-6 text-nowrap border">{{ staff.gender === 'Male' ? 'ប្រុស' : 'ស្រី' }}</td>
						<td class="px-6 text-nowrap border">{{ formatDate(staff.dateOfBirth) }}</td>
						<td class="px-6 text-nowrap border">{{ staff.position?.name || 'N/A' }}</td>
						<td class="px-6 text-nowrap border">{{ staff.branch?.name || 'N/A' }}</td>
						<!-- <td class="px-6 text-nowrap border font-bold">{{formatCurrency( staff.baseSalary) }} <span class="px-2 text-red-600">រៀល</span></td> -->
						<td class="px-6 text-nowrap border text-center">
							<span :class="{ 'text-blue-500': staff.status, 'text-red-500': !staff.status }">
								{{ staff.status ? 'បម្រើការ' : 'ឈប់' }}
							</span>
						</td>
						<td class="px-6 py-2 text-nowrap  text-center flex justify-center space-x-2">
							<router-link :to="{ name: 'edit-staff', params: { id: staff.id } }">
								<button class="px-4 py-2 bg-blue-50 text-center text-[#00992B] rounded-md">លម្អិត</button>
							</router-link>
							<!-- <router-link :to="{ name: 'edit-staff', params: { id: staff.id } }">
								<button class="bg-red-500 px-3 py-2 rounded-md text-white">ផ្លាស់ប្តូរ</button>
							</router-link> -->
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Pagination Navigation -->
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1"
							class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
							ក្រោយ
						</button>
					</li>
					<li>
						<a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
							{{ currentPage }} នៃ {{ totalPages }}
						</a>
					</li>
					<li>
						<button @click="nextPage" :disabled="currentPage === totalPages"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
							បន្ទាប់
						</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { format } from 'date-fns';

const getToken = () => localStorage.getItem('authToken');

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const localStaffs = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const formatDate = (dateStr) => {
	const date = new Date(dateStr);
	return format(date, "MM/dd/yyyy"); 
};
const fetchStaffs = async () => {
	try {
		const response = await axios.get(`${baseUrl}/employees`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		console.log('Fetched staff data:', response.data);
		localStaffs.value = response.data || [];
	} catch (error) {
		console.error('Error fetching staff:', error);
	}
};
onMounted(fetchStaffs);
const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	return localStaffs.value.slice(start, start + itemsPerPage);
});
const totalPages = computed(() => Math.ceil(localStaffs.value.length / itemsPerPage));

const previousPage = () => {
	if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) currentPage.value++;
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
