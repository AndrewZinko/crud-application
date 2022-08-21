import { useCreateEmployeeMutation } from '../api/api-employees-slice';
import { nanoid } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form';

import './employees-add-form.css';

const EmployeesAddForm = () => {
    const {register, setValue, handleSubmit, formState: { errors }} = useForm();
    const [createEmployee, {isLoading}] = useCreateEmployeeMutation();

    const onSubmit = (data) => {
        const {name, salary} = data;
        const newEmployee = {
            id: nanoid(),
            name,
            salary,
            increase: false,
            bounty: false
        }
        createEmployee(newEmployee).unwrap();
        setValue('name', '');
        setValue('salary', '')
    }

    return (
        <div className="app-add-form">
            <h3>Add new employee</h3>
            <form onSubmit={handleSubmit(onSubmit)}
                className="add-form d-flex">
                <div>
                    <input type="text"  
                        {...register('name', {required: true, pattern: /^[A-Za-z ,.'-]+$/i})}
                        className="form-control new-post-label"
                        placeholder="Name of employee"/>
                    {errors.name?.type === 'required' && "Name is required!"}
                    {errors.name?.type === 'pattern' && "Wrong value. Is this a name?"}
                </div>
               <div>
                    <input type="number"
                        {...register('salary', {required: true, min: 0})}
                        className="form-control new-post-label"
                        placeholder="Salary of employee"/>
                    {errors.salary?.type === 'required' && "Salary is required!"}
               </div>

                <button type="submit"
                        style={{height: '38px'}}
                        disabled={isLoading}
                        className="btn btn-outline-light">
                        Add</button>
            </form>
        </div>
    )
}

export default EmployeesAddForm;