import LoadGif from '../../assets/loading.gif';

export const Loading = () => {
    return (
        <div className="load">
            <img src={LoadGif} alt="loading gif" />
        </div>
    );
};
