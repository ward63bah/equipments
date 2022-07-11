import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm({
  name,
  email,
  password,
  handleName,
  handleEmail,
  handlePassword,
  handleRegister,
  handleSignInWithGoogle,
}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    // firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    // lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full Name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      // firstName: '',
      // lastName: '',
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="fullname"
              type="text"
              label="Full Name"
              {...getFieldProps('fullName')}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
              onChange={(e) => handleName(e.target.value)}
              value={name}
            />

            {/* <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
              onChange={(e) => handleEmail(e.target.value)}
              value={email}
            /> */}

            {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
              onChange={(e) => handlePassword(e.target.password)}
              value={password}
            /> */}
          </Stack>

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            // error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            onChange={(e) => handleEmail(e.target.value)}
            value={email}
          />

          <TextField
            fullWidth
            autoComplete="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            onChange={(e) => handlePassword(e.target.value)}
            value={password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={() => handleRegister()}
          >
            Register
          </LoadingButton>

          {/* <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitting}
            onClick={() => handleSignInWithGoogle()}
          >
            Register with Google
          </LoadingButton> */}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
