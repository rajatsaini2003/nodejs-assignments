// function using a callback to simulate async DB user fetch
function fetchUserFromDB(userId, callback) {
    setTimeout(() => {
        if (userId === 0) {
            callback("User not found", null);
        } else {
            callback(null, { id: userId, name: "Rajat Saini" });
        }
    }, 1000);
}

// calling the function using a callback
fetchUserFromDB(1, (err, user) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("User found:", user);
    }
});
