import clsx from 'clsx';
import { useEffect, useState } from 'react';
import './App.css';
import InfoImage from './components/InfoImage/InfoImage';

function App() {
  const [image, setImage] = useState({});
  const [newImage, setNewImage] = useState();
  const [tags, setTags] = useState({
    hash: '',
    emotions: '',
    photo_color: [],
    objects: [],
  });

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (Object.keys(image).length < 1) return;
    const newImages = window.URL.createObjectURL(image[0]);

    setNewImage(newImages);
  },[image]);


  useEffect(() => {

    if (Object.keys(image).length < 1) return;

     downloadRR(image);

  },[image]);

  console.log(tags);

  return (
    <div className="app">

      <div className={clsx('app__photo-input-view',{
        'app__photo-input-view--download':newImage
      })}>

        {/* <div>
          <input className='app__photo-input' type="file" onChange={download} />
        </div> */}


          {newImage ? (<img className='app__photo-view' src={newImage} alt="foto" />) : (
            <div style={{
              minHeight: 400,
              maxHeight: 500,
              backgroundColor: 'red',
              borderRadius: 10,
            }}>
                превью
            </div>
          )}


        <div className='app__photo-input-div'>
          <div style={{
              position: 'absolute',
              top:'50%',
              left: '50%',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            }}>
            Choose file...
            </div>
          <input className='app__photo-input' type="file" onChange={download} />
        </div>
      </div>


{Object.keys(image).length < 1  ? (<div>Upload image</div>) : (
    <InfoImage 
      isLoading={isLoading} 
      tags={tags}
    />)}
      
    </div>
  );

  async function  downloadRR(image) {

    setIsLoading(true);

    const respos = await fetch("http://localhost:7501/api/photos/add", {
      body: image[0],
      headers:{
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Request-Method': 'POST'
      },
      method: "POST"
    });

    const {photo_id}  = await respos.json();

    // console.log(photo_id);
    // setId(photo_id);

    const responsTags = await fetch(`http://localhost:7501/api/labels/${photo_id}`, {
      headers:{
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Request-Method': 'POST'
      },
      method: "GET"
    })
  
    const data = await responsTags.json();

    if (data) {
      setTags(data);
      setIsLoading(false);
     }
  }

  function  download(event) {
    setImage(event.target.files);
  }
}

export default App;
