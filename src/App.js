import { useEffect, useState } from "react";
import style from "./App.module.css";

function App() {
  const [info, setInfo] = useState("");
  const [modo, setModo] = useState("");
  const [input, setInput] = useState("");

  async function obtenerDatos(input) {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon/";
      const pokemon = input ? input : "ditto";
      const res = await fetch(`${url}${pokemon}`);
      let data = await res.json();
      setInfo(data);
    } catch (err) {
      alert(`Not found pokemon: ${input}`);
    }
  }

  useEffect(() => {
    obtenerDatos();
  }, []);

  function handleChange(e) {
    setInput((previo) => {
      const newState = e.target.value;
      return newState;
    });
  }

  function handleSumbit(e) {
    e.preventDefault();
    obtenerDatos(input.toLocaleLowerCase());
  }


  function changeInfo() {
    if (modo !== "abc") {
      const sort = info?.stats.sort((a, b) => {
        if (a.stat.name > b.stat.name) {
          return 1;
        }
        if (b.stat.name > a.stat.name) {
          return -1;
        }
        return 0;
      });

      setInfo((previo) => {
        const newState = { ...info, stats: sort };
        setModo("abc");
        return newState;
      });
    } else {
      const sort = info?.stats.sort((a, b) => {
        if (a.stat.name < b.stat.name) {
          return 1;
        }
        if (b.stat.name < a.stat.name) {
          return -1;
        }
        return 0;
      });

      setInfo((previo) => {
        const newState = { ...info, stats: sort };
        setModo("cba");
        return newState;
      });
    }
  }


  return (
    <div key={info?.name} className={style.App}>
      <nav>
        <form>
          <input placeholder="Search Pokemon" onChange={handleChange}></input>
          <button onClick={handleSumbit}>Search</button>
        </form>
      </nav>
      <div  className={style.divcard}>
        <img src={info?.sprites?.front_default} alt="img not found"></img>
        <button className={style.btnvalor} onClick={changeInfo}>
          Value
        </button>

        {info?.stats?.map((e) => {
          return (
            <div  className={style.divcardinfo}>
              <li className={style.licard}>
                <p className={style.name}>{e.stat.name}</p>
                <p className={style.base}>{e.base_stat}</p>
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
