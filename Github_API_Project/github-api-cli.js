
const args = process.argv.slice(2);

if(args[0] != 'github-activity' || args.length < 2)
{
    console.log("Wrong command. Please use github-activity username or github-activity username detailed");
    return;
}

let username = args[1];
let details = args[2];

async function Fetch_Data()
{
    try{
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        if(!response.ok)
        {
            throw new Error("Error from Github API try again later")
        }
        const data = await response.json();
        return data;
    }catch(error)
    {
        console.error("Error fetching data:", error);
        throw error;
    }

}
let total_pushes = 0;
let total_repos_created = 0;
let total_pulls = 0;
let issues_created = 0;
let issues_commented = 0;
let total_repos_forked = 0;
let total_repos_starred = 0;

async function main() {
    let user_data = await Fetch_Data();

    user_data.forEach(event => {
        switch (event.type) {
            case "PushEvent":
                total_pushes++;
                if(details === undefined) {
                    console.log(`Pushed ${event.payload.commits?.length || 1} commit/s to ${event.repo.name}`);
                } else {
                    console.log('User:', event.actor.login);
                    console.log('Event: Push to', event.repo.name, 'repository');
                    console.log('Ref:', event.payload.ref);
                    console.log('Commits:', event.payload.commits?.length || 1);
                    console.log('Timestamp:', event.created_at);
                    console.log('----------------------------');
                }
                break;

            case "CreateEvent":
                total_repos_created++;
                if(details === undefined) {
                    console.log(`Created repository ${event.repo.name}`);
                } else {
                    console.log('User:', event.actor.login);
                    console.log('Event: Repository Creation');
                    console.log('Name:', event.repo.name);
                    console.log('Description:', event.payload.description || 'N/A');
                    console.log('URL:', event.repo.url);
                    console.log('Timestamp:', event.created_at);
                    console.log('----------------------------');
                }
                break;

            case "PullRequestEvent":
                total_pulls++;
                if(details === undefined) {
                    console.log(`${event.payload.action} a pull request in ${event.repo.name}`);
                } else {
                    console.log('User:', event.actor.login);
                    console.log('Event: Pull Request');
                    console.log('Repository:', event.repo.name);
                    console.log('Action:', event.payload.action);
                    console.log('URL:', event.payload.pull_request?.html_url || event.repo.url);
                    console.log('Timestamp:', event.created_at);
                    console.log('----------------------------');
                }
                break;

            case "IssuesEvent":
                issues_created++;
                if(details === undefined) {
                    console.log(`${event.payload.action} an issue in ${event.repo.name}`);
                } else {
                    console.log('User:', event.actor.login);
                    console.log('Event: Issue');
                    console.log('Repository:', event.repo.name);
                    console.log('Title:', event.payload.issue?.title);
                    console.log('State:', event.payload.issue?.state);
                    console.log('Timestamp:', event.created_at);
                    console.log('----------------------------');
                }
                break;

            case "IssueCommentEvent":
                issues_commented++;
                if(details === undefined) {
                    console.log(`Commented on issue #${event.payload.issue.number} in ${event.repo.name}`);
                } else {
                    console.log('User:', event.actor.login);
                    console.log('Event: Comment');
                    console.log('Repository:', event.repo.name);
                    console.log('Action:', event.payload.action);
                    console.log('Issue:', event.payload.issue.title);
                    console.log('Comment:', event.payload.comment.body);
                    console.log('Timestamp:', event.created_at);
                    console.log('----------------------------');
                }
                break;

            case "ForkEvent":
                total_repos_forked++;
                if(details === undefined) {
                    console.log(`Forked ${event.repo.name}`);
                } else {
                    console.log('User:', event.actor.login);
                    console.log('Event: Repository Forked');
                    console.log('Repository Name:', event.repo.name);
                    console.log('Forkee:', event.payload.forkee.full_name);
                    console.log('Timestamp:', event.created_at);
                    console.log('----------------------------');
                }
                break;

            case "WatchEvent":
                total_repos_starred++;
                if(details === undefined) {
                    console.log(`Starred ${event.repo.name}`);
                } else {
                    console.log('User:', event.actor.login);
                    console.log('Event: Repository Starred');
                    console.log('Repository Name:', event.repo.name);
                    console.log('Timestamp:', event.created_at);
                    console.log('----------------------------');
                }
                break;

            default:
                break;
        }
    });
}



main().then(() =>{
    if(details =='detailed')
    {
        console.log();
        console.log("Summary for",username);
        console.log("---------------------");
        console.log("Pushed to repositories", total_pushes, "times");
        console.log("Total created repositories/branches", total_repos_created);
        console.log("Pulled", total_pulls, "times");
        console.log("Total issues/PRs", issues_created);
        console.log("Wrote", issues_commented, "comments");
        console.log("Forked", total_repos_forked, "repositories");
        console.log("Starred", total_repos_starred, "repositories");
    }
        
    }
);



