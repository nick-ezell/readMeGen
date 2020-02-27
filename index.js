const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const asyncWriteFile = util.promisify(fs.appendFile);

function getUserData() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "greetings",
                message: "Salutations, fellow programmer! Got a name?"
            },
            {
                type: "input",
                name: "username",
                message: `Nice to meet ya! Drop that GitHub username, friend. Let's get this README put together.`
            }
        ])
};
function axiosCall(answers) {
        const queryURL = `https://api.github.com/users/${answers.username}/events/public `;
        axios
            .get(queryURL).then(props => {
                const userPicture = props.data[0].actor.avatar_url;
                console.log(props.data[0])
            })

};
async function init() {
    try {
        const answers = await getUserData();
        const callData = axiosCall(answers);
        // const text = generateFile(answers);
    } catch (err) {
        console.log(err)
    }
};

init();
