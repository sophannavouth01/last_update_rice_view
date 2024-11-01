<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
	  <p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">បង្កើតបុគ្គលិក</p>
	  <div>
		<section class="bg-blueGray-50">
		  <div class="w-full mx-auto mt-6">
			<form @submit.prevent="handleSubmit">
			  <div class="flex flex-wrap">
				<!-- Employee ID -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">លេខសម្គាល់</label>
				  <input type="text" v-model="form.employeeId" required
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
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
				<!-- Email -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">អ៊ីមែល</label>
				  <input type="email" v-model="form.email"
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
					<option value="Male">ប្រុស</option>
					<option value="Female">ស្រី</option>
				  </select>
				</div>
				<!-- Hire Date -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">ថ្ងៃចូលបម្រើការងារ</label>
				  <input type="date" v-model="form.hireDate" required
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
				<!-- Branch -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">សាខា</label>
				  <select v-model="form.branch_id" required
					class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
					<option v-for="branch in branchs" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
				  </select>
				</div>
				<!-- Position -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">មុខតំណែង</label>
				  <select v-model="form.position_id" required
					class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
					<option v-for="position in positions" :key="position.id" :value="position.id">{{ position.name }}</option>
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
					class="border px-3 py-2 text-blueGray-600 focus:outline-none focus:ring w-full">
					<option v-for="village in filteredVillages" :key="village.code" :value="village.code">{{ village.name_kh }}</option>
				  </select>
				</div>
				<!-- Salary -->
				<!-- <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">ប្រាក់ខែ</label>
				  <input type="number" v-model="form.baseSalary" required
					class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div> -->
				<!-- Phone 1 -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">លេខទូរស័ព្ទខ្សែទី១</label>
				  <input type="text" v-model="form.phone1"
					class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
				<!-- Phone 2 -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">លេខទូរស័ព្ទខ្សែទី២</label>
				  <input type="text" v-model="form.phone2"
					class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
				<!-- Status -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">ស្ថានភាព</label>
				  <input type="checkbox" v-model="form.status"
					class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
				</div>
				<!-- Blacklist -->
				<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
				  <label class="block text-sm mb-2">BlackList</label>
				  <input type="checkbox" v-model="form.blackList"
					class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
				</div>
			  </div>
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
	email: "",
	phone1: "",
	phone2: "",
	employeeId: "",
	baseSalary: "",
	dateOfBirth: "",
	hireDate: "",
	gender: "",
	villageName_kh: null,
	communeName_kh: null,
	districtName_kh: null,
	provinceName_kh: null,
	status: false,
	blackList: false,
	position_id: "",
	branch_id: "",
	created_By: "",
	update_By: ""
});

const provinces = ref([]);
const districts = ref([]);
const communes = ref([]);
const villages = ref([]);
const branchs = ref([]);
const positions = ref([]);

const filteredDistricts = ref([]);
const filteredCommunes = ref([]);
const filteredVillages = ref([]);

const fetchAllData = async () => {
	provinces.value = provincesData.provinces;
	districts.value = districtsData.district;
	communes.value = communesData.communes;
	villages.value = villagesData.villages;
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

const fetchBranchs = async () => {
	try {
	  const response = await axios.get(`${baseUrl}/branch`);
	  branchs.value = response.data;
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

const fetchStaffById = async (id) => {
	try {
	  const response = await axios.get(`${baseUrl}/employees/${id}`, {
		headers: { Authorization: `Bearer ${getToken()}` },
	  });
	  
	  // Use Object.assign to copy API response to form values
	  Object.assign(form.value, response.data, {
		dateOfBirth: response.data.dateOfBirth.slice(0, 10),
		hireDate: response.data.hireDate.slice(0, 10),
		position_id: response.data.position.id,
		branch_id: response.data.branch.id
	  });
	} catch (error) {
	  console.error("Error fetching staff details:", error);
	}
};

const handleSubmit = async () => {
	try {
	  const createdBy = store.getters.getUserId;
	  const payload = {
		...form.value,
		created_By: createdBy,
		created_At: new Date().toISOString()
	  };
	  await axios.post(`${baseUrl}/employees`, payload);
	  router.push("/staff");
	  Swal.fire("Success!", "Employee added successfully!", "success");
	} catch (error) {
	  console.error("Error adding role:", error);
	  Swal.fire("Error!", "Failed to add Employee.", "error");
	}
};

onMounted(async () => {
	await fetchAllData();
	await fetchBranchs();
	await fetchPositions();
	const id = route.params.id;
	if (id) await fetchStaffById(id);
});
</script>

<style scoped>
.moul-regular {
	font-family: "Moul", serif;
	font-weight: 400;
	font-style: normal;
}
</style>
