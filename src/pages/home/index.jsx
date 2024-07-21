import CarouselClub from "../../components/carousel-club";
import Carousel from "../../components/carousuel";
// import ListClub from "../list-club";

function HomePage() {
  return (
    <div>
      <Carousel autoplay />
      {/* <InputLocation /> */}
      {/* <ListClub /> */}
      <CarouselClub />
    </div>
  );
}

export default HomePage;
