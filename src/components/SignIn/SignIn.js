import { useState, useEffect } from 'react';
import { PopInBelow } from '../CustomEffects/PopIn';

const SignIn = ({ onRouteChange, initializeActiveUser }) => {
  const [signInForm, setSignInForm] = useState({
    email: '',
    plainTextPassword: ''
  });
  const [errorMessages, setErrorMessages] = useState({
    messages: [],
    shouldDisplay: true
  });

  useEffect(() => {
    const errorMessagesContainer = document.querySelector('#error-messages-container');
    const offset = 50 * (errorMessagesContainer.children.length - 1);

    errorMessagesContainer.style.setProperty('--offset', `${offset}px`);

    const timeoutId = window.setInterval(() => {
      const errorMessagesClone = errorMessages.messages;
      errorMessagesClone.pop();
      setErrorMessages({...errorMessages, messages: [...errorMessagesClone], shouldDisplay: false});
    }, 4500);

    return () => {
      window.clearInterval(timeoutId);
    };
  }, [errorMessages]);

  useEffect(() => {
    const signInButton = document.querySelector('#submit-sign-in');
    let allFieldsAreValid = true;
    
    for (const field in signInForm) {
      if (field.length && canValidate(field, signInForm[field])) {
        continue;
      }
      allFieldsAreValid = false;
      break;
    }

    if (allFieldsAreValid) {
      signInButton.style.setProperty('background-color', 'var(--green)');
      signInButton.style.setProperty('border-color', 'transparent');
    } else {
      signInButton.style.setProperty('background-color', 'transparent');
      signInButton.style.setProperty('border-color', 'black');
    }
  }, [signInForm]);

  const onSubmitSignIn = async () => {
    try {
      if (!signInForm.email || !signInForm.plainTextPassword) {
        addNewErrorMessage('Please fill out all fields.');
        return;
      }
  
      const response = await fetch('http://localhost:3005/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInForm)
      })
      const user = await response.json();
  
          if(!user.error) {
            initializeActiveUser(user);
            onRouteChange('home');
            return;
          }
          addNewErrorMessage(user.message);
          return;
    }
    catch (err) {
      console.log(err);
    }
  }

  const onInputChange = (event) => {
    setErrorMessages({...errorMessages, messages: []});
    const name = event.target.name;
    const value = event.target.value;
    const signInFormFieldValue = { [name]: value };

    if (canValidate(name, value)) {
      event.target.style.setProperty('border-color', 'var(--green)');
    } else {
      event.target.style.setProperty('border-color', 'var(--light-gray)');
    }
    
    // setSignInForm(Object.assign(signInForm, signInFormFieldValue));
    setSignInForm({...signInForm, ...signInFormFieldValue});
  }

  const canValidate = (field, value) => {
    if (field === 'email') {
      const regex = new RegExp(/^.+@.+\..+/);
      return regex.test(value);
    } else if (field === 'plainTextPassword') {
      const regex = new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/);
      return regex.test(value);
    }
    throw new Error(`Unrecognized field on signup form: ${field}`)
  }

  const addNewErrorMessage = (newMessage, display = true) => {
    if (errorMessages.messages.find(msg => msg === newMessage) === undefined) {
      return setErrorMessages({...errorMessages, messages: [newMessage, ...errorMessages.messages], shouldDisplay: display});
    }
    return setErrorMessages({...errorMessages, messages: [...errorMessages.messages], shouldDisplay: display});
  }

  return (
    <main className="relative pa4 black-80 br2 ba dark-gay b--black-10 mv4 w-100 w-50-m w-30-l mw5 mw6-ns center bg-white">
      <div className="measure center">
        <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6 mb1 tl" htmlFor="email-address">Email</label>
            <input
              className="pa2 input-reset ba bw2 bg-transparent hover-bg-light-gray w-100"
              type="email"
              name="email"
              id="email"
              onChange={onInputChange}
            />
          </div>
          <div className="mt2">
            <label className="db fw6 lh-copy f6 mb1 tl" htmlFor="password">Password</label>
            <input
              className="b pa2 input-reset ba bw2 bg-transparent hover-bg-light-gray w-100"
              type="password"
              name="plainTextPassword"
              id="plainTextPassword"
              onChange={onInputChange}
            />
          </div>
        </fieldset>
        <div className="lh-copy mt3 tc">
          <div id="error-messages-container" className="absolute left-0 right-0 w-100 flex flex-column tooltip">
              {
                // TODO: push existing messages down as new ones pop in from the top
                errorMessages.messages.length && errorMessages.shouldDisplay
                ?
                  errorMessages.messages.map((msg, i) => {
                    return (
                      <PopInBelow key={i}>
                        <div
                          className="relative left-0 right-0 w-100 flex justify-center content-center pv2 ph1 bg-white ba b--black-10 br-pill"
                        >
                          <span className="b blue tl">{msg}</span>
                        </div>
                      </PopInBelow>
                    )
                  })
                : null
              }
            </div>
            <input
              className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              id="submit-sign-in"
              type="submit"
              value="Sign in"
              onClick={onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3 tc">
            <p
              className="f6 link dim black di pointer"
              onClick={() => onRouteChange('signup')}
            >Sign up</p>
          </div>
      </div>
    </main>
  );
}

export default SignIn;
