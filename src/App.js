import React, {Component} from 'react';
import axios from 'axios'

import View from './View';
import Project from './Project';
import AddProjectForm from './AddProjectForm';
import UpdateProjectForm from './UpdateProjectForm';

import './App.css';

var urlPrefix = 'http://localhost:4000/api'

class  App extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeView:'projects',
      projects:[
        {
          id:1,
          name:'Morning in Waiheke',
          description: 'Painting by a local artist'
        },{
          id:2,
          name:'The thinking man',
          description: 'Bronze sculpture fitted for morden office space'
        }
      ],

    
      projectToUpdate:{
        id:2,
        name:'The thinking man',
        description: 'Bronze sculpture fitted for morden office space'
      }


    }

  }
  setActiveView = (view) => {
    this.setState({activeView:view})
  }


setProjectToUpdate = (id) => {
 
  var foundProject = this.state.projects.find((project) => {
    return project.id === id
  })

  this.setState({projectToUpdate:foundProject})
}


  //CRUD methods in React using the API backend
  getProjects = () => {
    axios.get(urlPrefix+'/projects')
    .then(res => {
      this.setState({projects:res.data})
    })
  }

  addProject = (data) => {
    
    axios.post(urlPrefix+'/projects',data)
    .then(res => {
      this.getProjects()
    })
  }

  deleteProject = (id) => {
    axios.delete(urlPrefix+'/projects/'+id)
    .then(res => {

      this.getProjects();
    })
  }

  updateProject = (id,data) => {
    axios.put(urlPrefix+'/projects/'+id,data)
    .then(res => {
      this.getProjects()
    })
  }

  componentDidMount(){
    this.getProjects()
  }

  render(){

    return (
        <div className="app">
      
          <View viewName="projects" activeView={this.state.activeView} className="color1" >

            <div className="header">
              <i onClick={() => this.setActiveView('add-project')} className="fas fa-plus"></i>
              <i onClick={() => this.setActiveView('nav')} className="fas fa-bars"></i>
            </div>
            <div className="main">
              <h3>Projects</h3>

              {
                this.state.projects.map((project) => {

                  var projectProps = {
                    ...project,
                    setActiveView: this.setActiveView,
                    deleteProject: this.deleteProject,
                    setProjectToUpdate: this.setProjectToUpdate
                  }
                  return (<Project {...projectProps} />)
                })
              }
              

            
            </div>

          </View>

          <View viewName="add-project" activeView={this.state.activeView} className="color2" >

            <div className="header">
              <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
            </div>
            <div className="main">
              <h3>Add a project</h3>
              <AddProjectForm addProject={this.addProject} setActiveView={this.setActiveView}/>
            </div>

          </View>

          <View viewName="update-project" activeView={this.state.activeView} className="color3" >

            <div className="header">
              <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
            </div>
            <div className="main">
              <h3>Update a project</h3>
              <UpdateProjectForm {...this.state.projectToUpdate} updateProject={this.updateProject} setActiveView={this.setActiveView}/>
            </div>

          </View>

          <View viewName="nav" activeView={this.state.activeView} className="color5" Name>

            <div className="header">
              <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
            </div>
            <div className="main">

              <ul className="menu">
                <li><a onClick={() => this.setActiveView('projects')} className="color1" href="#">Projects</a></li>
                <li><a onClick={() => this.setActiveView('add-project')} className="color2" href="#">Add a project</a></li>
         
              </ul>

            </div>

          </View>

        </div>
    )
  }



}

export default App
