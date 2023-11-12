import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { loginUserAction } from "@/store/actions/user.actions";
import { VALIDATION_EMAIL_INVALID, VALIDATION_EMAIL_REQUIRED, VALIDATION_PASSWORD_REQUIRED } from "@/constants";
import FormikInput from "@/components/shared/FormikInput";
import { Link, useNavigate } from "react-router-dom";
interface IinitialValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
const LoginPage = () => {
  const userStore = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(VALIDATION_EMAIL_REQUIRED).email(VALIDATION_EMAIL_INVALID),
    password: Yup.string().required(VALIDATION_PASSWORD_REQUIRED),
  });
  const initialValues: IinitialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const handleSubmit = async (values: IinitialValues, setErrors: Function, resetForm: Function) => {
    dispatch(loginUserAction(values, setErrors, resetForm, null, navigate));
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
        <div className="flex flex-col lg:flex-row items-center lg:mt-10 max-w-5xl m-auto mb-44">
          <div className="lg:flex-1 mt-10 lg:mt-0 flex items-center justify-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-[200px] lg:w-full"
              alt=""
            />
          </div>
          <Form className="flex-1 mt-5 lg:mt-0 lg:ml-10">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-md lg:text-lg mb-0 mr-4 text-white">Đăng nhập</p>
            </div>
            {/* Email input */}
            <div className="mb-6 mt-5 lg:mt-10">
              <FormikInput
                placeholder="Email"
                name="email"
                className="block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:ring-high-light focus:ring-1 focus:outline-none"
              />
            </div>
            {/* Password input */}
            <div className="mb-6">
              <FormikInput
                type={"password"}
                placeholder="Mật khẩu"
                name="password"
                className="block w-full px-4 py-2 text-xs lg:text-sm font-normal text-primary bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:ring-high-light focus:ring-1 focus:outline-none"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="form-group form-check">
                <FormikInput
                  name="rememberMe"
                  type={"checkbox"}
                  className="relative form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:text-white checked:bg-high-light checked:border-high-light focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                />
                <label className="form-check-label inline-block text-xs lg:text-sm text-text-2" htmlFor="exampleCheck2">
                  Nhớ tài khoản
                </label>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <button
                disabled={userStore.loading}
                type="submit"
                className="inline-block px-7 py-2 lg:py-3 bg-high-light text-white font-medium text-xs lg:text-sm leading-snug uppercase rounded shadow-md focus:outline-none"
              >
                {userStore.loading ? "Đang tải ..." : "Login"}
              </button>
              <div className="text-xs lg:text-sm font-semibold mt-2 pt-1 mb-0 flex items-start text-text-1">
                Bạn có đã có tài khoản chưa ?
                <Link
                  to={`/dang-ky`}
                  className="text-high-light cursor-pointer hover:text-high-light focus:text-red-700 transition duration-200 ease-in-out text-xs lg:text-sm flex items-center"
                >
                  &nbsp; <ArrowNarrowRightIcon className="w-4 h-4 mx-2" />
                  Đăng kí
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
