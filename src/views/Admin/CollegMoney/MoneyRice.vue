<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">បញ្ជីអតិថិជនបានប្រមូលថ្លៃអង្ករ</p>

		<div class="overflow-x-auto px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th class="px-6 py-3 text-nowrap border text-[14px] moul-regular">ល.រ</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">អតិថិជន</th>
						<th class="px-6 py-3 text-nowrap border w-[100px] moul-regular">ចំនួន</th>
						<th class="px-6 py-3 text-nowrap border w-[120px] moul-regular">ទម្ងន់សរុប</th>
						<th class="px-6 py-3 text-nowrap border w-[120px] moul-regular">តម្លៃសរុប</th>
						<th class="px-6 py-3 text-nowrap border w-[120px] moul-regular">ភ្នាក់ងារ</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">ម៉ោង</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">កាលបរិច្ឆេទទិញ</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">ទូទាត់</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">បង់ដោយ</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">ម៉ោងទទួលប្រាក់</th>
						<th class="px-6 py-3 text-nowrap border moul-regular">ថ្ងៃទទួលប្រាក់</th>
						
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in paginatedItems" :key="item.id"
						class="siemreap-regular bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td
							class="w-[30px] text-nowrap border px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ item.customer.firstName }} {{
							item.customer.lastName }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ item.quantity }}<span
								class="px-2 text-red-600">បេ</span></td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ item.totalQuantity }}<span
								class="px-2 text-red-600">Kg</span></td>
						<td class="px-6 text-nowrap border font-bold">{{ formatCurrency(item.totalCost) }} <span class="px-2 text-red-600">រៀល</span></td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ item.agent.firstName }} {{ item.agent.lastName }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ formatTime(item.purchaseDate) }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3">{{ formatOnlyDate(item.purchaseDate) }}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3 text-center" :class="{
							'text-red-500': item.paymentStatus === 'Not yet',
							'text-green-500': item.paymentStatus === 'Paid'
						}">
							{{ item.paymentStatus === 'Not yet' ? 'ជំពាក់់' : item.paymentStatus === 'Paid' ? 'បានទូទាត់' : item.paymentStatus }}
						</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3 text-center">{{ item.updated_By.username}}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3 text-center">{{ formatTime(item.updatedAt)}}</td>
						<td class="px-6 border text-nowrap border-gray-200 py-3 text-center">{{ formatOnlyDate(item.updatedAt)}}</td>

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const localOrders = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

const fetchOrders = async () => {
	try {
		const response = await axios.get(`${baseUrl}/purchase-by-rice-from-miller`);
		localOrders.value = response.data
			.filter(order => order.status.toLowerCase() === 'transfertocustomer' && order.customer && order.paymentStatus === 'Paid')
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		console.log("Filtered orders with 'TransferToCustomer' status, non-null customer, and 'Paid' payment status:", localOrders.value);
	} catch (error) {
		console.error("Error fetching orders:", error);
		Swal.fire('Error!', 'Failed to fetch orders. Please try again later.', 'error');
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

onMounted(() => {
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
