let loggedPartner = {};

const setLoggedPartner = (partnerData) => {
  loggedPartner = {
    id: partnerData._id,
    nameFantasia: partnerData.nameFantasia,
    email: partnerData.email,
    completedTasks:partnerData.completedTasks
  };
};

export { loggedPartner, setLoggedPartner };
