async function getRespositories(username: String) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    return data;
}

async function getCommitHistory(username: String, repo: String) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
    const data = await response.json();
    return data;
}

export { getRespositories, getCommitHistory };