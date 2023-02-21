import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as  LinkTo, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const RouterName = [
  {
    pathName: '/',
    pageName: 'List'
  },
  {
    pathName: '/create',
    pageName: 'Create'
  }
]


export default function Breadcrumb() {
  let location = useLocation();
  let navigate = useNavigate();
  const [pageName, setPageName] = useState("")

  useEffect(() => {
    let current = RouterName.find( info =>{
      return info.pathName === location.pathname
    });
    setPageName(current?.pageName)
  }, [location]);



  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
          <Link component="span" underline="hover" color="text.secondary" href="#" onClick={() => navigate('/')}>
            Task
          </Link>
          <Link
            component="span"
            underline="none"
            color="text.primary"
            href="#"
            aria-current="page"
          >
            {pageName}
          </Link>
      </Breadcrumbs>
    </div>
  );
}