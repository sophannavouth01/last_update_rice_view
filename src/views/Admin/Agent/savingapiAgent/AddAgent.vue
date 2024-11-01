<template>
	<div class="bg-white h-hvd rounded-lg pb-5">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">
			បង្កើតភ្នាក់ងារ
		</p>
		<!-- Display Agent Details -->
		<form @submit.prevent="updateAgent">
			<div class="my-5">
				<div class="grid md:grid-cols-3 md:gap-6">
					<!-- Name -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ឈ្មោះ:
						</label>
						<input type="text" class="w-full bg-white siemreap-regular border text-gray-700 px-3 py-2 rounded-lg" 
							v-model="agent.name" />
					</div>
					<!-- Gender -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ភេទ:
						</label>
						<select class="w-full siemreap-regular border px-3 py-2 rounded-lg" v-model="agent.gender">
							<option value="male">ប្រុស</option>
							<option value="female">ស្រី</option>
						</select>
					</div>
					<!-- Date of Birth -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ថ្ងៃកំណើត:
						</label>
						<input type="date" class="w-full bg-white siemreap-regular border text-gray-700 px-3 py-2 rounded-lg" 
							v-model="formattedDob" />
					</div>
					<!-- Branch Email -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							អ៊ីមែលសាខា:
						</label>
						<input type="email" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.branchEmail" />
					</div>
					<!-- Branch Name -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ឈ្មោះសាខា:
						</label>
						<input type="text" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.branchName" />
					</div>
					<!-- Branch Internet Number -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							លេខអ៊ីនធឺណិតសាខា:
						</label>
						<input type="text" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.branchInternetNumber" />
					</div>
					<!-- Position Name -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							តួនាទី:
						</label>
						<select class="w-full siemreap-regular border px-3 py-2 rounded-lg" v-model="agent.positionId">
							<option v-for="position in positions" :key="position.id" :value="position.id">
								{{ position.name }}
							</option>
						</select>
					</div>

					<!-- Address Village -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ឈ្មោះភូមិ:
						</label>
						<input type="text" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.villageCode" />
					</div>
					<!-- Address Commune -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ឈ្មោះសង្កាត់:
						</label>
						<input type="text" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.communeName" />
					</div>
					<!-- Address District -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ឈ្មោះស្រុក:
						</label>
						<input type="text" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.districtName" />
					</div>
					<!-- Address Province -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ឈ្មោះខេត្ត:
						</label>
						<input type="text" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.provinceName" />
					</div>
					<!-- Commission -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							គណនី:
						</label>
						<input type="number" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.commission" />
					</div>
					<!-- Telephone -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							លេខទូរស័ព្ទ:
						</label>
						<input type="tel" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.tel1" />
					</div>
					<!-- Additional Telephone 1 -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							លេខទូរស័ព្ទបន្ថែម ១:
						</label>
						<input type="tel" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.tel2" />
					</div>
					<!-- Additional Telephone 2 -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							លេខទូរស័ព្ទបន្ថែម ២:
						</label>
						<input type="tel" class="w-full siemreap-regular border px-3 py-2 rounded-lg"
							v-model="agent.tel3" />
					</div>
					<!-- Active Status -->
					<div class="mb-3 px-5 flex">
						<label class="block w-[300px] moul-regular pt-2 text-md text-gray-700">
							ស្ថានភាព:
						</label>
						<select class="w-full siemreap-regular border px-3 py-2 rounded-lg" v-model="agent.active">
							<option :value="true">សកម្ម</option>
							<option :value="false">អសកម្ម</option>
						</select>
					</div>
				</div>
				<div class="flex justify-end mr-5 ">
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
