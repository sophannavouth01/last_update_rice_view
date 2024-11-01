<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			កែប្រែព័ត៌មានរោងម៉ាសុីន
		</p>
		<div>
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form @submit.prevent="handleSubmit">
						<div class="flex flex-wrap">
							<!-- Miller Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះរោងម៉ាសុីន</label>
								<input type="text" v-model="form.name" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Description -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ពិពណ៌នា</label>
								<input type="text" v-model="form.description" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Province -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ខេត្ត</label>
								<select v-model="form.Province" @change="filterDistricts" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option value="" disabled>ជ្រើសរើសខេត្ត</option>
									<option v-for="province in provinces" :key="province.code" :value="province.code">{{
										province.name_kh }}</option>
								</select>
							</div>
							<!-- District -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្រុក</label>
								<select v-model="form.District" @change="filterCommunes" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option value="" disabled>ជ្រើសរើសស្រុក</option>
									<option v-for="district in filteredDistricts" :key="district.code"
										:value="district.code">{{ district.name_kh }}</option>
								</select>
							</div>
							<!-- Commune -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឃុំ</label>
								<select v-model="form.Commune" @change="filterVillages" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option value="" disabled>ជ្រើសរើសឃុំ</option>
									<option v-for="commune in filteredCommunes" :key="commune.code"
										:value="commune.code">{{ commune.name_kh }}</option>
								</select>
							</div>
							<!-- Village -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភូមិ</label>
								<select v-model="form.villageCode" required
									class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
									<option value="" disabled>ជ្រើសរើសភូមិ</option>
									<option v-for="village in filteredVillages" :key="village.code"
										:value="village.code">{{ village.name_kh }}</option>
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
									class="bg-[#00992B] rounded-md text-white px-5 py-3 text-sm font-medium">យល់ព្រមកែប្រែ</button>
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
const route = useRoute(); // Get route to fetch ID
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
	description: "",
	villageCode: "",
	Province: "",
	District: "",
	Commune: "",
	tel_1: "",
	tel_2: "",
	tel_3: "",
	active: false,
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

onMounted(async () => {
	await fetchAllData();
	const id = route.params.id; // Get the miller ID from the URL params
	await fetchMillerById(id); // Fetch and populate the miller data
});

// Fetch miller data by ID
const fetchMillerById = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/miller/${id}`, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		const miller = response.data.data[0];

		// Populate the form with fetched data
		form.value.name = miller.name;
		form.value.description = miller.description;
		form.value.villageCode = miller.address.villageCode;
		form.value.Commune = miller.address.communeCode;
		form.value.District = miller.address.districtCode;
		form.value.Province = miller.address.provinceCode;
		form.value.tel_1 = miller.tel_1;
		form.value.tel_2 = miller.tel_2;
		form.value.tel_3 = miller.tel_3;
		form.value.active = miller.active;

		// Trigger the filters sequentially after setting the values
		await filterDistricts();  // Filter districts based on the selected province
		await filterCommunes();   // Filter communes based on the selected district
		await filterVillages();   // Filter villages based on the selected commune

	} catch (error) {
		console.error("Error fetching miller details:", error);
	}
};

// Handle form submission for editing miller details
const handleSubmit = async () => {
	const updatedBy = store.getters.getUserId;
	const payload = {
		name: form.value.name,
		description: form.value.description,
		villageCode: form.value.villageCode,
		tel_1: form.value.tel_1,
		tel_2: form.value.tel_2,
		tel_3: form.value.tel_3,
		active: form.value.active,
		updated_By: updatedBy,
	};

	try {
		const response = await axios.put(`${baseUrl}/miller/${route.params.id}`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		console.log("Miller updated successfully:", response.data);
		Swal.fire("Success!", "Miller updated successfully!.", "success");
		router.push("/miller");
	} catch (error) {
		console.error("Error updating miller:", error);
		Swal.fire("Error!", "Error updating miller. Please try again.", "error");
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
