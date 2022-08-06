import axiosInstance from "@/config/axios";
import { userLoadingAction } from "@/store/actions/user.actions";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import FormikInput from "./FormikInput";
interface IinitialValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface RegistFormProps {
  handleDirectLoginForm: Function;
}

const RegistForm: FC<RegistFormProps> = ({ handleDirectLoginForm }) => {
  const userStore = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const initialValues: IinitialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("The name is required"),
    email: Yup.string()
      .required("The email is required")
      .email("Invalid Email format"),
    password: Yup.string()
      .required("The password is required")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
        "The password must contain both lower, uppercase character, at least one digit, at least one special character and the minimum length is 8"
      ),
    confirmPassword: Yup.string()
      .required("The Confirm password is required")
      .oneOf([Yup.ref("password")], "The Confirm Password does not match"),
  });

  const handleSubmit = async (
    values: IinitialValues,
    setErrors: Function,
    resetForm: Function
  ) => {
    try {
      dispatch(userLoadingAction());
      const res = await axiosInstance.post("/auth/signup", {
        email: values.email,
        password: values.password,
        name: values.name,
      });
      if (res.status === 201 && res.data.result) {
        resetForm();
        handleDirectLoginForm();
      }
    } catch (error) {
      const message = (error as any)?.response.data.message;
      if (error && message) {
        setErrors({ email: message });
      }
    } finally {
      dispatch(userLoadingAction());
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors, resetForm }) => {
        handleSubmit(values, setErrors, resetForm);
      }}
    >
      {() => (
        <Form>
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-md lg:text-lg mb-0 mr-4 text-white">Sign up</p>
          </div>
          {/* Name input */}
          <div className="mb-6 mt-10">
            <FormikInput
              name="name"
              className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:ring-high-light focus:ring-1 focus:outline-none"
              placeholder="Name"
            />
          </div>
          {/* Email input */}
          <div className="mb-6">
            <FormikInput
              name="email"
              className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:ring-high-light focus:ring-1 focus:outline-none"
              placeholder="Email address"
            />
          </div>
          {/* Password input */}
          <div className="mb-6">
            <FormikInput
              name="password"
              type={"password"}
              className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  0 focus:outline-none focus:ring-high-light focus:ring-1"
              placeholder="Password"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <FormikInput
              type={"password"}
              name="confirmPassword"
              className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  0 focus:outline-none focus:ring-high-light focus:ring-1"
              placeholder="Confirm Password"
            />
          </div>
          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block px-7 py-2 lg:py-3 bg-high-light text-white font-medium text-xs lg:text-sm leading-snug uppercase rounded shadow-md focus:outline-none"
            >
              {userStore.loading ? "Loading..." : "Regist"}
            </button>
            <div className="text-xs lg:text-sm font-semibold mt-2 pt-1 mb-0 flex items-center text-text-1">
              I already have a membership.
              <div
                onClick={() => handleDirectLoginForm()}
                className="text-high-light cursor-pointer hover:text-high-light focus:text-red-700 transition duration-200 ease-in-out text-xs lg:text-sm flex items-center"
              >
                &nbsp; <ArrowNarrowRightIcon className="w-4 h-4 mx-2" /> Login
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default RegistForm;
