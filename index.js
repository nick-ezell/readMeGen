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
    console.log("Great! Now let's choose some badges.")

    return await inquirer
        .prompt([
            {
                type: "confirm",
                name: "badgeOne",
                message: "Include the Dependency Status badge?",
            },
            {
                type: "confirm",
                name: "badgeTwo",
                message: "Include the Axios Node License badge?",
            },
            {
                type: "confirm",
                name: "badgeThree",
                message: "Include the GitHub package.json version badge?",
            },
            {
                type: "input",
                name: "projectName",
                message: "Awesome! 🤘  So, what are we calling this project?"
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
    let dependStatus = `https://img.shields.io/david/${user}/${getReadMe.projectName}`
    let versionNum = `https://img.shields.io/github/package-json/v/${user}/${getReadMe.projectName}`
    let axiosLicense = `https://img.shields.io/npm/l/axios`
    let dependBadge = `[![Dependency Status](${dependStatus})](${userGitHub})`
    let axiosBadge = `[![Node License](${axiosLicense})](${userGitHub})`
    let versionBadge = `[![Package Version](${versionNum})](${userGitHub})`
    let badges = ``;

    if (getReadMe.badgeOne === true) {
        badges += `\n` + dependBadge
    } if (getReadMe.badgeTwo === true) {
        badges += `\n` + axiosBadge
    } if (getReadMe.badgeThree === true) {
        badges += `\n` + versionBadge
    }

    console.log(badges)

    return `${badges}
        \n# GitHub\n"https://github.com/${user}"
        \n## Title\n${getReadMe.projectName}
        \n## Description\n${getReadMe.description}
        \n
        \n
        \n**This README was made with readMeGen!**`



}


async function init() {
    try {
        const answers = await getUsername()
        getUserData(answers)
        const getReadMe = await getReadMeData()
        // await getBadges(getReadMe)
        const readMe = writeMyReadMe(answers, getReadMe)
        console.log('readMe:', readMe)
        await writeFileAsync("./README.md", readMe)
    } catch (err) {
        console.log(err)
    }
}

init()