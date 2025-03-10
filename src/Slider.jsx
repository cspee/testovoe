import { useEffect, useState } from "react";

export default function Slider() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usersPerSlide, setUsersPerSlide] = useState(3);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        console.log(res);
      });
  }, []);

  function inputOnChange(e) {
    const value = Number(e.target.value);
    setUsersPerSlide(value);

    if (currentIndex + value > data.length) {
      setCurrentIndex(data.length - value);
    }
  }
  function nextSlide() {
    if (currentIndex + usersPerSlide < data.length) {
      setDirection("right");
      setCurrentIndex(currentIndex + 1);
    }
  }
  function prevSlide() {
    if (currentIndex > 0) {
      setDirection("left");
      setCurrentIndex(currentIndex - 1);
    }
  }

  function remove(id) {
    const newUsers = data.filter((el) => el.id !== id);
    setData(newUsers);

    const lastIndex = newUsers.length - usersPerSlide;
    if (currentIndex > lastIndex) {
      setCurrentIndex(lastIndex < 0 ? 0 : lastIndex);
    }
  }
  console.log(currentIndex);
  return (
    <>
      <div className="controls">
        <label>Количество карточек: </label>
        <input
          type="number"
          value={usersPerSlide}
          min={1}
          max={data.length}
          onChange={inputOnChange}
        />
      </div>

      <div className="slider-container">
        <button
          onClick={prevSlide}
          disabled={currentIndex == 0}
          className="nav-btn"
        >
          ⬅️
        </button>
        <div className={`cards ${direction}`}>
          {data.slice(currentIndex, currentIndex + usersPerSlide).map((el) => (
            <div className="cardContainer" key={el.id}>
              <div className="card">
                <img className="card-img" src={el.avatar} alt="photo" />
                <div className="card-nameContainer">
                  <p className="card-name">{el.first_name}</p>
                  <p className="card-lastName">{el.last_name}</p>
                </div>
                <button
                  className="card-removeBtn"
                  onClick={() => remove(el.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          disabled={currentIndex + usersPerSlide >= data.length}
          className="nav-btn"
          onClick={nextSlide}
        >
          ➡️
        </button>
      </div>
    </>
  );
}
