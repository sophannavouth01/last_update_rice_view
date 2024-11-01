<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
        <p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
            កែប្រែសាខា
        </p>
        <div>
            <section class="bg-blueGray-50">
                <div class="w-full mx-auto mt-6">
                    <form @submit.prevent="handleSubmit">
                        <div class="flex flex-wrap">
                            <!-- Branch Name -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">ឈ្មោះសាខា</label>
                                <input type="text" v-model="form.name" required
                                    class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
                            </div>

                            <!-- Village -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">Email</label>
                                <input type="text" v-model="form.email" required
                                    class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full" />
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
                                <label class="block text-sm mb-2">Phone Number</label>
                                <input type="text" v-model="form.phoneNumber" required
                                    class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
                            </div>

                            <!-- Internet Number -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">Internet Number</label>
                                <input type="text" v-model="form.internetNumber" required
                                    class="border px-3 py-2 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
                            </div>

                            <!-- Branch Manager -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">នាយកសាខា</label>
                                <div v-if="staffs.length">
                                    <select v-model="form.branchManagerId" required
                                        class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
                                        <option v-for="staff in staffs" :key="staff.id" :value="staff.id">
                                            {{ staff.name }}
                                        </option>
                                    </select>
                                </div>
                                <div v-else>Loading staff data...</div>
                            </div>

                            <!-- Is Active -->
                            <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
                                <label class="block text-sm mb-2">ស្ថានភាព</label>
                                <input type="checkbox" v-model="form.isActive"
                                    class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <footer class="w-full relative pt-8 pb-6">
                            <div class="flex justify-end">
                                <button type="submit"
                                    class="bg-[#00992B] rounded-md text-white px-5 py-3 text-sm font-medium">
                                    យល់ព្រមកែប្រែ
                                </button>
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
import { useStore } from "vuex";

const store = useStore();
const getToken = () => localStorage.getItem("authToken");
const route = useRoute();
const branchId = route.params.id; // Get branch ID from route

store.dispatch("loadUserFromStorage");

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
    villageCode: "",
    provinceName: "",
    districtName: "",
    communeName: "",
    villageName: "",
    email: "",
    password: "String",
    phoneNumber: "",
    internetNumber: "",
    location: "",
    branchManagerId: "",
    isActive: false,
    created_At: new Date().toISOString(),
    created_By: getToken(), // Assuming token contains user ID
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

// // Filter districts based on selected province
// const filterDistricts = () => {
//     filteredDistricts.value = districts.value.filter(district => district.code.startsWith(form.value.Province));
//     form.value.District = null;
//     form.value.Commune = null;
//     form.value.Village = null;
//     filteredCommunes.value = [];
//     filteredVillages.value = [];
// };

// // Filter communes based on selected district
// const filterCommunes = () => {
//     filteredCommunes.value = communes.value.filter(commune => commune.code.startsWith(form.value.District));
//     form.value.Commune = null;
//     form.value.Village = null;
//     filteredVillages.value = [];
// };

// // Filter villages based on selected commune
// const filterVillages = () => {
//     filteredVillages.value = villages.value.filter(village => village.code.startsWith(form.value.Commune));
//     form.value.Village = null;
// };
// Declare the `staffs` ref to hold the staff data
const staffs = ref([]); // Initialize it as an empty array

// Fetch branch details by ID
const fetchBranchById = async () => {
    try {
        const response = await axios.get(`${baseUrl}/core/branch/${branchId}`);
        const branch = response.data.data[0]; // Access the first item in the data array

        // Populate the form with branch and address data
        form.value.name = branch.name;
        form.value.villageCode = branch.address.villageCode;
        form.value.Province = branch.address.provinceCode; // Set the Province code here
        form.value.District = branch.address.districtCode; // Set the District code here
        form.value.Commune = branch.address.communeCode; // Set the Commune code here
        form.value.villageCode = branch.address.villageCode; // Set the Village code here
        form.value.email = branch.email;
        form.value.password = branch.password;
        form.value.phoneNumber = branch.phoneNumber;
        form.value.internetNumber = branch.internetNumber;
        form.value.location = branch.location;
        form.value.branchManagerId = branch.branchMangerId.id; // Set branchManagerId here
        form.value.isActive = branch.isActive;

        // Automatically filter districts, communes, and villages based on the existing data
        filterDistricts();
        filterCommunes();
        filterVillages();

        console.log("Branch details:", form.value);
    } catch (error) {
        console.error("Error fetching branch:", error.response); // Log the full error response for debugging
        Swal.fire("Error!", "Error fetching branch details.", "error");
    }
};

// Filter districts based on the selected province
const filterDistricts = () => {
    filteredDistricts.value = districts.value.filter(district => district.code.startsWith(form.value.Province));
    form.value.District = null;
    form.value.Commune = null;
    form.value.villageCode = null;
    filteredCommunes.value = [];
    filteredVillages.value = [];
};

// Filter communes based on the selected district
const filterCommunes = () => {
    filteredCommunes.value = communes.value.filter(commune => commune.code.startsWith(form.value.District));
    form.value.Commune = null;
    form.value.villageCode = null;
    filteredVillages.value = [];
};

// Filter villages based on the selected commune
const filterVillages = () => {
    filteredVillages.value = villages.value.filter(village => village.code.startsWith(form.value.Commune));
    form.value.villageCode = null;
};

// On mounted, fetch branch details and populate data
onMounted(() => {
    fetchBranchById();
    fetchStaffs();
    fetchAllData();
});

// Fetch staff data
const fetchStaffs = async () => {
    try {
        const response = await axios.get(`${baseUrl}/staff`);
        const activeStaffs = response.data.data.filter(
            (item) => item.staff.active === true
        );
        staffs.value = activeStaffs.map((item) => ({
            id: item.staff.id,
            name: item.staff.name,
        }));
        console.log(staffs.value);
    } catch (error) {
        console.error("Error fetching staffs:", error);
    }
};

// Update branch details
const handleSubmit = async () => {
    const createdBy = store.getters.getUserId;
    const payload = {
        name: form.value.name,
        villageCode: form.value.villageCode,
        email: form.value.email,
        password: form.value.password,
        phoneNumber: form.value.phoneNumber,
        internetNumber: form.value.internetNumber,
        location: form.value.location,
        branchMangerId: form.value.branchManagerId, // Update with selected manager ID
        created_At: form.value.created_At,
        created_By: createdBy,
        isActive: form.value.isActive,
    };

    try {
        const response = await axios.put(
            `${baseUrl}/core/branch/${branchId}`,
            payload,
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        );
        console.log("Branch updated successfully:", response.data);
        Swal.fire("Success!", "Branch updated successfully!.", "success");
        router.push("/branch");
    } catch (error) {
        console.error("Error updating branch:", error.response); // Log the full error response for debugging
        Swal.fire("Error!", "Error updating branch. Please try again.", "error");
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
