<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">បញ្ជីអតិថិជន</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<div class="order-last">
				<router-link to="/add-customer">
					<button class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">
						អតិថិជនថ្មី
					</button>
				</router-link>
			</div>
		</div>

		<div class="overflow-x-auto rounded-lg px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500" style="border-radius: 10px; overflow: hidden;">
				<thead class="text-xs text-gray-700 bg-gray-50">
					<tr class="text-[14px]">
						<th class="px-6 py-3 w-5 border text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ល.រ</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ឈ្មោះ</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">មុខរបប</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">សាខា</th>

						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ភូមិ</th>

						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ខេត្ត</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ភ្នាក់ងារ</th>
						<th class="px-6 py-3 border w-[130px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ស្ថានភាព</th>
						<th class="px-6 py-3 border w-[130px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">បង្កើតដោយ</th>
						<th class="px-6 border moul-regular py-3 whitespace-nowrap overflow-hidden text-ellipsis text-center">សម្មភាព</th>
					</tr>
				</thead>
				<tbody style="border-radius: 10px;">
					<tr v-for="(item, index) in paginatedItems" :key="item.id" class="bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td class="w-[30px] border font-bold px-6 siemreap-regular whitespace-nowrap overflow-hidden text-ellipsis">
							{{ convertToKhmerNumber(index + 1 + (currentPage - 1) * itemsPerPage) }}
						</td>
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.firstName }} {{ item.lastName }}
						</td>
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.position.name }} 
						</td>
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.branch.name }}
						</td>
					
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.villageName }}
						</td>
						
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.provinceName }}
						</td>
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.agent.firstName }} 	{{ item.agent.lastName }}
						</td>
						<td class="px-6 siemreap-regular border whitespace-nowrap overflow-hidden text-ellipsis"
							:class="{ 'text-[#00992B]': item.status, 'text-red-600': !item.status }">
							{{ item.status ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ' }}
						</td>
						<td class="px-6 siemreap-regular py-4 border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.created_By.username }}
						</td>
						<td class="flex siemreap-regular border justify-center px-2 py-2 text-center">
							<router-link :to="{ name: 'customer-detail', params: { id: item.id } }">
								<button class="px-4 py-2 bg-blue-50 text-center text-[#00992B] rounded-md">លម្អិត</button>
							</router-link>
							<router-link :to="{ name: 'customer-edit', params: { id: item.id } }">
								<button class="mx-4 px-2 py-2 bg-red-600 text-center text-white rounded-md">ផ្លាស់ប្ដូរ</button>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">ក្រោយ</button>
					</li>
					<li>
						<a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{{ currentPage }} នៃ {{ totalPages }}</a>
					</li>
					<li>
						<button @click="nextPage" :disabled="currentPage === totalPages" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">បន្ទាប់</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const customers = ref([]);
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

const convertToKhmerNumber = (number) => {
	const khmerNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
	return number.toString().split('').map(num => khmerNumbers[parseInt(num)]).join('');
};

const fetchCustomers = async () => {
	try {
		const response = await axios.get(`${baseUrl}/customer`);
		customers.value = response.data;
	} catch (error) {
		console.error('Error fetching customers:', error);
	}
};

fetchCustomers();

const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return customers.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(customers.value.length / itemsPerPage);
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
