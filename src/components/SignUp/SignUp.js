import { useState, useEffect } from 'react';
import { PopInBelow } from '../CustomEffects/PopIn';

const SignUp = ({ onRouteChange, initializeActiveUser, serverEndpoint }) => {
  const [signUpForm, setSignUpForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    plainTextPassword: ''
  });
  const [errorMessages, setErrorMessages] = useState({
    messages: [],
    shouldDisplay: true
  });
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);

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
    const signUpButton = document.querySelector('#submit-sign-up');
    let allFieldsAreValid = true;
    
    for (const field in signUpForm) {
      if (field.length && canValidate(field, signUpForm[field])) {
        continue;
      }
      allFieldsAreValid = false;
      break;
    }

    if (allFieldsAreValid) {
      signUpButton.style.setProperty('background-color', 'var(--green)');
      signUpButton.style.setProperty('border-color', 'transparent');
    } else {
      signUpButton.style.setProperty('background-color', 'transparent');
      signUpButton.style.setProperty('border-color', 'black');
    }
  }, [signUpForm]);

  const onSubmitSignUp = async () => {
    try {

      let allFieldsAreValid = true;
  
      for (const field in signUpForm) {
        if (field.length && canValidate(field, signUpForm[field])) {
          continue;
        }
        allFieldsAreValid = false;
        break;
      }
  
      if(allFieldsAreValid) {
        const response = await fetch(`${serverEndpoint}/signup`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signUpForm)
        })
        const user = await response.json();
            if(!user.error) {
              initializeActiveUser(user);
              onRouteChange('home');
              return;
            } else {
              addNewErrorMessage(user.error);
              return;
            }
      } else if (!signUpForm.email || !signUpForm.username || !signUpForm.plainTextPassword) {
        return addNewErrorMessage('Please fill out all required fields.');
      } else {
        return addNewErrorMessage('Please provide valid input.');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const addNewErrorMessage = (newMessage, display = true) => {
    if (errorMessages.messages.find(msg => msg === newMessage) === undefined) {
      return setErrorMessages({...errorMessages, messages: [newMessage, ...errorMessages.messages], shouldDisplay: display});
    }
    return setErrorMessages({...errorMessages, messages: [...errorMessages.messages], shouldDisplay: display});
  }

  const onInputChange = (event) => {
    setErrorMessages({...errorMessages, messages: []});
    const name = event.target.name;
    const value = event.target.value;
    const signUpFormFieldValue = { [name]: value };

    if (canValidate(name, value)) {
      event.target.style.setProperty('border-color', 'var(--green)');
    } else {
      event.target.style.setProperty('border-color', 'var(--light-gray)');
    }
    
    // setSignUpForm(Object.assign(signUpForm, signUpFormFieldValue));
    setSignUpForm({...signUpForm, ...signUpFormFieldValue});
  }

  const onInputFocus = (event) => {
    if (event.target.name === 'plainTextPassword') {
      setPasswordIsFocused(true);
      return;
    }
    setPasswordIsFocused(false);

  }

  const canValidate = (field, value) => {
    if (field === 'username') {
      /*
        TODO: make regex for a username
          * allow alphanumeric and _ symbol only
          * between
            ? 5 and 18 char long ?
          * can't start with _
          * needs at least 3 letters
      */
      return value.length >= 5 && value.length <= 100;
    } else if (field === 'firstName' || field === 'lastName') {
      const regex = new RegExp(/^[a-zA-Z]+$/);
      return regex.test(value);
    } else if (field === 'email') {
      const regex = new RegExp(/^.+@.+\..+/);
      return regex.test(value);
    } else if (field === 'plainTextPassword') {
      const regex = new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/);
      return regex.test(value);
    }
    throw new Error(`Unrecognized field on signup form: ${field}`)
  }

  return (
    <main className="relative pa4 black-80 br2 ba dark-gay b--black-10 mv4 w-100 w-50-m w-30-l mw5 mw6-ns center bg-white">
      <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0 center">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 mb1 tl" htmlFor="firstName">First Name</label>
              <input
                className="pa2 input-reset ba bw2 bg-transparent hover-bg-light-gray w-100"
                type="text"
                name="firstName"
                id="firstName"
                onChange={onInputChange}
                onFocus={onInputFocus}
              />
            </div>
          <div className="mt2">
              <label className="db fw6 lh-copy f6 mb1 tl" htmlFor="lastName">Last Name</label>
              <input
                className="pa2 input-reset ba bw2 bg-transparent hover-bg-light-gray w-100"
                type="text"
                name="lastName"
                id="lastName"
                onChange={onInputChange}
                onFocus={onInputFocus}
              />
            </div>
          <div className="mt2">
            <label className="db fw6 lh-copy f6 mb1 tl" htmlFor="username">Username</label>
            <input
              className="pa2 input-reset ba bw2 bg-transparent hover-bg-light-gray w-100"
              type="text"
              name="username"
              id="username"
              onChange={onInputChange}
              onFocus={onInputFocus}
            />
          </div>
          <div className="mt2">
            <label className="db fw6 lh-copy f6 mb1 tl" htmlFor="email-address">Email</label>
            <input
              className="pa2 input-reset ba bw2 bg-transparent hover-bg-light-gray w-100"
              type="email"
              name="email"
              id="email"
              aria-required="true"
              required="required"
              onChange={onInputChange}
              onFocus={onInputFocus}
            />
          </div>
          <div className="mt2 mb3">
            <label className="db fw6 lh-copy f6 mb1 tl" htmlFor="plainTextPassword">Password</label>
            <input
              className="b pa2 input-reset ba bw2 bg-transparent hover-bg-light-gray w-100"
              type="password"
              name="plainTextPassword"
              id="plainTextPassword"
              aria-required="true"
              required="required"
              onChange={onInputChange}
              onFocus={onInputFocus}
            />
            {
              passwordIsFocused && !canValidate('plainTextPassword', signUpForm.plainTextPassword)
              ?
                <p className="tl lh-copy f6 gray mt1">6 character minimum. Must contain at least 1 number, 1 lowercase letter</p>
              : null
            }
          </div>
        </fieldset>
        <div className="lh-copy mt2 tc">
          <div id="error-messages-container" className="absolute left-0 right-0 w-100 flex flex-column">
            {
              errorMessages.messages.length && errorMessages.shouldDisplay
              ?
                errorMessages.messages.map((msg, i) => {
                  return (
                    <PopInBelow key={i}>
                      <div
                        className="relative left-0 right-0 w-100 flex justify-center content-center mv1 pv2 ph1 bg-white ba b--black-10 br-pill"
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
            className="b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            id="submit-sign-up"
            type="submit"
            value="Sign Up"
            onClick={onSubmitSignUp}
          />
        </div>
        <div className="lh-copy mt3 tc">
          <p
            className="f6 link dim black pointer di"
            onClick={() => onRouteChange('signin')}
          >Back to Sign In</p>
        </div>
      </div>
    </main>
  )
}

export default SignUp;
