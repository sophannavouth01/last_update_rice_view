<template>
	<div class="bg-[#FAFAFA]">
		<div class="grid grid-cols-5 gap-5 h-screen">
			<!-- sidebar -->
			<div class="bg-[#FFFFFF] custom-shadow-right">
				<div class="w-full my-5 h-auto flex justify-center cursor-pointer">
					<img class="w-[121px] h-[105px]" src="../assets/logo.png" alt="" />
				</div>
				<router-link to="/dashboard"
					class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-house-chimney text-[20px] hover:text-white text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px]">
						<p class="siemreap-regular text-[18px]">ទំព័រដើម</p>
					</div>
				</router-link>
				<!-- ភ្នាក់ងារភូមិ នឹង អតិថិជន Dropdown -->
				<div @click="toggleAgentDropdown" v-if="role==='Master Admin' || role === 'Admin' || role === 'នាយកប្រតិបត្តិ' || role === 'User'"
					class="hover:bg-[#00992B] my-2 text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-people-roof text-[20px] text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[18px]">
							ភ្នាក់ងារភូមិ នឹង អតិថិជន
						</p>
						<i :class="[
							'fa-solid',
							AgentDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down',
						]" style="margin-top: 6px"></i>
					</div>
				</div>
				<!-- Dropdown Content -->
				<div v-if="AgentDropdownOpen" class="ml-[40px] mt-2">
					<router-link to="/agent"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ទិន្នន័យភ្នាក់ងារ</p>
						</div>
					</router-link>

					<router-link to="/customer"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">បញ្ជីអតិថិជន</p>
						</div>
					</router-link>
				</div>
				<!-- ស្នើ នឹង ដាក់ស្នើរ Dropdown -->
				<div @click="toggleOrderDropdown" v-if=" role==='Master Admin' || role === 'Admin' || role === 'នាយកប្រតិបត្តិ' || role === 'User'"
					class="hover:bg-[#00992B] my-2 text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-truck-arrow-right text-[20px] text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[18px]">ស្នើ នឹង ដាក់ស្នើរ</p>
						<i :class="['fa-solid', OrderDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down',]"
							style="margin-top: 6px"></i>
					</div>
				</div>
				<div v-if="OrderDropdownOpen" class="ml-[40px] mt-2">
					<router-link to="/order"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ភ្នាក់ងារស្នើកម្ចី</p>
						</div>
					</router-link>
					<router-link to="/provider-order"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ដាក់ស្នើរភ្នាក់ងារ</p>
						</div>
					</router-link>
					<router-link to="/record-provider"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">សំណើរបានដាក់ភ្នាក់ងារ</p>
						</div>
					</router-link>
					<router-link to="/record-reject"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">សំណើរបដិសេដភ្នាក់ងារ</p>
						</div>
					</router-link>
					<router-link to="/provide-customer"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ដាក់សំណើរអតិថិជន</p>
						</div>
					</router-link>
				</div>
				<!-- ប្រតិបត្តិការប្រមូលលុយ Dropdown -->
				<div @click="toggleEFormDropdown" v-if="role==='Master Admin' || role === 'Admin' || role === 'នាយកប្រតិបត្តិ' || role === 'User'"
					class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-boxes-packing text-[20px] text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[18px]">ប្រតិបត្តិការប្រមូលលុយ</p>
						<i :class="[
							'fa-solid ',
							eFormDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down',
						]" style="margin-top: 6px"></i>
					</div>
				</div>
				<!-- Dropdown Content -->
				<div v-if="eFormDropdownOpen" class="ml-[40px] mt-2">
					<router-link to="/name-customer-college"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative mt-2">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">
								បញ្ជីអតិថិជនត្រូវប្រមូល
							</p>
						</div>
					</router-link>
					<router-link to="/colleg-money"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">បញ្ជីអតិថិជនបានប្រមូល</p>
						</div>
					</router-link>
				</div>
				<!-- រោងម៉ាស៊ីន Dropdown -->
				<div @click="toggleCompanyDropdown" v-if="role==='Master Admin' || role === 'Admin' || role === 'នាយកប្រតិបត្តិ'"
					class="hover:bg-[#00992B] my-2 text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-building-wheat text-[20px] text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[18px]">រោងម៉ាស៊ីន</p>
						<i :class="[
							'fa-solid',
							CompanyDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down',
						]" style="margin-top: 6px"></i>
					</div>
				</div>
				<!-- Dropdown Content -->
				<div v-if="CompanyDropdownOpen" class="ml-[40px] mt-2">
					<router-link to="/miller"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">បញ្ជីឈ្មោះរោងម៉ាស៊ីន</p>
						</div>
					</router-link>
					<router-link to="/data-buy-rice"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ទិន្ន័យទិញស្តុកអង្ករ</p>
						</div>
					</router-link>
					<router-link to="/deduct-miller"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ដកអង្ករពីរោងម៉ាសុីន</p>
						</div>
					</router-link>
					<router-link to="/provider-branch"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">បែងចែកទៅសាខា</p>
						</div>
					</router-link>
					<router-link to="/provider-agent"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">បែងចែកទៅភ្នាក់ងារ</p>
						</div>
					</router-link>
				</div>
				
				<!-- ស្តុកអង្ករ Dropdown -->
				<div @click="toggleStockDropdown" v-if="role==='Master Admin' || role === 'Admin' || role === 'នាយកប្រតិបត្តិ' || role === 'User'"
					class="hover:bg-[#00992B] my-2 text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-database text-[20px] text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[18px]">ស្តុកអង្ករ</p>
						<i :class="[
							'fa-solid',
							StockDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down',
						]" style="margin-top: 6px"></i>
					</div>
				</div>
				<!--​ស្តុកអង្ករ Dropdown Content -->
				<div v-if="StockDropdownOpen" class="ml-[40px] mt-2">
					<router-link to="/stock"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ស្តុកអង្ករក្នុងរោងម៉ាសុីន</p>
						</div>
					</router-link>
					<router-link to="/stockDeductfromMiller"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ស្តុកអង្ករដែលបានដក</p>
						</div>
					</router-link>
					<router-link to="/stockToBranch"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ស្តុកអង្ករក្នុងសាខា</p>
						</div>
					</router-link>
					<router-link to="/stock-agent"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ស្តុកអង្ករភ្នាក់ងារ</p>
						</div>
					</router-link>
					
				</div>
				<!-- បុគ្គលិក Dropdown -->
				<div @click="toggleStaffDropdown" v-if="role==='Master Admin' || role === 'Admin' || role === 'នាយកប្រតិបត្តិ' || role === 'User'"
					class="hover:bg-[#00992B] my-2 text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-users-gear text-[20px] text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[18px]">បុគ្គលិក</p>
						<i :class="[
							'fa-solid',
							StaffDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down',
						]" style="margin-top: 6px"></i>
					</div>
				</div>
				<!-- Dropdown Content -->
				<div v-if="StaffDropdownOpen" class="ml-[40px] mt-2">
					<router-link to="/staff"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ទិន្នន័យបុគ្គលិក</p>
						</div>
					</router-link>
					<router-link to="/position"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">មុខតំណែង</p>
						</div>
					</router-link>
					<router-link to="/branch"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">សាខា</p>
						</div>
					</router-link>
					<!-- <router-link to="/increase-Salary"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ទិន្នន័យដំឡើងប្រាក់ខែ</p>
						</div>
					</router-link>
					<router-link to="/payroll"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ការបើកប្រាក់ខែ</p>
						</div>
					</router-link> -->
				</div>
				<!-- Setting Dropdown -->
				<div v-if="role==='Master Admin' || role === 'Admin' || role === 'នាយកប្រតិបត្តិ'" @click="toggleUserDropdown"
					class="hover:bg-[#00992B] my-2 text-[#00992B] hover:text-white rounded-s-md ml-[20px] flex group relative">
					<div class="p-[10px] w-[50px]">
						<i class="fa-solid fa-gears text-[20px] text-[#00992B]"></i>
					</div>
					<div class="py-[10px] mx-[10px] flex justify-between w-full">
						<p class="siemreap-regular text-[18px]">ការកំណត់</p>
						<i :class="[
							'fa-solid',
							UserDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down',
						]" style="margin-top: 6px"></i>
					</div>
				</div>
				<!-- Dropdown Content -->
				<div v-if="UserDropdownOpen" class="ml-[40px] mt-2">
					<router-link to="/user"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">អ្នកប្រើប្រាស់</p>
						</div>
					</router-link>
					<router-link to="/role"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">សិទ្ធប្រើប្រាស់</p>
						</div>
					</router-link>
					<router-link to="/change-password"
						class="hover:bg-[#00992B] text-[#00992B] hover:text-white rounded-s-md flex group relative">
						<div class="p-[10px] w-[50px]">
							<i class="fa-solid fa-minus text-[20px] pt-2"></i>
						</div>
						<div class="py-[10px] mx-[10px]">
							<p class="siemreap-regular text-[18px]">ផ្លាស់ប្ដូរលេខសម្ងាត់</p>
						</div>
					</router-link>
				</div>
			</div>

			<!-- content -->
			<div class="col-span-4">
				<div class="m-5 rounded-sm flex justify-between bg-white">
					<div class="flex gap-5 py-5 px-5">
						<p class="text-[#00992B] text-[13px] hidden md:block font-semibold">
							{{ currentTime }}
						</p>
						<p class="text-[#00992B] text-[13px] hidden md:block font-semibold">
							{{ currentDate }}
						</p>
					</div>
					<div class="relative">
						<p @click="toggleDropdown"
							class="cursor-pointer pt-5 pr-5 text-[#00992B] text-[13px] font-semibold">
							{{ username }}
						</p>

						<div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
							<router-link to="/profile"
								class="block px-4 py-2 text-[#00992B] hover:bg-gray-200">Profile</router-link>
							<button @click="handleLogout"
								class="block w-full text-left px-4 py-2 text-[#EC0404] hover:bg-gray-200">
								Logout
							</button>
						</div>
					</div>
				</div>
				<div class="m-5 h-auto">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentTime: "",
			currentDate: "",
			showDropdown: false,
			UserDropdownOpen: false,
			eFormDropdownOpen: false,
			ControlDropdownOpen: false,
			CompanyDropdownOpen: false,
			AgentDropdownOpen: false,
			StockDropdownOpen: false,
			StaffDropdownOpen: false,
			OrderDropdownOpen: false,
			username: "Guest", // default username if no one is logged in
			role: null, // default role
		};
	},
	created() {
		this.loadUserFromStorage();
		this.updateTime();
		setInterval(this.updateTime, 1000);
	},
	methods: {
		loadUserFromStorage() {
			const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
			if (storedUser && storedUser.username) {
				this.username = storedUser.username;
				this.role = storedUser.roles[0]; // Assign the first role from the list of roles
			}
		},
		handleLogout() {
			// Clear all data from localStorage
			localStorage.clear();

			// Redirect to login page
			this.$router.push({ path: "/" });
		},
		updateTime() {
			const now = new Date();
			this.currentTime = now.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});
			this.currentDate = now.toLocaleDateString([], {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		},
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		},
		toggleUserDropdown() {
			this.UserDropdownOpen = !this.UserDropdownOpen;
		},
		toggleEFormDropdown() {
			this.eFormDropdownOpen = !this.eFormDropdownOpen;
		},
		toggleControlDropdown() {
			this.ControlDropdownOpen = !this.ControlDropdownOpen;
		},
		toggleCompanyDropdown() {
			this.CompanyDropdownOpen = !this.CompanyDropdownOpen;
		},
		toggleAgentDropdown() {
			this.AgentDropdownOpen = !this.AgentDropdownOpen;
		},
		toggleStockDropdown() {
			this.StockDropdownOpen = !this.StockDropdownOpen;
		},
		toggleStaffDropdown() {
			this.StaffDropdownOpen = !this.StaffDropdownOpen;
		},
		toggleOrderDropdown() {
			this.OrderDropdownOpen = !this.OrderDropdownOpen;
		},
	},
};
</script>
