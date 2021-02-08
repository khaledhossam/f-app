import axiosConfig from "./axios-config";

class appApi {
  // get customers
  static listCustomers(page) {
    return axiosConfig.get(`customers?${page}`);
  }

  // search customers
  static searchCustomers(searchFilter) {
    return axiosConfig.get(`customers?filter[name]=${searchFilter}`);
  }

  static getCustomer(id) {
    return axiosConfig.get(`customers/${id}`);
  }

  static getCustomer(id) {
    return axiosConfig.get(`customers/${id}`);
  }

  static editCustomer(id, payload) {
    return axiosConfig.put(`customers/${id}`, payload);
  }

  // delete customer
  static deleteCustomer(id) {
    return axiosConfig.delete(`customers/${id}`);
  }

  // restore customer
  static restoreCustomer(id) {
    return axiosConfig.put(`customers/${id}/restore`);
  }

  // create customer
  static createCustomer(payload) {
    return axiosConfig.post(`customers/`, payload);
  }

  // get categories
  static listCategories() {
    return axiosConfig.get("categories");
  }
  // search categories
  static searchCategories(searchFilter) {
    return axiosConfig.get(`categories?filter[name]=${searchFilter}`);
  }
  // get category
  static getCategory(id) {
    return axiosConfig.get(`categories/${id}`);
  }

  static editCategory(id, payload) {
    return axiosConfig.put(`categories/${id}`, payload);
  }

  static deleteCategory(id) {
    return axiosConfig.delete(`categories/${id}`);
  }

  static restoreCategory(id) {
    return axiosConfig.put(`categories/${id}/restore`);
  }

  // create customer
  static createCategory(payload) {
    return axiosConfig.post(`categories/`, payload);
  }
  // get Products
  static listProducts(page) {
    return axiosConfig.get(`products?${page}&include=category`);
  }

  // delete Products
  static deleteProduct(id) {
    return axiosConfig.delete(`products/${id}`);
  }

  // create Products
  static restoreProduct(id) {
    return axiosConfig.put(`products/${id}/restore`);
  }
  // create Products
  static createProducts(payload) {
    return axiosConfig.post(`products/`, payload);
  }

  // edit Products
  static editProduct(id, payload) {
    return axiosConfig.put(`products/${id}`, payload);
  }
  // search Products
  static searchProducts(searchFilter) {
    return axiosConfig.get(`products?filter[name]=${searchFilter}`);
  }
  // get Product
  static getProduct(id) {
    return axiosConfig.get(`products/${id}`);
  }
  // get tax_groups
  static getTaxGroups() {
    return axiosConfig.get(`tax_groups`);
  }
  // put display menu
  static putSortedDisplay(payload) {
    return axiosConfig.put(`menu_display`, payload);
  }
  // get display menu
  static getSortedDisplay() {
    return axiosConfig.get(`menu_display`);
  }
}
export default appApi;
