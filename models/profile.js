export class profileInfo {
  constructor(email, profileType, profileName) {
    this.email = email;
    this.profileType = profileType;
    this.profileName = profileName;
  }
}

export class aboutInfo {
  constructor(bio, category, genre, location) {
    this.bio = bio;
    this.category = category;
    this.genre = genre;
    this.location = location;
  }
}

export class availabilityInfo {
  constructor(dow, times) {
    this.dow = dow;
    this.times = times;
  }
}
