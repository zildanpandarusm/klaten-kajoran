import { findAllOrganization } from '../../repositories/organization.repository.js';

export const getOrganizationService = async () => {
  let result = await findAllOrganization();

  return result;
};
