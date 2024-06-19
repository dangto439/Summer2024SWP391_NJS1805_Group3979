import "./index.scss";
import { Button, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../../config/axios";

function ListClub() {
  const [listClub, setListClub] = useState([]);
  const navigate = useNavigate();
  const fetchListClubData = async () => {
    try {
      const response = await api.get("/clubs");
      // console.log(response.data);
      setListClub(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchListClubData();
  }, []);
  const handleClick = (club) => {
    // console.log(club);
    navigate(`/booking/${club.clubId}`);
    // navigate(`/booking/${club}`);
  };

  return (
    <div className="list-club">
      {listClub.map((club) => (
        <>
          <div key={club.clubId} className="list-club-card">
            <div className="list-club-image">
              <Image src={club.urlImages} alt={club.clubName} />
            </div>
            <div className="list-club-details">
              <h2>{club.clubName}</h2>
              <p>
                <i className="list-club-address"></i> {club.clubAddress}
              </p>
              <p>
                <i className="list-club-clock"></i> {club.openTime} -{" "}
                {club.closeTime}
              </p>
              <p>
                <i className="list-club-phone"></i> Hotline: {club.hotline}
              </p>
              <p className="list-club-description">{club.description}</p>

              <div className="buttons">
                <Button
                  className="booking-button"
                  onClick={() => handleClick(club)}
                >
                  Đặt lịch
                </Button>

                <Button className="details-button">
                  <Link to="/club-detail" />
                  Chi tiết
                </Button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default ListClub;
