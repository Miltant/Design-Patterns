namespace DependencyInversionChallenge {
  class RedisLog {
      sendLog(logMessage: string) {
        console.log(`Log Sent to Redis for logMessage`);
      }
    }
    
    const errorDecorator = (error: Error) => {
      const log = new RedisLog();
      log.sendLog(JSON.stringify(error));
    };
    
    const main = () => {
      errorDecorator(new Error("Error Message"));
    };
    
    main();
}

// ### Where this fails

// Practically, there might be a number of changes with functions added/removed and parameters modified.
// This isn’t an ideal approach, since this would affect a number of code changes at the implementation level.

namespace DependencyInversionSolution {

}