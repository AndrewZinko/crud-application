import { updateEmployees } from './search-slice';
import { useDispatch } from 'react-redux';
import './search-panel.css';

const SearchPanel = () => {
    const dispatch = useDispatch();

    const onUpdate = (value) => {
        dispatch(updateEmployees(value));
    }

    return (
        <input type="text"
                className="form-control search-input"
                placeholder="Search employee"
                onChange={(e) => onUpdate(e.target.value)}/>
    )
}

export default SearchPanel;