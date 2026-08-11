import api from "./api";

export const transactionService = {
  // ============================
  // GET ALL EXPENSES
  // ============================
  getAll: (params = {}) =>
    api.get("/expenses", {
      params,
    }),

  // ============================
  // GET SINGLE EXPENSE
  // ============================
  getById: (id) =>
    api.get(`/expenses/${id}`),

  // ============================
  // CREATE EXPENSE
  // ============================
  create: (data) =>
    api.post("/expenses", data),

  // ============================
  // UPDATE EXPENSE
  // ============================
  update: (id, data) =>
    api.put(`/expenses/${id}`, data),

  // ============================
  // DELETE EXPENSE
  // ============================
  delete: (id) =>
    api.delete(`/expenses/${id}`),

  // ============================
  // GET EXPENSE SUMMARY
  // ============================
  getSummary: (params = {}) =>
    api.get("/expenses/summary", {
      params,
    }),
};