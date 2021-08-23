import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
}from 'react-router-dom'
import Login from '../login/login';
import Register from '../createUser/Register';
import Farm from '../home/Farm';
import Animal from '../../pages/createAnimal/Animal';
import Home from '../home/Home';
import GetAnimal from '../createAnimal/getAnimal';
import GetLand from '../home/farm_components/Get Land/getLand';
export default ()=> ( 
    //add the url of login/register, feed, product, profile,etc
    <Router>
        <Switch>
        <Route path="/farm" exact component={Farm}/>
        <Route path ="/" exact component={Login} />
        <Route path ="/GetAnimal" exact component={GetAnimal} />
        <Route path ="/GetLand" exact component={GetLand} />
        <Route path ="/home" exact component={Home} />
        <Route path ="/animal" exact component={Animal} />
        <Route path ="/register" exact component={Register}/> 
        </Switch>
    </Router>
)