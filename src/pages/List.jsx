import React, { useContext, useEffect, useRef, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { store } from '../store/store';
import ScrollToTop from 'react-scroll-to-top';
import Replace from '../components/Replace';
import '../assets/styles/pages/List.scss';
import { Context } from '../context';
import { Link } from 'react-router-dom';

const List = () => {
    const { location } = useContext(Context);
    const [lists, setlists] = useState([]);
    const [open, setOpen] = useState(false);
    const nameOfList = useRef('');
    useEffect(() => location(window.location.href), [location]);

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState().list;
            setlists(state);
        });
        setlists(store.getState().list);
    }, []);

    const sendName = (name) => {
        setOpen(true);
        nameOfList.current = name;
    }

    const removeList = () => {
        store.dispatch({
            type: "DELETE_LIST",
            payload: {
                name: nameOfList.current
            }
        });
        setOpen(false);
    }

    return (
        <>
            <section className='list'>
                <div className='heading'></div>
                {
                    lists.length
                        ?
                        <div className="container">
                            <ul className="responsive-table">
                                <li className="table-header">
                                    <div className="col col-1">Name of the List</div>
                                    <div className="col col-2">Movies</div>
                                    <div className="col col-3">Delete</div>
                                </li>
                                {
                                    lists.map(item =>
                                        <li key={Math.random()} className="table-row">
                                            <Link to={item.name} className="col col-1">{item.name}</Link>
                                            <div className="col col-2">{item.favList.length}</div>
                                            <div onClick={() => sendName(item.name)} className="delete-item"><div>X</div></div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        :
                        <Replace />
                }
                <ScrollToTop
                    top={10}
                    className='up-btn'
                    smooth
                    color='white'
                    height='20'
                />
            </section>
            {
                open && <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    center
                    showCloseIcon={false}
                    classNames={{
                        modal: 'customModal',
                    }}
                >
                    <div className='modal-wrapper'>
                        Are you sure you want to delete this list ?
                        <div className='modal-buttons'>
                            <button onClick={removeList} className='modal-yes-button'>Yes</button>
                            <button onClick={() => setOpen(false)} className='modal-no-button'>No</button>
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}

export default List;
