
export default function Card(props){

    return (
        <button 
            className='card' 
            key={props.id} 
            style={{
                backgroundImage: `url(${props.imageUrl})`,
                backgroundSize: 'cover',

            }}
        >
            <p>{props.cardName}</p>
        </button>
    )
}