import React from 'react';
import '../assets/styles/pages/List.scss';

const List = () => {
    return (
        <section className='list'>
            <h1>My Lists</h1>
            <div className="container">
                <h2>AAAA</h2>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Name</div>
                        <div className="col col-2">Link</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-1" datalabel="Name">Red redemption 2000</div>
                        <div className="col col-2" datalabel="Link">
                           https://www.google.com/search?q=img&oq=i</div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default List;
