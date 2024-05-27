const { Partner, TrackRegistration } = require('../../models/models');
  const bcrypt = require('bcrypt')
  const nodemailer = require('nodemailer')

  async function registerPartner(partnerData) {
      try {
        const existingPartner = await Partner.findOne({ cnpj: partnerData.cnpj});
        if (existingPartner) {  
          return false
        }
        const newPartner = new Partner(partnerData);
        
        await newPartner.save();
    
        return newPartner;
      } catch (error) {
        console.error('Error registering partner:', error);
        throw new Error('Failed to register partner');
      } 
    }

    async function getTrackParticipationPercentage() {
      try {
        const partners = await Partner.find({});
        const totalPartners = partners.length;
        if (totalPartners === 0) {
          throw new Error('No partners found');
        }
    
        const expertiseRegistrationCounts = await Partner.aggregate([
          { $unwind: '$expertise_ids' },
          {
            $lookup: {
              from: 'trackregistrations',
              localField: 'expertise_ids',
              foreignField: '_id',
              as: 'expertiseInfo'
            }
          },
          {
            $unwind: '$expertiseInfo'
          },
          {
            $group: {
              _id: '$expertiseInfo.expertiseName',
              count: { $sum: 1 }
            }
          }
        ]);
    
        const expertiseParticipationData = expertiseRegistrationCounts.map(expertise => ({
          expertiseName: expertise._id,
          count: expertise.count,
          percentage: (expertise.count / totalPartners) * 100
        }));
    
        return expertiseParticipationData;
      } catch (error) {
        console.error('Error getting expertise participation percentage:', error);
        throw new Error('Failed to get expertise participation percentage');
      }
    }
    
    async function listPartners() {
      try {
        const partners = await Partner.find({});
        return partners;
      } catch (error) {
        console.error('Error listing partners:', error);
        throw new Error('Failed to list partners');
      }
    }

    async function listOnePartner(id) {
      try {
        const partner = await Partner.findOne({_id: id});
        return partner;
      } catch (error) {
        console.error('Error finding partner:', error);
        throw new Error('Failed to find partner');
      }
    }
    
    async function deletePartner(partnerId) {
      try {
        const result = await Partner.deleteOne({ _id: partnerId });
    
      
        if (result.deletedCount === 0) {
          throw new Error('Parceiro não encontrado');
        }
    
        return { message: "Parceiro removido com sucesso" };
      } catch (error) {
        console.error('Erro ao deletar parceiro:', error);
        throw new Error('Erro interno do servidor');
      }
    }
    


    async function updatePartner(partnerId, updatedData) {
      try {
        const result = await Partner.findByIdAndUpdate(partnerId, updatedData, { new: true });
        if (!result) {
          throw new Error('Parceiro não encontrado');
        }
    
        return result;
      } catch (error) {
        console.error('Erro ao atualizar parceiro:', error);
        throw new Error('Erro interno do servidor');
      }
    }
    
  async function loginPartner(partnerData) {
    try {
      const partner = await Partner.findOne({ email: partnerData.email })
      if(partner){
        if (await bcrypt.compare(partnerData.password,partner.password)){
          return partner
        }else{
          return false
        }
      }else{
        return false
      }
    } catch (error) {
      console.error('Error logging partner:', error);
      throw new Error('Failed to login partner');
    }
  }

  async function getPartnerCount() {
    try {
      return await Partner.countDocuments({});
    } catch (error) {
      console.error('Error listing partners:', error);
      throw new Error('Failed to list partners');
    }
  }


  async function updatePartnerExpertise(partnerId, expertiseKey, value) {
    try {
      if (!['Expertise1', 'Expertise2', 'Expertise3', 'Expertise4'].includes(expertiseKey)) {
        throw new Error('Expertise inválida');
      }

      const result = await Partner.findByIdAndUpdate(
        partnerId,
        { $set: { [expertiseKey]: value } },
        { new: true }
      );

      if (!result) {
        throw new Error('Parceiro não encontrado');
      }


      return result;
    } catch (error) {

      console.error('Erro ao atualizar expertise do parceiro:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  async function findPartnerByEmail(email) {
    try {
      return await Partner.findOne({ email });
    } catch (error) {
      console.error('Error finding partner by email:', error);
      throw new Error('Failed to find partner by email');
    }
  }

  async function saveResetToken(partner, token) {
    try {
      partner.token = token;
      await partner.save();
    } catch (error) {
      console.error('Error saving reset token:', error);
      throw new Error('Failed to save reset token');
    }
  }

  async function sendResetEmail(partner, token) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'brenertestando@gmail.com',
        pass: 'bkrbnkfcqydvnapa',
      },
    });

    const mailOptions = {
      from: 'brenertestando@gmail.com',
      to: partner.email,
      subject: 'Recuperação de senha',
      text: 'Seu token para redefinição de senha é: ${token}',
    };

    return transporter.sendMail(mailOptions);
  }

  async function findPartnerByEmailAndToken(email, token) {
    try {
      return await Partner.findOne({ email, token });
    } catch (error) {
      console.error('Error finding partner by email and token:', error);
      throw new Error('Failed to find partner by email and token');
    }
  }
  
  async function updatePartnerPassword(email, newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      return await Partner.updateOne({ email }, { $set: { password: hashedPassword, token: null } });
    } catch (error) {
      console.error('Error updating partner password:', error);
      throw new Error('Failed to update partner password');
    }
  }


  async function registerPartnerInExpertise(partnerId, expertiseId) {
    try {
      const partner = await Partner.findById(partnerId);
      if (!partner) {
        throw new Error('Parceiro não encontrado.');
      }
      
      if (partner.expertise_ids.includes(expertiseId)) {
        throw new Error('Parceiro já cadastrado nesta expertise.');
      }
      partner.expertise_ids.push(expertiseId);
      await partner.save();
      
      return partner;
    } catch (error) {
      console.error('Erro ao registrar parceiro na expertise:', error);
      throw error; 
    }
  }


  async function getPartnerExpertises(partnerId) {
    try {
      const partner = await Partner.findById(partnerId).populate('expertise_ids').lean()
      return partner.expertise_ids
    } catch (error) {
      console.error('Erro ao buscar expertises do parceiro:', error);
      throw new Error('Falha ao buscar expertises do parceiro');
    }
  }

  async function completeTask(partnerId, taskId) {
    try {
      const partner = await Partner.findById(partnerId);
      if (!partner) {
        throw new Error('Parceiro não encontrado.');
      }
      
      if (partner.completedTasks.includes(taskId)) {
        throw new Error('tarefa já completa');
      }

      partner.completedTasks.push(taskId);
      await partner.save();
      
      return partner;
    } catch (error) {
      console.error('Erro ao completar tarefa', error);
      throw error; 
    }
  }

  module.exports = {
      findPartnerByEmailAndToken,
      updatePartnerPassword,
      completeTask,
      getTrackParticipationPercentage,
      registerPartnerInExpertise,
      getPartnerExpertises,
      registerPartner,
      getPartnerCount,
      listPartners,
      updatePartner,
      deletePartner,
      loginPartner,
      updatePartnerExpertise,
      listOnePartner,
      findPartnerByEmail,
      saveResetToken,
      sendResetEmail,
  };