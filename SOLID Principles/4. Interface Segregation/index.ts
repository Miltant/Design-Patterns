namespace InterfaceSegregationChallenge {
  interface PaymentProvider {
    validate: () => boolean;
    getPaymentCommission: () => number;
    processPayment: () => string;
    verifyPayment: () => boolean;
  }

  class CreditCardPaymentProvider implements PaymentProvider {
    validate() {
      // Payment is validated
      console.log("Payment Card Validated");
      return true;
    }
    getPaymentCommission() {
      // Commission is returned
      return 10;
    }
    processPayment() {
      // Payment processed
      console.log("Payment Processed");
      return "Payment Fingerprint";
    }
    verifyPayment() {
      // No verify Payment API exist
      // Return false to just implement the Payment Provider
      return false;
    }
  }

  class WalletPaymentProvider implements PaymentProvider {
    validate() {
      // No validate method exists
      // Just for sake of implementation return false
      return false;
    }
    getPaymentCommission() {
      // Commission is returned
      return 5;
    }
    processPayment() {
      // Payment processed
      console.log("Payment Processed");
      return "Payment Fingerprint";
    }
    verifyPayment() {
      // Payment verification does exist on Wallet Payment Provider
      console.log("Payment Verified");
      return false;
    }
  }
}

// ### Where this fails

// The above implementation works fine but seeing the fake implementations,
// we know this is a **code smell **that would quickly become an issue with a number
// of such fake implementations popping up throughout the code.
  
namespace InterfaceSegregationSolution {

}