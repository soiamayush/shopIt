import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Navigate } from 'react-router-dom'
import { loadUser } from '../../actions/userActions'
import Loader from '../layouts/Loader'

const ProtectedRoute = ({ isAdmin, children}) => {
    const {  isAuthenticated = false, loading=true, user } = useSelector( state => state.auth) //isAuthenticated by default is false

    const dispatch = useDispatch();

    useEffect(()=>{
      if(!user){
        dispatch(loadUser());
      }
    }, [isAuthenticated, loading, dispatch, user])
  if(loading) {<h1><Loader/></h1>}

  if(!loading && isAuthenticated){
    if(isAdmin === "true" && user.role !== "admin"){
      <Navigate to="/"/>
    }
    else{
      return children
    }
  }
  else{
    return <Navigate to={"/login"}/>
  }
}

export default ProtectedRoute