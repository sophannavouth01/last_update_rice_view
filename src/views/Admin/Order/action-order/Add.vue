<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
	  <p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
		បង្កើតសំណើរស្នើរខ្ចីអង្ករ
	  </p>
	  <div>
		<section class="bg-blueGray-50">
		  <div class="w-full lg:w-12/12 mx-auto mt-6">
			<form @submit.prevent="handleSubmit">
			  <div class="flex flex-wrap">
				<!-- Agents -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ភ្នាក់ងារ</label>
				  <select v-model="selectedAgent" @change="fillAgentDetails" required
					class="border px-3 py-2 text-sm text-blueGray-600 focus:outline-none focus:ring w-full">
					<option v-for="agent in agents" :key="agent.id" :value="agent">
					  {{ agent.khmerName }}
					</option>
				  </select>
				</div>
  
				<!-- EnName -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ឈ្មោះឡាតាំង</label>
				  <input type="text" v-model="form.EnName" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Gender -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ភេទ</label>
				  <input type="text" v-model="form.gender" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Email -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">អ៊ីម៉ែល</label>
				  <input type="text" v-model="form.Email" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Phone 1 -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">Phone1</label>
				  <input type="text" v-model="form.Phone1" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Phone 2 -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">Phone2</label>
				  <input type="text" v-model="form.Phone2" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Phone 3 -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">Phone3</label>
				  <input type="text" v-model="form.Phone3" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Branch -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">សាខា</label>
				  <input type="text" v-model="form.Branch" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Position -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">មុខតំណែង</label>
				  <input type="text" v-model="form.Position" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Province -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ខេត្ត</label>
				  <input type="text" v-model="form.Province" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- District -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ស្រុក</label>
				  <input type="text" v-model="form.District" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Commune -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ឃុំ</label>
				  <input type="text" v-model="form.Commune" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Village -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ភូមិ</label>
				  <input type="text" v-model="form.Village" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Total -->
				<div class="w-full lg:w-4/12 pr-2 mb-6 px-4">
				  <label class="block text-sm mb-2">ចំនួនសរុប (Total)</label>
				  <input type="number" v-model="form.Total" @input="calculateQuantity" required
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Quantity -->
				<div class="w-full lg:w-4/12 pr-2 mb-6 px-4">
				  <label class="block text-sm mb-2">ចំនួនអង្ករ (Quantity)</label>
				  <input type="number" v-model="form.Quantity" disabled
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Price -->
				<div class="w-full lg:w-5/12 pr-2 mb-6 px-4">
				  <label class="block text-sm mb-2">តម្លៃសរុប (Price)/រៀល</label>
				  <input type="number" v-model="form.Price" required
					class="border px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full" />
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
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();

// Form data
const form = ref({
	Agent: "",
	khmerName: "",
	EnName: "",
	gender: "",
	Branch: "",
	Position: "",
	Province: "",
	District: "",
	Commune: "",
	Village: "",
	Phone1: "",
	Phone2: "",
	Phone3: "",
	Email: "",
	Total: 0,  // User inputs the Total
	Quantity: 0,  // Quantity will be calculated as 50 * Total
	Price: 0,
	Status: "ស្នើរសុំ",
	CreateDateTime: "",  // Add the CreateDateTime field
});

// Agents array
const agents = ref([]);
const selectedAgent = ref(null);

// Fetch agents on mount
onMounted(() => {
	fetchAgents();
});

// Fetch agent data
const fetchAgents = async () => {
	try {
		const response = await axios.get(`${baseUrl}/Agents`);
		agents.value = response.data.filter(agents => agents.Status === 'Active');
	} catch (error) {
		console.error("Error fetching agents:", error);
	}
};

// Fill form with selected agent's data
const fillAgentDetails = () => {
	if (selectedAgent.value) {
		form.value.khmerName = selectedAgent.value.khmerName;
		form.value.EnName = selectedAgent.value.EnName;
		form.value.gender = selectedAgent.value.gender;
		form.value.Branch = selectedAgent.value.Branch;
		form.value.Position = selectedAgent.value.Position;
		form.value.Province = selectedAgent.value.Province;
		form.value.District = selectedAgent.value.District;
		form.value.Commune = selectedAgent.value.Commune;
		form.value.Village = selectedAgent.value.Village;
		form.value.Phone1 = selectedAgent.value.Phone1;
		form.value.Phone2 = selectedAgent.value.Phone2;
		form.value.Phone3 = selectedAgent.value.Phone3;
		form.value.Email = selectedAgent.value.Email;
	}
};

// Calculate the quantity and price based on the total input
const calculateQuantity = () => {
	form.value.Quantity = form.value.Total * 50; // Calculate the quantity as 50 * Total
	form.value.Price = form.value.Total * 125000; // Calculate the price as Total * 125000
};

// Handle form submission
const handleSubmit = async () => {
	// Get current date and time
	const now = new Date();
	const currentDateTime = now.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ

	// Include the current date-time in the payload
	const payload = {
		...form.value,  // Include all form fields
		CreateDateTime: currentDateTime,  // Set the CreateDateTime field with the current date-time
	};

	try {
		const response = await axios.post(`${baseUrl}/Orders`, payload);
		console.log("Order created successfully:", response.data);
		Swal.fire("Success!", "Order created successfully!.", "success");
		router.push("/order");
	} catch (error) {
		console.error("Error creating order:", error);
		Swal.fire("Error!", "Creating Order. Please try again.", "error");

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
