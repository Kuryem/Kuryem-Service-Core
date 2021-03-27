const Enum = require('enum');

module.exports = new Enum({
  CreditCardIncome: {
    Id: 1,
    Desc: 'Kredi Karti Tahsilat',
    IsIncome: true,
  },
  BankIncome: {
    Id: 2,
    Desc: 'Banka Tahsilat',
    IsIncome: true,
  },
  CashIncome: {
    Id: 3,
    Desc: 'Nakit Tahsilat',
    IsIncome: true,
  },
  BonusIncome: {
    Id: 4,
    Desc: 'Bonus / Prim',
    IsIncome: true,
  },
  DeservedIncome: {
    Id: 5,
    Desc: 'Hakedis',
    IsIncome: true,
  },
  CreditCardExpense: {
    Id: 6,
    Desc: 'Kredi Karti Ödeme',
    IsIncome: false,
  },
  BankExpense: {
    Id: 7,
    Desc: 'Banka Ödeme',
    IsIncome: false,
  },
  CashExpense: {
    Id: 8,
    Desc: 'Nakit Ödeme',
    IsIncome: false,
  },
  PenalExpense: {
    Id: 9,
    Desc: 'Cezai Ödeme',
    IsIncome: false,
  },
  Order: {
    Id: 10,
    Desc: 'Sipariş',
    IsIncome: false,
  },
  OrderReturn: {
    Id: 11,
    Desc: 'Sipariş iadesi',
    IsIncome: true,
  },
});
