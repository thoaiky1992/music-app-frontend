import Logo from "@/assets/logo.png";
import { MailIcon, UserIcon } from "@heroicons/react/outline";

const Footer = () => {
  return (
    <div className="w-full mt-10 lg:mt-16">
      <div className="w-full flex justify-center">
        <img src={Logo} alt="" />
      </div>
      <div className="w-full flex justify-center">
        <h1 className="text-center text-sm lg:text-xl mt-2">
          KySomaio Music App là website nghe nhạc miễn phí
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <h1 className="text-center text-sm lg:text-lg mt-2">
          App hoạt động như một dịch vụ trực tuyến để phát và lưu trữ nhạc.
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <h1 className="text-center text-sm lg:text-lg mt-2">
          Bạn có thể truy cập thư viện nhạc của mình bất cứ lúc nào,
        </h1>
      </div>
      <div className="w-full flex justify-center">
        <h1 className="text-center text-sm lg:text-lg mt-2">
          thông qua bất kỳ thiết bị nào chỉ cần có kết nối internet
        </h1>
      </div>
      <div className="w-full flex items-center mt-5 text-sm justify-center">
        <MailIcon className="w-5 h-5 mr-3" />
        <h1>thoaiky1992@gmail.com</h1>
      </div>
      <div className="w-full flex items-center mt-2 text-sm justify-center mb-44 lg:mb-24">
        <UserIcon className="w-5 h-5 mr-3" />
        <h1 className="mt-1">Thực hiện bởi Thoại Kỳ</h1>
      </div>
    </div>
  );
};
export default Footer;
