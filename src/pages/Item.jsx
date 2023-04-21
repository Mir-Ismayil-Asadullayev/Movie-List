import React, { useState, useEffect, useContext, useRef } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import item from '../assets/styles/pages/Item.module.css';
import noPhoto from '../assets/images/noimage.jpg';
import { Context } from '../context';
import { useParams } from 'react-router';
import { store } from '../store/store';
import ScrollToTop from 'react-scroll-to-top';
import { Link } from 'react-router-dom';

const Item = () => {
    const { location } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [list, setList] = useState();
    const { name } = useParams();
    const listItem = useRef([]);
    const nameOfItem = useRef('');
    const nameofList = useRef('');

    useEffect(() => location(window.location.href), [location]);

    useEffect(() => {
        listItem.current = store.getState().list;
        let currentList = listItem.current.find(item => item.name === name);
        setList(currentList);
    }, [listItem, name]);

    const sendName = (listName, id) => {
        setOpen(true);
        nameOfItem.current = id;
        nameofList.current = listName;
    }

    const removeItem = () => {
        store.dispatch({
            type: "DELETE_ITEM_FROM_LIST",
            payload: {
                name: nameofList.current,
                id: nameOfItem.current
            }
        });
        setOpen(false);
        listItem.current = store.getState().list;
        let currentList = listItem.current.find(item => item.name === name);
        setList(currentList);
    }

    const imageError = (e) => {
        e.target.src = noPhoto;
    }

    return (
        <section className={item.wrapper}>
            <h1 className={item.listName}>{list?.name ? list.name : 'The List is Empty'}</h1>
            <div className={list ? item.container : ''}>
                {
                    list
                    ?
                    list.favList.map(cards =>
                        <div className={item.FlexItems} key={Math.random()} >
                            <img
                                src={cards.poster}
                                alt="poster"
                                loading='lazy'
                                onError={imageError}
                            />
                            <div className={item.cardsContent}>
                                <span>{cards.title} ({cards.year})</span>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`https://www.imdb.com/title/${cards.id}/`}
                                >
                                    Check on IMDB
                                </a>
                                <button onClick={() => sendName(list.name, cards.id)}>Delete</button>
                            </div>
                        </div>
                        )
                        :
                        <Link to='/list'>
                            <button className={item.back}>{'<-'} Go Back to List Page</button>
                        </Link>
                }
            </div>
            <ScrollToTop
                top={10}
                className='up-btn'
                smooth
                color='white'
                height='20'
            />
            {
                open && <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    center
                    showCloseIcon={false}
                    classNames={{
                        modal: item.customModal,
                    }}
                >
                    <div className={item.modalWrapper}>
                        Are you sure you want to delete this item ?
                        <div className={item.modalButtons}>
                            <button onClick={removeItem} className={item.modalYesButton}>Yes</button>
                            <button onClick={() => setOpen(false)} className={item.modalNoButton}>No</button>
                        </div>
                    </div>
                </Modal>
            }
        </section>
    )
}

export default Item;
