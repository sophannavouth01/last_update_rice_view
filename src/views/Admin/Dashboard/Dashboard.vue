<template>
  <div class=" h-screen">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <div class="grid grid-cols-4 gap-4">
          <div class=" bg-white shadow-md rounded-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនបុគ្គលិក</p>
              </div>
              <div class="row-span-1 col-span-2 h-9 text-center">
                <p class="col-start-2 text-xl text-center text-[#00992B]">{{ staffCount }}</p>
              </div>
            </div>
          </div>
          <div class=" bg-white shadow-md rounded-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនអ្នកប្រើប្រាស់</p>
              </div>
              <div class="row-span-1 col-span-2 h-9 text-center">
                <p class="col-start-2 text-xl text-center text-[#00992B]">{{ userCount }}</p>
              </div>
            </div>
          </div>
          <div class=" bg-white shadow-md rounded-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនភ្នាក់ងារ</p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">{{ agentCount }}</p>
              </div>
            </div>
          </div>
          <div class=" bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនរោងម៉ាស៊ីន</p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">{{ millerCount }}</p>
              </div>
            </div>
          </div>
          <div class=" bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនសាខា</p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">{{ branchCount }}</p>
              </div>
            </div>
          </div>

          <div class=" bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនអតិថិជន</p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">{{ uniqueCustomerCount }}</p>
              </div>
            </div>
          </div>

          <div class=" bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនស្នើរសុំ</p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">{{ requestCount }}</p>
              </div>
            </div>
          </div>

        </div>

        <div class="w-full bg-white shadow-lg rounded-lg px-5 mt-5">
          <p class="px-1 py-4 text-lg font-semibold underline text-[#00992B] moul-regular">
            ស្នើរថ្មីដែលបានស្នើក្នុងថ្ងៃនេះ</p>
          <table class="w-full shadow-md border-collapse text-sm text-left text-gray-700"
            style="border-radius: 10px; overflow: hidden;">
            <thead class="text-xs bg-gray-100">
              <tr class="text-[13px]">
                <th
                  class="px-4 border py-2 text-[12px] whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ល.រ</th>
                <th class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ឈ្មោះរោងម៉ាស៊ីន</th>
                <th class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">សាខា</th>
                <th class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  បរិមាណអង្ករ</th>
                <th class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  តម្លៃ</th>
                <th class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">ស្ថានភាព
                </th>
                <th class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  កាលបរិច្ឆេទ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in paginatedOrders" :key="order.id"
                class="siemreap-regular bg-white border hover:bg-[#00992B] hover:text-white">
                <td class="w-[30px] px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ index + 1 }}
                </td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ order.khmerName }} ({{
                  order.EnName }})</td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ order.Branch }}</td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ order.Total }}<span
                    class="px-2 text-red-600">បេ</span></td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ order.Quantity }} <span
                    class="px-2 text-red-600">kg</span></td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ order.Status }}</td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ formatDateTimeKh(order.CreateDateTime) }}
                </td>

              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation  example" class="flex justify-end pb-5 py-3">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <button @click="previousPage" :disabled="currentPage === 1"
                  class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">ក្រោយ</button>
              </li>
              <li>
                <a href="#"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  {{ currentPage }} នៃ {{ totalPages }}</a>
              </li>
              <li>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">បន្ទាប់</button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Stock Table -->
        <div class="w-full bg-white shadow-lg rounded-lg px-5 mt-5">
          <p class="px-1 py-4 text-lg font-semibold underline text-[#00992B] moul-regular">ស្តុកអង្ករក្នុងរោងម៉ាស៊ីន</p>
          <table class="w-full shadow-md border-collapse text-sm text-left text-gray-700"
            style="border-radius: 10px; overflow: hidden;">
            <thead class="text-xs text-gray-700 bg-gray-100">
              <tr class="text-[13px]">
                <th
                  class="px-4 py-2 border text-[12px] whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ល.រ</th>
                <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ឈ្មោះរោងម៉ាស៊ីន</th>
                <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ខេត្ត</th>
                  <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                    ស្រុក</th>
                    <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                      ឃុំ</th>
                <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ភូមិ</th>
                <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ចំនួន</th>
                <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                  ទម្ងន់សរុប</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedItems" :key="item.miller.id"
                class="siemreap-regular bg-white border hover:bg-[#00992B] hover:text-white">
                <td class="w-[30px] px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{{ index + 1 }}</td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.miller.name }}</td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.miller.provinceName }}
                </td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.miller.districtName }}
                </td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.miller.communeName }}
                </td>
                <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.miller.villageName }}
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
          <nav aria-label="Page navigation example" class="flex justify-end pb-5 py-3">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <button @click="previousPage" :disabled="currentPage === 1"
                  class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">ក្រោយ</button>
              </li>
              <li>
                <a href="#"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  {{ currentPage }} នៃ {{ totalPages }}</a>
              </li>
              <li>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">បន្ទាប់</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const store = useStore();

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

