
<template>
	<div class="h-screen dark:bg-gray-700  pt-12">

		<!-- Card start -->
		<div class="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
			<div class="border-b px-4 pb-6">
				<div class="text-center my-4">
					<img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
						src="https://randomuser.me/api/portraits/women/21.jpg" alt="">
					<div class="py-2">
						<h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">{{ username }}</h3>
						<div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
							<svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
								xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
								<path class=""
									d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
							</svg>
							{{ branch }}
						</div>
					</div>
				</div>
				<div class="flex gap-2 px-2">
					<button
						class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
						{{ role }}
					</button>
					<button
						class="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
						Message
					</button>
				</div>
			</div>
			<div class="px-4 py-4">
				<div class="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
					<svg class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="currentColor"
						xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path class=""
							d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" />
					</svg>
					<span><strong class="text-black dark:text-white">Email:</strong> {{ email }}</span>
				</div>

			</div>
		</div>
		<!-- Card end -->

	</div>

</template>
<script>
export default {
	data() {
		return {
			username: '',
			role: '',
			branch: '',
			email: '',

		};
	},
	created() {
		this.loadUserFromStorage();
	},
	methods: {
		loadUserFromStorage() {
			const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
			if (storedUser) {
				this.username = storedUser.Username || 'Guest';
				this.role = storedUser.Role || 'User';
				this.branch = storedUser.Branch || 'Unknown';
				this.email = storedUser.Email || 'No email provided';
			}
		},
	},
};
</script>