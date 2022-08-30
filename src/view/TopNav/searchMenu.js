import '../../scss/topNav/search-menu.scss';
import { IoClose } from 'react-icons/io5';
import { HiUserAdd } from 'react-icons/hi';
import iii from '../../img/profile.jpeg';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
// import { setUser } from '../../redux/slice/thisUser';

const SearchMenu = ({ ListUserFound, setListUserFound, withinSearch }) => {
    // console.log('ooo', ListUserFound);
    function displayPeople() {
        return ListUserFound.map((e, idx) => {
            return (
                <div className="one-row" key={idx}>
                    <img src={iii} alt="profile" />
                    <div className="name">{e.name}</div>
                    <div className="icon" onClick={() => addFriend(e)}>
                        <HiUserAdd className="ri" />
                    </div>
                    <div className="icon" onClick={() => removeRow(idx)}>
                        <IoClose className="ri" />
                    </div>
                </div>
            );
        });
    }

    function addFriend(e) {
        axios
            .post('/addFriend', {
                self: this_user,
                other: e,
            })
            .then((e) => {
                // window.eee = e;
                // console.log('then', e);
            });
    }

    function removeRow(idx) {
        // console.log('rm', ListUserFound, idx);
        // ListUserFound.splice(idx, 1);
        // console.log('rm2', ListUserFound, idx);
        // setListUserFound(ListUserFound);
    }

    const this_user = useSelector((s) => s.user);
    // const disp = useDispatch();

    // function set() {
    //     disp(setUser({ name: 'new name!' }));
    // }

    return (
        <div
            id="top-search-menu"
            onMouseOver={() => (withinSearch.current = true)}
            onMouseLeave={() => (withinSearch.current = false)}
        >
            {/* <p>{JSON.stringify(this_user)}</p>
            <button onClick={set}>set</button> */}

            <div>Searches .... </div>
            {displayPeople()}
            {/* <div className="one-row">
                <img src={iii} alt="profile" />
                <div className="name">Name Here</div>
                <div className="icon">
                    <IoClose className="ri" />
                </div>
            </div>
            <div className="one-row">
                <img src={iii} alt="profile" />
                <div className="name">Name Here 222</div>
                <div className="icon">
                    <IoClose className="ri" />
                </div>
            </div> */}
        </div>
    );
};

export default SearchMenu;
