import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import AddStudent from './pages/addStudent';
import StudentDetails from './pages/studentDetails';
import StudentList from './pages/studentList';
import UpdateStudent from './pages/updateStudent';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Route component={App} />
        <Route exact path="/" component={StudentList} />
        <Route exact path="/students/add" component={AddStudent} />
        <Route strict exact path="/students/:id/" component={StudentDetails} />
        <Route exact path="/students/:id/update" component={UpdateStudent} />
      </React.StrictMode>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
