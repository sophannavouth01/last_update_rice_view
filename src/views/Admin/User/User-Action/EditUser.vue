<template>
	<div class="bg-white h-screen">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">បង្កើតអ្នកប្រើប្រាស់</p>
		<div>
			<section class="py-1 bg-blueGray-50">
				<div class="w-full lg:w-12/12 mx-auto mt-6">
					<div
						class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
						<form>
							<div class="flex flex-wrap">
								<div class="w-full lg:w-6/12">
									<div class="relative w-full flex mb-5">
										<label class="block pt-4 w-[200px]  px-4 text-blueGray-600 text-xs font-bold mb-2"
											htmlfor="username">
										role	name
										</label>
										<input type="text" v-model="form.name"
											class="border-0 px-3 mr-5 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
									</div>
								</div>
								<div class="w-full lg:w-6/12 pr-4">
									<div class="relative w-full flex mb-5">
										<label
											class="block pt-4 px-4 w-[200px] text-blueGray-600 text-xs font-bold mb-2"
											htmlfor="email">
											description
										</label>
										<input type="email" v-model="form.descriotion"
											class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
									</div>
								</div>
							</div>
							

						</form>
						<footer class="relative pt-8 pb-6 mt-2">
							<div class="container mx-auto px-4">
								<div class="flex flex-wrap items-center md:justify-between justify-center">
									<div class="w-full md:w-6/12 px-4 mx-auto text-center">
										<div class="text-sm text-blueGray-500 font-semibold py-1">
											<button @click="handleSubmit"
												class="bg-[#00992B] rounded-md text-white px-5 py-3">Submit</button>
										</div>
									</div>
								</div>
							</div>
						</footer>
					</div>
				</div>
			</section>
		</div>
	</div>



</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const form = ref({
	name: '',
	description: ''
});

const getToken = () => {
  return localStorage.getItem('authToken');
};
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
const handleSubmit = async () => {
	const payload = {
		name: form.value.name,
		description: form.value.description,
		
	};
	try {
		const response = await axios.post(`${baseUrl}/role`, payload);
		console.log('Form submission response:', response.data);

		Swal.fire('Success!', 'User created successfully!.', 'success');
		form.value = {
			name: '',
			description: '',
		};
	} catch (error) {
		console.error('Form submission error:', error);
		Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
	}
};

</script>

<style scoped>
.moul-regular {
	font-family: 'Moul', serif;
	font-weight: 400;
	font-style: normal;
}

.siemreap-regular {
	font-family: 'Siemreap', sans-serif;
}

i.fas {
	font-family: 'Font Awesome 5 Free';
	font-weight: 900;
}
</style>
