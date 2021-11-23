import './App.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'

toast.configure()

function App() {
  const Notify = () => {
    toast('Basic Notify', { position: toast.POSITION.TOP_LEFT })
  toast.success('Completed',{position:toast.POSITION.TOP_RIGHT})     
  }
  
  return (
    <div className="App">
      <h5>Toastify</h5>
      <button onClick={Notify}>Notify</button>
      <h4>Modal</h4>

      <Modal isOpen={true}>
        <h2>Modal title</h2>
      </Modal>
    </div>
  );
}

export default App;
