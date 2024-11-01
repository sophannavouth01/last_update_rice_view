<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">រោងម៉ាស៊ីន</p>
		<div class="flex justify-between px-5 py-3">
			<div></div>
			<div class="order-last">
				<router-link to="/add-miller">
					<button class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">
						បង្កើតបញ្ជីឈ្មោះ
					</button>
				</router-link>
			</div>
		</div>

		<div class="overflow-x-auto sm:rounded-lg px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr>
						<th class="px-6 py-3 w-5 border text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ល.រ
						</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ឈ្មោះ
						</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ភូមិ
						</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ឃុំ
						</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ស្រុក
						</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ខេត្ត
						</th>
						<th class="px-6 py-3 w-[150px] border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							លេខទូរស័ព្ទ 1
						</th>
						<th class="px-6 py-3 w-[150px] border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							លេខទូរស័ព្ទ 2
						</th>
						<th class="px-6 py-3 border w-[100px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ស្ថានភាព
						</th>
						<th class="px-4 py-3 border text-center w-[100px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							សកម្មភាព
						</th>
					</tr>
				</thead>
				<tbody style="border-radius: 10px;">
					<tr v-for="(item, index) in paginatedMillers" :key="item.id"
						class="siemreap-regular bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td class="w-[30px] px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 + (currentPage - 1) * itemsPerPage }}
						</td>
						<td class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.name }}
						</td>
						<td class="w-28 px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.villageName }}
						</td>
						<td class="w-28 px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.communeName }}
						</td>
						<td class="w-28 px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.districtName }}
						</td>
						<td class="w-28 px-6 py-4 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.provinceName }}
						</td>
						<td class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.phone1 }}
						</td>
						<td class="px-6 py-3 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.phone2 }}
						</td>
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis"
							:class="{  'text-red-600': !item.status }">
							{{ item.status ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ' }}
						</td>
						<td class="p-2 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
							<router-link :to="{ name: 'miller-detail', params: { id: item.id } }">
								<button class="px-4 py-2 bg-blue-50 text-center text-[#00992B] rounded-md">លម្អិត</button>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
			<!-- Pagination controls -->
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1"
							class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
							ក្រោយ
						</button>
					</li>
					<li>
						<a href="#"
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
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

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const millers = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;

const fetchMillers = async () => {
	try {
		const response = await axios.get(`${baseUrl}/miller`);
		millers.value = response.data.sort((a, b) => new Date(b.created_At) - new Date(a.created_At));
	} catch (error) {
		console.error('Error fetching millers:', error);
	}
};


const paginatedMillers = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return millers.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(millers.value.length / itemsPerPage);
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

// Fetch millers data when the component is mounted
onMounted(() => {
	fetchMillers();
});
</script>

<style scoped>
.moul-regular {
	font-family: 'Moul', serif;
	font-weight: 400;
	font-style: normal;
}

.siemreap-regular {
	font-family: 'Siemreap', sans-serif;
}
</style>
