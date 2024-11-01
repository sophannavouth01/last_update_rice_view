<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			បុគ្គលិកលម្អិត
		</p>
		<div v-if="staffData && staffData.staff">
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form>
						<div class="flex flex-wrap">
							<!-- Khmer Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះភាសាខ្មែរ</label>
								<input type="text" v-model="staffData.staff.name" disabled
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- English Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះឡាតាំង</label>
								<input type="text" v-model="staffData.staff.en_Name" disabled
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Gender -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភេទ</label>
								<input type="text" v-model="genderLabel" disabled
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Branch -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">សាខា</label>
								<input type="text" v-model="staffData.branch.name" disabled
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Position -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">មុខតំណែង</label>
								<input type="text" v-model="staffData.position.name" disabled
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Hire Date -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ថ្ងៃចូលបម្រើការងារ</label>
								<input type="text" :value="staffData.staff.hireDate" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Salary -->
							<!-- <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ប្រាក់ខែ</label>
								<input type="number" v-model="staffData.staff.baseSalary" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div> -->
							<!-- Metfone Phone -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Metfone</label>
								<input type="text" v-model="staffData.staff.tel_Metfone" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Cellcard Phone -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Cellcard</label>
								<input type="text" v-model="staffData.staff.tel_Cellcard" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Smart Phone -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Smart</label>
								<input type="text" v-model="staffData.staff.tel_Smart" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភូមិ</label>
								<input type="text" :value="staffData.address.villageName" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឃុំ</label>
								<input type="text" :value="staffData.address.communeName" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្រុក</label>
								<input type="text" :value="staffData.address.districtName" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ខេត្ត</label>
								<input type="text" :value="staffData.address.provinceName" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Username Account</label>
								<input type="text" :value="staffData.user.userName" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Email Account</label>
								<input type="text" :value="staffData.user.email" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Role</label>
								<input type="text" :value="staffData.user.role" disabled
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្ថានភាព</label>
								<input type="text" :value="staffData.staff.active ? 'ដំណើរការ' : 'ឈប់'"
									:class="staffData.staff.active ? 'text-[#00992B]' : 'text-red-500'" disabled
									class="border px-3 py-2 bg-white rounded text-sm focus:outline-none focus:ring w-full" />


							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
		<div v-else>
			<p>Loading staff details...</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = useRoute(); // Get route to fetch ID

// Staff data
const staffData = ref(null);
const genderLabel = ref("");

// Address details
const fullAddress = ref("");
const getToken = () => {
	return localStorage.getItem('authToken');
};

// Axios interceptor to set auth token in headers
axios.interceptors.request.use(
	(config) => {
		const authToken = getToken();
		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Fetch staff details by ID
const fetchStaffById = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/staff/${id}`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		staffData.value = response.data.data[0];

		// Set gender label based on the fetched gender
		genderLabel.value = staffData.value.staff.gender === "f" ? "ប្រុស" : "ស្រី";

		// Format full address
		const address = staffData.value.address;
		fullAddress.value = `${address.villageName}, ${address.communeName}, ${address.districtName}, ${address.provinceName}`;
	} catch (error) {
		console.error("Error fetching staff details:", error);
	}
};

// On mounted, fetch staff by ID
onMounted(async () => {
	const id = route.params.id; // Get the staff ID from the URL params
	await fetchStaffById(id); // Fetch and populate the staff data
});
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
