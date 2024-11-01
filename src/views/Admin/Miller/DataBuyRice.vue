<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">ទិន្ន័យទិញអង្ករ</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<div class="order-last">
				<button @click="openModal"
					class="siemreap-regular px-4 py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">
					ទិញបន្ថែម
				</button>
			</div>
		</div>

		<div class="overflow-x-auto px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th class="px-6 py-3 text-nowrap border text-[14px] moul-regular">ល.រ</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">រោងម៉ាស៊ីន</th>
						<th class="px-6 py-3 text-nowrap border w-[100px] moul-regular">ចំនួន</th>
						<th class="px-6 py-3 text-nowrap border w-[120px] moul-regular">ទម្ងន់សរុប</th>
						<th class="px-6 py-3 text-nowrap border w-[150px] moul-regular">តម្លៃក្នុង/១Kg</th>
						<th class="px-6 py-3 text-nowrap border w-[130px] moul-regular">តម្លៃសរុប</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">ម៉ោង</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">កាលបរិច្ឆេទ</th>
						<!-- <th class="px-6 py-3 text-nowrap border moul-regular">ចំនួនលើកទិញ</th> -->
						<!-- <th class="px-6 py-3 text-nowrap border moul-regular">ទូទាត់</th> -->
						<th class="px-6 py-3 text-nowrap border w-[140px] text-center moul-regular">ទិញចូលដោយ</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in paginatedItems" :key="item.id"
						class="siemreap-regular bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td
							class="w-[30px] text-nowrap border px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ item.miller.name }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ item.quantity }}<span
								class="px-2 text-red-600">បេ</span></td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ item.totalQuantity }}<span
								class="px-2 text-red-600">Kg</span></td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ formatCurrency(item.cost) }}<span
								class="px-2 text-red-600">រៀល</span></td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ formatCurrency(item.totalCost)
							}}<span class="px-2 text-red-600">រៀល</span></td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ formatTime(item.purchaseDate) }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ formatOnlyDate(item.purchaseDate) }}</td>

						<!-- <td class="px-6 border text-center text-nowrap border-gray-200 py-3">{{ item.section }}</td> -->
						<!-- <td class="px-6 border text-nowrap border-gray-200 py-3"
							:class="{ 'text-green-500': item.paymentStatus === 'Paid', 'text-red-500': item.paymentStatus !== 'Paid' }">
							{{ item.paymentStatus === 'Paid' ? 'បានទូទាត់' : 'មិនទាន់' }}
						</td> -->
						<td class="px-6 text-center border text-nowrap border-gray-200 py-3">{{ item.created_By.username
							}}</td>
					</tr>
				</tbody>
			</table>

			<!-- Pagination -->
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

		<!-- Modal for creating new record -->
		<div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
			<div class="bg-white p-6 rounded-lg w-[500px]">
				<h2 class="text-lg font-semibold text-gray-700 mb-4">បញ្ចូលទិន្នន័យថ្មី</h2>
				<form @submit.prevent="createRecord">
					<div class="mb-4">
						<label class="block text-gray-700 mb-2" for="Miller">រោងម៉ាស៊ីន</label>
						<!-- Bind to newRecord.miller_id to use ID instead of full miller object -->
						<select v-model="newRecord.miller_id" id="Miller" required
							class="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
							<option value="" disabled>ជ្រើសរើសរោងម៉ាស៊ីន</option>
							<option v-for="miller in millers" :key="miller.id" :value="miller.id">{{ miller.name }}
							</option>
						</select>

					</div>
					<div class="mb-4">
						<label class="block text-gray-700 mb-2" for="Total">ចំនួន</label>
						<input type="number" v-model="newRecord.quantity" @input="calculateQuantity" id="Total" required
							class="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 mb-2" for="Quantity">ទម្ងន់សរុប</label>
						<input type="number" v-model="newRecord.totalQuantity" id="Quantity" disabled
							class="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 mb-2" for="Price">តម្លៃក្នុង១Kg</label>
						<input type="number" v-model="newRecord.cost" @input="calculatePrice" id="Price" required
							class="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 mb-2" for="TotalPrice">តម្លៃសរុប</label>
						<input type="number" v-model="newRecord.totalCost" id="TotalPrice" disabled
							class="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
					</div>
					<!-- <div class="mb-4">
						<label class="block text-gray-700 mb-2" for="section">ទិញជាលើកទី</label>
						<input type="text" v-model="newRecord.section" id="section"
							class="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
					</div> -->
					<div class="flex justify-end">
						<button type="button" @click="closeModal"
							class="px-4 py-2 mr-3 bg-gray-300 rounded">បិទ</button>
						<button type="submit" class="px-4 py-2 bg-[#00992B] text-white rounded">បញ្ចូល</button>
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
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!storedUser) {
	alert('User not logged in');
	throw new Error('User not logged in');
}
const formatCurrency = (value) => {
	return parseFloat(value).toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
};
const isModalOpen = ref(false);
const millers = ref([]);
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const localOrders = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const newRecord = ref({
	miller_id: '',
	quantity: '',
	totalQuantity: '',
	totalCost: '',
	cost: '',
	paymentStatus: 'Paid',
	section: '',
	status: 'Purchase',
	purchaseDate: new Date().toISOString(),
	ProcessBy: storedUser.username,
	CreateDateTime: new Date().toISOString(),
	CreatedBy: storedUser.username,
	updated_By: storedUser.id
});

