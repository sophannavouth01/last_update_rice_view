<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
      <p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
        បង្កើតបុគ្គលិក
      </p>
      <div>
        <section class="bg-blueGray-50">
          <div class="w-full lg:w-12/12 mx-auto mt-6">
            <form>
              <div class="flex flex-wrap">
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[100px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      ឈ្មោះ
                    </label>
                    <input type="text" v-model="form.username"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      ឈ្មោះភាសាខ្មែរ
                    </label>
                    <input type="text" v-model="form.username"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      ឈ្មោះឡាតាំង
                    </label>
                    <input type="text" v-model="form.username"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[100px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      ភេទ
                    </label>
                    <select v-model="form.gender" 
                      class="border border-gray-300 rounded-lg px-4 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring-[#00992B] focus:border-[#00992B] w-full">
                      <option value="f">Male</option>
                      <option value="s">Female</option>
  
                    </select>
                  </div>
                </div>
               
  
                <!-- Province -->
                <div class="w-full lg:w-4/12 mb-6">
                  <div class="flex items-center space-x-4">
                    <label for="province" class="block w-[100px] text-blueGray-600 text-sm ml-6"> ខេត្ត </label>
                    <select v-model="form.province" @change="filterDistricts"
                      class="border border-gray-300 rounded-lg px-4 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring-[#00992B] focus:border-[#00992B] w-full">
                      <option v-for="province in provinces" :key="province.code" :value="province.code">
                        {{ province.name_en }}
                      </option>
                    </select>
                  </div>
                </div>
  
                <!-- District -->
                <div class="w-full lg:w-4/12 mb-6">
                  <div class="flex items-center space-x-4">
                    <label for="district" class="block w-[100px] text-blueGray-600 text-sm ml-6"> ស្រុក </label>
                    <select v-model="form.district" @change="filterCommunes"
                      class="border border-gray-300 rounded-lg px-4 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring-[#00992B] focus:border-[#00992B] w-full">
                      <option v-for="district in filteredDistricts" :key="district.code" :value="district.code">
                        {{ district.name_en }}
                      </option>
                    </select>
                  </div>
                </div>
  
                <!-- Commune -->
                <div class="w-full lg:w-4/12 mb-6">
                  <div class="flex items-center space-x-4">
                    <label for="commune" class="block w-[100px] text-blueGray-600 text-sm ml-6"> ឃុំ </label>
                    <select v-model="form.commune" @change="filterVillages"
                      class="border border-gray-300 rounded-lg px-4 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring-[#00992B] focus:border-[#00992B] w-full">
                      <option v-for="commune in filteredCommunes" :key="commune.code" :value="commune.code">
                        {{ commune.name_en }}
                      </option>
                    </select>
                  </div>
  
                </div>
  
                <!-- Village -->
                <div class="w-full lg:w-4/12 mb-6">
                  <div class="flex items-center space-x-4">
                    <label for="village" class="block w-[100px] text-blueGray-600 text-sm ml-6"> ភូមិ </label>
                    <select v-model="form.village"
                      class="border border-gray-300 rounded-lg px-4 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring-[#00992B] focus:border-[#00992B] w-full">
                      <option v-for="village in filteredVillages" :key="village.code" :value="village.code">
                        {{ village.name_en }}
                      </option>
                    </select>
                  </div>
                </div>
  
                <!-- branch -->
                <div class="w-full lg:w-4/12 mb-6">
                  <div class="flex items-center space-x-4">
                    <label for="village" class="block w-[100px] text-blueGray-600 text-sm ml-6"> សាខា </label>
                    <select v-model="form.branchId"
                      class="border border-gray-300 rounded-lg px-4 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring-[#00992B] focus:border-[#00992B] w-full">
                      <option v-for="branch in branchs" :key="branch.id" :value="branch.id">
                        {{ branch.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- position-->
                <div class="w-full lg:w-4/12 mb-6">
                  <div class="flex items-center space-x-4">
                    <label for="village" class="block w-[100px] text-blueGray-600 text-sm ml-6"> មុខតំណៃង </label>
                    <select v-model="form.positionId"
                      class="border border-gray-300 rounded-lg px-4 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring-[#00992B] focus:border-[#00992B] w-full">
                      <option v-for="position in positions" :key="position.id" :value="position.id">
                        {{ position.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      ប្រាក៉បៀវត្សន៌
                    </label>
                    <input type="" v-model="form.baseSalary"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      ថ្ងៃចូលធ្វើការ
                    </label>
                    <input type="date" v-model="form.username"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[100px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                    Metfone
                    </label>
                    <input type="text" v-model="form.username"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      Cellcard
                    </label>
                    <input type="text" v-model="form.username"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 pr-2">
                  <div class="relative w-full flex mb-5">
                    <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
                      Smart
                    </label>
                    <input type="text" v-model="form.username"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  </div>
                </div> 
              </div>
              <div class="flex flex-wrap mb-5">
              <div class="w-full lg:w-6/12 pr-2">
                <div class="relative w-full flex mb-3">
                  <label class="block w-[150px] px-4 text-blueGray-600 text-sm mb-2" htmlfor="active">
                    ស្ថានភាព
                  </label>
                  <input type="checkbox" v-model="form.active" id="active"
                    class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
                </div>
              </div>
  
              <!-- Allow Reset Password Field -->
              <div class="w-full lg:w-6/12 pl-2">
                <div class="relative w-full flex mb-3">
                  <label class="block w-[150px] px-4 text-blueGray-600 text-sm mb-2"
                    htmlfor="allowResetPassword">
                    បញ្ជីខ្មៅ
                  </label>
                  <input type="checkbox" v-model="form.allowResetPassword" id="allowResetPassword"
                    class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
                </div>
              </div>
              <footer class="w-full relative pt-8 pb-6 ">
                <div class="flex justify-end">
                <button @click="handleSubmit" class="bg-[#00992B] rounded-md text-white px-5 py-3 text-sm font-medium">
                  យល់ព្រមបង្កើត
                </button>
              </div>
              </footer>
            </div>
              <!-- Submit Button -->
              
            </form>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import provincesData from '../../../../../public/provinces.json';
  import districtsData from '../../../../../public/district.json';
  import communesData from '../../../../../public/communes.json';
  import villagesData from '../../../../../public/villages.json';
  
  import { useStore } from "vuex";
  import Swal from "sweetalert2";
  import { useRouter } from "vue-router";
  
  const store = useStore();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  
  
  // Form data
  const form = ref({
    username: "",
    email: "",
    province: null,
    district: null,
    commune: null,
    village: null,
  });
  
  // Address data
  const provinces = ref([]);
  const districts = ref([]);
  const communes = ref([]);
  const villages = ref([]);
  const branchs = ref([]);
  const positions = ref([]);
  // Filtered data
  const filteredDistricts = ref([]);
  const filteredCommunes = ref([]);
  const filteredVillages = ref([]);
  
  // Fetch all data from the local files
  const fetchAllData = async () => {
    // Make sure you are correctly assigning the data
    provinces.value = provincesData.provinces;
    districts.value = districtsData.district; // Use 'district' instead of 'districts'
    communes.value = communesData.communes;
    villages.value = villagesData.villages;
  
    // Debugging: log the data
    console.log('Provinces:', provinces.value);
    console.log('Districts:', districts.value); // Check this output
    console.log('Communes:', communes.value);
    console.log('Villages:', villages.value);
  };
  
  // Filter districts based on selected province
  const filterDistricts = () => {
    console.log('Selected Province Code:', form.value.province); // Ensure this logs correctly
    if (!form.value.province) {
      filteredDistricts.value = [];
      return;
    }
  
    // Filtering districts where the first two characters of the district code match the province code
    filteredDistricts.value = districts.value.filter(district =>
      district.code.startsWith(form.value.province)
    );
  
    console.log('Filtered Districts:', filteredDistricts.value); // This should now show relevant districts
    // Reset and filter further dropdowns
    form.value.district = null;
    form.value.commune = null;
    form.value.village = null;
    filteredCommunes.value = [];
    filteredVillages.value = [];
  };
  const filterCommunes = () => {
    if (!form.value.district) {
      filteredCommunes.value = [];
      return;
    }
  
    filteredCommunes.value = communes.value.filter(commune =>
      commune.code.startsWith(form.value.district)
    );
  
    console.log('Filtered Communes:', filteredCommunes.value);
    form.value.commune = null; // Reset selected commune
    form.value.village = null; // Reset village
    filteredVillages.value = [];
  };
  const filterVillages = () => {
    if (!form.value.commune) {
      filteredVillages.value = [];
      return;
    }
  
    filteredVillages.value = villages.value.filter(village =>
      village.code.startsWith(form.value.commune)
    );
  
    console.log('Filtered Villages:', filteredVillages.value);
    form.value.village = null; // Reset selected village
  };
  
  onMounted(async () => {
    try {
      await fetchAllData();
      console.log('Provinces:', provinces.value);
      console.log('Districts:', districts.value);
      console.log('Communes:', communes.value);
      console.log('Villages:', villages.value);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });
  onMounted(() => {
    fetchBranchs();
    fetchPositions();
  });
  const fetchBranchs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/core/branch`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      branchs.value = response.data.data;
      console.log(branchs.value);
  
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/core/position`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      positions.value = response.data.data;
      console.log(positions.value);
  
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.value.village) {
      alert("Please select a village before submitting.");
      return;
    }
  
    const payload = {
      branchId: form.value.branchId,
      name: form.value.name,
      en_Name: form.value.en_name,
      gender: form.value.gender,
      tel_Cellcard: form.value.tel_Cellcard,
      tel_Smart: form.value.tel_Smart,
      tel_Metfone: form.value.tel_Metfone,
      positionId: form.value.positionId,
      userId: form.value.userId,
      villageCode: form.value.village,
    };
  
    console.log("Submitting Form with payload:", payload);
  
    try {
      const response = await axios.post(`${baseUrl}/staff`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const responseData = await response.json();
      console.log("Response from API:", responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
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
  
  i.fas {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
  }
  </style>
  