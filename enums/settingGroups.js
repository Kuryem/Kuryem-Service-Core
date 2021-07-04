const Enum = require('enum');

module.exports = new Enum({
  System: {
    Id: 1,
    Title: 'Sistem Ayarları',
  },
  PackageType: {
    Id: 2,
    Title: 'Paket Tipleri',
  },
  VehicleType: {
    Id: 3,
    Title: 'Araç Tipleri',
  },
  ZonePrices: {
    Id: 4,
    Title: 'Bölge Fiyatlari',
  },
  DistancePrices: {
    Id: 5,
    Title: 'Mesafe Ayarları',
  },
  SidePrices: {
    Id: 6,
    Title: 'Yaka Fiyatları',
  },
  ZoneDurations: {
    Id: 7,
    Title: 'Bolge Sureleri',
  },
  KmPrices: {
    Id: 8,
    Title: 'KM Fiyatları',
  },
});
