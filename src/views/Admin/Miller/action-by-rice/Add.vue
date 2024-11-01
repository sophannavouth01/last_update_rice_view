<template>
	<div class="bg-white h-hvd rounded-lg pb-5">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">បង្កើតទិន្នន័យទិញបន្ថែម</p>
		<!-- Display Agent Details -->
		<form @submit.prevent="updateAgent">
			<div class="my-5">
				<div class="grid md:grid-cols-3 md:gap-6">
					<!-- ឈ្មោះ -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[150px] pt-2 text-md text-gray-700">
							ឈ្មោះ:
						</label>
						<input class="w-full siemreap-regular text-gray-700 text-bold border px-3 py-2 rounded-lg">
							
						</input>
					</div>
					<!-- ទម្ងន់ -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[150px] pt-2 text-md text-gray-700">
							ទម្ងន់:
						</label>
                        <input class="w-full siemreap-regular text-gray-700 text-bold border px-3 py-2 rounded-lg">
							
						</input>
					</div>
					<!-- ចំនួន -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[150px] pt-2 text-md text-gray-700">
							ចំនួន:
						</label>
                        <input class="w-full siemreap-regular text-gray-700 text-bold border px-3 py-2 rounded-lg">
                            
						</input>
					</div>
                    <!-- ទឹកប្រាក់ -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[150px] pt-2 text-md text-gray-700">
							ទឹកប្រាក់:
						</label>
                        <input class="w-full siemreap-regular text-gray-700 text-bold border px-3 py-2 rounded-lg">
                            
						</input>   
					</div>
                    <!-- កាលបរិច្ឆេទ -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[150px] pt-2 text-md text-gray-700">
							កាលបរិច្ឆេទ:
						</label>
                        <input class="w-full siemreap-regular text-gray-700 text-bold border px-3 py-2 rounded-lg">
                            
						</input>
					</div>
                    <!-- បង្កើតដោយ -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[150px] pt-2 text-md text-gray-700">
							បង្កើតដោយ:
						</label>
                        <input class="w-full siemreap-regular text-gray-700 text-bold border px-3 py-2 rounded-lg">
                            
						</input>  
					</div>
				</div>
				<div class="flex justify-end mt-4 mr-5 ">
					<button type="submit" class="px-4 py-2 bg-[#00992B] text-white rounded">
						យល់ព្រមបង្កើត
					</button>
				</div>
			</div>
		</form>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
const authToken = import.meta.env.VITE_API_AUTH_TOKEN; // Ensure this is defined in your .env file
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const agent = ref({
	id: "",
	name: "",
	gender: "",
	dob: "",
	tel1: "",
	tel2: "",
	tel3: "",
	positionId: null, // Update to match the API structure
	commission: 0,
	branchId: 0,
	villageCode: "",
	active: true,
	created_By: "",
	created_At: "",
	updated_By: "",
	updated_At: "",
});

const positions = ref([]); // To store the positions data

const formattedDob = computed({
	get() {
		return agent.value.dob ? agent.value.dob.split("T")[0] : "";
	},
	set(value) {
		agent.value.dob = value;
	},
});
const fetchPositions = async () => {
	try {
		const response = await axios.get(`${apiBaseUrl}/core/position`, {
			headers: {
				Authorization: `Bearer ${authToken}`, // Check that this header is correctly set
			},
		});
		positions.value = response.data.data;
	} catch (error) {
		console.error("Error fetching positions:", error);
	}
};

console.log("API Base URL:", apiBaseUrl);

const updateAgent = async () => {
	try {
		const response = await axios.put(`${apiBaseUrl}/agent/${agent.value.id}`, {
			name: agent.value.name,
			gender: agent.value.gender,
			dob: agent.value.dob,
			tel1: agent.value.tel1,
			tel2: agent.value.tel2,
			tel3: agent.value.tel3,
			positionId: agent.value.positionId,
			commission: agent.value.commission,
			branchId: agent.value.branchId,
			villageCode: agent.value.villageCode,
			active: agent.value.active,
			created_By: agent.value.created_By,
			created_At: agent.value.created_At,
			updated_By: agent.value.updated_By,
			updated_At: agent.value.updated_At,
		});
		alert("Agent updated successfully");
	} catch (error) {
		alert("Error updating agent");
		console.error(error);
	}
};

onMounted(() => {
	fetchPositions(); // Fetch position data when the component is mounted
});
</script>

<style scoped>
.moul-regular {
	font-family: 'Moul', serif;
	font-weight: 200;
	font-style: normal;
}

.siemreap-regular {
	font-family: 'Siemreap', sans-serif;
    font-size: 14px;
}
</style>