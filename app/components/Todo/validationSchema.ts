import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().min(1, 'Add Title').max(100, 'Title limit').required('Title is required'),
  description: yup
    .string()
    .min(1, 'Add Description')
    .max(1000, 'Description limit')
    .required('Description is required')
});
