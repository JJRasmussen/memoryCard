
export default function Card(props){
    return (
        <button 
            className='card' 
            onClick={props.handleClick}
            style={{
                backgroundImage: `url(${props.imageUrl})`,
                backgroundSize: 'cover',

            }}
        >
            <p>{props.cardName}</p>
        </button>
    )
}