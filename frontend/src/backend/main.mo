import Debug "mo:base/Debug";
import Time "mo:base/Time";

actor {
    // Simple greeting function
    public query func greet(name : Text) : async Text {
        return "Hello, " # name # "! This is a dummy backend.";
    };

    // Get current timestamp
    public func getCurrentTime() : async Int {
        Time.now()
    };

    // Simple counter for testing
    private stable var counter : Nat = 0;

    public func increment() : async Nat {
        counter += 1;
        counter
    };

    public query func getCounter() : async Nat {
        counter
    };

    // Health check endpoint
    public query func health() : async Text {
        "Dummy backend is running!"
    };

    // System info
    public query func whoami() : async Text {
        "Dummy Backend v1.0.0"
    };
}