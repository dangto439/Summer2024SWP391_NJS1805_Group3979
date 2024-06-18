import "./index.scss";
import { Button, Image } from "antd";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../../config/axios";

function ListClub() {
  const [listClub, setListClub] = useState([]);
  const fetchListClubData = async () => {
    try {
      const response = await api.get("/clubs");
      console.log(response.data);
      setListClub(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchListClubData();
  }, []);

  return (
    <div className="list-court">
      {listClub.map((court) => (
        <>
          <div key={court.key} className="list-court-card">
            <div className="list-court-image">
              <Image src={court.urlImages} alt={court.clubName} />
            </div>
            <div className="list-court-details">
              <h2>{court.clubName}</h2>
              <p>
                <i className="list-court-address"></i> {court.clubAddress}
              </p>
              <p>
                <i className="list-court-clock"></i> {court.openTime} -{" "}
                {court.closeTime}
              </p>
              <p>
                <i className="list-court-phone"></i> Hotline: {court.hotline}
              </p>
              <p className="list-court-description">{court.description}</p>

              <div className="buttons">
                <Button className="booking-button">
                  <Link to="/court-detail" />
                  Đặt lịch
                </Button>

                <Button className="details-button">
                  <Link to="/court-detail" />
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
