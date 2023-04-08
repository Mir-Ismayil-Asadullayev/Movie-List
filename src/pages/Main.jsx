import React, { useEffect, useRef, useState } from 'react';
import main from '../assets/styles/pages/Main.module.css';
import search from '../assets/images/search.png';
import ScrollToTop from "react-scroll-to-top";
import { store } from '../store/store';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../assets/styles/components/Loader.css'

const Main = () => {
  const [card, setCard] = useState([]);
  const [state, setState] = useState([]);
  const [disable, setDisable] = useState(true);
  const [able, setAble] = useState(false);
  const cardLi = useRef();

  useEffect(() => {
    // axios.get('http://www.omdbapi.com/?s=avengers&apikey=1261c60c')
    //   .then(res => setCard(res.data.Search))
    //   .catch(err => alert(`${err} something get wrong Please try again!`));

    store.subscribe(() => {
      const state = store.getState().cards;
      setState(state)
    });

  }, []);

  const handleName = (e) => {
    if (e.target.value.trim() === "") setDisable(true);
    else setDisable(false);
  }

  const handleSave = () => {
    setAble(true);
    toast.success("Click here to get to the list page!")
  }

  const removeFromList = (card) => {
    cardLi.current.classList.remove(main.current);
    console.log(cardLi.current.classList)
    store.dispatch({
      type: "DELETE_CARD",
      payload: {
        id: card.id
      }
    });
  }

  const addToList = (item) => {
    store.dispatch({
      type: "ADD_CARD",
      payload: {
        id: item.imdbID,
        title: item.Title,
        year: item.Year,
        poster: item.Poster
      }
    });
  }

  const handleSearch = (e) => {
    // axios.get(`http://www.omdbapi.com/?s=${e.target.value}&apikey=1261c60c`)
    //   .then(res => setCard(res.data.Search))
    //   .catch(err => alert(`${err} something get wrong Please try again!`));
  }


  return (
    <main className={main.main}>
      <ScrollToTop
        top={10}
        className={main.upBtn}
        smooth
        color='white'
        height='20'
      />
      <section className={main.movies}>
        <div className={main.searchSection}>
          <input
            className={main.input}
            type="text"
            placeholder='Search for movies, for example "Avengers"...'
            onKeyUp={handleSearch}
          />
          <img className={main.icon} src={search} alt="search-icon" />
        </div>
        <div className={main.cards}>
          {
            card
              ?
              card.map(item =>
                <div key={Math.random()} className={main.cardItem}>
                  <img src={item.Poster} alt="cardimage" />
                  <div className={main.cardContent}>
                    <div>
                      {item.Title} ({item.Year})
                    </div>
                    <button onClick={() => addToList(item)}>Add to list</button>
                  </div>
                </div>
              )
              :
              <div className="loader">
                <div className="square" id="sq1"></div>
                <div className="square" id="sq2"></div>
                <div className="square" id="sq3"></div>
                <div className="square" id="sq4"></div>
                <div className="square" id="sq5"></div>
                <div className="square" id="sq6"></div>
                <div className="square" id="sq7"></div>
                <div className="square" id="sq8"></div>
                <div className="square" id="sq9"></div>
              </div>
          }
        </div>
      </section>
      <section className={main.base}>
        <div className={main.baseWrapper}>
          <input
            disabled={able} type="text"
            className={!able ? main.baseInput : main.inputDisable}
            placeholder="Give the name to the list here"
            onChange={handleName}
          />
          {
            state.length
              ?
              <div className={main.baseList}>
                <ul>
                  {
                    state && state.map(card =>
                      <li ref={cardLi} key={Math.random()} className={main.current} style={{ backgroundImage: `url(${card.poster})` }}>
                        <span> {card.title} ({card.year})</span>
                        <button className={main.button} onClick={() => removeFromList(card)} >Remove from list</button>
                      </li>
                    )
                  }
                </ul>
              </div>
              :
              <></>
          }
        </div>
        <button
          disabled={disable}
          onClick={handleSave}
          className={disable ? main.disabled : main.saveBtn}
        >
          Save the List
        </button>
        <ToastContainer
          style={{
            bottom: '-7px',
            right: '0px',
            width: '30%',
            textAlign: 'center'
          }}
          position="bottom-right"
          autoClose={false}
          limit={1}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          theme="dark"
          closeButton={false}
          transition={Slide}
        />
      </section>
    </main>
  )
}

export default Main;