// State for counts
const localOrders = ref([]); 
const userCount = ref(0);
const orderCount = ref(0);
const millerCount = ref(0);
const staffCount = ref(0);
const positionCount = ref(0);
const branchCount = ref(0);
const agentCount = ref(0);
const uniqueCustomerCount = ref(0);
const requestCount = ref(0);

// Orders state
const orders = ref([]);
const items = ref([]); // Stock items
const currentPage = ref(1);
const pageSize = 10;
const itemsPerPage = 5;

// const totalPages = ref(1);

// Computed data for pagination
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return orders.value.slice(start, start + pageSize);
});

const fetchCounts = async () => {
  try {
    const [
      usersRes,
      millersRes,
      staffsRes,
      positionsRes,
      branchsRes,
      agentsRes
    ] = await Promise.all([
      axios.get(`${baseUrl}/users`),
      axios.get(`${baseUrl}/miller`),  
      axios.get(`${baseUrl}/employees`),
      axios.get(`${baseUrl}/positions`),
      axios.get(`${baseUrl}/branch`),   
      axios.get(`${baseUrl}/agent`)
    ]);

    userCount.value = usersRes?.data?.length || 0;
    millerCount.value = millersRes?.data?.length || 0;
    staffCount.value = staffsRes?.data?.length || 0;
    positionCount.value = positionsRes?.data?.length || 0;
    branchCount.value = branchsRes?.data?.length || 0;
    agentCount.value = agentsRes?.data?.length || 0;

    totalPages.value = Math.ceil(orderCount.value / pageSize);
  } catch (error) {
    console.error('Error fetching counts:', error);
  }
};


const formatDateTimeKh = (dateString) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('km-KH', options).format(new Date(dateString));
};

// Fetch orders from the API
const fetchOrders = async () => {
	try {
		const response = await axios.get(`${baseUrl}/purchase-by-rice-from-miller`);
		// Store only 'Purchase' or 'deductFromMiller' statuses
		localOrders.value = response.data.filter(
			(order) => order.status.toLowerCase() === 'purchase' || order.status.toLowerCase() === 'deductfrommiller'
		);
		console.log("Fetched and filtered orders:", localOrders.value); // Log fetched data

		// Calculate and process grouped data for display
		paginatedItems.value = groupByMillerId(localOrders.value);
	} catch (error) {
		console.error("Error fetching orders:", error);
		Swal.fire("Error!", "Failed to fetch orders. Please try again later.", "error");
	}
};

// Grouping and calculation function
const groupByMillerId = (orders) => {
	const grouped = {};

	orders.forEach((order) => {
		const millerId = order.miller.id;

		// Initialize structure for each miller
		if (!grouped[millerId]) {
			grouped[millerId] = {
				miller: order.miller,
				purchase: { totalQuantity: 0, quantity: 0, totalCost: 0, cost: 0 },
				deductFromMiller: { totalQuantity: 0, quantity: 0, totalCost: 0, cost: 0 },
			};
		}

		// Add values based on status
		if (order.status.toLowerCase() === 'purchase') {
			grouped[millerId].purchase.totalQuantity += order.totalQuantity;
			grouped[millerId].purchase.quantity += order.quantity;
			grouped[millerId].purchase.totalCost += parseFloat(order.totalCost) || 0;
			grouped[millerId].purchase.cost += parseFloat(order.cost) || 0;
		} else if (order.status.toLowerCase() === 'deductfrommiller') {
			grouped[millerId].deductFromMiller.totalQuantity += order.totalQuantity;
			grouped[millerId].deductFromMiller.quantity += order.quantity;
			grouped[millerId].deductFromMiller.totalCost += parseFloat(order.totalCost) || 0;
			grouped[millerId].deductFromMiller.cost += parseFloat(order.cost) || 0;
		}
	});

	// Final calculation for each miller
	return Object.values(grouped).map((group) => ({
		miller: group.miller,
		totalQuantity: group.purchase.totalQuantity - group.deductFromMiller.totalQuantity,
		quantity: group.purchase.quantity - group.deductFromMiller.quantity,
		totalCost: (group.purchase.totalCost - group.deductFromMiller.totalCost).toFixed(2),
		cost: (group.purchase.cost - group.deductFromMiller.cost).toFixed(2),
	}));
};

// Computed property for pagination
const paginatedItems = computed(() => {
	const groupedOrders = groupByMillerId(localOrders.value); // Calculate grouped orders
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return groupedOrders.slice(start, end);
});

const totalPages = computed(() => Math.ceil(groupByMillerId(localOrders.value).length / itemsPerPage));

const previousPage = () => {
	if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) currentPage.value++;
};
// On component mount
onMounted(() => {
  fetchCounts();
  fetchOrders();

});
</script>

<style scoped>
.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}

.moul-regular {
  font-family: 'Moul', serif;
  font-weight: 400;
  font-style: normal;
}

.siemreap-regular {
  font-family: 'Siemreap', sans-serif;
}
</style>