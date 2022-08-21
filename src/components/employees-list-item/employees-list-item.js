import { useState } from 'react';
import './employees-list-item.css';

const EmployeesListItem = props => {
    const {id, name, salary, increase, bounty, onDelete, onUpdate} = props;
    const [salaryState, setSalaryState] = useState(salary);
    const increaseClass = increase ? 'increase' : null;
    const bountyClass = bounty ? 'like' : null;

    const updateSalary = (value) => {
        setSalaryState(value);
    }

    return (
        <li className={`list-group-item d-flex justify-content-between ${increaseClass} ${bountyClass}`}>
            <span className="list-group-item-label"
                    onClick={() => onUpdate(id, 'bounty', !bounty)}>{name}</span>
            <input type="text" 
                    className="list-group-item-input" 
                    value={`${salaryState}$`}
                    onChange={(e) => updateSalary(e.target.value.replace("$", ""))}
                    onBlur={(e) => onUpdate(id, 'salary', e.target.value.replace("$", ""))}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-cookie btn-sm "
                    onClick={() => onUpdate(id, 'increase', !increase)}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={() => onDelete(id)}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;