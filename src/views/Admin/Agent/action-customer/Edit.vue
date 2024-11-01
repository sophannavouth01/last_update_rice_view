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
							<!-- First Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">គោតនាម</label>
								<input type="text" v-model="form.firstName" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Last Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">នាម</label>
								<input type="text" v-model="form.lastName" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- English Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះអង់គ្លេស</label>
								<input type="text" v-model="form.enName" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div> 
						
							<!-- Date of Birth -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ថ្ងៃកំណើត</label>
								<input type="date" v-model="form.dateOfBirth" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Gender -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភេទ</label>
								<select v-model="form.gender" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option value="ប្រុស">ប្រុស</option>
									<option value="ស្រី">ស្រី</option>
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

							<!-- Position -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">មុខតំណែង</label>
								<select v-model="form.positionId" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="position in positions" :key="position.id" :value="position.id">{{ position.name }}</option>
								</select>
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
							
							<!-- Agent -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភ្នាក់ងារ</label>
								<select v-model="form.agentId" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="agent in agents" :key="agent.id" :value="agent.id">{{ agent.firstName }} {{ agent.lastName }}</option>
								</select>
							</div>
							<!-- Province -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ខេត្ត</label>
								<select v-model="form.provinceName_kh" @change="filterDistricts" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="province in provinces" :key="province.code" :value="province.code">{{ province.name_kh }}</option>
								</select>
							</div>

							<!-- District -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្រុក</label>
								<select v-model="form.districtName_kh" @change="filterCommunes" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="district in filteredDistricts" :key="district.code" :value="district.code">{{ district.name_kh }}</option>
								</select>
							</div>

							<!-- Commune -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឃុំ</label>
								<select v-model="form.communeName_kh" @change="filterVillages" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="commune in filteredCommunes" :key="commune.code" :value="commune.code">{{ commune.name_kh }}</option>
								</select>
							</div>

							<!-- Village -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភូមិ</label>
								<select v-model="form.villageName_kh" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="village in filteredVillages" :key="village.code" :value="village.code">{{ village.name_kh }}</option>
								</select>
							</div>

							<!-- Phone 1 -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">លេខទូរស័ព្ទខ្សែទី១</label>
								<input type="text" v-model="form.phone1" class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>

							<!-- Phone 2 -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">លេខទូរស័ព្ទខ្សែទី២</label>
								<input type="text" v-model="form.phone2" class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>

							<!-- Status -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្ថានភាព</label>
								<input type="checkbox" v-model="form.status" class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
							</div>
						</div>

						<!-- Submit Button -->
						<footer class="w-full relative pt-8 pb-6">
							<div class="flex justify-end">
								<button type="submit" class="bg-[#00992B] rounded-md text-white px-5 py-3 text-sm font-medium">យល់ព្រមបង្កើត</button>
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
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();
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

const form = ref({
	firstName: "",
	lastName: "",
	enName: "",
	phone1: "",
	phone2: "",
	dateOfBirth: "",
	gender: "",
	positionId: "",
	marriedStatus: "",
	agentId: "",
	villageName_kh: null,
	communeName_kh: null,
	districtName_kh: null,
	provinceName_kh: null,
	status: false,
	branchId: "",
	created_By: store.getters.getUserId,
	update_By: store.getters.getUserId,
});

const provinces = ref([]);
const districts = ref([]);
const communes = ref([]);
const villages = ref([]);
const branches = ref([]);
const positions = ref([]);
const agents = ref([]);

const filteredDistricts = ref([]);
const filteredCommunes = ref([]);
const filteredVillages = ref([]);

const fetchAllData = async () => {
	provinces.value = provincesData.provinces;
	districts.value = districtsData.district;
	communes.value = communesData.communes;
	villages.value = villagesData.villages;
};

