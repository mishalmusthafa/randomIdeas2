import IdeasApi from "../../services/ideasApi";
class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];

    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('invention');

    this.getIdeas();
  }

  addEventListners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(ideaId);

      // Delete from Dom
      this._ideas.filter((idea) => idea.id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert('You are not authorized to delete this Post');
    }
  }

  async addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }



  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  dateTimeFormat(data) {
    const date = (data
      .slice(0, -5)
      .split('')
      .splice(0, 10)
      .join('')
    );
    const time = (data
      .slice(0, -5)
      .split('')
      .splice(11, 15)
      .join('')

    );
    const dateTime = `Date: ${date}, <br>Time: ${time}`;
    return dateTime;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas.map((idea) => {
      const formatedDate = this.dateTimeFormat(idea.date);
      const ideaClass = this.getTagClass(idea.tag);
      const deleteBtn = idea.username === localStorage.getItem('username') ? '<button class="delete"><i class="fas fa-times"></i></button>' : '';
      return `
      <div class="card" data-id="${idea._id}">
        ${deleteBtn}
        <h3>
          ${idea.text}
        </h3>
        <p class="tag ${ideaClass}">${idea.tag}</p>
        <p>
          Posted on <span class="date">${formatedDate}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>
      `;
    }).join('');
    this.addEventListners();
  }
}

export default IdeaList;