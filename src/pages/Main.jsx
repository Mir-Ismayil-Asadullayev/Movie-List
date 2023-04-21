import React, { useContext, useEffect, useRef, useState } from 'react';
import main from '../assets/styles/pages/Main.module.css';
import search from '../assets/images/search.png';
import ScrollToTop from "react-scroll-to-top";
import { store } from '../store/store';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../assets/styles/components/Loader.css'
import { Link } from 'react-router-dom';
import { Context } from '../context';
import nophoto from '../assets/images/noimage.jpg';

const Main = () => {
  const { location } = useContext(Context);
  const [card, setCard] = useState([]);
  const [state, setState] = useState([]);
  const [able, setAble] = useState(false);
  const [data, setData] = useState(true);
  const [disable, setDisable] = useState(true);
  const [animation, setanimation] = useState(false);
  const baselist = useRef();
  const listName = useRef();

  useEffect(() => { if (baselist.current) baselist.current.scrollTo({ left: 0, top: 100000, behavior: "smooth" }); }, [state]);

  useEffect(() => { location(window.location.href); }, [location]);

  useEffect(() => {
    axios.get('http://www.omdbapi.com/?s=avengers&apikey=1261c60c')
      .then(res => setCard(res.data.Search))
      .catch(err => alert(`${err} Please try again!`));

    store.subscribe(() => {
      const state = store.getState().cards;
      setState(state);
    });
    setState(store.getState().cards);
  }, []);

  const onImgError = (e) => {
    e.target.src = nophoto;
  }

  const handleName = (e) => {
    if (e.target.value.trim() === "") setDisable(true);
    else setDisable(false);
    listName.current = e.target.value;
    setanimation(false);
  }

  const handleSave = () => {
    let listArr = store.getState().list;
    let existList = listArr.find(item => item.name === listName.current);
    if (existList) {
      toast.warn('This list name already exists !', { containerId: 'warning' });
    } else {
      if (state.length) {
        setAble(true);
        toast.success(`Click to check list \u00A0'${listName.current}'`, { containerId: 'success' });
        store.dispatch({
          type: "ADD_LIST",
          payload: {
            name: listName.current,
            favList: state
          }
        });
        store.dispatch({ type: "CLEAR_CARD" });
      } else {
        toast.warn('Please add cards first !', { containerId: 'warning' });
      }
    }
  }

  const removeFromList = (card) => {
    setanimation(false);
    store.dispatch({
      type: "DELETE_CARD",
      payload: {
        id: card.id
      }
    });
  }

  const addToList = (item) => {
    let element = state.find(item2 => item2.title === item.Title);
    if (!element) setanimation(true);
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
    if (e.target.value.trim() !== '') {
      let search = e.target.value.trim();
      axios.get(`http://www.omdbapi.com/?s=${search}&apikey=1261c60c`)
        .then(res => {
          setCard(res.data.Search);
          setData(true);
        })
        .catch(err => alert(`${err} something get wrong Please try again!`));
    } else {
      axios.get('http://www.omdbapi.com/?s=avengers&apikey=1261c60c')
        .then(res => setCard(res.data.Search))
        .catch(err => alert(`${err} Please try again!`));
    }
    setanimation(false);
  }

  if (!card) {
    var timer = setTimeout(() => {
      setData(false);
    }, 1000);
  } else {
    clearTimeout(timer);
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
          <img className={main.icon} src={search} alt="search-icon" loading='lazy' />
        </div>
        <div className={main.cards}>
          {
            card
              ?
              card.map(item =>
                <div key={Math.random()} className={main.cardItem}>
                  <img
                    src={item.Poster}
                    alt="cardimage"
                    loading='lazy'
                    onError={onImgError}
                  />
                  <div className={main.cardContent}>
                    <div>
                      {item.Title} ({item.Year})
                    </div>
                    <button
                      disabled={able}
                      style={{ backgroundColor: (able ? 'transparent' : 'black') }}
                      onClick={() => addToList(item)}
                    >
                      Add to list
                    </button>
                  </div>
                </div>
              )
              :
              data
                ?
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
                :
                <h1 className={main.noResult}>
                  Sorry but there is no result try to type something else
                </h1>
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
            maxLength={70}
          />
          {
            state.length
              ?
              <div
                ref={baselist}
                className={main.baseList}
              >
                <ul>
                  {
                    state.map(card =>
                      <li
                        key={Math.random()}
                        className={animation ? main.current : ""}
                        style={{ background: (card.poster.includes('http') ? `url(${card.poster})` : '#1d1d1d') }}
                      >
                        <span> {card.title} ({card.year})</span>
                        <button
                          className={main.button}
                          onClick={() => removeFromList(card)}
                        >
                          Remove from list
                        </button>
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
        <Link className={main.toaster} to='/list'>
          <ToastContainer
            style={{
              bottom: '-7px',
              right: '0px',
              width: '30%',
              textAlign: 'center',
              lineHeight: '22px'
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
            enableMultiContainer
            containerId={'success'}
          />
        </Link>
      </section>
      <ToastContainer
        enableMultiContainer
        containerId={'warning'}
        position="top-center"
        autoClose={2500}
        limit={1}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        closeButton={false}
      />
    </main>
  )
}

export default Main;
