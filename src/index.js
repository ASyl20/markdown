import React from 'react'
import {render} from 'react-dom'

//CSS
import './style/css/bootstrap.min.css'
import './index.css'

//JS PERSO
import {sampleText} from './sampleText'

// Marked.js
import marked from 'marked'


class App extends React.Component{



  state = {
    text : sampleText
  }

  // Composants de clycle react

//Juste avant que le rendu soit rentré et mise a jour
  componentWillMount(){
    const localStorageText = localStorage.getItem('text')
    //console.log(localStorageText)
    if ( localStorageText){
      this.setState({text : localStorageText})
    }
  }

  // Pour lui preciser l'état qui va arriver
  // LocalStorage est une fonction HTML 5
  componentWillUpdate(newtProps , nextState){
    localStorage.setItem('text', nextState.text)
  }

  // Methodes

  editText = (event) =>{
    const text = event.target.value
    this.setState({text :text})
  }

  renderText = (text) => {
    const renderText = marked(text , {sanitize : true})
    return {__html : renderText}
  }

// Affichage

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea onChange={(e) =>this.editText(e)} value={this.state.text} rows="35" className="form-control">

            </textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>
      </div>
    )
  }
}

render (
  <App/>, document.getElementById('root')
)
