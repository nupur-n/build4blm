import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const checkStatements = [
  'I confirm my understanding that participating in this initiative is NOT an opportunity to do “charity work” or cleanse my own guilt.',
  'I am committed to listening to the needs of the team I am working for, and building what they ask for rather than assuming I know what is best.',
  'I am committed to being anti-racist online and in person.',
  'I will refrain from giving my client the burden of educating me on systemic racism and oppression and I am committed to actively educate myself on these topics instead.',
  'I am committed to offering my skills pro bono and completely free of charge for the entire duration of this project.',
  'I am committed to supporting the intersectionality of anti-racism efforts and will not discriminate against any clients for ANY part of their identity.',
  'I am committed to ensuring that the entire duration of this project development and communication efforts remain a safe space for all parties involved.'
]

const ConfirmationCheck = ({ hasConfirmed, setHasConfirmed }) => {
  const [confirmationChecks, setConfirmationChecks] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    setAllChecked(confirmationChecks.every((check) => check));
  }, [confirmationChecks]);

  const updateCheckbox = (id) => {
    setConfirmationChecks(confirmationChecks.map((check, index) => (index === id ? !check : check)));
  };

  return (
    <div className="confirmation-checks-modal">
      <h3>Before you take on this project</h3>
      <p className="indent-text">
        The tech and design industries come with a history of discrimination and racism that persists today. This
        appears in products that are designed with racial bias and that exclude black communities, and in the lack of
        diversity in the teams that create these products. Racial inequalities in tech are perpetuated through cases
        such as product design, tokenism hires, and the lack of Black professionals holding leadership positions in
        large companies.
      </p>
      <p className="indent-text">
        To participate in the Build for Black Lives initiative, it is critical to be consciously anti-racist and to
        create work and participate in this process in a way that actively supports and empowers black people. Be
        willing to listen, be respectful and empathetic of your project owners’ needs, and trust in the voices of the
        people you are working with and seek to empower their message rather than your own. For allies, it is essential
        to question your intentions. Remove yourself from the center of the narrative and be aware of how you're able to
        enter and exit from the conversation of Black socioeconomic and public health disparities.
      </p>
      <p>Please read and agree to the following guidelines in order to commit to this project:</p>
      <div className="checklist">
        {checkStatements.map((statement, idx) => (
          <label key={idx}>
            <input
              type="checkbox"
              checked={confirmationChecks[idx]}
              disabled={hasConfirmed}
              onChange={() => updateCheckbox(idx)}
            />
            <span>{statement}</span>
          </label>
        ))}
      </div>
      <div className="bottom-button-container">
        <Button
          className="secondary-button btn"
          disabled={!allChecked || hasConfirmed}
          onClick={() => setHasConfirmed(true)}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationCheck;
