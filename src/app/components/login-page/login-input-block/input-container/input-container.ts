import { BaseComponent } from '../../../factory-components/base-components';
import InputComponent from './input/input';
import './input-container.scss';
import ValidityError from './validity-error/validity-error';
import connection from '../../../../service/connection';
import { logErrorType, typeOfRequest } from '../../../../utils/types';
import type ButtonView from '../../../factory-components/button/button';

export default class InputContainer extends BaseComponent {
  private name;
  private input;
  private type;
  private lengthError;
  private caseAndDigitError;
  private connection;
  private submitButton;
  constructor(name: string, type: string, submitButton: ButtonView, validation: () => void) {
    super({ tag: 'div', classNames: ['login-input-container'] });
    this.name = name;
    this.type = type;
    this.input = new InputComponent({
      options: {
        id: this.name,
        type: this.type,
        name: this.name,
        placeholder: `Enter ${this.name}, please`,
      },
    });
    this.connection = connection;
    this.submitButton = submitButton;
    this.lengthError = new ValidityError(this.name, 'Length must be more than 4 characters');
    this.caseAndDigitError = new ValidityError(this.name, 'Use lowercase and uppercase letters and at least one digit');
    this.connection.subscribe(typeOfRequest.ERROR, (response) => {
      if (response.payload.error) {
        this.showServerError(response.payload.error);
      }
    });
    this.configureView(validation);
  }

  public checkValidationInput(): boolean {
    switch (this.type) {
      case 'text': {
        return this.showError(this.lengthError, this.checkValidityLength());
      }
      case 'password': {
        this.showError(this.lengthError, this.checkValidityLength());
        this.showError(this.caseAndDigitError, this.checkValidityCaseAndDigit());
        return (
          this.showError(this.lengthError, this.checkValidityLength()) ||
          this.showError(this.caseAndDigitError, this.checkValidityCaseAndDigit())
        );
      }
    }
    return false;
  }

  private showServerError(error: logErrorType): void {
    const serverError = new ValidityError(this.name, error);

    if (this.name === 'password' && error === logErrorType.INCORRECT_PASSWORD) {
      this.addChild(serverError);
      this.submitButton.makeDisabled();
    } else if (this.name === 'login' && error !== logErrorType.INCORRECT_PASSWORD) {
      this.addChild(serverError);
      this.submitButton.makeDisabled();
    }
    this.input.addListener('input', () => {
      serverError.removeElement();
    });
  }

  private showError(errorElement: ValidityError, validateFunction: boolean): boolean {
    if (validateFunction) {
      this.addChild(errorElement);
      return true;
    } else {
      errorElement.removeElement();
      return false;
    }
  }

  private checkValidityLength(): boolean {
    return this.input.getValue().length <= 4;
  }

  private checkValidityCaseAndDigit(): boolean {
    return !/^(?=.*[A-ZА-Я])(?=.*\d).+$/.test(this.input.getValue());
  }

  private configureView(validation: () => void): void {
    this.addChild(this.input);
    this.input.addListener('input', () => {
      this.checkValidationInput();
      validation();
    });
  }
}
