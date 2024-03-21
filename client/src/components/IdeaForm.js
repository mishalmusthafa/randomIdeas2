import IdeasApi from "../../services/ideasApi";
import IdeaList from "./IdeaList";
class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListners() {
    this._form.addEventListener('submit', this._handleSubmit.bind(this));
  }

  async _handleSubmit(e) {
    e.preventDefault();
    if (!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value) {
      return alert('Please enter all fields');
    }

    // Save username to local storage
    localStorage.setItem('username', this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };
    console.log(idea);

    // Add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // Add Idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);

    // Clear Filed on submit
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';

    this.render();


    // Dispatch modal
    document.dispatchEvent(new Event('closemodal'));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
    `;
    this._form = document.querySelector('#idea-form');
    this.addEventListners();
  }

}

export default IdeaForm; 