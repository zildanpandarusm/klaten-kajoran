import { findOneOrganization } from '../../repositories/organization.repository.js';

export const getOneOrganizationService = async (id) => {
  let result = await findOneOrganization(id);

  return result;
};
