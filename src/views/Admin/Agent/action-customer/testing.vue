<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			បន្ថែមអតិថិជនថ្មី
		</p>
		<div>
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form @submit.prevent="handleSubmit">
						<div class="flex flex-wrap">
							<!-- First Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">នាមខ្លួន</label>
								<input type="text" v-model="form.firstName" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Last Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">នាមត្រកូល</label>
								<input type="text" v-model="form.lastName" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- English Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះអង់គ្លេស</label>
								<input type="text" v-model="form.enName"
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Married Status -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្ថានភាពគ្រួសារ</label>
								<select v-model="form.marriedStatus" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option value="នៅលីវ">នៅលីវ</option>
									<option value="រៀបការ">រៀបការ</option>
									<option value="ផ្សេងៗ">ផ្សេងៗ</option>
								</select>
							</div>
							<!-- Position -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">មុខរបប</label>
								<select v-model="form.positionId" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="position in positions" :key="position.id" :value="position.id">{{ position.name }}</option>
								</select>
							</div>
							<!-- Branch -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">សាខា</label>
								<select v-model="form.branchId" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
								</select>
							</div>
							<!-- Agent -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភ្នាក់ងារ</label>
								<select v-model="form.agentId" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="agent in agents" :key="agent.id" :value="agent.id">{{ agent.name }}</option>
								</select>
							</div>
							<!-- Phone Numbers -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">លេខទូរស័ព្ទ ១</label>
								<input type="text" v-model="form.phone1" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">លេខទូរស័ព្ទ ២</label>
								<input type="text" v-model="form.phone2"
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Province -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ខេត្ត</label>
								<select v-model="form.provinceName" @change="filterDistricts" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="province in provinces" :key="province.code" :value="province.name_kh">{{ province.name_kh }}</option>
								</select>
							</div>
							<!-- District -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្រុក</label>
								<select v-model="form.districtName" @change="filterCommunes" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="district in filteredDistricts" :key="district.code" :value="district.name_kh">{{ district.name_kh }}</option>
								</select>
							</div>
							<!-- Commune -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឃុំ</label>
								<select v-model="form.communeName" @change="filterVillages" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="commune in filteredCommunes" :key="commune.code" :value="commune.name_kh">{{ commune.name_kh }}</option>
								</select>
							</div>
							<!-- Village -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភូមិ</label>
								<select v-model="form.villageName" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="village in filteredVillages" :key="village.code" :value="village.name_kh">{{ village.name_kh }}</option>
								</select>
							</div>
							<!-- Is Active -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្ថានភាព</label>
								<input type="checkbox" v-model="form.status"
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

const store = useStore();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();
const getToken = () => localStorage.getItem("authToken");

store.dispatch('loadUserFromStorage');

const form = ref({
	firstName: "",
	lastName: "",
	enName: "",
	dateOfBirth: "",
	marriedStatus: "",
	phone1: "",
	phone2: "",
	positionId: "",
	branchId: "",
	agentId: "",
	villageName: "",
	communeName: "",
	districtName: "",
	provinceName: "",
	status: false,
	created_By: store.getters.getUserId,
	updated_By: store.getters.getUserId
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

// Filter functions for dependent dropdowns
const filterDistricts = () => {
	filteredDistricts.value = districts.value.filter(district => district.province_code === form.value.provinceName);
	form.value.districtName = null;
	form.value.communeName = null;
	form.value.villageName = null;
	filteredCommunes.value = [];
	filteredVillages.value = [];
};

const filterCommunes = () => {
	filteredCommunes.value = communes.value.filter(commune => commune.district_code === form.value.districtName);
	form.value.communeName = null;
	form.value.villageName = null;
	filteredVillages.value = [];
};

const filterVillages = () => {
	filteredVillages.value = villages.value.filter(village => village.commune_code === form.value.communeName);
	form.value.villageName = null;
};

// Fetch agents, branches, and positions
const agents = ref([]);
const branches = ref([]);
const positions = ref([]);
const fetchAgents = async () => {
	try {
		const response = await axios.get(`${baseUrl}/agent`);
		agents.value = response.data;
	} catch (error) {
		console.error('Error fetching agents:', error);
	}
};
const fetchBranches = async () => {
	try {
		const response = await axios.get(`${baseUrl}/branch`);
		branches.value = response.data;
	} catch (error) {
		console.error('Error fetching branches:', error);
	}
};
const fetchPositions = async () => {
	try {
		const response = await axios.get(`${baseUrl}/positions`);
		positions.value = response.data;
	} catch (error) {
		console.error("Error fetching positions:", error);
	}
};

// Initialize data
onMounted(() => {
	fetchAllData();
	fetchAgents();
	fetchBranches();
	fetchPositions();
});

// Handle form submission
const handleSubmit = async () => {
	try {
		const payload = {
			firstName: form.value.firstName,
			lastName: form.value.lastName,
			enName: form.value.enName,
			dateOfBirth: form.value.dateOfBirth,
			marriedStatus: form.value.marriedStatus,
			phone1: form.value.phone1,
			phone2: form.value.phone2,
			positionId: form.value.positionId,
			branchId: form.value.branchId,
			agentId: form.value.agentId,
			villageName: form.value.villageName,
			communeName: form.value.communeName,
			districtName: form.value.districtName,
			provinceName: form.value.provinceName,
			status: form.value.status,
			created_By: form.value.created_By,
			updated_By: form.value.updated_By,
		};

		await axios.post(`${baseUrl}/customer`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` }
		});
		router.push("/customer");
		Swal.fire("Success!", "Customer created successfully!", "success");

	} catch (error) {
		console.error("Error creating customer:", error);
		Swal.fire("Error!", "Could not create customer. Try again.", "error");
	}
};
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
