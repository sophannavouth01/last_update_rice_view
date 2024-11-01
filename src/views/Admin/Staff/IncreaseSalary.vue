
<template>
	<div class="bg-white shadow-md h-screen rounded-lg">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">ទិន្ន័យដំឡើងប្រាក់បៀវត្ស៍បុគ្គលិក</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<div class="order-last">
				<button @click="showModal = true"
					class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">
					ដំឡើងប្រាក់បៀវត្ស៍
				</button>
			</div>
		</div>

		<!-- Modal for creating Payroll -->
		<div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
			<div class="flex items-center justify-center min-h-screen px-4 text-center">
				<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
				<div
					class="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:max-w-lg sm:w-full">
					<div>
						<h3 class="text-lg leading-6 font-medium text-gray-900">Create Payroll</h3>
						<div class="mt-2">
							<label class="block text-sm font-medium text-gray-700">Staff</label>
							<select v-model="form.staffId" class="w-full border px-3 py-2 rounded-lg">
								<option v-for="staff in staffList" :key="staff.staff.id" :value="staff.staff.id">
									{{ staff.staff.name }}
								</option>
							</select>

							<label class="block mt-3 text-sm font-medium text-gray-700">Gasoline</label>
							<input v-model="form.gasoline" type="number" class="w-full border px-3 py-2 rounded-lg" />

							<label class="block mt-3 text-sm font-medium text-gray-700">Overtime Pay</label>
							<input v-model="form.overtimePay" type="number"
								class="w-full border px-3 py-2 rounded-lg" />

							<label class="block mt-3 text-sm font-medium text-gray-700">Bonuses</label>
							<input v-model="form.bonuses" type="number" class="w-full border px-3 py-2 rounded-lg" />

							<label class="block mt-3 text-sm font-medium text-gray-700">Reason</label>
							<input v-model="form.reason" type="text" class="w-full border px-3 py-2 rounded-lg" />

							<label class="block mt-3 text-sm font-medium text-gray-700">Date</label>
							<input v-model="form.date" type="date" class="w-full border px-3 py-2 rounded-lg" />
						</div>
					</div>
					<div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
						<button @click="handleSubmit"
							class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm">
							Save
						</button>
						<button @click="showModal = false"
							class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="overflow-x-auto px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th
							class="border px-6 py-3 text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ល.រ</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ឈ្មោះ
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ភេទ
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							មុខតំណែង</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">សាខា
						</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ប្រាក់បៀវត្ស៍</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ប្រាក់បន្ថែម</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ប្រាក់ថ្មី</th>
						<th class="border px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ចំនួនលើក</th>
						<th
							class="border moul-regular w-[100px] py-3 whitespace-nowrap overflow-hidden text-ellipsis text-center">
							មូលហេតុ</th>
						<th
							class="border px-6 w-[200px] text-center py-3 whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							សកម្មភាព</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(staff, index) in paginatedItems" :key="staff.id"
						class="siemreap-regular bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
						<td class="w-[30px] border px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">{{ index +
							1 }}</td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{
							staff.staff.name }}</td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{
							staff.staff.gender === 'f' ? 'ប្រុស' : 'ស្រី' }}</td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{
							staff.staff.position.name }}</td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{
							staff.staff.branch.name }}</td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{
							staff.previous_Salary }} <span class="px-2">$</span></td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{
							staff.increase_Salary }} <span class="px-2">$</span></td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{
							staff.new_Salary }} <span class="px-2">$</span></td>
						<td class="px-6 border whitespace-nowrap overflow-hidden border-gray-200 py-3 ">{{ staff.section}}</td>
						<td
							class="px-6 border whitespace-nowrap overflow-hidden text-[#00992B] font-bold border-gray-200 py-2">
							{{ staff.reason}}</td>
						<td
							class="px-6 border whitespace-nowrap overflow-hidden text-[#00992B] font-bold border-gray-200 py-2 flex ">
							<router-link to="">
								<button
									class="bg-[#00992B] px-3 py-2 rounded-md text-white cursor-pointer">លម្អិត</button>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Pagination Navigation -->
			<nav aria-label="Page navigation example" class="flex justify-end py-3">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button @click="previousPage" :disabled="currentPage === 1"
							class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">ក្រោយ</button>
					</li>
					<li>
						<span
							class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">{{
								currentPage }} នៃ {{ totalPages }}</span>
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
import Swal from "sweetalert2";
import { useStore } from 'vuex';

const showModal = ref(false); // Modal control
const form = ref({
	staffId: null,
	gasoline: 0,
	overtimePay: 0,
	bonuses: 0,
	reason: "",
	date: "",
	
});

const staffList = ref([]); // Store the list of staff members

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const localStaffs = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

// Fetch staff data for payroll creation
const fetchStaffList = async () => {
	try {
		const token = getToken();
		const response = await axios.get(`${baseUrl}/staff`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		staffList.value = response.data.data;
	} catch (error) {
		console.error('Error fetching staff list:', error);
	}
};

// Fetch staff salary and bonus data
const fetchStaffs = async () => {
	try {
		const token = getToken();
		const response = await axios.get(`${baseUrl}/staff/salary/Change`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		localStaffs.value = response.data.data;
		localStaffs.value.sort((a, b) => new Date(b.created_At) - new Date(a.created_At));
	} catch (error) {
		console.error('Error fetching staff salary:', error);
	}
};

onMounted(() => {
	fetchStaffs();
	fetchStaffList(); // Fetch staff list on component mount
});

const handleSubmit = async () => {
	// try {
	//     form.value.created_At = new Date().toISOString(); // Update created_At
	//     form.value.updated_At = new Date().toISOString(); // Update updated_At
	//     await axios.post(`${baseUrl}/staff/salary/Bonus`, form.value, {
	//         headers: { Authorization: `Bearer ${getToken()}` },
	//     });
	//     Swal.fire("Success!", "Payroll created successfully!", "success");
	//     showModal.value = false; // Hide modal after success
	//     fetchStaffs(); // Refresh list
	// } catch (error) {
	//     console.error("Error creating payroll:", error);
	//     Swal.fire("Error!", "Failed to create payroll.", "error");
	// }
	try {
		const createdBy = store.getters.getUserId;

		const payload = {
			staffId: form.value.staffId,
			gasoline: form.value.gasoline,
			overtimePay: form.value.overtimePay,
			bonuses: form.value.bonuses,
			reason: form.value.reason,
			date: form.value.date,
			created_By: createdBy,
			created_At: new Date().toISOString(),
			Updated_By: createdBy,  
	        updated_At: new Date().toISOString(),
		};

		await axios.post(`${baseUrl}/staff/salary/Bonus`, payload,{
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		Swal.fire("Success!", "Payroll created successfully!", "success");
	} catch (error) {
		console.error("Error adding role:", error);
		Swal.fire("Error!", "Failed to create payroll.", "error");
	}
};

// Pagination logic
const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return localStaffs.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(localStaffs.value.length / itemsPerPage);
});

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
	font-style: normal;
}

.siemreap-regular {
	font-family: 'Siemreap', sans-serif;
}
</style>
