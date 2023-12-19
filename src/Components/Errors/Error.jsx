const Error = ({ errorMessage, setErrors }) => {
    return (
        <div className="error">
            {errorMessage}
            <div
                onClick={() => setErrors({ userSearchError: '' })}
                className="close-error"
            >
                <div>x</div>
            </div>
        </div>
    );
};

export default Error;
