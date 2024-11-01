<template>
    <div class="bg-white shadow-md rounded-lg p-5" id="payroll-pdf">
      <p class="text-lg font-semibold underline text-green-600 moul-regular">
        ការបើកប្រាក់ខែ ឈ្មោះ {{ staff.khmerName }}
      </p>
  
      <table class="w-full mt-10 table-fixed border-collapse border-gray-300">
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2">លេខសម្គាល់</td>
          <td class="border border-gray-400 px-4 py-2">{{ staff.id }}</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2">ឈ្មោះ</td>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2">{{ staff.khmerName }}</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2">ឈ្មោះឡាតាំង</td>
          <td class="border border-gray-400 px-4 py-2" colspan="6">{{ staff.EnName }}</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2">មុខតំណែង</td>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2" colspan="6">{{ staff.Position }}</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2">សម្រាប់</td>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2" colspan="6">
            ប្រាក់ខែចាប់ពីថ្ងៃទី 01 ដល់ថ្ងៃទី 30 
          </td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2">ចំនួនទឹកប្រាក់</td>
          <td class="border border-gray-400 px-4 py-2" colspan="3">US$ {{ staff.Salary }}</td>
          <td class="border border-gray-400 px-4 py-2" colspan="3">ពន្ធ : US$ 0.00</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm text-center border border-gray-400 px-4 py-2" rowspan="7">មាតិកា</td>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2" colspan="3">(ប្រាក់ខែគោល)</td>
          <td class="border border-gray-400 px-4 py-2" colspan="3">US$ {{ staff.Salary }}</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2" colspan="3">(ថ្លៃបន្ថែមម៉ោង)</td>
          <td class="border border-gray-400 px-4 py-2" colspan="3">US$ 00.00</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2 text-right" colspan="3">ទៀងទាត់</td>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2" colspan="3">មកធម្មតា</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2 text-right" colspan="3">
            ថ្ងៃឈប់សម្រាក
          </td>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2" colspan="3">សម្រាកធម្មតា</td>
        </tr>
        <tr>
          <td class="siemreap-regular text-sm border border-gray-400 px-4 py-2 text-right font-bold" colspan="5">
            សរុបនៃប្រាក់ខែ NET:
          </td>
          <td class="border border-gray-400 bg-yellow-200 flex justify-between items-center px-4 py-2" colspan="2">
            <span>$</span>
            <span>{{ staff.Salary }}.00</span>
          </td>
        </tr>
      </table>
  
      <div class="grid grid-cols-6 my-3">
        <div class="col-span-4">
          <p class="siemreap-regular text-[14px] text-black">ចុះហត្ថលេខាដោយ</p>
        </div>
        <div class="col-span-2">
          <p class="siemreap-regular text-[14px] ml-20">
            ផ្តល់សិទ្ធិដោយ: <span class="text-green-600 text-[16px] ml-3">នាយកប្រតិបត្តិ</span>
          </p>
        </div>
      </div>
  
      <div class="footer flex justify-end items-end my-12 pb-3">
        <router-link to="/payroll">
          <button class="px-3 py-2 bg-green-600 text-white rounded-md mr-5">
            <i class="fa-solid fa-arrow-left px-2"></i> Back
          </button>
        </router-link>
        <button class="px-3 py-2 bg-green-600 text-white rounded-md" @click="exportToPDF">
          Export To PDF
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const staff = ref({});
  
  onMounted(async () => {
    const id = route.params.id;
    await fetchStaffById(id);
  });
  
  const fetchStaffById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/Staffs/${id}`);
      staff.value = response.data;
    } catch (error) {
      console.error("Error fetching staff by ID:", error);
    }
  };
  
  const exportToPDF = async () => {
    const element = document.querySelector("#payroll-pdf");
  
    if (element) {
      const exportButtons = document.querySelector(".footer");
      if (exportButtons) {
        exportButtons.style.visibility = "hidden";
      }
  
      await html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // width of A4 in mm
        const pageHeight = 297; // height of A4 in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        if (exportButtons) {
          exportButtons.style.visibility = "visible";
        }
  
        pdf.save("pay_slip.pdf");
      });
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
  