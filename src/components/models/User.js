// models/User.js
class User {
    constructor(id, email, firstName, lastName, billingId, totalRentals, totalRentalDuration, icon = "https://via.placeholder.com/50") {
      this.id = id;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.billingId = billingId;
      this.totalRentals = totalRentals;
      this.totalRentalDuration = totalRentalDuration;
      this.icon = icon; // Default icon if not provided
    }
  
    static fromJson(json) {
      return new User(
        json.id,
        json.email,
        json.firstName,
        json.lastName,
        json.billingId,
        json.totalRentals,
        json.totalRentalDuration,
        json.icon // If icon is missing in API response, constructor will use default
      );
    }
  }
  
  export default User;
  