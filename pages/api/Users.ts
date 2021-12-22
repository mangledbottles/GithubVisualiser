// Search for user
async function getUser(username: String) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
}

export { getUser };