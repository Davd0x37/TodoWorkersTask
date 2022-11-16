import { IUser } from '@/types';
import { ChangeEvent, useState } from 'react';

type Prop = Omit<IUser, 'id'>;

export const useForm = (fields: Prop) => {
  const [formData, setFormData] = useState<Prop>(fields);
  let handleTimeout: string | number | NodeJS.Timeout | undefined;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    clearTimeout(handleTimeout);

    // handleTimeout = setTimeout(() => {
    if (e.target.name in formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // }, 250);
  };

  const updateFormDataElement = <T>(field: string, value: T) => {
    if (field in formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  return {
    formData,
    setFormData,
    updateFormDataElement,
    handleInputChange,
  };
};
