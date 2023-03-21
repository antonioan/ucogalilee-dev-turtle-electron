module.exports = {
    webpack: {
        configure: {
            target: "electron-renderer",
            output: {
                hashFunction: "xxhash64"
            }
        }
    }
};