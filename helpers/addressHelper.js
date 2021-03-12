const addressHelper = {
  getAddressFormattedText: (address) => {
    const city = address.city;
    const county = address.county;
    const district = address.district;
    const postalCode = address.postalCode;
    const street = address.street;
    const buildingNo = address.buildingNo;
    const floor = address.floor;
    const flatNo = address.flatNo;

    let response = '';
    if (district) {
      response += district + ' Mahallesi';
    }

    if (street) {
      response += ' ' + street;
    }

    if (buildingNo) {
      response += ' No:' + buildingNo;
    }

    if (floor) {
      response += ' Kat:' + floor;
    }

    if (flatNo) {
      response += ' Daire:' + flatNo;
    }

    if (county && city) {
      response += ' ' + county + '/' + city;
    }

    return response;
  },
};

module.exports = addressHelper;