const fetchOrders = async () => {
	try {
		const response = await axios.get(`${baseUrl}/purchase-by-rice-from-miller`);

		// Include both 'Puchase' and 'Purchase' in the filter to capture all relevant records
		localOrders.value = response.data
			.filter(order => order.status.toLowerCase() === 'puchase' || order.status.toLowerCase() === 'purchase')
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

		// Log to confirm sorting and filtering results
		console.log("Filtered and sorted orders:", localOrders.value.map(order => order.status));
	} catch (error) {
		console.error("Error fetching orders:", error);
		Swal.fire('Error!', 'Failed to fetch orders. Please try again later.', 'error');
	}
};

const fetchMillers = async () => {
	try {
		const response = await axios.get(`${baseUrl}/miller`);
		millers.value = response.data.filter(miller => miller.status);
		console.log("Millers data:", millers.value);  // Log to confirm data
	} catch (error) {
		console.error("Error fetching millers:", error);
		Swal.fire('Error!', 'Failed to fetch millers. Please try again later.', 'error');
	}
};


const formatTime = (dateStr) => {
	const date = new Date(dateStr);
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const period = hours < 12 ? 'ព្រឹក' : 'រសៀល';
	const displayHours = hours % 12 || 12; // Convert to 12-hour format

	return `${displayHours}:${minutes} ${period}`;
};

const khmerMonths = [
	"មករា", "កម្ភៃ", "មិនា", "មេសា", "ឧសភា", "មិថុនា",
	"កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិការ", "ធ្នូ"
];

const formatNumberToKhmer = (num) => {
	return num.toString().split('').map(digit => '០១២៣៤៥៦៧៨៩'[digit]).join('');
};

const formatOnlyDate = (dateStr) => {
	const date = new Date(dateStr);
	const day = formatNumberToKhmer(date.getDate().toString().padStart(2, '0')); // Format day with leading zero
	const month = khmerMonths[date.getMonth()]; // Get Khmer month name
	const year = formatNumberToKhmer(date.getFullYear()); // Convert year to Khmer digits

	return `${day}, ${month}, ${year}`;
};

const calculateQuantity = () => {
	newRecord.value.totalQuantity = newRecord.value.quantity * 50;
	newRecord.value.cost = '';
	newRecord.value.totalCost = '';
};

const calculatePrice = () => {
	newRecord.value.totalCost = newRecord.value.cost * newRecord.value.totalQuantity;
};

const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return localOrders.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(localOrders.value.length / itemsPerPage);
});

const previousPage = () => {
	if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) currentPage.value++;
};

const openModal = () => {
	isModalOpen.value = true;
};

const closeModal = () => {
	isModalOpen.value = false;
};

const createRecord = async () => {
	try {
		console.log("Selected Miller ID:", newRecord.value.miller_id);
		const payload = {
			miller_id: newRecord.value.miller_id,
			quantity: newRecord.value.quantity,
			totalQuantity: newRecord.value.totalQuantity,
			cost: newRecord.value.cost,
			totalCost: newRecord.value.totalCost,
			paymentStatus: 'Paid',
			section: newRecord.value.section,
			status: 'Purchase',
			purchaseDate: new Date().toISOString(),
			created_By: storedUser.id,
			updated_By: storedUser.id,
		};

		const response = await axios.post(`${baseUrl}/purchase-by-rice-from-miller`, payload);
		closeModal();
		Swal.fire('Success!', 'New record added successfully!', 'success');
		fetchOrders();
	} catch (error) {
		console.error("Error adding new record:", error);
		Swal.fire('Error!', 'Failed to add record. Please try again later.', 'error');
	}
};



onMounted(() => {
	fetchMillers();
	fetchOrders();
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
