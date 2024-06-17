let loggedPartner = {};

const setLoggedPartner = (partnerData) => {
  console.log('part', partnerData)
  loggedPartner = {
    id: partnerData._id,
    nameFantasia: partnerData.nameFantasia,
    email: partnerData.email,
    completedTasks:partnerData.completedTasks
  };
};

export { loggedPartner, setLoggedPartner };
