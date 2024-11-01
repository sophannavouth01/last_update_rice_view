<template>
	<div class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-white border-0 p-5">
		<p class="text-lg font-semibold underline text-[#00992B] moul-regular mb-6">
			ព័ត៌មានលម្អិតអតិថិជន
		</p>
		<div>
			<section class="bg-blueGray-50">
				<div class="w-full mx-auto mt-6">
					<form>
						<div class="flex flex-wrap">
							<!-- All fields are read-only -->
							<!-- Wife Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">គោតនាម</label>
								<input type="text" v-model="customer.firstName" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- Husband Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">នាម</label>
								<input type="text" v-model="customer.lastName" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>

							<!-- Husband Name -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឈ្មោះអង់គ្លេស</label>
								<input type="text" v-model="customer.enName" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភេទ</label>
								<input type="text" v-model="customer.gender" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- Date of Birth -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ថ្ងៃកំណើត</label>
								<input type="text" v-model="customer.dateOfBirth" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">មុខរបប</label>
								<input type="text" v-model="customer.position.name" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div> -->
							<!-- <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">សាខា</label>
								<input type="text" v-model="customer.branch.name" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div> -->
							<!-- Province -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ខេត្ត</label>
								<input type="text" v-model="customer.provinceName" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- District -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ស្រុក</label>
								<input type="text" v-model="customer.districtName" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- Commune -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ឃុំ</label>
								<input type="text" v-model="customer.communeName" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- Village -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភូមិ</label>
								<input type="text" v-model="customer.villageName" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">លេខទូរស័ព្ទ១</label>
								<input type="text" v-model="customer.phone1" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- Phone Number -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">លេខទូរស័ព្ទ២</label>
								<input type="text" v-model="customer.phone2" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div>
							<!-- Agent -->
							<!-- <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">ភ្នាក់ងារ</label>
								<input type="text" v-model="customer.agent.name" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div> -->
							<!-- Is Active -->
							<div class="w-full lg:w-6/12 xl:w-4/12 px-2 pt-10 flex mb-4">
								<label class="block text-sm mb-2">ស្ថានភាព</label>
								<input type="checkbox" v-model="customer.status" disabled
									class="form-checkbox mx-3 h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
							</div>
							<!-- Agent -->
							<!-- <div class="w-full lg:w-6/12 xl:w-4/12 px-2 mb-4">
								<label class="block text-sm mb-2">បង្កើតដោយ</label>
								<input type="text" v-model="customer.agent.name" disabled
									class="border px-3 py-2 text-sm text-blueGray-600 bg-gray-100 rounded w-full" />
							</div> -->

						</div>
					</form>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const customer = ref({});

axios.interceptors.request.use(config => {
	const token = localStorage.getItem('authToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => Promise.reject(error));

const fetchCustomerById = async () => {
	try {
		const response = await axios.get(`${baseUrl}/customer/${route.params.id}`);
		customer.value = response.data;
	} catch (error) {
		console.error("Error fetching customer details:", error);
	}
};

onMounted(fetchCustomerById);
</script>

<style scoped>
.moul-regular {
	font-family: 'Moul', serif;
	font-weight: 400;
	font-style: normal;
}
</style>
