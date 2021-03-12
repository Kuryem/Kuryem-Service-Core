const Enum = require('enum');

module.exports = new Enum({
  Created: {
    Id: 1,
    Desc: 'Sipariş oluşturuldu.',
  },
  Picked: {
    Id: 2,
    Desc: 'Teslim alindi.',
  },
  Departed: {
    Id: 3,
    Desc: 'Kurye dağıtıma cıktı.',
  },
  Succeed: {
    Id: 4,
    Desc: 'Gönderim tamamlandı.',
  },
  Canceled: {
    Id: 5,
    Desc: 'Sipariş iptal edildi.',
  },
  Return: {
    Id: 6,
    Desc: 'Sipariş iadesi.',
  },
});
