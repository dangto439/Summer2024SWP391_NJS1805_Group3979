import Carousel from "../../components/carousuel";
import InputLocation from "../../components/input-location";
import ListClub from "../list-club";

function HomePage() {
  return (
    <div>
      <Carousel autoplay />
      <InputLocation />
      <ListClub />
    </div>
  );
}

export default HomePage;
