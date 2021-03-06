import { DateTime } from 'luxon';

import {
  getItem,
  hasItem,
  isAvailable,
  removeItem,
  setItem,
} from '~/services/storage';

const LAST_PAYOUT = 'lastPayout';

const PAYMENT_NOTE_MAX_LEN = 100;

export function getLastPayout() {
  if (isAvailable() && hasLastPayout()) {
    const value = getItem(LAST_PAYOUT);
    return value;
  }

  return DateTime.fromMillis(0).toISO();
}

export function hasLastPayout() {
  return hasItem(LAST_PAYOUT);
}

export function setLastPayout(lastPayout) {
  setItem(LAST_PAYOUT, lastPayout);
}

export function removeLastPayout() {
  removeItem(LAST_PAYOUT);
}

export function validatePaymentNote(value) {
  return value.length <= PAYMENT_NOTE_MAX_LEN;
}

export function validateAmount(value) {
  return !isNaN(value) && parseFloat(value) >= 0;
}
