import bcrypt from 'bcrypt';

const plainPassword = "nataly"; // The password entered during login
const storedHash = "$2b$10$5kXSvf5oDhgoI.mDh/93uOWGKfaFFiYoa9oeJKRqzLhLytAtAciuu"; // Hash from your database

bcrypt.compare(plainPassword, storedHash, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else {
        console.log("Do passwords match?", result); // Should log 'true' if they match
    }
});
