<template>
  <div class="bg-white h-screen shadow-md rounded-lg">
    <p class="p-5 text-lg font-semibold underline text-[#00992B] moul-regular">សិទ្ធអ្នកប្រើប្រាស់</p>
    <div class="flex justify-between px-5 py-3 mb-3">
      <div></div>
      <div class="order-last">
        <button @click="openAddModal" class="px-4 siemreap-regular py-2 ml-3 bg-[#00992B] text-[15px] text-white rounded">បង្កើតសិទ្ធ</button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg px-5 pb-5">
      <table class="w-full table-radius text-sm text-left text-gray-500" style="border-radius: 10px; overflow: hidden;">
        <thead class="text-xs text-gray-700 bg-gray-100">
          <tr class="text-[14px]">
            <th class="px-6 py-3 border text-[14px] whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ល.រ</th>
            <th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ឈ្មោះ</th>
            <th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ការពិពណ៌នា</th>
            <th class="px-6 py-3 border whitespace-nowrap overflow-hidden text-ellipsis moul-regular">ស្ថានភាព</th>
            <th class="px-6 border moul-regular w-32 py-3 whitespace-nowrap overflow-hidden text-ellipsis text-center">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody style="border-radius: 10px;">
          <tr v-for="(item, index) in paginatedItems" :key="item.id" class="bg-white border text-gray-700 hover:bg-[#00992B] hover:text-white">
            <td class="w-[30px] border px-6 whitespace-nowrap overflow-hidden text-ellipsis">
              {{ index + 1 + (currentPage - 1) * itemsPerPage }}
            </td>
            <td class="px-6 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.name }}</td>
            <td class="px-6 border whitespace-nowrap overflow-hidden text-ellipsis">{{ item.description || 'No description' }}</td>
            <td class="px-6 border whitespace-nowrap overflow-hidden text-ellipsis" :class="item.status ? 'text-green-600' : 'text-red-600'">
             {{ item.status ? 'ដំណើរការ' : 'ផ្អាកដំណើរការ'  }}
            </td>

            <td class="flex justify-center border px-2 py-2 text-center w-31 border-gray-200">
              <button @click="openEditModal(item)" class="px-4 py-2 bg-blue-50 text-center text-[#00992B] rounded-md">លម្អិត</button>
              <!-- <button @click="confirmDelete(item.id)" class="px-4 py-2 ml-2 bg-red-50 text-center text-red-600 rounded-md">លុប</button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" class="flex justify-end py-3">
        <ul class="inline-flex -space-x-px text-sm">
          <li>
            <button @click="previousPage" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">ក្រោយ</button>
          </li>
          <li>
            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              {{ currentPage }} នៃ {{ totalPages }}</a>
          </li>
          <li>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">បន្ទាប់</button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Add Role Modal -->
    <div v-if="isAddModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h2 class="text-xl mb-5 text-[#00992B] text-center underline">បង្កើតសិទ្ធអ្នកប្រើប្រាស់</h2>
        <form @submit.prevent="handleAddSubmit">
          <div class="mb-4 flex">
            <label class="block w-[150px] text-gray-700">ឈ្មោះ</label>
            <input v-model="role.name" type="text" class="w-full border px-3 py-2 rounded-lg" required />
          </div>
          <div class="mb-4 flex">
            <label class="block w-[150px] text-gray-700">ការពិពណ៌នា</label>
            <input v-model="role.description" type="text" class="w-full border px-3 py-2 rounded-lg" />
          </div>
          <div class="mb-4 flex">
            <label class="block w-[150px] text-gray-700">ស្ថានភាព</label>
            <select v-model="role.status" class="w-full border px-3 py-2 rounded-lg">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeAddModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">បោះបង់</button>
            <button type="submit" class="px-4 py-2 bg-[#00992B] text-white rounded">បង្កើត</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Role Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white px-6 py-5 rounded-lg w-1/3">
        <h2 class="text-xl mb-5 text-[#00992B] text-center underline">កែសិទ្ធ</h2>
        <form @submit.prevent="handleEditSubmit">
          <div class="mb-4 flex">
            <label class="block text-gray-700 w-[130px] pt-2">ឈ្មោះសិទ្ធ:</label>
            <input v-model="selectedRole.name" type="text" class="w-full border px-3 py-2 rounded-lg" required />
          </div>
          <div class="mb-4 flex">
            <label class="block text-gray-700 w-[130px] pt-2">ការពិពណ៌នា:</label>
            <input v-model="selectedRole.description" type="text" class="w-full border px-3 py-2 rounded-lg" />
          </div>
          <div class="mb-4 flex">
            <label class="block text-gray-700 w-[130px] pt-2">ស្ថានភាព:</label>
            <select v-model="selectedRole.status" class="w-full border px-3 py-2 rounded-lg">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">បោះបង់</button>
            <button type="submit" class="px-4 py-2 bg-[#00992B] text-white rounded">ផ្លាស់ប្ដូរ</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const roles = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);

const role = ref({
  name: '',
  description: '',
  status: true
});

const selectedRole = ref({
  id: null,
  name: '',
  description: '',
  status: true
});

const fetchRoles = async () => {
  try {
    const response = await axios.get(`${baseUrl}/roles`);
    roles.value = response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

// Call fetchRoles when the component is created
fetchRoles();

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return roles.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(roles.value.length / itemsPerPage);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const openAddModal = () => {
  role.value = {
    name: '',
    description: '',
    status: true
  };
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const handleAddSubmit = async () => {
  try {
    await axios.post(`${baseUrl}/roles`, role.value);
    Swal.fire({
      icon: 'success',
      title: 'ជោគជ័យ',
      text: 'បានបន្ថែមជោគជ័យ',
    });
    fetchRoles();
    closeAddModal();
  } catch (error) {
    console.error('Error adding role:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response?.data?.message || 'Something went wrong!',
    });
  }
};

const openEditModal = (selectedRoleItem) => {
  selectedRole.value = { ...selectedRoleItem };
  isEditModalOpen.value = true;
};

const handleEditSubmit = async () => {
  try {
    await axios.put(`${baseUrl}/roles/${selectedRole.value.id}`, {
      name: selectedRole.value.name,
      description: selectedRole.value.description,
      status: selectedRole.value.status
    });
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Role has been updated.',
    });
    fetchRoles();
    closeEditModal();
  } catch (error) {
    console.error('Error updating role:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response?.data?.message || 'Something went wrong!',
    });
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'តើអ្នកពិតជាធ្វើដូច្នេះឬ?',
    text: 'សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'បាទ/ចាស, លុបវាចោល!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseUrl}/roles/${id}`);
        Swal.fire('លុបដោយជោគជ័យ!', 'ត្រូវបានលុប', 'success');
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || 'Something went wrong!',
        });
      }
    }
  });
};
</script>

<style scoped>
.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}

.moul-regular {
  font-family: 'Moul', serif;
  font-weight: 400;
  font-style: normal;
}

.siemreap-regular {
  font-family: 'Siemreap', sans-serif;
}
</style>
