<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			បន្ថែងភ្នាក់ងារថ្មី
		</p>
		<div>
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form @submit.prevent="handleSubmit">
						<div class="flex flex-wrap">
							<!--  Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះភ្នាក់ងារ</label>
								<input type="text" v-model="form.name" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Gender -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភេទ</label>
								<select v-model="form.gender" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option value="m">ប្រុស</option>
									<option value="s">ស្រី</option>
								</select>
							</div>
							<!-- Date of Birth -->
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

							<!-- Branch -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">សាខា</label>
								<select v-model="form.Branch" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="branch in branchs" :key="branch.id" :value="branch.id">{{ branch.name
										}}</option>
								</select>
							</div>

							<!-- Position -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">មុខតំណែង</label>
								<select v-model="form.Position" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option v-for="position in positions" :key="position.id" :value="position.id">{{
										position.name }}</option>
								</select>
							</div>

							<!-- Smart Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Smart</label>
								<input type="text" v-model="form.tel_1" required
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>

							<!-- Cellcard Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Cellcard</label>
								<input type="text" v-model="form.tel_2" required
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>

							<!-- Metfone Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Metfone</label>
								<input type="text" v-model="form.tel_3" required
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>

							<!-- Commission -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">កម្រៃជើងសារ</label>
								<input type="number" v-model="form.commission" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>

							<!-- Is Active -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4 flex items-center">
								<label class="block text-sm mb-2 mr-2">ស្ថានភាព</label>
								<input type="checkbox" v-model="form.active"
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
	name: "",
	gender: "",
	dob: "",
	Branch: "",
	Position: "",
	commission: "",
	villageCode: "",
	tel_1: "",
	tel_2: "",
	tel_3: "",
	active: false,
	created_At: new Date().toISOString(),
	created_By: getToken(),
	updated_By: getToken(),
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
	filteredDistricts.value = districts.value.filter(district => district.code.startsWith(form.value.Province));
	form.value.District = "";
	form.value.Commune = "";
	form.value.villageCode = "";
	filteredCommunes.value = [];
	filteredVillages.value = [];
};

// Filter communes based on selected district
const filterCommunes = () => {
	filteredCommunes.value = communes.value.filter(commune => commune.code.startsWith(form.value.District));
	form.value.Commune = "";
	form.value.villageCode = "";
	filteredVillages.value = [];
};

// Filter villages based on selected commune
const filterVillages = () => {
	filteredVillages.value = villages.value.filter(village => village.code.startsWith(form.value.Commune));
	form.value.villageCode = "";
};

// Fetch branches
const branchs = ref([]);

const fetchBranchs = async () => {
	try {
		const token = getToken();
		const response = await axios.get(`${baseUrl}/core/branch`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		branchs.value = response.data.data;
	} catch (error) {
		console.error('Error fetching branches:', error);
	}
};

// Fetch positions
const positions = ref([]);
const fetchPositions = async () => {
	try {
		const response = await axios.get(`${baseUrl}/core/position`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		positions.value = response.data.data;
	} catch (error) {
		console.error("Error fetching positions:", error);
	}
};

onMounted(async () => {
	await fetchAllData();
	await fetchBranchs();
	await fetchPositions();
	const id = route.params.id; // Get the agent ID from the URL params
	await fetchAgentById(id); // Fetch and populate the agent data
});

// Fetch agent data by ID
const fetchAgentById = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/agent/${id}`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		const agent = response.data.data[0];

		// Populate the form with fetched data
		form.value.name = agent.name;
		form.value.gender = agent.gender;
		form.value.dob = agent.dob.split('T')[0];  // Format date
		form.value.villageCode = agent.address.villageCode;
		form.value.Commune = agent.address.communeCode;
		form.value.District = agent.address.districtCode;
		form.value.Province = agent.address.provinceCode;
		form.value.tel_1 = agent.tel;
		form.value.tel_2 = agent.tel1;
		form.value.tel_3 = agent.tel2;
		form.value.commission = agent.commision;
		form.value.active = agent.active;
		form.value.Branch = agent.branch.id;
		form.value.Position = agent.position.id;

		// Trigger the filters based on the loaded address
		filterDistricts();
		filterCommunes();
		filterVillages();

	} catch (error) {
		console.error("Error fetching agent details:", error);
	}
};

// Handle form submission
const handleSubmit = async () => {
	const createdBy = store.getters.getUserId;
	const payload = {
		name: form.value.name,
		gender: form.value.gender,
		dob: form.value.dob,
		commission: form.value.commission,
		branchId: form.value.Branch,
		positionId: form.value.Position,
		villageCode: form.value.villageCode,
		tel_1: form.value.tel_1,
		tel_2: form.value.tel_2,
		tel_3: form.value.tel_3,
		created_At: form.value.created_At,
		created_By: createdBy,
		updated_By: createdBy,
		active: form.value.active,
	};

	try {
		const response = await axios.post(`${baseUrl}/agent`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		console.log("Agent created successfully:", response.data);
		Swal.fire("Success!", "Agent created successfully!.", "success");
		router.push("/agent");
	} catch (error) {
		console.error("Error creating Agent:", error);
		Swal.fire("Error!", "Error creating Agent. Please try again.", "error");
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
