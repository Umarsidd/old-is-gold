// ─── Frontend API Service Layer ────────────────────────────────────────────────

const TOKEN_KEY = 'oig_admin_jwt_token';

export function getAuthToken() {
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token, remember = false) {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function clearAuthToken() {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function isAdminAuthenticated() {
  return Boolean(getAuthToken());
}

async function apiFetch(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = (data && data.error) || `HTTP error! status: ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  async login(username, password) {
    const result = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (result && result.success && result.token) {
      setAuthToken(result.token);
      return result;
    }
    throw new Error((result && result.error) || 'Login failed');
  },

  logout() {
    clearAuthToken();
  },

  // Products
  async getProducts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.search) params.append('search', filters.search);
    if (filters.featured) params.append('featured', 'true');

    const queryString = params.toString();
    const url = `/api/products${queryString ? `?${queryString}` : ''}`;
    return await apiFetch(url);
  },

  async getProduct(id) {
    return await apiFetch(`/api/products/${id}`);
  },

  async createProduct(productData) {
    return await apiFetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async updateProduct(id, productData) {
    return await apiFetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  async deleteProduct(id) {
    return await apiFetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Categories
  async getCategories() {
    return await apiFetch('/api/categories');
  },

  async createCategory(categoryData) {
    return await apiFetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  // Orders
  async getOrders() {
    return await apiFetch('/api/orders');
  },

  async createOrder(orderData) {
    return await apiFetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  async updateOrderStatus(id, status) {
    return await apiFetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Settings
  async getSettings() {
    return await apiFetch('/api/settings');
  },

  async updateSettings(settingsData) {
    return await apiFetch('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  },

  // Seed
  async seedDatabase() {
    return await apiFetch('/api/seed', { method: 'POST' });
  }
};
