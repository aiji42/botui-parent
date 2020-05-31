import { isMemberEntry } from './memberEntry';
import { goToSettleEditStepGuest, goToSettleEditStepMember } from '../steps';

export const goToSettleEditStep = async (data) => {
  try {
    if (isMemberEntry()) await goToSettleEditStepMember(data);
    else await goToSettleEditStepGuest(data);
  } catch (e) {
    return e.message;
  }
  return true;
};

export { goToConfirmStep } from '../steps';
