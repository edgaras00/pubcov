import React, {useState} from 'react';
import Modal from 'react-modal';

function PageModal({pageJump, totalPages, changePageJump, changePage}) {
    // Functional modal component to select specific pages to go to

    // Show / hide modal
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
        // Function to open modal
        setIsOpen(true);
    };

    function handleClose() {
        // Function to close modal
        setIsOpen(false);
    };

    function handlePageJump() {
        // Function to that changes the page to user's selected page
        if (pageJump <= totalPages && pageJump >= 1) {
             changePage(pageJump);
             setIsOpen(false);
        } else {
            alert('Selected page is out of range.')
        }
       
    }

    return (
        <div>
            <button onClick={handleOpen}>Jump to page</button>
            <Modal isOpen={isOpen} onRequestClose={handleClose} ariaHideApp={false}>
                <div className='page-modal'>
                    <label>
                        <input
                            type='number' 
                            name='pageJump'
                            min={1}
                            max={totalPages}
                            value={pageJump}
                            onChange={(event) => changePageJump(event.target.value)}
                        /> <span>of {totalPages}</span>
                    </label>
                    <button onClick={handlePageJump}>Jump to page</button>
                    <button onClick={handleClose}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default PageModal;
