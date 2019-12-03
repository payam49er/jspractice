class Github{
    constructor() {
        this.client_id = '';
        this.client_secret = '';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}`);
        const profileDate = await profileResponse.json();
        return {
            profile: profileDate
        }
    }
}