import Carousel from "../../components/carousuel";
import InputLocation from "../../components/input-location";
import ListCourt from "../list-court";

function HomePage() {
  return (
    <div>
      <Carousel autoplay />
      <InputLocation />
      <ListCourt />
    </div>
  );
}

export default HomePage;
