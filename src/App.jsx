import { Modal } from '@tourmalinecore/react-tc-modal';
import { Button, NativeSelect } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import './App.css';
import Loading from './components/Loading/Loading';

function App() {
  const [image, setImage] = useState({});
  const [newImage, setNewImage] = useState();
  const [tags, setTags] = useState();
  const [option, setOption] = useState({
    label: 1,
    value: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTrue, setTrue] = useState(false);


  useEffect(() => {
    if (Object.keys(image).length < 1) return;
    const newImages = window.URL.createObjectURL(image[0]);

    setNewImage(newImages);
  },[image]);


  useEffect(() => {

    if (Object.keys(image).length < 1) return;

     sendImage(image);

  },[image]);


  const arrayNumber = [...Array(10)].map((e, i) => i + 1);


  const waitResult =  isLoading ? <Loading /> : 'Тут будет результат';

  return (
    <div className="app">

      <div className={clsx('app__photo-input-view',{
        'app__photo-input-view--download':newImage
      })}>

          {newImage ? (<img className='app__photo-view' src={newImage} alt="foto" />) : (
            <div style={{ minHeight: 400, maxHeight: 500, backgroundColor: 'red', borderRadius: 10 }}>
                превью
            </div>
          )}


        <div className='app__photo-input-div'>
          <div style={{position: 'absolute', top:'50%', left: '50%', pointerEvents: 'none', transform: 'translate(-50%, -50%)'}}>
            Нажимай и вставляй картинку
            </div>
          <input className='app__photo-input' type="file" onChange={getInputImage} />
        </div>
      </div>

        <div>
            <div style={{width: 250, height: 250, fontSize: 50, textAlign: 'center'}}>{tags ? tags: waitResult }</div>
            <div style={{ display: 'flex'}}>
        <Button 
          color="primary"
          onClick={() => {
            setTrue(true);
          }}
          disabled={!newImage}
        >Верно</Button>
        <Button 
          color="danger"
          onClick={() => {
            setIsOpen(true);
          }}
          disabled={!newImage}
        >Неверно</Button>
</div>
        </div>


        {isTrue && (
        <Modal 
          title="Ура, чет умное сделали"
          content="Данные сохранили в бекенде! Беги смотреть"
          cancelText="Cancel"
          onClose={() => {
            setTrue(false);
            sendApruvResult(image, tags);

            // setTags();
            setNewImage();
            // setImage();
            setImage(Object.create({}));
            console.log(image);
            console.log(Object.create({}));
          }}
        />)}
    

        {isOpen &&(
        <Modal 
          title="Эх, чет надо думать, а сейчас помогай"
          content={(
            <NativeSelect 
              value={option.value}
              options={arrayNumber.map(i => ({
                label: i,
                value: i
              }))}
              onChange={(e) => setOption(e)}
            />
          )}
          cancelText="Отправить"
          onClose={() => {
            setIsOpen(false);
          }}
          showCancel
          onCancel={() => {
            sendApruvResult(image, option.value);
            setTags();
            setNewImage();
            setImage(Object.create({}));
          }}
        />
        )}
    </div>
  );

  async function sendImage(image) {

    setIsLoading(true);

    const respos = await fetch("http://localhost:9998/image/", {
      body: image[0],
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST'
      },
      method: "POST"
    });

    const {answer}  = await respos.json();

    setTags(answer);
    setIsLoading(false);
  }

  async function  sendApruvResult(image, number) {

    await fetch(`http://localhost:9998/image/save/${number}`, {
      body: image[0],
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST'
      },
      method: "POST"
    })
  
  }

  function  getInputImage(event) {
    setImage(event.target.files);
  }
}

export default App;
