import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import './css/style.css';

const ideaList = new IdeaList();
const modal = new Modal();
const ideaForm = new IdeaForm();

ideaForm.render();
ideaList.render();


