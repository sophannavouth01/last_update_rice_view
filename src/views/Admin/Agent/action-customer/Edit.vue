<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			កែប្រែព័ត៌មានលម្អិតអតិថិជន
		</p>
		<div>
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form @submit.prevent="handleSubmit">
						<div class="flex flex-wrap">
							<!-- Agent -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភ្នាក់ងារ</label>
								<select v-model="form.agentID" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="agent in agents" :key="agent.id" :value="agent.id">{{ agent.name }}</option>
								</select>
							</div>
							<!-- Wife Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះភរិយា</label>
								<input type="text" v-model="form.wife_Name" 
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Husband Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះប្តី</label>
								<input type="text" v-model="form.husband_Name" 
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!--  Date of Birth -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ថ្ងៃកំណើត</label>
								<input type="date" v-model="form.dob" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Province -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ខេត្ត</label>
								<select v-model="form.Province" @change="filterDistricts" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="province in provinces" :key="province.code" :value="province.code">{{
										province.name_kh }}</option>
								</select>
							</div>
							<!-- District -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្រុក</label>
								<select v-model="form.District" @change="filterCommunes" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="district in filteredDistricts" :key="district.code"
										:value="district.code">{{ district.name_kh }}</option>
								</select>
							</div>
							<!-- Commune -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឃុំ</label>
								<select v-model="form.Commune" @change="filterVillages" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="commune in filteredCommunes" :key="commune.code"
										:value="commune.code">{{ commune.name_kh }}</option>
								</select>
							</div>
							<!-- Village -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភូមិ</label>
								<select v-model="form.villageCode" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="village in filteredVillages" :key="village.code"
										:value="village.code">{{ village.name_kh }}</option>
								</select>
							</div>
							<!-- Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">លេខទូរស័ព្ទ</label>
								<input type="text" v-model="form.tel" 
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							
							<!-- Is Active -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្ថានភាព</label>
								<input type="checkbox" v-model="form.active"
									class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
							</div>
							<!-- Is blackList -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">បញ្ជីខ្មៅ</label>
								<input type="checkbox" v-model="form.blackList"
									class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
							</div>
						</div>

						<!-- Submit Button -->
						<footer class="w-full relative pt-8 pb-6">
							<div class="flex justify-end">
								<button type="submit"
									class="bg-[#00992B] rounded-md text-white px-5 py-3 text-sm font-medium">យល់ព្រមបង្កើត</button>
							</div>
						</footer>
					</form>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import provincesData from '../../../../../public/provinces.json';
import districtsData from '../../../../../public/district.json';
import communesData from '../../../../../public/communes.json';
import villagesData from '../../../../../public/villages.json';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import { useRoute } from "vue-router";

const store = useStore();
const getToken = () => localStorage.getItem("authToken");
const route = useRoute(); 
store.dispatch('loadUserFromStorage');

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();

const form = ref({
	id: "",
	agentID: "",
	wife_Name: "",
	husband_Name: "",
	dob: "",
	villageCode: "",
	tel: "",
	active: false,
	blackList: false,
	created_At: "",
	created_By: "",
	updated_By: "",
	Province: "",
	District: "",
	Commune: "",
});

// Address data
const provinces = ref([]);
const districts = ref([]);
const communes = ref([]);
const villages = ref([]);

// Filtered data
const filteredDistricts = ref([]);
const filteredCommunes = ref([]);
const filteredVillages = ref([]);

// Fetch all data from the local files
const fetchAllData = async () => {
	provinces.value = provincesData.provinces;
	districts.value = districtsData.district;
	communes.value = communesData.communes;
	villages.value = villagesData.villages;
};

// Filter districts based on selected province
const filterDistricts = () => {
	if (form.value.Province) {
		filteredDistricts.value = districts.value.filter(district => district.code.startsWith(form.value.Province));
		form.value.District = null;  // Reset when Province is changed
		filteredCommunes.value = [];
		filteredVillages.value = [];
	}
};

// Filter communes based on selected district
const filterCommunes = () => {
	if (form.value.District) {
		filteredCommunes.value = communes.value.filter(commune => commune.code.startsWith(form.value.District));
		form.value.Commune = null;  // Reset when District is changed
		filteredVillages.value = [];
	}
};

// Filter villages based on selected commune
const filterVillages = () => {
	if (form.value.Commune) {
		filteredVillages.value = villages.value.filter(village => village.code.startsWith(form.value.Commune));
		form.value.Village = null;  // Reset when Commune is changed
	}
};

// Fetch agents
const agents = ref([]);
const fetchAgents = async () => {
	try {
		const token = getToken();
		const response = await axios.get(`${baseUrl}/agent`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		agents.value = response.data.data;
	} catch (error) {
		console.error('Error fetching agents:', error);
	}
};

// Fetch customer data by ID
const fetchCustomerById = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/customer/${id}`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		const customer = response.data.data[0];

		// Populate the form with fetched data
		form.value.id = customer.id;
		form.value.agentID = customer.agent.id;
		form.value.wife_Name = customer.wife_Name;
		form.value.husband_Name = customer.husband_Name;
		form.value.dob = customer.dob.split('T')[0];  // Format date
		form.value.Province = customer.address.provinceCode;
		form.value.District = customer.address.districtCode;
		form.value.Commune = customer.address.communeCode;
		form.value.villageCode = customer.address.villageCode;
		form.value.tel = customer.tel;
		form.value.active = customer.active;
		form.value.blackList = customer.blackList;
		form.value.created_At = customer.created_At;
		form.value.created_By = customer.created_By;
		form.value.updated_By = customer.updated_By;

		// Trigger filters to populate the dropdowns after loading the data
		filterDistricts();  // Populate districts based on Province
		filterCommunes();   // Populate communes based on District
		filterVillages();   // Populate villages based on Commune

	} catch (error) {
		console.error("Error fetching customer details:", error);
	}
};

// Handle form submission
const handleSubmit = async () => {
	const createdBy = store.getters.getUserId;
	const payload = {
		id: form.value.id,
		wife_Name: form.value.wife_Name,
		husband_Name: form.value.husband_Name,
		agentID: form.value.agentID,
	    dob: form.value.dob,
		villageCode: form.value.villageCode,
		tel: form.value.tel,
		created_At: form.value.created_At,
		created_By: form.value.created_By,
		updated_By: createdBy,
		blackList: form.value.blackList,
		active: form.value.active,
	};

	try {
		const response = await axios.put(`${baseUrl}/customer/${form.value.id}`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		console.log("Customer updated successfully:", response.data);
		Swal.fire("Success!", "Customer updated successfully!", "success");
		router.push("/customer");
	} catch (error) {
		console.error("Error updating customer:", error);
		Swal.fire("Error!", "Error updating customer. Please try again.", "error");
	}
};

onMounted(async () => {
	const id = route.params.id; 
	await fetchCustomerById(id);
    fetchAllData();
	fetchAgents();
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
