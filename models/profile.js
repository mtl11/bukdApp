export class profileInfo {
    constructor(profileImgURL, profileName){
        this.profileImgURL = profileImgURL;
        this.profileName = profileName;
    }
}

export class aboutInfo {
    constructor(bio, category, genre, location){
        this.bio = bio;
        this.category = category;
        this.genre = genre;
        this.location = location;
    }
}
