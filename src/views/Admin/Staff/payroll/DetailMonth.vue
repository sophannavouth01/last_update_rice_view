<template>
	<div class="bg-white shadow-md rounded-lg ">
		<p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">បើកប្រាក់ខែមករា ឆ្នាំ២០២៤</p>
		<div class="flex justify-between px-5 py-3 mb-3">
			<div></div>
			<!-- <div class="order-last">
				<button
					class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">បង្កើតសិទ្ធ</button>
			</div> -->
		</div>

		<div class="overflow-x-auto rounded-lg px-5 pb-5">
			<table class="w-full table-radius text-sm text-left text-gray-700"
				style="border-radius: 10px; overflow: hidden; ">
				<thead class="text-xs text-gray-700 bg-gray-100">
					<tr class="text-[14px]">
						<th
							class="px-6 py-3 border text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ល.រ
						</th>
						<th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ឈ្មោះនិយោជិក
						</th>
						<th class="px-6 py-3  border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							មុខតំណែង</th>
							<th class="px-6 py-3 text-center border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
								សាខា</th>
						<th class="px-6 py-3 text-center border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ខេត្ត
						</th>
						<th class="px-6 py-3 border text-center whitespace-nowrap overflow-hidden text-ellipsis moul-regular">
							ប្រាក់ខែសរុប
						</th>
						<th
							class="px-6 border moul-regular w-32 py-3 whitespace-nowrap overflow-hidden text-ellipsis text-center">
							លម្អិត
						</th>
					</tr>
				</thead>
				<tbody style="border-radius: 10px;">
					<tr v-for="(item, index) in payrollItems" :key="index"
						class="bg-white border hover:bg-[#00992B] hover:text-white">
						<td class="w-[30px] border px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
							{{ index + 1 }}
						</td>
						<td class="siemreap-regular px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.employeeName }}</td>
						<td class="siemreap-regular  px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.position }}</td>
							<td class="siemreap-regular text-center px-6 py-4 border whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.branch }}</td>
						<td class="siemreap-regular px-6 py-4 text-center border whitespace-nowrap overflow-hidden text-ellipsis">{{
							item.province }}</td>

						<!-- <td class=" siemreap-regular px-6 py-4  text-center font-bold border whitespace-nowrap overflow-hidden text-ellipsis">
							{{ item.totalSalary | currency }}</td> -->
						<td
							class="siemreap-regular flex justify-center border px-2 py-2 text-center w-[150px] border-gray-200">
							<router-link :to="`/payroll-detail-month-persional/${item.employeeId}`">
								<button
									class="px-4 py-2 bg-blue-50 text-center text-[#00992B] rounded-md">លម្អិត</button>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';

const payrollItems = ref([
	{ employeeId: 1, employeeName: 'នាង គឹមសុខ', position: 'ដឹកជញ្ជូន', totalSalary: '1500', province: 'បាត់ដំបង', branch: 'បរវេល' },
	{ employeeId: 2, employeeName: 'លោក សុខា', position: 'ប្រធានគ្រប់គ្រង', totalSalary: '1200', province: 'ស្វាយរៀង', branch: 'ស្វាយអន្ទរ' },
	{ employeeId: 3, employeeName: 'អ៊ុំ ចន្ធី', position: 'គណនីករ', totalSalary: '1300', province: 'ភ្នំពេញ', branch: 'ស្វាយក្រៅ' }
]);

const currency = (value) => {
	return `$${Number(value).toFixed(2)}`;
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
</style>
