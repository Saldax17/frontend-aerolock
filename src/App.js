import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { awsExports } from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
});


function App() {
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    fetchJwtToken();
  }, []);
  
  const fetchJwtToken = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setJwtToken(token);
    } catch (error) {
      console.log('Error fetching JWT token:', error);
    }
  };
  
  
  return (
    <Authenticator initialState='signIn'
    components={{
      SignUp: {
        FormFields() {

          return (
            <>
              <Authenticator.SignUp.FormFields />

              <div><label>Name</label></div>
              <input
                type="text"
                name="name"
                placeholder="Please enter your Name"
              />

              <div><label>Email</label></div>
              <input
                type="text"
                name="email"
                placeholder="Please enter your Email"
              />

              <div><label>CC</label></div>
              <input
                type="text"
                name="CC"
                placeholder="Please enter your CC"
              />
              <div><label>Emergency Contact</label></div>
              <input
                type="text"
                name="emergencyContact"
                placeholder="Please enter your Emergency Contact"
              />
              <div><label>Occupation</label></div>
              <input
                type="text"
                name="Occupation"
                placeholder="Please enter your Occupation"
              />
              <div><label>Tel</label></div>
              <input
                type="text"
                name="Tel"
                placeholder="Please enter your Tel"
              />
       

            </>
          );
        },
      },
    }}
    services={{
      async validateCustomSignUp(formData) {
        if (!formData.Name) {
          return {
            name: 'Name is required',
          };
        }
        if (!formData.Email) {
          return {
            email: 'Email is required',
          };
        }
        if (!formData.CC) {
          return {
            CC: 'CC is required',
          };
        }
        if (!formData.emergencyContact) {
          return {
            emergencyContact: 'emergencyContact is required',
          };
        }
        if (!formData.Occupation) {
          return {
            Occupation: 'Occupation is required',
          };
        }
        if (!formData.Tel) {
          return {
            Tel: 'Tel is required',
          };
        }
      },
    }}
    >
      {({ signOut, user}) => (
        <div>Welcome {user.username}
        <button onClick={signOut}>Sign out</button>
        <h4>Your JWT token:</h4>
        {jwtToken}
        </div>
      )}
    </Authenticator>
  );
}

export default App;
