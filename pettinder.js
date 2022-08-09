
//const e = React.createElement;

class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dog: null };
    this.fetchNextPet = this.fetchNextPet.bind(this);
    this.btnClicked = this.btnClicked.bind(this);
    this.getTags = this.getTags.bind(this);
  }



  fetchNextPet() {
      console.log("HERE?")
    fetch("http://localhost:8080/dogs")
    .then(response => {
        console.log(response)
        if(response.ok) {
            response.json().then(data => {
                console.log(data)
                this.setState({dog: data})                  
            })
        }
    })
  }

  getTags() {
   
    return 


    
    //this.state.dog.tags.reduce((str, tag) => str + ", " + tag, "")
  }

  btnClicked() {
    console.log("clicked");
    this.fetchNextPet()
}

  componentDidMount() {
    this.fetchNextPet()
  }

  render() {

    console.log("render!")

    let tags
    let foo
    if (this.state.dog == null) {
        foo = <p>Loading...</p>
    }
    else {
      tags = this.state.dog.tags.map((tag) => {
          return (
            <div className="tag">
              <p>{tag}</p>
            </div>
          )
        })
        console.log(`tags: ${tags}`)
    
        foo = (
        <div className="pet">        
          <div className="pet-profile">
            <h2>{this.state.dog.name}</h2>
            <img id="profile-pic" src={this.state.dog.photos[0].medium} />
            <div id="tag-bar">
              {tags}
            </div>
          </div>
          <div className="card">
            <p>{decodeURI(this.state.dog.description)}</p>
          </div>
          <div className="swipe-button-bar">
            <button onClick={this.btnClicked}>Swipe Left</button>
            <button onClick={this.btnClicked}>Swipe Right</button>
          </div>

    </div>)
    }

    return (
        <div>
            {foo}

        </div>
    );
  }

}

const domContainer = document.querySelector('#pet');
const root = ReactDOM.createRoot(domContainer);
// root.render(e(Pet));
root.render(<Pet />);