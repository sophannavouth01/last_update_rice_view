<template>
	<div
	  class="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 pr-4">
	  <p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">
		បង្កើតអ្នកប្រើប្រាស់
	  </p>
	  <div>
		<section class="py-1 bg-blueGray-50">
		  <div class="w-full lg:w-12/12 mx-auto mt-6">
			<div class="flex flex-wrap">
			  <div class="w-full lg:w-6/12 pr-2">
				<div class="relative w-full flex mb-5">
				  <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="username">
					ឈ្មោះ
				  </label>
				  <input type="text" v-model="form.username"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
				</div>
			  </div>
			  <div class="w-full lg:w-6/12 pl-2">
				<div class="relative w-full flex mb-5">
				  <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="email">
					អុីម៉ែល
				  </label>
				  <input type="email" v-model="form.email"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
				</div>
			  </div>
			</div>
  
			<div class="flex flex-wrap">
			  <div class="w-full lg:w-6/12 ">
				<div class="relative w-full flex mb-5">
				  <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="password">
					លេខសម្ងាត់
				  </label>
				  <div class="relative w-full flex items-center pr-2">
					<input :type="passwordVisible ? 'text' : 'password'" v-model="form.password"
					  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
					<span @click="togglePasswordVisibility" class="absolute right-4 cursor-pointer">
					  <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'
						"></i>
					</span>
				  </div>
				</div>
			  </div>
			  <div class="w-full lg:w-6/12 pl-2">
				<div class="relative w-full flex mb-3">
				  <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2"
					htmlfor="confirm-password">
					បញ្ជាក់លេខសម្ងាត់
				  </label>
				  <div class="relative w-full flex items-center">
					<input :type="confirmPasswordVisible ? 'text' : 'password'" v-model="form.confirmPassword"
					  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
					<span @click="toggleConfirmPasswordVisibility" class="absolute right-4 cursor-pointer">
					  <i :class="confirmPasswordVisible
						  ? 'fas fa-eye-slash'
						  : 'fas fa-eye'
						"></i>
					</span>
				  </div>
				</div>
			  </div>
			</div>
  
			<div class="flex flex-wrap mb-5">
			  <div class="w-full lg:w-6/12 pr-2">
				<div class="relative w-full flex mb-3">
				  <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="branch">
					សាខា
				  </label>
				  <select v-model="form.branch"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
					<option v-for="branch in branchs" :key="branch.id" :value="branch.id">
					  {{ branch.name }}
					</option>
				  </select>
				</div>
			  </div>
			  <div class="w-full lg:w-6/12 pl-2">
				<div class="relative w-full flex mb-3">
				  <label class="block w-[200px] pt-4 px-4 text-blueGray-600 text-sm mb-2" htmlfor="role">
					សិទ្ធ
				  </label>
				  <select v-model="form.role"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
					<option v-for="role in roles" :key="role.id" :value="role">
					  {{ role.name }}
					</option>
				  </select>
				</div>
			  </div>
			</div>
  
			<!-- Active Field -->
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
					ប្តូរលេខសម្ងាត់
				  </label>
				  <input type="checkbox" v-model="form.allowResetPassword" id="allowResetPassword"
					class="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out" />
				</div>
			  </div>
			  <footer class="w-full relative pt-8 pb-6 ">
				<div class="container mx-auto px-4">
				  <div class="flex flex-wrap items-center md:justify-end justify-end ">
					<div class="text-sm text-blueGray-500 py-1">
					  <button @click="handleSubmit" class="bg-[#00992B] rounded-md text-white px-5 py-3">
						បញ្ជូន
					  </button>
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
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useStore } from "vuex";
  import Swal from "sweetalert2";
  import { useRouter } from "vue-router";
  
  const store = useStore();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const router = useRouter(); // Get the router instance
  
  const form = ref({
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: null, // Start with null or an empty object if no role is selected
	branch: "",
	active: false,
	allowResetPassword: false,
  });
  
  const roles = ref([]);
  const branchs = ref([]);
  
  const passwordVisible = ref(false);
  const confirmPasswordVisible = ref(false);
  
  const togglePasswordVisibility = () => {
	passwordVisible.value = !passwordVisible.value;
  };
  
  const toggleConfirmPasswordVisibility = () => {
	confirmPasswordVisible.value = !confirmPasswordVisible.value;
  };
  
  const fetchBranchs = async () => {
	try {
	  const response = await axios.get(`${baseUrl}/core/branch`, {
		headers: { Authorization: `Bearer ${getToken()}` },
	  });
	  branchs.value = response.data.data; // Ensure this matches your API response
	} catch (error) {
	  console.error("Error fetching branches:", error);
	}
  };
  
  const fetchRoles = async () => {
	try {
	  const response = await axios.get(`${baseUrl}/role`, {
		headers: { Authorization: `Bearer ${getToken()}` },
	  });
	  roles.value = response.data; // Ensure this matches your API response
	} catch (error) {
	  console.error("Error fetching roles:", error);
	}
  };
  
  const getToken = () => {
	return localStorage.getItem("authToken");
  };
  
  const handleSubmit = async () => {
	// Retrieve the logged-in user's ID from the Vuex store
	const createdBy = store.getters.getUserId;
  
	// Prepare the payload with the actual user ID
	const payload = {
	  userName: form.value.username,
	  branchId: parseInt(form.value.branch),
	  email: form.value.email,
	  roleName: form.value.role ? form.value.role.name : "", // Ensure roleName is set correctly
	  password: form.value.password,
	  confirmPassword: form.value.confirmPassword,
	  allowResetPassword: form.value.allowResetPassword,
	  active: form.value.active,
	  created_At: new Date().toISOString(),
	  created_By: createdBy, // Use the actual user ID from the store
	};
  
	try {
	  // Send POST request to the API
	  const response = await axios.post(`${baseUrl}/user`, payload);
	  console.log("Form submission response:", response.data);
  
	  Swal.fire("Success!", "User created successfully!.", "success");
	  router.push("/user"); // Change '/success-route' to your desired path
  
	  // Reset the form
	  form.value = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: null, // Reset role to null
		branch: "",
		active: false,
		allowResetPassword: false,
	  };
	} catch (error) {
	  console.error("Form submission error:", error);
	  Swal.fire("Error!", "An error occurred. Please try again.", "error");
	}
  };
  
  // Fetch roles and branches when the component is mounted
  onMounted(() => {
	fetchRoles();
	fetchBranchs();
  });
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
  