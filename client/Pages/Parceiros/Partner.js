let loggedPartner = {};

const setLoggedPartner = (partnerData) => {
  loggedPartner = {
    id: partnerData._id,
    nameFantasia: partnerData.nameFantasia,
    email: partnerData.email,
  };
};

export { loggedPartner, setLoggedPartner };
