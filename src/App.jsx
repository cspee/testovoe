import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SwiperSlide, Swiper } from "swiper/react";

function App() {
  const [data, setData] = useState([]);
  const [curentIndex, setCurrentIndex] = useState(0);

  const {
    isPending,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://reqres.in/api/users`).then((res) => res.json()),
  });
  console.log(users);

  // useEffect(() => {
  //   axios.get("https://reqres.in/api/users").then((res) => {
  //     console.log(res);
  //     setData(res.data.data);
  //   });
  // }, []);
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
   
          {users?.data?.map((el) => (
            <SwiperSlide className="card" key={el.id}>

                <img className="card-img" src={el.avatar} alt="photo" />
                <div className="card-nameContainer">
                  <p className="card-name">{el.first_name}</p>
                  <p className="card-lastName">{el.last_name}</p>
                </div>
            </SwiperSlide>
          ))}
 
      </Swiper>
    </>
  );
}

export default App;
