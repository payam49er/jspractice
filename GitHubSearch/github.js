class Github{
    constructor() {
        this.client_id = '49ba7bd710d4b75d5748';
        this.client_secret = '21999cfc1b99957758933570628924514a04c4d9';
        this.repos_count = 5;
        this.repos_sort = 'created:asc';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profileDate = await profileResponse.json();
        return {
            profile: profileDate
        }
    }

    async getRepos(username){
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repos = await repoResponse.json();
        return{
           repos
        }
    }
}