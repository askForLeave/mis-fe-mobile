/**
 * Created by yangmutong on 2016/12/13.
 */
import React from 'react';
import {Route, Redirect, IndexRoute, IndexRedirect} from 'react-router';
import Index from '../container/Index.jsx';
import App from '../container/App.jsx';
import ReviewList from '../container/ReviewList.jsx';
import ApplyList from '../container/ApplyList';
import Help from '../container/Help.jsx';
import Edit from '../container/Edit.jsx';
import AddList from '../container/AddList.jsx';
import AddEdit from '../container/AddEdit.jsx';

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/index"/>
        <Route path="index" component={Index}/>
        <Route path="review" component={ReviewList}/>
        <Route path="apply" component={ApplyList}>
            <Route path="edit/:index" component={Edit}/>
        </Route>
        <Route path="add" component={AddList}>
            <Route path="edit/:index" component={AddEdit}/>
        </Route>
        <Route path="help" component={Help}/>
        <Route path="edit" component={Edit} />
        <Route path="addEdit" component={AddEdit}/>
    </Route>
);
