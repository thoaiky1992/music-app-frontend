import { useParams } from "react-router";

const AboutDetail = () => {
  const params = useParams();
  console.log(params);

  return <h1>About Detail with id : {params.id}</h1>;
};
export default AboutDetail;
