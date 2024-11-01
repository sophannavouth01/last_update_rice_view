// src/utils/auth.js

// Example functions
export function getAuthToken() {
	return localStorage.getItem('authToken');
  }
  
  export function setAuthToken(token) {
	localStorage.setItem('authToken', token);
  }
  
  export function clearAuth() {
	localStorage.removeItem('authToken');
	// Add other cleanup logic if necessary
  }
  
  export function isTokenExpired(expirationDate) {
	return new Date() > new Date(expirationDate);
  }
  