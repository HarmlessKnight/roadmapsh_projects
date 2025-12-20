# GitHub User Activity CLI

A simple command-line application that fetches and displays the recent public activity of a GitHub user using the GitHub API.  
You can see pushes, repository creation, pull requests, issues, comments, forks, and stars directly in the terminal.  

This project is part of my learning journey following [roadmap.sh](https://roadmap.sh/projects/github-user-activity) projects and practicing JavaScript and Node.js concepts.

---

## Requirements
- Node.js (v18+ recommended)  
- No external libraries or dependencies required — just Node.js.

---

## Installation
1. Clone the repository:  
git clone <repository-url>  
cd <repository-folder>

2. No dependencies required — just Node.js.

---

## Usage

Run the CLI with Node.js:

node index.js github-activity <username>

### Commands

- Fetch recent activity for a user:  
node index.js github-activity kamranahmedse

- Detailed mode to see more information and a summary:  
node index.js github-activity kamranahmedse detailed

---

## Detailed Mode

With detailed mode, the application displays additional information for each event, including:

- Event type and repository name  
- Additional event details (such as commits, issue titles, actions)  
- Timestamps for each event  
- A summary showing total counts of different activity types: pushes, repositories created, pull requests, issues, comments, forks, and stars  

---

## Notes

- The application uses the public GitHub Events API:  
https://api.github.com/users/<username>/events  
- GitHub API rate limits may apply.  
- The application fetches the most recent public events available from the API.  

---

## Project Reference

This project follows the roadmap.sh GitHub User Activity project:  
[GitHub User Activity](https://roadmap.sh/projects/github-user-activity)

---

## License

This project is for learning purposes.
