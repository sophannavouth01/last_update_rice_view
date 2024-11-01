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
                    ចំនួន</th>
                  <th class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular">
                    ទម្ងន់សរុប</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id"
                  class="siemreap-regular bg-white border hover:bg-[#00992B] hover:text-white">
                  <td class="w-[30px] px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{{ index + 1 }}</td>
                  <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.Miller.Name }}</td>
                  <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.Miller.Province }}
                  </td>
                  <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.Miller.District }}
                  </td>
                  <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.Total }}<span
                      class="px-2 text-red-600">បេ</span></td>
                  <td class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.Quantity }} <span
                      class="px-2 text-red-600">kg</span></td>
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
  
  // API base URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // State for counts
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
  const totalPages = ref(1);
  
  // Computed data for pagination
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return orders.value.slice(start, start + pageSize);
  });
  
  
  const fetchCustomers = async () => {
    try {
      const customersResponse = await axios.get(`${baseUrl}/Customers`);
      
      // Use a Set to store unique khmerNames
      const uniqueCustomers = new Set(customersResponse.data.map(customer => customer.khmerName));
  
      // Set the count of unique customers
      uniqueCustomerCount.value = uniqueCustomers.size;
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  
  // Fetch counts and orders
  const fetchCounts = async () => {
    try {
      const [usersRes, ordersRes, millersRes, staffsRes, positionsRes, branchsRes, agentsRes] = await Promise.all([
        axios.get(`${baseUrl}/Users`),
        axios.get(`${baseUrl}/Orders`),
        axios.get(`${baseUrl}/Millers`),
        axios.get(`${baseUrl}/Staffs`),
        axios.get(`${baseUrl}/Positions`),
        axios.get(`${baseUrl}/Branchs`),
        axios.get(`${baseUrl}/Agents`)
      ]);
  
      userCount.value = usersRes.data.length;
      orderCount.value = ordersRes.data.length;
      millerCount.value = millersRes.data.length;
      staffCount.value = staffsRes.data.length;
      positionCount.value = positionsRes.data.length;
      branchCount.value = branchsRes.data.length;
      agentCount.value = agentsRes.data.length;
  
      // Calculate total pages
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
      hour12: true, // Use 12-hour format with AM/PM
    };
    return new Intl.DateTimeFormat('km-KH', options).format(new Date(dateString));
  };
  
  // Fetch orders and stock items
  const fetchOrdersAndStock = async () => {
    try {
      const ordersResponse = await axios.get(`${baseUrl}/Orders`);
      // Count all orders with Status === 'ស្នើរសុំ'
      requestCount.value = ordersResponse.data.filter(order => order.Status === "ស្នើរសុំ").length;
      // Get today's date in 'YYYY-MM-DD' format
      const today = new Date().toISOString().split('T')[0];
  
      // Filter and sort orders for only today's requests, most recent first
      orders.value = ordersResponse.data
        .filter(order => {
          const orderDate = new Date(order.CreateDateTime).toISOString().split('T')[0];
          return orderDate === today && order.Status === "ស្នើរសុំ";
        })
        .sort((a, b) => new Date(b.CreateDateTime) - new Date(a.CreateDateTime)); // Sort by CreateDateTime, newest first
  
      // Fetch stock items for rice stock table from /StocksAvailable API
      const itemsResponse = await axios.get(`${baseUrl}/StocksAvailable`);
      items.value = itemsResponse.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Pagination controls
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
    }
  };
  
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  };
  
  // On component mount
  onMounted(() => {
    fetchCounts();
    fetchOrdersAndStock(); // Fetch both orders and stock items
    fetchCustomers();
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
  