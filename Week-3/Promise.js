// same function now returns a Promise
function fetchUserFromDB(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 0) {
                reject("User not found");
            } else {
                resolve({ id: userId, name: "Rajat Saini" });
            }
        }, 1000);
    });
}

// using async await for cleaner and more readable code
async function getUser(val) {
    try {
        const user = await fetchUserFromDB(val);
        console.log("User found:", user);
    } catch (error) {
        console.error("Error:", error);
    }
}

// execute the function
getUser(0);
