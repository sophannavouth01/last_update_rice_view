<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
	  <p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
		កែសំណើរស្នើរខ្ចីអង្ករ
	  </p>
	  <div>
		<section class="bg-blueGray-50">
		  <div class="w-full lg:w-12/12 mx-auto mt-6">
			<form @submit.prevent="handleSubmit">
			  <div class="flex flex-wrap">
				<!-- Agents -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ភ្នាក់ងារ</label>
				  <input type="text" v-model="form.khmerName" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- EnName -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ឈ្មោះឡាតាំង</label>
				  <input type="text" v-model="form.EnName" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Gender -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ភេទ</label>
				  <input type="text" v-model="form.gender" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Email -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">អ៊ីម៉ែល</label>
				  <input type="text" v-model="form.Email" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Phone 1 -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">Phone1</label>
				  <input type="text" v-model="form.Phone1" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Phone 2 -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">Phone2</label>
				  <input type="text" v-model="form.Phone2" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Phone 3 -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">Phone3</label>
				  <input type="text" v-model="form.Phone3" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Branch -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">សាខា</label>
				  <input type="text" v-model="form.Branch" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Position -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">មុខតំណែង</label>
				  <input type="text" v-model="form.Position" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Province -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ខេត្ត</label>
				  <input type="text" v-model="form.Province" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- District -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ស្រុក</label>
				  <input type="text" v-model="form.District" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Commune -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ឃុំ</label>
				  <input type="text" v-model="form.Commune" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Village -->
				<div class="w-full lg:w-4/12 mb-6 px-4">
				  <label class="block text-sm mb-2">ភូមិ</label>
				  <input type="text" v-model="form.Village" disabled
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Total -->
				<div class="w-full lg:w-4/12 pr-2 mb-6 px-4">
				  <label class="block text-sm mb-2">ចំនួនសរុប (Total)</label>
				  <input type="number" v-model="form.Total" @input="calculateQuantity" required
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Quantity (automatically calculated) -->
				<div class="w-full lg:w-4/12 pr-2 mb-6 px-4">
				  <label class="block text-sm mb-2">ចំនួនអង្ករ (Quantity)</label>
				  <input type="number" v-model="form.Quantity" disabled
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
  
				<!-- Price -->
				<div class="w-full lg:w-4/12 pr-2 mb-6 px-4">
				  <label class="block text-sm mb-2">តម្លៃសរុប (Price)</label>
				  <input type="number" v-model="form.Price" required
					class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
				</div>
			  </div>
  
			  <!-- Submit Button -->
			  <footer class="w-full relative pt-8 pb-6">
				<div class="flex justify-end">
				  <button type="submit" class="bg-[#00992B] rounded-md text-white px-5 py-3 text-sm font-medium">យល់ព្រមកែប្រែ</button>
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
import { useRouter, useRoute } from "vue-router";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();
const route = useRoute();
const orderId = route.params.id;  // Get the order ID from the route

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
	Total: 0,   // Add Total field
	Quantity: 0,  // Add Quantity field
	Price: "",   // Add Price as editable field
	Status: "ស្នើរសុំ",
	UpdateDateTime: "",  // Add UpdateDateTime field
});

// Fetch existing order data on mount
onMounted(() => {
	fetchOrderDetails();
});

// Fetch order data by ID
const fetchOrderDetails = async () => {
	try {
		const response = await axios.get(`${baseUrl}/Orders/${orderId}`);
		Object.assign(form.value, response.data);  // Populate form with fetched data
	} catch (error) {
		console.error("Error fetching order:", error);
	}
};

// Calculate the quantity and price based on the total input
const calculateQuantity = () => {
	form.value.Quantity = form.value.Total * 50; // Calculate the quantity as 50 * Total
	form.value.Price = form.value.Total * 125000; // Calculate the price as Total * 125000
};


// Handle form submission for updating the order
const handleSubmit = async () => {
	// Get current date and time
	const now = new Date();
	const currentDateTime = now.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ

	// Include the updated date-time in the payload
	const payload = {
		Total: form.value.Total,
		Quantity: form.value.Quantity,  // Only send the updated quantity
		Price: form.value.Price,        // Include the updated price
		UpdateDateTime: currentDateTime,  // Add updated date-time
	};

	try {
		const response = await axios.patch(`${baseUrl}/Orders/${orderId}`, payload);
		console.log("Order updated successfully:", response.data);
		router.push("/order");  // Redirect after successful update
	} catch (error) {
		console.error("Error updating order:", error);
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
