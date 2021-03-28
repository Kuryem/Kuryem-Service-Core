const Enum = require('enum');

module.exports = new Enum({
  Open: {
    Id: 1,
    Desc: 'Sipariş beklemede.',
    OrderStatusId: 1,
  },
  Assigned: {
    Id: 2,
    Desc: 'Kuryeye atandı.',
    OrderStatusId: 1,
  },
  Picked: {
    Id: 3,
    Desc: 'Teslim alindi.',
    OrderStatusId: 2,
  },
  Departed: {
    Id: 4,
    Desc: 'Kurye dağıtıma çıktı.',
    OrderStatusId: 3,
  },
  Transfered: {
    Id: 5,
    Desc: 'Paket transfer edildi.',
  },
  Succeed: {
    Id: 6,
    Desc: 'Gönderim tamamlandı.',
    OrderStatusId: 4,
  },
  Fail: {
    Id: 7,
    Desc: 'Gönderim tamamlanamadı.',
    OrderStatusId: 5,
  },
  Canceled: {
    Id: 8,
    Desc: 'Siparis iptal edildi',
    OrderStatusId: 5,
  },
  TransferAccepted: {
    Id: 9,
    Desc: 'Transfer kabul edildi.',
  },
  CancelCompleted: {
    Id: 8,
    Desc: 'Siparis iptali tamamlandi.',
    OrderStatusId: 5,
  },
});