const fetchCustomerById = async () => {
	const customerId = route.params.id;
	try {
		const response = await axios.get(`${baseUrl}/customer/${customerId}`);
		const customerData = response.data;

		form.value.firstName = customerData.firstName;
		form.value.lastName = customerData.lastName;
		form.value.enName = customerData.enName;
		form.value.gender = customerData.gender;
		form.value.dateOfBirth = customerData.dateOfBirth.slice(0, 10);
		form.value.phone1 = customerData.phone1;
		form.value.phone2 = customerData.phone2;
		form.value.status = customerData.status;
		form.value.positionId = customerData.position.id;
		form.value.branchId = customerData.branch.id;
		form.value.agentId = customerData.agent.id;
		form.value.marriedStatus = customerData.marriedStatus;

		// Set location fields
		form.value.provinceName_kh = provinces.value.find(p => p.name_kh === customerData.provinceName)?.code || "";
		await filterDistricts();
		form.value.districtName_kh = districts.value.find(d => d.name_kh === customerData.districtName)?.code || "";
		await filterCommunes();
		form.value.communeName_kh = communes.value.find(c => c.name_kh === customerData.communeName)?.code || "";
		await filterVillages();
		form.value.villageName_kh = villages.value.find(v => v.name_kh === customerData.villageName)?.code || "";
	} catch (error) {
		console.error("Error fetching customer by ID:", error);
	}
};

const filterDistricts = () => {
	filteredDistricts.value = districts.value.filter(district => district.code.startsWith(form.value.provinceName_kh));
	form.value.districtName_kh = null;
	form.value.communeName_kh = null;
	form.value.villageName_kh = null;
	filteredCommunes.value = [];
	filteredVillages.value = [];
};

const filterCommunes = () => {
	filteredCommunes.value = communes.value.filter(commune => commune.code.startsWith(form.value.districtName_kh));
	form.value.communeName_kh = null;
	form.value.villageName_kh = null;
	filteredVillages.value = [];
};

const filterVillages = () => {
	filteredVillages.value = villages.value.filter(village => village.code.startsWith(form.value.communeName_kh));
	form.value.villageName_kh = null;
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

const fetchAgents = async () => {
	try {
		const response = await axios.get(`${baseUrl}/agent`);
		agents.value = response.data;
	} catch (error) {
		console.error("Error fetching agents:", error);
	}
};

const handleSubmit = async () => {
	try {
		const createdBy = store.getters.getUserId;

		const villageName_kh = villages.value.find(village => village.code === form.value.villageName_kh)?.name_kh;
		const communeName_kh = communes.value.find(commune => commune.code === form.value.communeName_kh)?.name_kh;
		const districtName_kh = districts.value.find(district => district.code === form.value.districtName_kh)?.name_kh;
		const provinceName_kh = provinces.value.find(province => province.code === form.value.provinceName_kh)?.name_kh;

		const payload = {
			firstName: form.value.firstName,
			lastName: form.value.lastName,
			enName: form.value.enName,
			dateOfBirth: form.value.dateOfBirth,
			gender: form.value.gender,
			positionId: form.value.positionId,
			branchId: form.value.branchId,
			agentId: form.value.agentId,
			marriedStatus: form.value.marriedStatus,
			villageName: villageName_kh,
			communeName: communeName_kh,
			districtName: districtName_kh,
			provinceName: provinceName_kh,
			phone1: form.value.phone1,
			phone2: form.value.phone2,
			status: form.value.status,
			created_By: createdBy,
			updated_By: createdBy,
			created_At: new Date().toISOString(),
		};

		await axios.patch(`${baseUrl}/customer/${route.params.id}`, payload);
		router.push("/customer");
		Swal.fire("Success!", "Customer updated successfully!", "success");
	} catch (error) {
		console.error("Error updating customer:", error);
		Swal.fire("Error!", "Failed to update customer.", "error");
	}
};

onMounted(() => {
	fetchAllData();
	fetchBranches();
	fetchPositions();
	fetchAgents();
	fetchCustomerById();
});
</script>

<style scoped>
.moul-regular {
	font-family: "Moul", serif;
	font-weight: 400;
	font-style: normal;
}
</style>
