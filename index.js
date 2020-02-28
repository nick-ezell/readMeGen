const inquirer = require("inquirer")
const fs = require("fs")
const util = require("util")
const axios = require("axios")

const writeFileAsync = util.promisify(fs.writeFile)

// const userData = []
let user = "";
let email = "";
let avatar = "";


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
}

function getUserData(answers) {
    const queryURL = `https://api.github.com/users/${answers.username}/events/public `

    axios
        .get(queryURL).then(props => {
            const username = props.data[0].actor.login
            user = username
            const userPicture = props.data[0].actor.avatar_url
            avatar = userPicture
            const userEmail = props.data[0].payload.commits[0].author.email
            email = userEmail

        })
    // .then(
    //     getReadMeData()
    // )
}

getReadMeData = async () => {
    return await inquirer
        .prompt([
            {
                type: "checkbox",
                name: "badges",
                message: "Great! Now let's choose some badges.",
                choices: ["Dependency Status", "Node License"]
            },
            {
                type: "input",
                name: "projectName",
                message: "Great choice! So, what are we calling this project?"
            },
            {
                type: "input",
                name: "description",
                message: "Sounds good! Tell me a little about it."
            },
            // {
            //     type: "",
            //     name: "",
            //     message: ""
            // },
            // {
            //     type: "",
            //     name: "",
            //     message: ""
            // },
            // {
            //     type: "",
            //     name: "",
            //     message: ""
            // },
            // {
            //     type: "",
            //     name: "",
            //     message: ""
            // },
            // {
            //     type: "",
            //     name: "",
            //     message: ""
            // },
            // {
            //     type: "",
            //     name: "",
            //     message: ""
            // }
        ])
}

function writeMyReadMe(answers, getReadMe) {

    let userGitHub = `https://github.com/${user}/${getReadMe.projectName}`
    let dependStatus = `https://img.shields.io/${answers.greetings}/${user}/${getReadMe.projectName}`
    let versionNum = `https://img.shields.io/github/package-json/v/${user}/${getReadMe.projectName}`
    let axiosLicense = `https://img.shields.io/npm/l/axios`
    let dependBadge = `[![Dependency Status](${dependStatus})](${userGitHub})`
    let axiosBadge = `[![Node License](${axiosLicense})](${userGitHub})`
    let versionBadge = `[![Package Version](${versionNum})](${userGitHub})`
    let badgeArr = getReadMe.badges
    console.log(badgeArr)

    return `${dependBadge}
        \n# GitHub\n"https://github.com/${user}"
        \n## Title\n${getReadMe.projectName}
        \n## Description\n${getReadMe.description}`



}

async function init() {
    try {
        const answers = await getUsername()
        getUserData(answers)
        const getReadMe = await getReadMeData()

        const readMe = writeMyReadMe(answers, getReadMe)
        console.log('readMe:', readMe)
        await writeFileAsync("./README.md", readMe)
    } catch (err) {
        console.log(err)
    }
}

init()


// const writeFileAsync = util.promisify(fs.writeFile);

// async function init() {
//     console.log("Hi!")
//     try {
//       const answers = await promptUser();
//       const html = generateHTML(answers)

//       await writeFileAsync("index.html", html)
//     } catch(err) {
//       console.log(err);
//     }
//   }
//   init();