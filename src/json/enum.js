export const SALE_STATUS = {
    PAY: 'PAY',
    GETINVOICE: 'GET INVOICE',
  };
  
 export const SaleOptions = Object.keys(SALE_STATUS).map(key => ({
    text: SALE_STATUS[key],
    value: key
  }));

  export const PAYMENT_STATUS = {
    COMPLETED: 'COMPLETED',
    PARTIAL: 'PARTIAL',
    DUE: 'DUE',
  };
  
 export const paymentOptions = Object.keys(PAYMENT_STATUS).map(key => ({
    text: PAYMENT_STATUS[key],
    value: key
  }));
  export const PAYMENT_MODE = {
    CASH: 'Cash',
    BANK: 'Bank Transfer',
  };
  
 export const modeOptions = Object.keys(PAYMENT_MODE).map(key => ({
    text: PAYMENT_MODE[key],
    value: key
  }));

  export const EXPENSE_CATEGORY = {
    rent: 'Rent Expense',
    repair: ' Repairs and Maintenance',
    allowance: 'Staff Weekly allowance',
    advertising: ' Advertising And Marketing',
    salary: ' Salaries and Employee Wages',
    bank: '  Bank Fees and Charges',
    transport: '  Transport Expenses',
    parking: ' Parking',
    other: ' Other Expenses',
  };
  
 export const expenseOptions = Object.keys(EXPENSE_CATEGORY).map(key => ({
    text: EXPENSE_CATEGORY[key],
    value: key
  }));

  export const ACCOUNTING = {
    cash: 'Cash',
    bank: ' Bank',
    receivable: 'Acoounts Receivable',
    currentasset: 'Current Asset',
    noncurrentasset: 'Fixed Asset',
    currentliability: 'Current Liability',
    longtermliability: 'Long-term Liability',
    equity: 'Equity',
    stock: 'Stock',
    expense: 'Expense',
    sales: 'Sales',
    goodsold: 'Cost Of Goods Sold',
  };
  
 export const accountOptions = Object.keys(ACCOUNTING).map(key => ({
    text: ACCOUNTING[key],
    value: key
  }));