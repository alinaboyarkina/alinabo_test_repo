import { CreditCardData } from "../types/creditCard";
import { getExpirationPlusMonths } from "../utils/dateUtils";

export const VALID_CREDIT_CARD: CreditCardData = {
  cardNumber: "1111-1111-1111-1111",
  expiration: getExpirationPlusMonths(3),
  cvv: "111",
  holder: "Any Name",
};
