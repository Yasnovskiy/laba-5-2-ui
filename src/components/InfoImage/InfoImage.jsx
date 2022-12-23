import Loading from "../Loading/Loading";
import "./InfoImage.css";


export default function InfoImage({
    isLoading,
    tags,
    }) {
        return (
            <>
                {isLoading ? <Loading/> : 
                    (<div>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                        }}>
                            <li>
                                <h2>colors</h2>
                                <div>
                                {tags.photo_color.map(({red, green, blue}) => (
                                <span key={red} style={{
                                    display: 'inline-block',
                                    padding: '10px 12px',
                                    border: '1px solid gray',
                                    borderRadius: 10,
                                    marginRight: 10
                                }}>
                                    <span style={{
                                    backgroundColor: `rgba(${red}, ${green},${blue})`,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 4,
                                    display: 'inline-block',
                                    }} />
                                </span>
                                ))}
                                </div>
                        </li>
                            <li>
                                <h2>hash</h2>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        padding: '10px 12px',
                                        border: '1px solid gray',
                                        borderRadius: 10,
                                        marginRight: 10
                                    }} 
                                    className="info-image__text">{tags.hash}</div>
                            </li>
                            <li>
                                <h2>emotions</h2>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        padding: '10px 12px',
                                        border: '1px solid gray',
                                        borderRadius: 10,
                                        marginRight: 10
                                    }} 
                                    className="info-image__text">{tags.emotions}</div>
                            </li>
                            <li>
                                <h2>objects</h2>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                        gap: 10,
                                    }} 
                                    className="info-image__text">{tags.objects.map((item) => (
                                    <span 
                                        style={{
                                            display: 'inline-block',
                                            padding: '10px 12px',
                                            border: '1px solid gray',
                                            borderRadius: 10,
                                            textAlign: 'center',
                                        }}
                                        key={item}>{item}</span>
                                ))}</div>
                            </li>
                        </ul>
                    </div>)}
            </>
        );
}