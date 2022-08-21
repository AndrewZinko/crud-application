import './error-component.css';

const ErrorComponent = ({header, description}) => {
    return (
    <div className="card danger-card mb-3" style={{"max-width": "25rem"}}>
        <h6 className="card-header">{header}</h6>
        <div className="card-body">
            <p className="card-text">{description}</p>
        </div>
    </div> 
    );
}

export default ErrorComponent; 