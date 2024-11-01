<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			បន្ថែងរោងម៉ាសុីនថ្មី
		</p>
		<div>
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form @submit.prevent="handleSubmit">
						<div class="flex flex-wrap">
							<!--Miller Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះម៉ាសុីន</label>
								<input type="text" v-model="form.name" required
									class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							
							 <!-- Province -->
							 <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">ខេត្ត</label>
                                <select v-model="form.provinceName_kh" @change="filterDistricts" required
                                    class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
                                    <option v-for="province in provinces" :key="province.code" :value="province.code">
                                        {{ province.name_kh }}
                                    </option>
                                </select>
                            </div>

                            <!-- District -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">ស្រុក</label>
                                <select v-model="form.districtName_kh" @change="filterCommunes" required
                                    class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
                                    <option v-for="district in filteredDistricts" :key="district.code"
                                        :value="district.code">
                                        {{ district.name_kh }}
                                    </option>
                                </select>
                            </div>

                            <!-- Commune -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">ឃុំ</label>
                                <select v-model="form.communeName_kh" @change="filterVillages" required
                                    class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
                                    <option v-for="commune in filteredCommunes" :key="commune.code"
                                        :value="commune.code">
                                        {{ commune.name_kh }}
                                    </option>
                                </select>
                            </div>

                            <!-- Village -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">ភូមិ</label>
                                <select v-model="form.villageName_kh" required
                                    class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
                                    <option v-for="village in filteredVillages" :key="village.code"
                                        :value="village.code">
                                        {{ village.name_kh }}
                                    </option>
                                </select>
                            </div>
							
							<!-- Smart Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Smart</label>
								<input type="text" v-model="form.phone1"
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Celcard Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Cellcard</label>
								<input type="text" v-model="form.phone2" 
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
							</div>
							<!-- Metfone Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">Metfone</label>
								<input type="text" v-model="form.phone3" 
									class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
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
const router = useRouter();

const form = ref({
	name: "",
	villageCode: "",
	villageName_kh: null,
    communeName_kh: null,
    districtName_kh: null,
    provinceName_kh: null,
	phone1: "",
	phone2: "",
	phone3: "",
	status: true,
	created_By: store.getters.getUserId,
    updated_By: store.getters.getUserId,
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
// Fetch staff data
onMounted(() => {
	fetchAllData();
});



// Handle form submission
const handleSubmit = async () => {
	const villageName_kh = villages.value.find(village => village.code === form.value.villageName_kh)?.name_kh;
    const communeName_kh = communes.value.find(commune => commune.code === form.value.communeName_kh)?.name_kh;
    const districtName_kh = districts.value.find(district => district.code === form.value.districtName_kh)?.name_kh;
    const provinceName_kh = provinces.value.find(province => province.code === form.value.provinceName_kh)?.name_kh;

	const payload = {
		name: form.value.name,
		description: form.value.description,
		villageName: villageName_kh,
        communeName: communeName_kh,
        districtName: districtName_kh,
        provinceName: provinceName_kh,
		phone1: form.value.phone1,
		phone2: form.value.phone2,
		phone3: form.value.phone3,
		created_By: form.value.created_By,
        updated_By: form.value.updated_By,
		status: form.value.status

	};

	try {
		const response = await axios.post(`${baseUrl}/miller`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` },
		});
		console.log("Branch created successfully:", response.data);
		Swal.fire("Success!", "Miller created successfully!.", "success");
		router.push("/miller");
	} catch (error) {
		console.error("Error creating Miller:", error);
		Swal.fire("Error!", "Error creating Miller. Please try again.", "error");
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
