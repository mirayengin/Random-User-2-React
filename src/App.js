import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";


function App() {
  //! ile data çekme
  const apiGet2 = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserdata(data.results[0])) //! Çekilen data destruct edildi.
      .catch(console.error());
      setFirstP("");
      setDataP("")
  };

  //? axios ile data çekme
  // const apiGet = async () => {
  //   const { data } = await axios.get(url);

  //   setUserdata(data.results[0]);
  // };

  useEffect(() => {
    // apiGet()
    apiGet2();
  }, []);

  const [userdata, setUserdata] = useState(null);
  const [firstP, setFirstP] = useState("");
  const [dataP, setDataP] = useState("");
  const [userList, setUserList] = useState([]);

  console.log(userdata);

  //! User bilgilerirnin yazıdldığı yer burası. Burda destruc yaptık data yı ve kullandık bu fonk. içinde. Bu fonk. içinde kullandık çünkü ilk yüklemede sayfayı userdata (yani url ile data cekip atanan değişken) [] geldiği için fonk. içinde kullandık.
  const handleOver = (e) => {
    console.log(userdata);
    let {
      email,
      dob: { age },
      location: { city, country, state },
      name: { title, first, last },
      phone,
      login: { password },
    } = userdata;

    const ad = title + " " + first + " " + last;

    const place = city + "/ " + country + "/ " + state;

    //! İkonlara tıklanıldığı zaman ekrana render edilecek bilgiler burada koşul olarak yazıldı. dataP ye atandı.
    if (e.target.className === "userimg") {
      setDataP(ad);
      setFirstP("name");
    } else if (e.target.className === "emailimg") {
      setDataP(email);
      setFirstP("email");
    } else if (e.target.className === "womenimg") {
      setDataP(age);
      setFirstP("age");
    } else if (e.target.className === "phoneimg") {
      setDataP(phone);
      setFirstP("phone");
    } else if (e.target.className === "padlockimg") {
      setDataP(password);
      setFirstP("password");
    } else if (e.target.className === "mapimg") {
      setDataP(place);
      setFirstP("place");
    }

  };
  console.log(dataP);

  const handleAdd = () => {
    console.log(typeof userdata);
    // const  {name:{first}, phone, email, dob:{age}} = userdata
    // const  newdata = userdata
    !userList.includes(userdata) && setUserList([...userList, userdata]);

  };

  console.log(userList);

  return (
    <main>
      {userdata && (
        <>
          <div className="block bcg-orange">
            <img src={cwSvg} alt="cw" id="cw" />
          </div>
          <div className="block">
            <div className="container">
              <img
                src={userdata.picture.large}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">
                {" "}
                {firstP ? `My ${firstP}  is` : "Hover over the icons below for information"}
              </p>
              <p className="user-value">{dataP}</p>
              <div className="values-list">
                <button className="icon" data-label="name">
                  <img
                    onMouseOver={handleOver}
                    src={userdata?.gender === "female" ? womanSvg : manSvg}
                    alt="user"
                    id="iconImg"
                    className="userimg"
                  />
                </button>
                <button className="icon" data-label="email ">
                  <img
                    onMouseOver={handleOver}
                    src={mailSvg}
                    alt="mail"
                    id="iconImg"
                    className="emailimg"
                  />
                </button>
                <button className="icon" data-label="age">
                  <img
                    onMouseOver={handleOver}
                    src={
                      userdata?.gender === "female" ? womanAgeSvg : manAgeSvg
                    }
                    alt="age"
                    id="iconImg"
                    className="womenimg"
                  />
                </button>
                <button className="icon" data-label="street">
                  <img
                    onMouseOver={handleOver}
                    src={mapSvg}
                    alt="map"
                    id="iconImg"
                    className="mapimg"
                  />
                </button>
                <button className="icon" data-label="phone">
                  <img
                    onMouseOver={handleOver}
                    src={phoneSvg}
                    alt="phone"
                    id="iconImg"
                    className="phoneimg"
                  />
                </button>
                <button className="icon" data-label="password">
                  <img
                    onMouseOver={handleOver}
                    src={padlockSvg}
                    alt="lock"
                    id="iconImg"
                    className="padlockimg"
                  />
                </button>
              </div>
              <div className="btn-group">
                <button onClick={() => apiGet2()} className="btn" type="button">
                  new user
                </button>
                <button onClick={handleAdd} className="btn" type="button">
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((item) => {
                    return (
                      <tr className="head-tr">
                        <th className="th">{item.name.first}</th>
                        <th className="th">{item.email}</th>
                        <th className="th">{item.phone}</th>
                        <th className="th">{item.dob.age}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
