import React, { useState } from 'react';
import Pagination from "react-js-pagination";

function App() {

    // current page
    const [currentPage, setCurrentPage] = useState(1);

    // total records per page to display
    const recordPerPage = 5;

    // total number of the records
    const totalRecords = 100;

    // range of pages in paginator
    const pageRange = 5;

    // handle change event
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
        // call API to get data based on pageNumber
    }

    return (
        <div className="App">

            <div className="mt-5 mb-3">
                <b>Current Page:</b><span className="ml-2">{currentPage}</span>
            </div>

            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={currentPage}
                itemsCountPerPage={recordPerPage}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={pageRange}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default App;