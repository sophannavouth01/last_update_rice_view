<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">
			ស្តុកអង្ករនៅតាមភ្នាក់ងារ
		</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
		</div>

		<div class="overflow-x-auto px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th class="px-6 py-3 border text-[14px] moul-regular">ល.រ</th>
						<th class="px-6 py-3 border moul-regular">ភ្នាក់ងារ</th>
						<th class="px-6 py-3 border moul-regular">ភូមិ</th>
						<th class="px-6 py-3 border moul-regular">ឃុំ</th>
						<th class="px-6 py-3 border moul-regular">ស្រុក</th>
						<th class="px-6 py-3 border moul-regular">ខេត្ត</th>
					
						<th class="px-6 py-3 border w-[200px] moul-regular">ចំនួនបេសរុប</th>
						<th class="px-6 py-3 border w-[200px] moul-regular">ទម្ងន់សរុប</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in paginatedItems" :key="item.agent.id"
						class="siemreap-regular bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td class="w-[30px] border px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 }}
						</td>
						<td class="px-6 border border-gray-200 py-3">
							{{ item.agent.firstName }}{{ item.agent.lastName }}
						</td>
						<td class="px-6 border border-gray-200 py-3">
							{{ item.agent.villageName }}
						</td>
						<td class="px-6 border border-gray-200 py-3">
							{{ item.agent.communeName }}
						</td>
						<td class="px-6 border border-gray-200 py-3">
							{{ item.agent.districtName }}
						</td>
						<td class="px-6 border border-gray-200 py-3">
							{{ item.agent.provinceName }}
						</td>
						
						<td class="px-6 border border-gray-200 py-3">
							<span v-if="item.quantity === 0" class="text-red-600">Out of stock</span>
							<span v-else>{{ item.quantity }}<span class="px-2 text-red-600">បេ</span></span>
						</td>
						<td class="px-6 border border-gray-200 py-3">
							<span v-if="item.totalQuantity === 0" class="text-red-600">Out of stock</span>
							<span v-else>{{ item.totalQuantity }}<span class="px-2 text-red-600">Kg</span></span>
						</td>
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const localOrders = ref([]); // Stores fetched data
const currentPage = ref(1);
const itemsPerPage = 6;

const fetchOrders = async () => {
	try {
		const response = await axios.get(`${baseUrl}/purchase-by-rice-from-miller`);
		// Filter orders to include only 'TransferToAgent' and 'TransferToCustomer' statuses
		localOrders.value = response.data.filter(
			(order) => order.status === 'TransferToAgent' || order.status === 'transfertocustomer'
		);
		console.log("Fetched and filtered orders for agents:", localOrders.value); // Log filtered data

		// Process grouped data for display
		paginatedItems.value = groupByAgent(localOrders.value);
	} catch (error) {
		console.error("Error fetching orders:", error);
		Swal.fire("Error!", "Failed to fetch orders. Please try again later.", "error");
	}
};

const groupByAgent = (orders) => {
	const grouped = {};

	orders.forEach((order) => {
		const agentId = order.agent ? order.agent.id : null;

		// Initialize structure for each agent if agent data is present
		if (agentId && order.agent) {
			if (!grouped[agentId]) {
				grouped[agentId] = {
					agent: order.agent,
					totalQuantityAgent: 0, // Sum of totalQuantity for TransferToAgent
					totalQuantityCustomer: 0, // Sum of totalQuantity for TransferToCustomer
					quantityAgent: 0, // Sum of quantity for TransferToAgent
					quantityCustomer: 0, // Sum of quantity for TransferToCustomer
				};
			}

			// Aggregate based on status
			if (order.status === 'TransferToAgent') {
				grouped[agentId].totalQuantityAgent += order.totalQuantity;
				grouped[agentId].quantityAgent += order.quantity;
			} else if (order.status === 'transfertocustomer') {
				grouped[agentId].totalQuantityCustomer += order.totalQuantity;
				grouped[agentId].quantityCustomer += order.quantity;
			}
		}
	});

	// Format the grouped data for each agent
	return Object.values(grouped).map((group) => ({
		agent: group.agent,
		totalQuantity: group.totalQuantityAgent - group.totalQuantityCustomer, // Difference in totalQuantity
		quantity: group.quantityAgent - group.quantityCustomer, // Difference in quantity
	}));
};

// Computed property for pagination
const paginatedItems = computed(() => {
	const groupedOrders = groupByAgent(localOrders.value); // Calculate grouped orders
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return groupedOrders.slice(start, end);
});

const totalPages = computed(() => Math.ceil(groupByAgent(localOrders.value).length / itemsPerPage));

const previousPage = () => {
	if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) currentPage.value++;
};

// Fetch data on component mount
onMounted(() => fetchOrders());

</script>

<style scoped>
.moul-regular {
	font-family: "Moul", serif;
	font-weight: 400;
	font-style: normal;
}

.siemreap-regular {
	font-family: "Siemreap", sans-serif;
}
</style>
