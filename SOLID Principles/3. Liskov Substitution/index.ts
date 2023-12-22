namespace LiskovChallenge {
  abstract class CustomError {
    error: Error;
    errorMessage: string;
    constructor(error: Error) {
      this.error = error;
    }
    abstract createErrorMessage(): void;
    abstract logError(): void;
  }

  class ConnectionError extends CustomError {
    constructor(error: Error) {
      super(error);
    }
    createErrorMessage(): void {
      this.errorMessage = `Connection error: ${this.error.message}`;
    }
    logError(): void {
      console.log(this.errorMessage);
    }
  }

  class DBError extends CustomError {
    constructor(error: Error) {
      super(error);
    }
    createErrorMessage(): void {
      this.errorMessage = `DB error: ${this.error.message}`;
    }
    logError(): void {
      console.log(this.errorMessage);
    }
    createAlert(): void {
      console.log("Alert Sent");
    }
  }
}

// ### Where this fails

// The above example clearly violates the Liskov Substitution principle.
// Using a subclass of DBError can be an issue when you try to use it in a common error handler function:
// [See example]
// In the above example, line 41 is a **code-smell — **because it requires knowing the
// instance type beforehand. Extend this case to future errors of APIError, GraphError and so on,
// and it results in a series of never-ending if/else cases.
// The problem arises because of the overgeneralization of use cases.

namespace LiskovSolution {

}