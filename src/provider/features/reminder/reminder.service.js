import api from '@/common/utils/api';

const createInvoiceReminder = async (payload) => {
  const response = await api().post('/reminder/invoice', payload);
  return response.data;
};

const updateInvoiceReminder = async (payload, id) => {
  const response = await api().patch(`/reminder/invoice/${id}`, payload);
  return response.data;
};

const getInvoiceReminder = async (id) => {
  const response = await api().get(`/reminder/invoice/${id}`);
  return response.data;
};

const invoiceReminderService = {
  createInvoiceReminder,
  updateInvoiceReminder,
  getInvoiceReminder
};

export default invoiceReminderService;
