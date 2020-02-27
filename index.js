const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const asyncWriteFile = util.promisify(fs.appendFile);

function getUsername() {
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
function getReadMeData(callData) {

}
function getReadMeData(answers) {
    const queryURL = `https://api.github.com/users/${answers.username}/events/public `;
    axios
        .get(queryURL).then(props => {
            const username = answers.username;
            const userPicture = props.data[0].actor.avatar_url;
            const userEmail = props.data[0].payload.commits[0].author.email;
        })
        .then(function () {
            inquirer
                .prompt([
                    {
                        type: "checkbox",
                        name: "badges",
                        message: "Great! Now let's choose some badges.",
                        choices: ["Dependency Status", "Node License"]
                    }
                ])
        })

};
async function init() {
    try {
        const answers = await getUsername();
        const callData = getReadMeData(answers);
        const readMe = await getReadMeData(callData);
        // const text = generateFile(answers);
    } catch (err) {
        console.log(err)
    }
};

init();
