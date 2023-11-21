import * as Yup from "yup";
import {i18n} from "./localisation";

export const habitFormValidationSchema = Yup.object({
  name: Yup.string().required(i18n.t('nameIsRequired')).trim(i18n.t('nameIsInvalid')).max(30, i18n.t('habitNameIsTooLong')),
  triggerEventID: Yup.number().required((i18n.t('mustLinkTrigger')))
});

export const triggerFormValidationSchema = Yup.object({
  name: Yup.string()
      .required(i18n.t('nameIsRequired'))
      .trim(i18n.t('nameIsInvalid'))
      .max(20, i18n.t('triggerNameIsTooLong')),
});
